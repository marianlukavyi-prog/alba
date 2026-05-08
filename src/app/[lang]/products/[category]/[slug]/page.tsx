import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRightIcon } from '@/components/icons/chevron-right'
import { Header } from '@/components/layout/header'
import { ProductDetailView } from '@/components/sections/product-detail-view'
import { ProjectsBento } from '@/components/sections/projects-bento'
import { JsonLd } from '@/components/seo/json-ld'
import { getLocalizedProduct, PRODUCTS } from '@/data/products'
import { defaultLocale, hasLocale, locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://albaventanas.com'

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
  const rawProduct = PRODUCTS.find((p) => p.slug === slug && p.category === category)
  if (!rawProduct) return {}
  const product = getLocalizedProduct(rawProduct, lang)

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
      type: 'website',
      siteName: 'Alba Ventanas',
      title: product.name,
      description: product.detail.subtitle,
      url: localePath(lang, `/products/${category}/${slug}`),
      images: [product.image.src],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.detail.subtitle,
      images: [product.image.src],
    },
  }
}

export default async function ProductDetailPage({
  params,
}: PageProps<'/[lang]/products/[category]/[slug]'>) {
  const { lang, category, slug } = await params
  if (!hasLocale(lang)) notFound()
  const rawProduct = PRODUCTS.find((p) => p.slug === slug && p.category === category)
  if (!rawProduct) notFound()
  const product = getLocalizedProduct(rawProduct, lang)

  const dict = await getDictionary(lang)
  const t = dict.productsPage
  const tDetail = dict.productDetailPage

  const breadcrumb: { label: string; href?: string }[] = [
    { label: t.breadcrumbHome, href: localePath(lang) },
  ]

  const familyKey = product.family ?? product.category
  breadcrumb.push({
    label: t.categories[familyKey],
    href: localePath(lang, `/products/${familyKey}`),
  })

  const specializedDoorSubs = new Set(['swing-doors', 'auto-sliding'])
  const useSubLevel =
    familyKey === product.category ||
    product.category === 'systems' ||
    (product.category === 'doors' && specializedDoorSubs.has(product.subcategory))

  if (useSubLevel) {
    breadcrumb.push({
      label: t.subcategories[product.subcategory],
      href: localePath(lang, `/products/${category}?sub=${product.subcategory}`),
    })
  } else {
    breadcrumb.push({
      label: t.categories[product.category],
      href: localePath(lang, `/products/${category}`),
    })
  }

  breadcrumb.push({ label: product.name })

  const productUrl = `${SITE_URL}${localePath(lang, `/products/${category}/${slug}`)}`
  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.detail.subtitle,
    image: `${SITE_URL}${product.image.src}`,
    category: t.categories[product.category],
    brand: { '@type': 'Brand', name: product.name.split(' ')[0] },
    url: productUrl,
    additionalProperty: product.specs.map((spec) => ({
      '@type': 'PropertyValue',
      name: t.specs[spec.key] ?? spec.key,
      value: spec.value,
    })),
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumb.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: item.href ? `${SITE_URL}${item.href}` : productUrl,
    })),
  }

  return (
    <>
      <JsonLd data={[productLd, breadcrumbLd]} />
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
