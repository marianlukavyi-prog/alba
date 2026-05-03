'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRightIcon } from '@/components/icons/arrow-right'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'

export type BlogTagDisplay = { _id: string; label: string; slug: string }

type Props = {
  sortLabel: string
  activeTag?: string
  /** Base href for the blog list (e.g. `/uk/blog`). Tags append `?tag=...`. */
  baseHref: string
  loadMoreLabel: string
  tags: BlogTagDisplay[]
}

const PILL_BASE =
  'inline-flex h-[46px] shrink-0 items-center justify-center gap-1.5 rounded-[2px] px-6 text-[14px] font-medium tracking-[0.28px] whitespace-nowrap text-[var(--color-brand)] transition-colors md:h-[58px] md:text-[15px] md:tracking-[0.3px]'

export function BlogTagsBar({ sortLabel, activeTag, baseHref, loadMoreLabel, tags }: Props) {
  const tagHref = (slug?: string) =>
    slug ? `${baseHref}?tag=${encodeURIComponent(slug)}` : baseHref
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

  return (
    <nav aria-label="Blog tags" className="flex items-center gap-2.5">
      <ul
        ref={ref}
        className="flex flex-1 items-center gap-2.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <li>
          <Link
            href={tagHref(undefined)}
            className={`${PILL_BASE} bg-[var(--color-accent)] hover:bg-[#e6b801]`}
          >
            {sortLabel}
            <ArrowUpRightIcon size={15} />
          </Link>
        </li>
        {tags.map((tag) => {
          const isActive = activeTag === tag.slug
          return (
            <li key={tag._id}>
              <Link
                href={tagHref(tag.slug)}
                className={`${PILL_BASE} ${
                  isActive
                    ? 'bg-[var(--color-accent)] hover:bg-[#e6b801]'
                    : 'border border-[#f4f4f4] bg-white hover:border-[var(--color-surface)] hover:bg-[var(--color-surface)]'
                }`}
              >
                {tag.label}
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
