import type { Metadata, Viewport } from "next"
import { Roboto, Roboto_Slab } from "next/font/google"
import "./globals.css"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
})

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto-slab",
})

export const metadata: Metadata = {
  title: "Student Campus Hub | University of Wolverhampton",
  description:
    "Find local jobs, accommodation, events, and more across Wolverhampton, Telford, and Walsall campuses.",
}

export const viewport: Viewport = {
  themeColor: "#4D5168",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${robotoSlab.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
