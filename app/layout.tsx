import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
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
            <Toaster richColors />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
