import type { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/data/blog'
import { PRODUCTS } from '@/data/products'
import { PROJECTS } from '@/data/projects'
import { defaultLocale, locales, type Locale } from '@/i18n/config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://albaventanas.com'

const STATIC_ROUTES = ['', '/products', '/projects', '/blog', '/contact'] as const

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

export default function sitemap(): MetadataRoute.Sitemap {
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

  const blogEntries = BLOG_POSTS.flatMap((post) =>
    entry(`/blog/${post.slug}`, {
      priority: 0.6,
      changeFrequency: 'monthly',
      lastModified: new Date(post.publishedAt),
    }),
  )

  return [...staticEntries, ...productEntries, ...projectEntries, ...blogEntries]
}
