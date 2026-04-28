import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { ChevronRightIcon } from '@/components/icons/chevron-right'

type BreadcrumbItem = { label: string; href?: string }

type Props = {
  title: string
  subtitle?: string
  cta?: { label: string; href: string }
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
      <div className="absolute inset-0 -z-10 bg-black/60" aria-hidden="true" />

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

      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-[52px] px-6 py-[120px] text-center text-[#e5e7eb]">
        <div className="flex flex-col gap-4">
          <h1 className="text-[42px] leading-tight font-semibold text-balance">{title}</h1>
          {subtitle ? <p className="text-[15px] text-pretty">{subtitle}</p> : null}
        </div>

        {cta ? (
          <Link
            href={cta.href}
            className="flex h-[52px] w-[300px] items-center justify-center gap-[10px] rounded-[2px] bg-[var(--color-cta)] px-6 text-[15px] font-medium tracking-[0.3px] text-white transition-colors hover:bg-[var(--color-brand)]"
          >
            {cta.label}
            <ArrowUpRightIcon />
          </Link>
        ) : null}
      </div>
    </section>
  )
}
