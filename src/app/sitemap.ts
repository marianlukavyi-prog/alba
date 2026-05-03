import type { MetadataRoute } from 'next'
import { PRODUCTS } from '@/data/products'
import { PROJECTS } from '@/data/projects'
import { sanityFetch } from '@/sanity/client'
import { ALL_POST_PARAMS_QUERY } from '@/sanity/queries'
import { defaultLocale, locales, type Locale } from '@/i18n/config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://albaventanas.com'

const STATIC_ROUTES = ['', '/products', '/projects', '/blog', '/process', '/about', '/contact', '/privacy', '/cookies', '/terms'] as const

const buildPath = (locale: Locale, route: string) =>
  locale === defaultLocale ? route || '/' : `/${locale}${route}`

const buildAlternates = (route: string) =>
  Object.fromEntries(locales.map((l) => [l, `${SITE_URL}${buildPath(l, route)}`]))

const entry = (
  route: string,
  opts: { priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; lastModified?: Date },
): MetadataRoute.Sitemap =>
  locales.map((locale) => ({
    url: `${SITE_URL}${buildPath(locale, route)}`,
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: { languages: buildAlternates(route) },
  }))

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = STATIC_ROUTES.flatMap((route) =>
    entry(route, {
      priority: route === '' ? 1 : 0.8,
      changeFrequency: route === '' || route === '/blog' ? 'weekly' : 'monthly',
    }),
  )

  const productEntries = PRODUCTS.flatMap((product) =>
    entry(`/products/${product.category}/${product.slug}`, {
      priority: 0.7,
      changeFrequency: 'monthly',
    }),
  )

  const projectEntries = PROJECTS.flatMap((project) =>
    entry(`/projects/${project.slug}`, {
      priority: 0.6,
      changeFrequency: 'yearly',
    }),
  )

  const allBlogParams = await sanityFetch<{ slug: string; lang: string }[]>({
    query: ALL_POST_PARAMS_QUERY,
    tags: ['posts'],
  })
  const uniqueBlogSlugs = Array.from(new Set(allBlogParams.map((p) => p.slug)))
  const blogEntries = uniqueBlogSlugs.flatMap((slug) =>
    entry(`/blog/${slug}`, {
      priority: 0.6,
      changeFrequency: 'monthly',
    }),
  )

  return [...staticEntries, ...productEntries, ...projectEntries, ...blogEntries]
}
