import { notFound } from 'next/navigation'
import { Banner } from '@/components/layout/banner'
import { Header } from '@/components/layout/header'
import { Benefits, type BenefitKey } from '@/components/sections/benefits'
import { ConsultationForm } from '@/components/sections/consultation-form'
import { Faq } from '@/components/sections/faq'
import { HomeCategories } from '@/components/sections/home-categories'
import { SolutionsGrid } from '@/components/sections/solutions-grid'
import { defaultLocale, hasLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'

const localePath = (locale: Locale, path = '') =>
  locale === defaultLocale ? path || '/' : `/${locale}${path}`

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  const { categories, solutions, benefits, faq } = dict.home

  const benefitKeys: BenefitKey[] = ['energy', 'sound', 'design', 'quality']
  const benefitItems = benefitKeys.map((key) => ({
    key,
    title: benefits.items[key].title,
    description: benefits.items[key].description,
  }))

  const productsAnchor = (cat: string) => `${localePath(lang, '/products')}#products-${cat}`
  const solutionsItems = (
    [
      {
        key: 'aluminumWindows',
        href: productsAnchor('aluminum'),
        image: '/figma/solution-aluminum-windows.webp',
        tone: 'light',
      },
      {
        key: 'sliding',
        href: productsAnchor('systems'),
        image: '/figma/solution-sliding.webp',
        tone: 'dark',
      },
      {
        key: 'facade',
        href: productsAnchor('systems'),
        image: '/figma/solution-facade.webp',
        tone: 'light',
      },
      {
        key: 'pivot',
        href: productsAnchor('doors'),
        image: '/figma/solution-pivot.webp',
        tone: 'dark',
      },
      {
        key: 'shading',
        href: productsAnchor('shading'),
        image: '/figma/solution-shading.webp',
        tone: 'dark',
      },
    ] as const
  ).map(({ key, href, image, tone }) => ({
    title: solutions.items[key].title,
    subtitle: solutions.items[key].subtitle,
    href,
    image: { src: image, alt: solutions.items[key].title },
    tone,
  }))

  return (
    <>
      <Header lang={lang} dict={dict} position="fixed" />
      <main className="flex flex-1 flex-col">
        <Banner
          title={dict.home.heroTitle}
          subtitle={dict.home.heroSubtitle}
          cta={{ label: dict.common.consult }}
        />

        <HomeCategories
          categories={categories}
          moreDetailsLabel={dict.common.moreDetails}
          hrefs={{
            windows: localePath(lang, '/products/pvc'),
            doors: localePath(lang, '/products/doors'),
            systems: localePath(lang, '/products/systems'),
          }}
        />

        <ConsultationForm
          title={dict.home.consultation.title}
          description={dict.home.consultation.description}
          fields={dict.home.consultation.fields}
          submitLabel={dict.common.consult}
          errorMessages={{
            required: dict.leadModal.errorRequired,
            send_failed: dict.leadModal.errorGeneric,
            consent: dict.leadModal.errorConsent,
          }}
          consent={{
            label: dict.leadModal.consentLabel,
            linkLabel: dict.leadModal.consentLinkLabel,
            policyHref: localePath(lang, '/privacy'),
          }}
        />

        <SolutionsGrid
          title={solutions.title}
          description={solutions.description}
          items={solutionsItems}
          slideLabel={dict.common.slide}
        />

        <Benefits title={benefits.title} description={benefits.description} items={benefitItems} />

        <Faq title={faq.title} description={faq.description} items={faq.items} />
      </main>
    </>
  )
}
