import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Banner } from '@/components/layout/banner'
import { Header } from '@/components/layout/header'
import { CategorySubFilter } from '@/components/sections/category-sub-filter'
import {
  PRODUCT_CATEGORIES,
  PRODUCT_SUBCATEGORIES,
  PRODUCTS,
  type ProductCategory,
  type ProductSubcategory,
} from '@/data/products'
import { defaultLocale, hasLocale, locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'

const PAGE_SIZE = 10

const localePath = (locale: Locale, path = '') =>
  locale === defaultLocale ? path || '/' : `/${locale}${path}`

const isValidCategory = (cat: string): cat is ProductCategory =>
  (PRODUCT_CATEGORIES as readonly string[]).includes(cat)

const isValidSubcategory = (sub: string): sub is ProductSubcategory =>
  (PRODUCT_SUBCATEGORIES as readonly string[]).includes(sub)

const parsePage = (raw: string | undefined) => {
  const n = Number(raw)
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1
}

const parseSub = (raw: string | undefined): ProductSubcategory | null =>
  raw && isValidSubcategory(raw) ? raw : null

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
  searchParams,
}: PageProps<'/[lang]/products/[category]'>) {
  const { lang, category } = await params
  if (!hasLocale(lang) || !isValidCategory(category)) notFound()
  const sp = (await searchParams) as { page?: string; sub?: string }
  const dict = await getDictionary(lang)
  const t = dict.productsPage

  const page = parsePage(sp.page)
  const activeSub = parseSub(sp.sub)
  const products = PRODUCTS.filter((p) =>
    category === 'pvc' || category === 'aluminum'
      ? p.family === category || p.category === category
      : p.category === category,
  )
  const title = t.categories[category]
  const description = t.categoryDescriptions[category]
  const basePath = localePath(lang, `/products/${category}`)

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
            <CategorySubFilter
              products={products}
              basePath={basePath}
              productHrefFor={(p) => localePath(lang, `/products/${p.category}/${p.slug}`)}
              ctaLabelFor={(p) => `${dict.common.moreDetails} — ${p.name}`}
              specLabels={t.specs}
              allLabel={t.tabAll}
              subcategoryLabels={t.subcategories}
              activeSub={activeSub}
              page={page}
              pageSize={PAGE_SIZE}
              prevLabel={t.prev}
              nextLabel={t.next}
            />
          )}
        </section>
      </main>
    </>
  )
}
