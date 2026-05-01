'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRightIcon } from '@/components/icons/arrow-right'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { PROJECT_CATEGORIES, type ProjectCategory } from '@/data/projects'

type Props = {
  allLabel: string
  loadMoreLabel: string
  activeCategory?: ProjectCategory
  baseHref: string
  categoryLabels: Record<ProjectCategory, string>
}

const PILL_BASE =
  'inline-flex h-[46px] shrink-0 items-center gap-1.5 rounded-[2px] px-6 text-[14px] font-medium tracking-[0.28px] whitespace-nowrap transition-colors md:h-[58px] md:text-[15px] md:tracking-[0.3px]'

export function ProjectsTabs({
  allLabel,
  loadMoreLabel,
  activeCategory,
  baseHref,
  categoryLabels,
}: Props) {
  const allActive = !activeCategory
  const ref = useRef<HTMLUListElement>(null)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [])

  const next = () => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: el.clientWidth * 0.8, behavior: 'smooth' })
  }

  const hrefFor = (cat?: ProjectCategory) =>
    cat ? `${baseHref}?cat=${encodeURIComponent(cat)}` : baseHref

  return (
    <nav aria-label="Project categories" className="flex items-center gap-2.5">
      <ul
        ref={ref}
        className="flex flex-1 items-center gap-2.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <li className="shrink-0">
          <Link
            href={hrefFor(undefined)}
            className={`${PILL_BASE} ${
              allActive
                ? 'bg-[var(--color-accent)] text-[var(--color-brand)] hover:bg-[#e6b801]'
                : 'border border-[#f4f4f4] text-[var(--color-brand)] hover:border-[var(--color-surface)] hover:bg-[var(--color-surface)]'
            }`}
          >
            {allLabel}
            <ArrowUpRightIcon size={15} />
          </Link>
        </li>
        {PROJECT_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat
          return (
            <li key={cat} className="shrink-0">
              <Link
                href={hrefFor(cat)}
                className={`${PILL_BASE} ${
                  isActive
                    ? 'bg-[var(--color-accent)] text-[var(--color-brand)] hover:bg-[#e6b801]'
                    : 'border border-[#f4f4f4] text-[var(--color-brand)] hover:border-[var(--color-surface)] hover:bg-[var(--color-surface)]'
                }`}
              >
                {categoryLabels[cat]}
                <ArrowUpRightIcon size={15} />
              </Link>
            </li>
          )
        })}
      </ul>
      {canScrollNext ? (
        <button
          type="button"
          aria-label={loadMoreLabel}
          onClick={next}
          className="flex size-[46px] shrink-0 items-center justify-center rounded-full border-[0.5px] border-[var(--color-brand)] text-[var(--color-brand)] transition-colors hover:bg-[var(--color-brand)] hover:text-white md:size-[50px]"
        >
          <ArrowRightIcon size={15} />
        </button>
      ) : null}
    </nav>
  )
}
