import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { NotificationProvider } from "@/components/notification-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Learn for Sustainability | Renewable Energy Education Platform",
  description:
    "Master renewable energy and sustainability through interactive learning. Explore solar, wind, recycling, and energy efficiency with expert-designed courses, tools, and games.",
  keywords:
    "sustainability, renewable energy, solar power, wind energy, recycling, energy efficiency, environmental education, green technology",
  authors: [{ name: "Learn for Sustainability Team" }],
  creator: "Learn for Sustainability",
  publisher: "Learn for Sustainability",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://sustainabilitylearn.edu"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Learn for Sustainability | Renewable Energy Education",
    description:
      "Master renewable energy and sustainability through interactive learning. Join thousands of learners creating a greener future.",
    url: "https://sustainabilitylearn.edu",
    siteName: "Learn for Sustainability",
    images: [
      {
        url: "/sustainability-hero.png",
        width: 1200,
        height: 630,
        alt: "Learn for Sustainability - Renewable Energy Education Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn for Sustainability | Renewable Energy Education",
    description: "Master renewable energy and sustainability through interactive learning.",
    images: ["/sustainability-hero.png"],
    creator: "@sustainabilitylearn",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.jpg" />
        <link rel="apple-touch-icon" href="/team_b14_logo.jpg" />
        <meta name="theme-color" content="#22c55e" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-green-50/50 via-blue-50/30 to-emerald-50/50 custom-scrollbar`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <NotificationProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-transparent to-blue-100/20 pointer-events-none" />
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
