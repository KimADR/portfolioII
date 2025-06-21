"use server"

import { z } from "zod"
import { Client } from "pg"

// Define the schema for form validation
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
})

export type ContactFormState = {
  success?: boolean
  message?: string
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
  }
}

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Extract form data
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  }

  // Validate the form data
  const validatedFields = contactSchema.safeParse(rawFormData)

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, message } = validatedFields.data

  try {
    // --- Postgres Integration ---
    const client = new Client({
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      host: process.env.PGHOST,
      port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
      database: process.env.PGDATABASE,
    })
    await client.connect()
    await client.query(
      `CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    )
    await client.query(
      `INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)`,
      [name, email, message]
    )
    await client.end()
    // --- End Postgres Integration ---

    // --- Resend Email Logic ---
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      return {
        success: false,
        message: "Resend API key is not set. Please contact the site owner.",
      }
    }
    const { Resend } = await import("resend")
    const resend = new Resend(resendApiKey)

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["andriamahatoky.mael2020@gmail.com"],
      replyTo: email,
      subject: `New Portfolio Contact from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #1f2937; margin-bottom: 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <div style="margin-bottom: 20px;">
              <h3 style="color: #374151; margin-bottom: 8px;">Contact Details:</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            </div>
            <div style="margin-bottom: 20px;">
              <h3 style="color: #374151; margin-bottom: 8px;">Message:</h3>
              <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
              <p>This message was sent from your portfolio contact form.</p>
              <p>You can reply directly to this email to respond to ${name}.</p>
            </div>
          </div>
        </div>
      `,
      text: `
New Portfolio Contact from ${name}

Contact Details:
Name: ${name}
Email: ${email}

Message:
${message}

---
This message was sent from your portfolio contact form.
You can reply directly to this email to respond to ${name}.
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return {
        success: false,
        message:
          "Sorry, there was an error sending your message. Please try again later or contact me directly at andriamahatoky.mael2020@gmail.com",
      }
    }

    // Log successful submission
    console.log("Email sent successfully:", data)

    // Send confirmation email to the user
    await resend.emails.send({
      from: "Mael Andria <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting me!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Thank you for reaching out!</h2>
            <p style="color: #374151; line-height: 1.6;">Hi ${name},</p>
            <p style="color: #374151; line-height: 1.6;">
              Thank you for contacting me through my portfolio. I've received your message and will get back to you as soon as possible, usually within 24-48 hours.
            </p>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <h3 style="color: #374151; margin-bottom: 8px;">Your message:</h3>
              <p style="color: #6b7280; font-style: italic;">"${message.substring(0, 100)}${message.length > 100 ? "..." : ""}"</p>
            </div>
            <p style="color: #374151; line-height: 1.6;">
              In the meantime, feel free to check out my projects on 
              <a href="https://github.com/KimADR" style="color: #3b82f6; text-decoration: none;">GitHub</a> 
              or connect with me on other platforms.
            </p>
            <p style="color: #374151; line-height: 1.6;">
              Best regards,<br>
              <strong>Mael Andria</strong><br>
              IT Engineer | Full-Stack Developer
            </p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
              <p>This is an automated confirmation email. Please do not reply to this message.</p>
            </div>
          </div>
        </div>
      `,
    })

    return {
      success: true,
      message: `Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon. Check your email for a confirmation.`,
    }
  } catch (error) {
    console.error("Error sending contact form:", error)

    return {
      success: false,
      message:
        "Sorry, there was an error sending your message. Please try again later or contact me directly at andriamahatoky.mael2020@gmail.com",
    }
  }
}
