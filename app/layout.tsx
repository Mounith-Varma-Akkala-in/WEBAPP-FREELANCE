import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageTransition from "@/components/page-transition"
import AnimatedBackground from "@/components/animated-background"
import ErrorBoundary from "@/components/error-boundary"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Gravity Fitness - Professional Gym & Fitness Center",
  description:
    "Transform your body and mind at Gravity Fitness. We offer weight lifting, zumba, meditation, body building, nutrition guidance, and personal training.",
  keywords: "gym, fitness, weight lifting, zumba, meditation, body building, nutrition, personal training, Hyderabad",
  authors: [{ name: "Gravity Fitness" }],
  creator: "Gravity Fitness",
  publisher: "Gravity Fitness",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gravityfitness.com",
    title: "Gravity Fitness - Professional Gym & Fitness Center",
    description: "Transform your body and mind at Gravity Fitness. Professional gym with expert trainers in Hyderabad.",
    siteName: "Gravity Fitness",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gravity Fitness - Professional Gym & Fitness Center",
    description: "Transform your body and mind at Gravity Fitness. Professional gym with expert trainers in Hyderabad.",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="min-h-screen flex flex-col">
              <AnimatedBackground />
              <Navbar />
              <main className="flex-1 w-full" style={{ minHeight: "calc(100vh - 80px)" }}>
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
