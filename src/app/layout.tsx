import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aura Brew - Premium Coffee Experience',
  description: 'Discover premium specialty coffee crafted with passion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <style>
          {`
            :root {
              --background: 0 0% 100%;
              --foreground: 20 14% 4%;
            }
            html.dark {
              --background: 20 14% 4%;
              --foreground: 0 0% 100%;
            }
          `}
        </style>
      </head>
      <body className="bg-white text-coffee-900">
        {children}
      </body>
    </html>
  )
}
