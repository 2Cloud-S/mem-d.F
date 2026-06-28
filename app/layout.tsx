import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Mem-D — Memory governance for AI agents",
  description:
    "Mem-D audits, simulates, and plans memory maintenance before stale or conflicting memories reach your LLM. Turn messy agent memory into governed context.",
  keywords: [
    "AI memory",
    "memory governance",
    "agent memory",
    "LLM context",
    "memory debt",
    "Mem-D",
  ],
  openGraph: {
    title: "Mem-D — Memory governance for AI agents",
    description:
      "Clean memory before it reaches the model. Audit, simulate, and plan memory maintenance with explainable, reviewable governance.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#050709",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
