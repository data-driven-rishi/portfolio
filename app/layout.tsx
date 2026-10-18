import './globals.css'
import type { Metadata } from 'next'
import { Newsreader, IBM_Plex_Sans } from 'next/font/google'

const serif = Newsreader({ subsets: ['latin'], variable: '--font-serif', display: 'swap' })
const sans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans', display: 'swap' })

export const metadata: Metadata = {
  title: 'Rishi Lamichhane',
  description: 'MPH candidate in Health Economics at Brown University. Turning real-world data into evidence for better health decisions.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  )
}