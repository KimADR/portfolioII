import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "react-hot-toast"
import I18nProvider from '@/components/I18nProvider'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mael Andria - IT Engineer Portfolio",
  description:
    "Portfolio of Mael Andria, IT Engineer from ENI Fianarantsoa specializing in web development and software engineering.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <I18nProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
          <Toaster position="top-center" toastOptions={{
            style: {
              borderRadius: '10px',
              background: 'linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)',
              color: '#222',
              boxShadow: '0 4px 24px 0 rgba(0,0,0,0.15)'
            },
            success: { iconTheme: { primary: '#22c55e', secondary: '#f0fdfa' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fee2e2' } }
          }} />
        </I18nProvider>
      </body>
    </html>
  )
}
