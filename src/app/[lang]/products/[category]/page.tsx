import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Banner } from '@/components/layout/banner'
import { Header } from '@/components/layout/header'
import { ProductCard } from '@/components/sections/product-card'
import { PRODUCT_CATEGORIES, PRODUCTS, type ProductCategory } from '@/data/products'
import { defaultLocale, hasLocale, locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'

const localePath = (locale: Locale, path = '') =>
  locale === defaultLocale ? path || '/' : `/${locale}${path}`

const isValidCategory = (cat: string): cat is ProductCategory =>
  (PRODUCT_CATEGORIES as readonly string[]).includes(cat)

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    PRODUCT_CATEGORIES.map((category) => ({ lang, category })),
  )
}

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/products/[category]'>): Promise<Metadata> {
  const { lang, category } = await params
  if (!hasLocale(lang) || !isValidCategory(category)) return {}
  const dict = await getDictionary(lang)
  const t = dict.productsPage

  const title = t.categories[category]
  const description = t.categoryDescriptions[category]

  const languages: Record<string, string> = {}
  for (const locale of locales)
    languages[locale] = localePath(locale, `/products/${category}`)

  return {
    title,
    description,
    alternates: {
      canonical: localePath(lang, `/products/${category}`),
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: 'Alba Ventanas',
      title,
      description,
      url: localePath(lang, `/products/${category}`),
      images: ['/figma/banner-hero.webp'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/figma/banner-hero.webp'],
    },
  }
}

export default async function ProductCategoryPage({
  params,
}: PageProps<'/[lang]/products/[category]'>) {
  const { lang, category } = await params
  if (!hasLocale(lang) || !isValidCategory(category)) notFound()
  const dict = await getDictionary(lang)
  const t = dict.productsPage

  const products = PRODUCTS.filter((p) => p.category === category)
  const title = t.categories[category]
  const description = t.categoryDescriptions[category]

  return (
    <>
      <Header lang={lang} dict={dict} position="fixed" />
      <main className="flex flex-1 flex-col bg-white">
        <Banner
          title={title}
          subtitle={description}
          cta={{ label: dict.common.consult }}
          breadcrumb={[
            { label: t.breadcrumbHome, href: localePath(lang) },
            { label: dict.nav.products, href: localePath(lang, '/products') },
            { label: title },
          ]}
        />

        <section className="mx-auto w-full max-w-[1150px] px-4 py-10 md:px-6 lg:py-[60px]">
          {products.length === 0 ? (
            <p className="text-[15px] text-[var(--color-brand-soft)]">{title}</p>
          ) : (
            <ul className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
              {products.map((product) => (
                <li key={product.slug}>
                  <ProductCard
                    product={product}
                    href={localePath(lang, `/products/${product.category}/${product.slug}`)}
                    ctaLabel={`${dict.common.moreDetails} — ${product.name}`}
                    specLabels={t.specs}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  )
}
