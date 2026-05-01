import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Banner } from '@/components/layout/banner'
import { Header } from '@/components/layout/header'
import { LeadInlineForm } from '@/components/lead-modal/lead-inline-form'
import { Logo } from '@/components/brand/logo'
import { RoundArrowButton } from '@/components/ui/round-arrow-button'
import { EMAIL, PHONES } from '@/data/contact'
import { defaultLocale, hasLocale, locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'

const localePath = (locale: Locale, path = '') =>
  locale === defaultLocale ? path || '/' : `/${locale}${path}`

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/about'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)
  const t = dict.aboutPage

  const languages: Record<string, string> = {}
  for (const locale of locales) languages[locale] = localePath(locale, '/about')

  return {
    title: t.heroTitle,
    description: t.heroSubtitle,
    alternates: {
      canonical: localePath(lang, '/about'),
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: 'Alba Ventanas',
      title: t.heroTitle,
      description: t.heroSubtitle,
      url: localePath(lang, '/about'),
      images: ['/figma/banner-hero.webp'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.heroTitle,
      description: t.heroSubtitle,
      images: ['/figma/banner-hero.webp'],
    },
  }
}

export default async function AboutPage({ params }: PageProps<'/[lang]/about'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const t = dict.aboutPage

  return (
    <>
      <Header lang={lang} dict={dict} position="fixed" />
      <main className="flex flex-1 flex-col">
        <Banner
          title={t.heroTitle}
          subtitle={t.heroSubtitle}
          cta={{ label: dict.common.consult }}
          breadcrumb={[
            { label: t.breadcrumbHome, href: localePath(lang) },
            { label: t.breadcrumbCurrent },
          ]}
        />

        {/* About — text + bento with logo card */}
        <section className="bg-white py-10 md:py-[60px] lg:py-20">
          <div className="mx-auto grid max-w-[1150px] grid-cols-1 items-center gap-10 px-6 md:gap-[60px] lg:grid-cols-2 lg:gap-[100px] lg:px-0">
            <div className="flex flex-col gap-5">
              <h2 className="text-[22px] font-semibold text-[var(--color-brand)] md:text-[28px]">
                {t.intro.title}
              </h2>
              {t.intro.paragraphs.map((p, i) => (
                <p key={i} className="text-[14px] text-[var(--color-brand-soft)] md:text-[15px]">
                  {p}
                </p>
              ))}
              <RoundArrowButton
                href={localePath(lang, '/projects')}
                ariaLabel={t.intro.ctaLabel}
                tone="dark"
                className="!size-[46px] lg:!size-[50px]"
              />
            </div>

            <div className="relative grid aspect-square w-full grid-cols-2 grid-rows-2 gap-2.5 overflow-hidden">
              <div className="relative overflow-hidden rounded-[2px]">
                <Image
                  src="/figma/benefits-bg.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 285px, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="bg-[var(--color-brand)]" aria-hidden="true" />
              <div className="bg-[var(--color-accent)]" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2px]">
                <Image
                  src="/figma/section-windows.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 285px, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 flex size-[40%] -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white text-[var(--color-brand)]">
                <Logo size="lg" tone="dark" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats banner */}
        <section className="relative isolate overflow-hidden">
          <Image
            src="/figma/section-windows.webp"
            alt=""
            fill
            sizes="100vw"
            className="-z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-[var(--color-brand)]/90" aria-hidden="true" />
          <div className="mx-auto grid max-w-[1150px] grid-cols-2 gap-8 px-6 py-10 md:py-[60px] lg:grid-cols-4 lg:gap-10 lg:px-0 lg:py-16">
            {t.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
                <span className="text-[36px] font-semibold text-[var(--color-accent)] md:text-[44px]">
                  {stat.value}
                </span>
                <span className="text-[14px] text-white md:text-[15px]">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact form with house image bg */}
        <section className="relative">
          <div className="relative h-[300px] w-full md:h-[400px] lg:absolute lg:inset-0 lg:h-full">
            <Image
              src="/figma/banner-hero.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="relative mx-auto flex max-w-[1150px] px-4 pb-10 md:px-6 md:pb-[60px] lg:min-h-[600px] lg:items-center lg:justify-end lg:px-6 lg:py-[100px]">
            <div className="-mt-px flex w-full flex-col gap-[22px] bg-[var(--color-brand)] p-9 text-white md:gap-9 md:p-[60px] lg:max-w-[570px]">
              <div className="flex flex-col gap-2 md:gap-3">
                <h2 className="text-[22px] leading-tight font-semibold md:text-[28px]">
                  {t.contact.title}
                </h2>
                <p className="text-[14px] text-[#dcdcdc] md:text-[15px]">{t.contact.description}</p>
              </div>

              <LeadInlineForm
                fields={t.contact.fields}
                submitLabel={t.contact.submit}
                errorMessages={{
                  required: dict.leadModal.errorRequired,
                  send_failed: dict.leadModal.errorGeneric,
                }}
                variant="dark"
              />

              <div className="flex flex-col gap-[22px] md:flex-row">
                <div className="flex flex-1 flex-col gap-1.5">
                  <p className="text-[12px] text-[#dcdcdc] md:text-[14px]">{t.contact.phoneLabel}:</p>
                  <ul className="flex flex-col gap-1 text-[14px] md:text-[15px]">
                    {PHONES.map((phone) => (
                      <li key={phone}>
                        <a
                          href={`tel:${phone.replace(/\s/g, '')}`}
                          className="transition-opacity hover:opacity-80"
                        >
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                  <p className="text-[12px] text-[#dcdcdc] md:text-[14px]">{t.contact.emailLabel}:</p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-[14px] break-all transition-opacity hover:opacity-80 md:text-[15px]"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
