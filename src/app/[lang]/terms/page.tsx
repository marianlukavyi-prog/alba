import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRightIcon } from '@/components/icons/chevron-right'
import { Header } from '@/components/layout/header'
import { defaultLocale, hasLocale, locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'

const localePath = (locale: Locale, path = '') =>
  locale === defaultLocale ? path || '/' : `/${locale}${path}`

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/terms'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)
  const t = dict.termsPage

  const languages: Record<string, string> = {}
  for (const locale of locales) languages[locale] = localePath(locale, '/terms')

  return {
    title: t.title,
    alternates: {
      canonical: localePath(lang, '/terms'),
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: 'Alba Ventanas',
      title: t.title,
      url: localePath(lang, '/terms'),
    },
    twitter: {
      card: 'summary',
      title: t.title,
    },
  }
}

export default async function TermsPage({ params }: PageProps<'/[lang]/terms'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const t = dict.termsPage

  return (
    <>
      <Header lang={lang} dict={dict} position="fixed" variant="solid" />
      <main className="flex flex-1 flex-col bg-white pt-[76px]">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto w-full max-w-[1150px] px-6 pt-7 lg:px-0"
        >
          <ol className="flex flex-wrap items-center gap-1.5 text-[14px] text-[var(--color-brand-soft)] md:text-[15px]">
            {[
              { label: t.breadcrumbHome, href: localePath(lang) },
              { label: t.breadcrumbCurrent },
            ].map((item, i, arr) => {
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

        <article className="mx-auto w-full max-w-[1150px] px-6 pt-7 pb-16 lg:px-0 lg:pt-10 lg:pb-20">
          <h1 className="text-[22px] font-semibold text-[var(--color-brand)] md:text-[28px]">
            {t.title}
          </h1>
          <p className="mt-2 text-[13px] text-[var(--color-brand-soft)] md:text-[14px]">
            {t.lastUpdatedLabel}: {t.lastUpdatedDate}
          </p>

          <div className="mt-7 flex flex-col gap-6 md:gap-7">
            {t.sections.map((section) => (
              <section key={section.title} className="flex flex-col gap-2.5">
                <h2 className="text-[16px] font-semibold text-[var(--color-brand)] md:text-[18px]">
                  {section.title}
                </h2>
                <p className="text-[14px] leading-[1.6] text-[var(--color-brand-soft)] md:text-[15px]">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </article>
      </main>
    </>
  )
}
