import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRightIcon } from '@/components/icons/chevron-right'
import { Header } from '@/components/layout/header'
import { ProductDetailView } from '@/components/sections/product-detail-view'
import { ProjectsBento } from '@/components/sections/projects-bento'
import { PRODUCTS } from '@/data/products'
import { defaultLocale, hasLocale, locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'

const localePath = (locale: Locale, path = '') =>
  locale === defaultLocale ? path || '/' : `/${locale}${path}`

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    PRODUCTS.map((product) => ({ lang, category: product.category, slug: product.slug })),
  )
}

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/products/[category]/[slug]'>): Promise<Metadata> {
  const { lang, category, slug } = await params
  if (!hasLocale(lang)) return {}
  const product = PRODUCTS.find((p) => p.slug === slug && p.category === category)
  if (!product) return {}

  const languages: Record<string, string> = {}
  for (const locale of locales)
    languages[locale] = localePath(locale, `/products/${category}/${slug}`)

  return {
    title: product.name,
    description: product.detail.subtitle,
    alternates: {
      canonical: localePath(lang, `/products/${category}/${slug}`),
      languages,
    },
    openGraph: {
      title: product.name,
      description: product.detail.subtitle,
      url: localePath(lang, `/products/${category}/${slug}`),
      images: [product.image.src],
    },
  }
}

export default async function ProductDetailPage({
  params,
}: PageProps<'/[lang]/products/[category]/[slug]'>) {
  const { lang, category, slug } = await params
  if (!hasLocale(lang)) notFound()
  const product = PRODUCTS.find((p) => p.slug === slug && p.category === category)
  if (!product) notFound()

  const dict = await getDictionary(lang)
  const t = dict.productsPage
  const tDetail = dict.productDetailPage

  const breadcrumb = [
    { label: t.breadcrumbHome, href: localePath(lang) },
    { label: t.categories[product.category], href: localePath(lang, `/products/${category}`) },
    { label: product.name },
  ]

  return (
    <>
      <Header lang={lang} dict={dict} position="fixed" variant="solid" />
      <main className="flex flex-1 flex-col bg-white pt-[76px]">
        <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-[1150px] px-6 pt-7 lg:px-0">
          <ol className="flex flex-wrap items-center gap-1.5 text-[15px] text-[var(--color-brand-soft)]">
            {breadcrumb.map((item, i, arr) => {
              const isLast = i === arr.length - 1
              return (
                <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
                  {item.href && !isLast ? (
                    <Link href={item.href} className="transition-opacity hover:opacity-80">
                      {item.label}
                    </Link>
                  ) : (
                    <span className={isLast ? 'font-semibold text-[var(--color-brand)]' : ''}>
                      {item.label}
                    </span>
                  )}
                  {!isLast ? (
                    <ChevronRightIcon size={15} className="text-[var(--color-brand-soft)]" />
                  ) : null}
                </li>
              )
            })}
          </ol>
        </nav>

        <section className="mx-auto w-full max-w-[1150px] px-6 py-10 lg:px-0 lg:py-12">
          <ProductDetailView
            product={product}
            tabLabels={tDetail.tabs}
            prevLabel={t.prev}
            nextLabel={t.next}
          />
        </section>

        <ProjectsBento
          title={tDetail.relatedProjectsTitle}
          viewAllLabel={tDetail.viewAllProjects}
          viewAllHref={localePath(lang, '/projects')}
        />
      </main>
    </>
  )
}
