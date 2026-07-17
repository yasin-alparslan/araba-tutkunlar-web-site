import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Header from "@/components/header"
import { LanguageProvider } from '@/components/language-provider'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: { default: 'Araba Tutkunları | Haberler, İncelemeler ve Modifiye Stüdyosu', template: '%s | Araba Tutkunları' },
  description: 'Araba Tutkunları; otomotiv haberleri, araç incelemeleri, karşılaştırmalar, tartışmalar ve canlı modifiye yapılandırıcı sunan modern otomobil platformudur.',
  keywords: ['otomobil', 'araba', 'modifiye', 'otomotiv haberleri', 'araç inceleme', 'araç karşılaştırma'],
  openGraph: {
    title: 'Araba Tutkunları',
    description: 'Haberler, incelemeler, karşılaştırmalar ve canlı modifiye stüdyosu.',
    type: 'website',
    locale: 'tr_TR',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className="dark bg-[#101c22]">
      <body className={`font-sans antialiased bg-[#101c22]`}>
        <LanguageProvider>
          <Header />
          <main>
            {children}
          </main>
        </LanguageProvider>

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
