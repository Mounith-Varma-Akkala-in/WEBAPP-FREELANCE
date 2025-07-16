import type React from "react"
import { Poppins } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import AnimatedBackground from "@/components/animated-background"
import { ThemeProvider } from "@/components/theme-provider"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
})

export const metadata = {
  title: "Animaker - Share Your Anime Art",
  description: "A platform for anime, manga, and light novel creators to share their work",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} bg-violet-50 dark:bg-violet-950 min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AnimatedBackground />
          <Navbar />
          <main className="relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
