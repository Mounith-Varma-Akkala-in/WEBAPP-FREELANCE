import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

// Using Space Grotesk for a more minimal, modern look
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "CLOSE IN - Web Development for Local Businesses",
  description: "We build custom ecommerce and portfolio websites for local businesses.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
