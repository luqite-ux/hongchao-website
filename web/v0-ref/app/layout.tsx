import type { Metadata } from 'next'
import { Inter, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans'
});

export const metadata: Metadata = {
  title: 'Hongchao Automation | Custom Parts Feeding Systems',
  description: 'Leading manufacturer of vibratory bowl feeders, centrifugal feeders, and custom automation solutions since 2005. 11 Patents, 1000+ Projects, 50+ Countries.',
  keywords: ['vibratory bowl feeder', 'parts feeding systems', 'automation equipment', 'industrial automation', 'Hongchao'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dmSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
