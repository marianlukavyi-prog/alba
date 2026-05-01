import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { ChevronRightIcon } from '@/components/icons/chevron-right'
import { LeadConsultButton } from '@/components/lead-modal/lead-consult-button'

type BreadcrumbItem = { label: string; href?: string }

type Props = {
  title: string
  subtitle?: string
  /**
   * Consultation CTA. If `href` is omitted, clicking opens the global lead modal
   * (the standard behavior for marketing banners).
   */
  cta?: { label: string; href?: string }
  image?: { src: string; alt?: string }
  breadcrumb?: BreadcrumbItem[]
  /**
   * Adds top padding so the content doesn't tuck under a fixed/absolute header.
   * Defaults to 76px (header height).
   */
  reserveHeader?: boolean
}

const DEFAULT_IMAGE = '/figma/banner-hero.webp'

export function Banner({
  title,
  subtitle,
  cta,
  image,
  breadcrumb,
  reserveHeader = true,
}: Props) {
  return (
    <section className={`relative isolate overflow-hidden ${reserveHeader ? 'pt-[76px]' : ''}`}>
      <Image
        src={image?.src ?? DEFAULT_IMAGE}
        alt={image?.alt ?? ''}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[var(--color-brand)]/50" aria-hidden="true" />

      {breadcrumb && breadcrumb.length > 0 ? (
        <nav
          aria-label="Breadcrumb"
          className="absolute inset-x-0 top-[76px] z-10 mx-auto max-w-[1150px] px-6 pt-5"
        >
          <ol className="flex flex-wrap items-center gap-1.5 text-[15px] text-[#cecece]">
            {breadcrumb.map((item, i) => {
              const isLast = i === breadcrumb.length - 1
              return (
                <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
                  {item.href && !isLast ? (
                    <Link href={item.href} className="transition-opacity hover:opacity-80">
                      {item.label}
                    </Link>
                  ) : (
                    <span className={isLast ? 'font-semibold text-white' : ''}>{item.label}</span>
                  )}
                  {!isLast ? <ChevronRightIcon size={15} className="text-[#cecece]" /> : null}
                </li>
              )
            })}
          </ol>
        </nav>
      ) : null}

      <div className="mx-auto flex max-w-[700px] flex-col items-center gap-[22px] px-4 py-[60px] text-center sm:gap-10 sm:px-6 sm:py-[80px] lg:gap-[52px] lg:py-[120px]">
        <div className="flex flex-col gap-1.5 sm:gap-4">
          <h1 className="text-[26px] leading-tight font-semibold text-balance text-white sm:text-[42px]">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-[14px] text-pretty text-[#dcdcdc] sm:text-[15px]">{subtitle}</p>
          ) : null}
        </div>

        {cta ? (
          cta.href ? (
            <Link
              href={cta.href}
              className="flex h-[46px] items-center justify-center gap-[10px] rounded-[2px] bg-[var(--color-accent)] px-6 text-[14px] font-medium tracking-[0.28px] text-[var(--color-brand)] transition-colors hover:bg-[#e6b801] active:bg-[#d2a400] sm:h-[50px] sm:w-[300px] sm:text-[15px] sm:tracking-[0.3px]"
            >
              {cta.label}
              <ArrowUpRightIcon size={15} />
            </Link>
          ) : (
            <LeadConsultButton label={cta.label} />
          )
        ) : null}
      </div>
    </section>
  )
}
