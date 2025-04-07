import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "RUNGTAI - Virtual Campus Tour Guide",
  description:
    "Interactive AI agent providing virtual tours and information about campus buildings, history, and facilities.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-grow">{children}</main>
            <footer className="bg-emerald-800 text-white py-8">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 mr-2"
                      >
                        <path d="M22 9L12 5L2 9l10 4l10-4v6"></path>
                        <path d="M6 10.6V16c0 1 1.5 2 3 2s3-1 3-2v-5.4"></path>
                        <path d="M18 10.6V16c0 1-1.5 2-3 2s-3-1-3-2v-5.4"></path>
                      </svg>
                      <span className="font-bold">RUNGTAI</span>
                    </div>
                    <p className="text-sm mt-2">Your 24/7 virtual campus guide</p>
                  </div>
                  <div className="text-sm">© {new Date().getFullYear()} Campus Virtual Guide. All rights reserved.</div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'