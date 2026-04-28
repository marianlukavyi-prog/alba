import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Banner } from '@/components/layout/banner'
import { Header } from '@/components/layout/header'
import { ContactSection } from '@/components/sections/contact-section'
import { defaultLocale, hasLocale, locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'

const localePath = (locale: Locale, path = '') =>
  locale === defaultLocale ? path || '/' : `/${locale}${path}`

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/contact'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)
  const t = dict.contactPage

  const languages: Record<string, string> = {}
  for (const locale of locales) languages[locale] = localePath(locale, '/contact')

  return {
    title: t.heroTitle,
    description: t.heroSubtitle,
    alternates: {
      canonical: localePath(lang, '/contact'),
      languages,
    },
    openGraph: {
      title: t.heroTitle,
      description: t.heroSubtitle,
      url: localePath(lang, '/contact'),
    },
  }
}

export default async function ContactPage({ params }: PageProps<'/[lang]/contact'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const t = dict.contactPage

  return (
    <>
      <Header lang={lang} dict={dict} position="absolute" />
      <main className="flex flex-1 flex-col">
        <Banner
          title={t.heroTitle}
          subtitle={t.heroSubtitle}
          breadcrumb={[
            { label: t.breadcrumbHome, href: localePath(lang) },
            { label: t.breadcrumbCurrent },
          ]}
        />

        <ContactSection
          title={t.formTitle}
          description={t.formDescription}
          fields={t.fields}
          submitLabel={dict.common.consult}
          contactLabels={t.contactLabels}
          mapTitle={t.mapTitle}
        />
      </main>
    </>
  )
}
