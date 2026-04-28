import type { Metadata, Viewport } from 'next'
import { Onest } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'
import { Footer } from '@/components/layout/footer'
import { LeadModal } from '@/components/lead-modal'
import { JsonLd } from '@/components/seo/json-ld'
import { EMAIL, PHONES } from '@/data/contact'
import { defaultLocale, hasLocale, locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'

const localePath = (locale: Locale, path = '') =>
  locale === defaultLocale ? path || '/' : `/${locale}${path}`

const onest = Onest({
  variable: '--font-onest',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://albaventanas.com'

export const viewport: Viewport = {
  themeColor: '#081f48',
  width: 'device-width',
  initialScale: 1,
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}

  const dict = await getDictionary(lang)

  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[locale] = locale === defaultLocale ? '/' : `/${locale}`
  }
  languages['x-default'] = '/'

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.title,
      template: `%s — Alba Ventanas`,
    },
    description: dict.meta.description,
    alternates: {
      canonical: lang === defaultLocale ? '/' : `/${lang}`,
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: 'Alba Ventanas',
      locale: lang,
      title: dict.meta.title,
      description: dict.meta.description,
      url: lang === defaultLocale ? '/' : `/${lang}`,
      images: ['/figma/banner-hero.webp'],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
      images: ['/figma/banner-hero.webp'],
    },
    robots: { index: true, follow: true },
  }
}

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Alba Ventanas',
    url: SITE_URL,
    logo: `${SITE_URL}/figma/banner-hero.webp`,
    email: EMAIL,
    telephone: PHONES[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Carrer Gabriela Mistral',
      addressLocality: 'Picanya',
      addressRegion: 'Valencia',
      addressCountry: 'ES',
    },
    sameAs: [],
  }
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Alba Ventanas',
    url: SITE_URL,
    inLanguage: lang,
  }

  return (
    <html lang={lang} className={`${onest.variable} h-full antialiased`}>
      <body className="bg-background text-foreground flex min-h-full flex-col font-sans">
        {children}
        <Footer lang={lang} dict={dict} />
        <LeadModal homeHref={localePath(lang)} dict={dict.leadModal} />
        <JsonLd data={[organization, website]} />
      </body>
    </html>
  )
}
