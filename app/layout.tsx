import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Plana - Personal Finance Planner',
  description: 'Track income, manage expenses, and achieve financial goals with Plana',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/plana-logo.png', sizes: '16x16', type: 'image/png' },
      { url: '/plana-logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/plana-logo.png', sizes: '192x192', type: 'image/png' },
      { url: '/plana-logo.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/plana-logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/plana-logo.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Plana',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Plana',
    title: 'Plana - Personal Finance Planner',
    description: 'Track income, manage expenses, and achieve financial goals with Plana',
  },
  twitter: {
    card: 'summary',
    title: 'Plana - Personal Finance Planner',
    description: 'Track income, manage expenses, and achieve financial goals with Plana',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
