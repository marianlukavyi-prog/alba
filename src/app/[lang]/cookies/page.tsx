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
}: PageProps<'/[lang]/cookies'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)
  const t = dict.cookiesPage

  const languages: Record<string, string> = {}
  for (const locale of locales) languages[locale] = localePath(locale, '/cookies')

  return {
    title: t.title,
    alternates: {
      canonical: localePath(lang, '/cookies'),
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: 'Alba Ventanas',
      title: t.title,
      url: localePath(lang, '/cookies'),
    },
    twitter: {
      card: 'summary',
      title: t.title,
    },
  }
}

export default async function CookiesPage({ params }: PageProps<'/[lang]/cookies'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const t = dict.cookiesPage

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

          <p className="mt-6 text-[14px] leading-[1.6] text-[var(--color-brand-soft)] md:text-[15px]">
            {t.intro}
          </p>

          <section className="mt-8 flex flex-col gap-2.5">
            <h2 className="text-[16px] font-semibold text-[var(--color-brand)] md:text-[18px]">
              {t.whatTitle}
            </h2>
            <p className="text-[14px] leading-[1.6] text-[var(--color-brand-soft)] md:text-[15px]">
              {t.whatBody}
            </p>
          </section>

          <section className="mt-7 flex flex-col gap-2.5">
            <h2 className="text-[16px] font-semibold text-[var(--color-brand)] md:text-[18px]">
              {t.typesTitle}
            </h2>
            <p className="text-[14px] leading-[1.6] text-[var(--color-brand-soft)] md:text-[15px]">
              {t.typesBody}
            </p>

            <div className="mt-3 -mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
              <table className="w-full min-w-[760px] border-collapse text-left text-[13px] md:text-[14px]">
                <thead>
                  <tr className="border-b border-[var(--color-brand)]">
                    <th className="py-2 pr-4 font-semibold text-[var(--color-brand)]">
                      {t.tableHeaders.name}
                    </th>
                    <th className="py-2 pr-4 font-semibold text-[var(--color-brand)]">
                      {t.tableHeaders.type}
                    </th>
                    <th className="py-2 pr-4 font-semibold text-[var(--color-brand)]">
                      {t.tableHeaders.purpose}
                    </th>
                    <th className="py-2 pr-4 font-semibold text-[var(--color-brand)]">
                      {t.tableHeaders.retention}
                    </th>
                    <th className="py-2 font-semibold text-[var(--color-brand)]">
                      {t.tableHeaders.provider}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {t.cookies.map((c) => (
                    <tr key={c.name} className="border-b border-[#e5e5e5] align-top">
                      <td className="py-3 pr-4 font-mono text-[12px] text-[var(--color-brand)] md:text-[13px]">
                        {c.name}
                      </td>
                      <td className="py-3 pr-4 text-[var(--color-brand-soft)]">{c.type}</td>
                      <td className="py-3 pr-4 leading-[1.5] text-[var(--color-brand-soft)]">
                        {c.purpose}
                      </td>
                      <td className="py-3 pr-4 text-[var(--color-brand-soft)]">{c.retention}</td>
                      <td className="py-3 text-[var(--color-brand-soft)]">{c.provider}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-7 flex flex-col gap-2.5">
            <h2 className="text-[16px] font-semibold text-[var(--color-brand)] md:text-[18px]">
              {t.manageTitle}
            </h2>
            <p className="text-[14px] leading-[1.6] text-[var(--color-brand-soft)] md:text-[15px]">
              {t.manageBody}
            </p>
          </section>

          <section className="mt-7 flex flex-col gap-2.5">
            <h2 className="text-[16px] font-semibold text-[var(--color-brand)] md:text-[18px]">
              {t.changesTitle}
            </h2>
            <p className="text-[14px] leading-[1.6] text-[var(--color-brand-soft)] md:text-[15px]">
              {t.changesBody}
            </p>
          </section>

          <section className="mt-7 flex flex-col gap-2.5">
            <h2 className="text-[16px] font-semibold text-[var(--color-brand)] md:text-[18px]">
              {t.contactTitle}
            </h2>
            <p className="text-[14px] leading-[1.6] text-[var(--color-brand-soft)] md:text-[15px]">
              {t.contactBody}
            </p>
          </section>
        </article>
      </main>
    </>
  )
}
