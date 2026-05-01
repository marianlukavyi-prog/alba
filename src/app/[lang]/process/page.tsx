import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { Banner } from '@/components/layout/banner'
import { Header } from '@/components/layout/header'
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from '@/components/icons/socials'
import { RoundArrowButton } from '@/components/ui/round-arrow-button'
import { defaultLocale, hasLocale, locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'

const localePath = (locale: Locale, path = '') =>
  locale === defaultLocale ? path || '/' : `/${locale}${path}`

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/process'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)
  const t = dict.processPage

  const languages: Record<string, string> = {}
  for (const locale of locales) languages[locale] = localePath(locale, '/process')

  return {
    title: t.heroTitle,
    description: t.heroSubtitle,
    alternates: {
      canonical: localePath(lang, '/process'),
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: 'Alba Ventanas',
      title: t.heroTitle,
      description: t.heroSubtitle,
      url: localePath(lang, '/process'),
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

const PRODUCTION_IMAGES = [
  '/figma/process/bento-1.png',
  '/figma/process/bento-2.png',
  '/figma/process/bento-3.png',
  '/figma/process/bento-4.png',
  '/figma/process/bento-5.png',
  '/figma/process/bento-6.png',
  '/figma/process/bento-7.png',
]

// padding-left/right used to align inner content edge with the
// `mx-auto max-w-[1150px]` site container while letting an adjacent image
// extend to the viewport edge. At ≥1150px viewport: ((100vw - 1150px) / 2);
// below that, falls back to 24px (matches `px-6`).
const ALIGN_LEFT = 'lg:pl-[max(24px,calc((100vw-1150px)/2))]'

export default async function ProcessPage({ params }: PageProps<'/[lang]/process'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const t = dict.processPage

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

        {/* 1. Як ми працюємо — split, image full-bleed right */}
        <section className="bg-[var(--color-surface)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch">
            <div
              className={`flex flex-col gap-6 px-6 py-10 md:py-[60px] lg:py-[80px] lg:pr-[60px] ${ALIGN_LEFT}`}
            >
              <div className="flex flex-col gap-3">
                <h2 className="text-[22px] font-semibold text-[var(--color-brand)] md:text-[28px]">
                  {t.intro.title}
                </h2>
                <p className="text-[14px] text-[var(--color-brand-soft)] md:text-[15px]">
                  {t.intro.description}
                </p>
              </div>
              <RoundArrowButton
                href={localePath(lang, '/contact')}
                ariaLabel={dict.common.consult}
                tone="dark"
                className="!size-[46px] lg:!size-[50px]"
              />
            </div>
            <div className="relative h-[260px] w-full md:h-[340px] lg:h-auto lg:min-h-[400px]">
              <Image
                src="/figma/banner-hero.webp"
                alt={t.intro.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* 2. Виробництво — bento grid, white bg, per Figma 299-5529 */}
        <section className="bg-white py-10 md:py-[60px] lg:py-20">
          <div className="mx-auto grid max-w-[1150px] grid-cols-1 gap-2.5 px-4 md:grid-cols-12 md:px-6 lg:px-0">
            <div className="flex aspect-[377/300] flex-col justify-between gap-4 bg-[var(--color-surface)] p-[22px] md:col-span-4 md:p-[30px]">
              <div className="flex flex-col gap-3">
                <h2 className="text-[22px] font-semibold text-[var(--color-brand)] md:text-[28px]">
                  {t.production.title}
                </h2>
                <p className="text-[14px] text-[var(--color-brand-soft)] md:text-[15px]">
                  {t.production.description}
                </p>
              </div>
              <Link
                href={localePath(lang, '/projects')}
                className="inline-flex items-center gap-2.5 self-start border-b border-[var(--color-brand)] pb-3 text-[14px] font-medium tracking-[0.28px] text-[var(--color-brand)] transition-opacity hover:opacity-70 md:text-[15px] md:tracking-[0.3px]"
              >
                {t.production.ctaLabel}
                <ArrowUpRightIcon size={15} />
              </Link>
            </div>
            {/* Row 1: text(4) | bento-1 (5) | bento-2 (3) */}
            <div className="relative aspect-[473/300] overflow-hidden rounded-[2px] md:col-span-5">
              <Image
                src={PRODUCTION_IMAGES[0]}
                alt=""
                fill
                sizes="(min-width: 1024px) 473px, (min-width: 768px) 41vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[280/300] overflow-hidden rounded-[2px] md:col-span-3">
              <Image
                src={PRODUCTION_IMAGES[1]}
                alt=""
                fill
                sizes="(min-width: 1024px) 280px, (min-width: 768px) 24vw, 100vw"
                className="object-cover"
              />
            </div>
            {/* Row 2: bento-3 (5) | bento-4 (3) | bento-5 (4) */}
            <div className="relative aspect-[473/300] overflow-hidden rounded-[2px] md:col-span-5">
              <Image
                src={PRODUCTION_IMAGES[2]}
                alt=""
                fill
                sizes="(min-width: 1024px) 473px, (min-width: 768px) 41vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[280/300] overflow-hidden rounded-[2px] md:col-span-3">
              <Image
                src={PRODUCTION_IMAGES[3]}
                alt=""
                fill
                sizes="(min-width: 1024px) 280px, (min-width: 768px) 24vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[377/300] overflow-hidden rounded-[2px] md:col-span-4">
              <Image
                src={PRODUCTION_IMAGES[4]}
                alt=""
                fill
                sizes="(min-width: 1024px) 377px, (min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            {/* Row 3: bento-6 (6) | bento-7 (6) */}
            <div className="relative aspect-[570/300] overflow-hidden rounded-[2px] md:col-span-6">
              <Image
                src={PRODUCTION_IMAGES[5]}
                alt=""
                fill
                sizes="(min-width: 1024px) 570px, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[570/300] overflow-hidden rounded-[2px] md:col-span-6">
              <Image
                src={PRODUCTION_IMAGES[6]}
                alt=""
                fill
                sizes="(min-width: 1024px) 570px, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* 3a. Доставка та оплата — text+bullets left, image full-bleed right */}
        <section className="bg-[var(--color-surface)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch">
            <div
              className={`flex flex-col gap-5 px-6 py-10 md:py-[60px] lg:py-[80px] lg:pr-[60px] ${ALIGN_LEFT}`}
            >
              <h2 className="text-[22px] font-semibold text-[var(--color-brand)] md:text-[28px]">
                {t.delivery.title}
              </h2>
              <p className="text-[14px] text-[var(--color-brand-soft)] md:text-[15px]">
                {t.delivery.description}
              </p>
              <ul className="flex flex-col gap-3">
                {t.delivery.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-[14px] text-[var(--color-brand)] md:text-[15px]"
                  >
                    <CheckIcon className="mt-[2px] size-[18px] shrink-0 text-[var(--color-accent)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[260px] w-full md:h-[340px] lg:h-auto lg:min-h-[400px]">
              <Image
                src="/figma/benefits-bg.webp"
                alt={t.delivery.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* 3b. 3 info cards overlapping the section above on desktop */}
        <section className="relative z-10 pb-10 md:pb-[60px] lg:-mt-[50px] lg:pb-[80px]">
          <div className="mx-auto grid max-w-[1150px] grid-cols-1 gap-2.5 px-6 sm:grid-cols-3 lg:px-0">
            {t.delivery.cards.map((card, i) => {
              const isMiddle = i === 1
              return (
                <article
                  key={card.title}
                  className={`flex flex-col gap-3 rounded-[2px] p-[26px] md:p-[30px] ${
                    isMiddle
                      ? 'bg-[var(--color-accent)] text-[var(--color-brand)]'
                      : 'bg-[var(--color-brand)] text-white'
                  }`}
                >
                  <span
                    className={
                      isMiddle ? 'text-[var(--color-brand)]' : 'text-[var(--color-accent)]'
                    }
                  >
                    <DeliveryCardIcon index={i} />
                  </span>
                  <h3 className="mt-2 text-[18px] font-semibold md:text-[20px]">{card.title}</h3>
                  <p
                    className={`text-[13px] md:text-[14px] ${
                      isMiddle ? 'text-[var(--color-brand)]' : 'text-[#dcdcdc]'
                    }`}
                  >
                    {card.description}
                  </p>
                </article>
              )
            })}
          </div>
        </section>

        {/* 4. Монтаж — split, image full-bleed right with play button */}
        <section className="bg-[var(--color-surface)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch">
            <div
              className={`flex flex-col justify-between gap-8 px-6 py-10 md:py-[60px] lg:py-[80px] lg:pr-[60px] ${ALIGN_LEFT}`}
            >
              <div className="flex flex-col gap-3">
                <h2 className="text-[22px] font-semibold text-[var(--color-brand)] md:text-[28px]">
                  {t.installation.title}
                </h2>
                <p className="text-[14px] text-[var(--color-brand-soft)] md:text-[15px]">
                  {t.installation.description}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="h-px w-full bg-[var(--color-accent)]" />
                <div className="flex items-center gap-3">
                  <span className="sr-only">{t.installation.social}</span>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="text-[var(--color-brand)] transition-opacity hover:opacity-80"
                  >
                    <InstagramIcon size={22} />
                  </a>
                  <a
                    href="#"
                    aria-label="TikTok"
                    className="text-[var(--color-brand)] transition-opacity hover:opacity-80"
                  >
                    <TikTokIcon size={22} />
                  </a>
                  <a
                    href="#"
                    aria-label="WhatsApp"
                    className="text-[var(--color-brand)] transition-opacity hover:opacity-80"
                  >
                    <WhatsAppIcon size={22} />
                  </a>
                </div>
              </div>
            </div>
            <div className="relative h-[260px] w-full md:h-[340px] lg:h-auto lg:min-h-[400px]">
              <Image
                src="/figma/section-systems.webp"
                alt={t.installation.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <button
                type="button"
                aria-label="Play video"
                className="absolute top-1/2 left-1/2 flex size-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-brand)] transition-transform hover:scale-110 md:size-[72px]"
              >
                <PlayIcon size={20} />
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m4 9 3 3 7-7" />
    </svg>
  )
}

function PlayIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M5 3v14l12-7L5 3z" />
    </svg>
  )
}

function DeliveryCardIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-8"
        aria-hidden="true"
      >
        <path d="M4 9h14v11H4z" />
        <path d="M18 13h5l4 4v3h-9" />
        <circle cx="9" cy="22" r="2.5" />
        <circle cx="22" cy="22" r="2.5" />
      </svg>
    )
  }
  if (index === 1) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-8"
        aria-hidden="true"
      >
        <rect x="4" y="8" width="24" height="17" rx="1.5" />
        <path d="M4 13h24" />
        <path d="M9 20h5" />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-8"
      aria-hidden="true"
    >
      <path d="M5 11V7l11-4 11 4v4" />
      <path d="M5 11h22v16H5z" />
      <path d="M12 17h8" />
    </svg>
  )
}
