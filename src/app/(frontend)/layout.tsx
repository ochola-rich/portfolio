import type { Metadata } from 'next'
import { Figtree, Instrument_Serif, Kanit } from 'next/font/google'
import React from 'react'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteNav } from '@/components/layout/site-nav'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { asMedia, getProfile, getSiteSettings } from '@/lib/cms'

import './globals.css'

const figtree = Figtree({ subsets: ['latin'], variable: '--font-figtree' })
const kanit = Kanit({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-kanit' })
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-instrument-serif',
})

export async function generateMetadata(): Promise<Metadata> {
  const [settings, profile] = await Promise.all([getSiteSettings(), getProfile()])
  const ogImage = asMedia(settings.ogImage)

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: { default: settings.siteTitle, template: `%s · ${profile.name}` },
    description: settings.description,
    openGraph: {
      title: settings.siteTitle,
      description: settings.description,
      type: 'website',
      images: ogImage?.url ? [{ url: ogImage.url, alt: ogImage.alt }] : undefined,
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [profile, settings] = await Promise.all([getProfile(), getSiteSettings()])

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${figtree.variable} ${kanit.variable} ${instrumentSerif.variable}`}
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <a
            href="#main"
            className="sr-only z-[60] rounded-full bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
          >
            Skip to content
          </a>
          <SiteNav profile={profile} />
          <main id="main" className="mx-auto w-full max-w-7xl px-3 pt-24 sm:px-5">
            <div className="border-x border-border/70">{children}</div>
          </main>
          <SiteFooter profile={profile} settings={settings} />
        </ThemeProvider>
      </body>
    </html>
  )
}
