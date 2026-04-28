import type { MetadataRoute } from 'next'
import { defaultLocale, locales } from '@/i18n/config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://albaventanas.com'

const ROUTES = ['', '/products', '/about', '/projects', '/process', '/blog', '/contact'] as const

const buildPath = (locale: (typeof locales)[number], route: string) =>
  locale === defaultLocale ? route || '/' : `/${locale}${route}`

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap((route) =>
    locales.map((locale) => ({
      url: `${SITE_URL}${buildPath(locale, route)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}${buildPath(l, route)}`])),
      },
    })),
  )
}
