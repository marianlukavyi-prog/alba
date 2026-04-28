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

  const solutionsItems = [
    {
      key: 'aluminumWindows' as const,
      href: localePath(lang, '/products/windows'),
      image: { src: '/figma/solution-aluminum-windows.png' },
    },
    {
      key: 'sliding' as const,
      href: localePath(lang, '/products/systems'),
      image: { src: '/figma/solution-sliding.png' },
    },
    {
      key: 'facade' as const,
      href: localePath(lang, '/products/systems'),
      image: { src: '/figma/solution-facade.png' },
    },
    {
      key: 'pivot' as const,
      href: localePath(lang, '/products/doors'),
      image: { src: '/figma/solution-pivot.png' },
    },
    {
      key: 'shading' as const,
      href: localePath(lang, '/products/systems'),
      image: { src: '/figma/solution-shading.png' },
    },
  ].map(({ key, href, image }) => ({
    title: solutions.items[key].title,
    subtitle: solutions.items[key].subtitle,
    href,
    image: { src: image.src, alt: solutions.items[key].title },
  }))

  return (
    <>
      <Header lang={lang} dict={dict} position="fixed" />
      <main className="flex flex-1 flex-col">
        <Banner
          title={dict.home.heroTitle}
          subtitle={dict.home.heroSubtitle}
          cta={{ label: dict.common.consult, href: localePath(lang, '/contact') }}
        />

        <HomeCategories
          categories={categories}
          moreDetailsLabel={dict.common.moreDetails}
          hrefForCategory={(key) => localePath(lang, `/products/${key}`)}
        />

        <ConsultationForm
          title={dict.home.consultation.title}
          description={dict.home.consultation.description}
          fields={dict.home.consultation.fields}
          submitLabel={dict.common.consult}
        />

        <SolutionsGrid
          title={solutions.title}
          description={solutions.description}
          items={solutionsItems}
        />

        <Benefits title={benefits.title} description={benefits.description} items={benefitItems} />

        <Faq title={faq.title} description={faq.description} items={faq.items} />
      </main>
    </>
  )
}
