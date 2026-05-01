'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRightIcon } from '@/components/icons/arrow-right'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { PRODUCT_CATEGORIES, type ProductCategory } from '@/data/products'

type Props = {
  allLabel: string
  categoryLabels: Record<ProductCategory, string>
  nextLabel?: string
}

const TAB_BASE =
  'inline-flex h-[58px] shrink-0 items-center justify-center gap-1.5 rounded-[2px] px-6 text-[15px] font-medium tracking-[0.3px] whitespace-nowrap text-[var(--color-brand)] transition-colors'
const ACTIVE = 'bg-[var(--color-accent)] hover:bg-[#e6b801]'
const INACTIVE = 'border border-[#f4f4f4] bg-white hover:border-[var(--color-surface)] hover:bg-[var(--color-surface)]'

const HEADER_OFFSET = 120

type ActiveTab = 'all' | ProductCategory

export function ProductTabs({ allLabel, categoryLabels, nextLabel = 'Next' }: Props) {
  const ref = useRef<HTMLUListElement>(null)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [active, setActive] = useState<ActiveTab>('all')

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

  useEffect(() => {
    const sections = PRODUCT_CATEGORIES.map((cat) => {
      const node = document.getElementById(`products-${cat}`)
      return node ? { cat, node } : null
    }).filter(Boolean) as Array<{ cat: ProductCategory; node: HTMLElement }>
    if (sections.length === 0) return

    const onScroll = () => {
      const scrollY = window.scrollY + HEADER_OFFSET
      let current: ActiveTab = 'all'
      for (const { cat, node } of sections) {
        if (node.offsetTop <= scrollY) current = cat
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const next = () => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: el.clientWidth * 0.8, behavior: 'smooth' })
  }

  const handleClick = (target: ActiveTab) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setActive(target)
    const id = target === 'all' ? 'products-top' : `products-${target}`
    const node = document.getElementById(id)
    if (!node) return
    const top = node.getBoundingClientRect().top + window.scrollY - 84
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <nav aria-label="Product categories" className="flex items-center gap-2.5">
      <ul
        ref={ref}
        className="flex flex-1 items-center gap-2.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <li>
          <a
            href="#products-top"
            onClick={handleClick('all')}
            className={`${TAB_BASE} ${active === 'all' ? ACTIVE : INACTIVE}`}
            aria-current={active === 'all'}
          >
            {allLabel}
            <ArrowUpRightIcon size={15} />
          </a>
        </li>
        {PRODUCT_CATEGORIES.map((cat) => (
          <li key={cat}>
            <a
              href={`#products-${cat}`}
              onClick={handleClick(cat)}
              className={`${TAB_BASE} ${active === cat ? ACTIVE : INACTIVE}`}
              aria-current={active === cat}
            >
              {categoryLabels[cat]}
              <ArrowUpRightIcon size={15} />
            </a>
          </li>
        ))}
      </ul>
      {canScrollNext ? (
        <button
          type="button"
          aria-label={nextLabel}
          onClick={next}
          className="flex size-[46px] shrink-0 items-center justify-center rounded-full border-[0.5px] border-[var(--color-brand)] text-[var(--color-brand)] transition-colors hover:bg-[var(--color-brand)] hover:text-white md:size-[50px]"
        >
          <ArrowRightIcon size={15} />
        </button>
      ) : null}
    </nav>
  )
}
