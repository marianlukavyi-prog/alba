import Image from 'next/image'
import Link from 'next/link'
import { CalendarDaysIcon } from '@/components/icons/calendar-days'
import { ChevronRightIcon } from '@/components/icons/chevron-right'
import { EyeIcon } from '@/components/icons/eye'
import { TimerIcon } from '@/components/icons/timer'

type BreadcrumbItem = { label: string; href?: string }

type Props = {
  title: string
  publishedLabel: string
  readingLabel: string
  views: number
  tags: string[]
  breadcrumb: BreadcrumbItem[]
  image?: { src: string; alt?: string }
}

const DEFAULT_IMAGE = '/figma/banner-hero.webp'

export function ArticleBanner({
  title,
  publishedLabel,
  readingLabel,
  views,
  tags,
  breadcrumb,
  image,
}: Props) {
  return (
    <section className="relative isolate overflow-hidden pt-[76px]">
      <Image
        src={image?.src ?? DEFAULT_IMAGE}
        alt={image?.alt ?? ''}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/60" aria-hidden="true" />

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

      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-1.5 px-6 py-[100px] text-center text-[#e5e7eb] md:py-[120px]">
        <h1 className="text-[28px] leading-tight font-semibold text-balance md:text-[42px]">
          {title}
        </h1>

        <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px] font-medium text-[#c7c7c7] md:text-[14px]">
          <li className="flex items-center gap-2">
            <CalendarDaysIcon size={15} />
            <span>{publishedLabel}</span>
          </li>
          <li className="flex items-center gap-2">
            <TimerIcon size={15} />
            <span>{readingLabel}</span>
          </li>
          <li className="flex items-center gap-2">
            <EyeIcon size={15} />
            <span>{views}</span>
          </li>
        </ul>

        {tags.length > 0 ? (
          <ul className="flex flex-wrap items-center justify-center gap-2.5 text-[14px] font-medium text-[#c7c7c7] md:text-[15px]">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
