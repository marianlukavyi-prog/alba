import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Banner } from '@/components/layout/banner'
import { Header } from '@/components/layout/header'
import { ProductTabs } from '@/components/sections/product-tabs'
import { ProductsSection } from '@/components/sections/products-section'
import { PRODUCT_CATEGORIES, PRODUCTS, type Product } from '@/data/products'
import { defaultLocale, hasLocale, locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'

const localePath = (locale: Locale, path = '') =>
  locale === defaultLocale ? path || '/' : `/${locale}${path}`

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/products'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)

  const languages: Record<string, string> = {}
  for (const locale of locales) languages[locale] = localePath(locale, '/products')

  return {
    title: dict.productsPage.heroTitle,
    description: dict.productsPage.heroSubtitle,
    alternates: {
      canonical: localePath(lang, '/products'),
      languages,
    },
    openGraph: {
      title: dict.productsPage.heroTitle,
      description: dict.productsPage.heroSubtitle,
      url: localePath(lang, '/products'),
    },
  }
}

export default async function ProductsPage({ params }: PageProps<'/[lang]/products'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const t = dict.productsPage

  const productHrefFor = (product: Product) =>
    localePath(lang, `/products/${product.category}/${product.slug}`)

  return (
    <>
      <Header lang={lang} dict={dict} position="absolute" />
      <main className="flex flex-1 flex-col">
        <Banner
          title={t.heroTitle}
          subtitle={t.heroSubtitle}
          cta={{ label: dict.common.consult, href: localePath(lang, '/contact') }}
        />

        <div id="products-top" className="bg-white pt-12 pb-6">
          <div className="mx-auto w-full max-w-[1150px] px-6">
            <ProductTabs allLabel={t.tabAll} categoryLabels={t.categories} />
          </div>
        </div>

        <div className="bg-white pb-16">
          {PRODUCT_CATEGORIES.map((cat) => {
            const products = PRODUCTS.filter((p) => p.category === cat)
            if (products.length === 0) return null
            return (
              <ProductsSection
                key={cat}
                category={cat}
                title={t.categories[cat]}
                viewAllLabel={t.viewAll}
                viewAllHref={localePath(lang, `/products/${cat}`)}
                prevLabel={t.prev}
                nextLabel={t.next}
                products={products}
                productHrefFor={productHrefFor}
                ctaLabelFor={(p) => `${dict.common.moreDetails} — ${p.name}`}
                specLabels={t.specs}
              />
            )
          })}
        </div>
      </main>
    </>
  )
}
