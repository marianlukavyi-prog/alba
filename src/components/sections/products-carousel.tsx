'use client'

import { Children, type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeftIcon } from '@/components/icons/chevron-left'
import { ChevronRightIcon } from '@/components/icons/chevron-right'

type Props = {
  prevLabel: string
  nextLabel: string
  children: ReactNode
  /** Number of cards visible at desktop. 2 (default) or 3. */
  visibleDesktop?: 2 | 3
}

export function ProductsCarousel({
  children,
  prevLabel,
  nextLabel,
  visibleDesktop = 2,
}: Props) {
  const items = Children.toArray(children)
  const total = items.length
  const pageSize = visibleDesktop
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const scrollerRef = useRef<HTMLUListElement>(null)
  const cardRefs = useRef<Array<HTMLLIElement | null>>([])
  const [active, setActive] = useState(0)
  const activePage = Math.min(pageCount - 1, Math.floor(active / pageSize))

  const recompute = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    // Active card = the one whose left edge is closest to scroller's scrollLeft
    const x = scroller.scrollLeft
    let bestIdx = 0
    let bestDist = Number.POSITIVE_INFINITY
    cardRefs.current.forEach((el, i) => {
      if (!el) return
      const dist = Math.abs(el.offsetLeft - scroller.offsetLeft - x)
      if (dist < bestDist) {
        bestDist = dist
        bestIdx = i
      }
    })
    setActive(bestIdx)
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    recompute()
    const onScroll = () => recompute()
    scroller.addEventListener('scroll', onScroll, { passive: true })
    const ro = new ResizeObserver(recompute)
    ro.observe(scroller)
    return () => {
      scroller.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [recompute])

  const scrollToIndex = useCallback((index: number) => {
    const scroller = scrollerRef.current
    const target = cardRefs.current[Math.max(0, Math.min(total - 1, index))]
    if (!scroller || !target) return
    scroller.scrollTo({
      left: target.offsetLeft - scroller.offsetLeft,
      behavior: 'smooth',
    })
  }, [total])

  const scrollToPage = useCallback(
    (page: number) => {
      const clamped = Math.max(0, Math.min(pageCount - 1, page))
      scrollToIndex(clamped * pageSize)
    },
    [pageCount, pageSize, scrollToIndex],
  )

  return (
    <div>
      <div className="relative">
        <ul
          ref={scrollerRef}
          className={`grid snap-x snap-mandatory auto-cols-[calc(50%-5px)] grid-flow-col gap-2.5 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            visibleDesktop === 3 ? 'lg:auto-cols-[calc(33.333%-7px)]' : ''
          }`}
        >
          {items.map((child, i) => (
            <li
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              className="snap-start"
            >
              {child}
            </li>
          ))}
        </ul>

        {pageCount > 1 ? (
          <>
            <button
              type="button"
              aria-label={prevLabel}
              onClick={() => scrollToPage(activePage - 1)}
              disabled={activePage === 0}
              className="absolute top-1/2 left-0 hidden size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#e2e2e2] text-[var(--color-brand)] transition-opacity hover:bg-[var(--color-brand)] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#e2e2e2] disabled:hover:text-[var(--color-brand)] lg:flex"
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              aria-label={nextLabel}
              onClick={() => scrollToPage(activePage + 1)}
              disabled={activePage >= pageCount - 1}
              className="absolute top-1/2 right-0 hidden size-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#e2e2e2] text-[var(--color-brand)] transition-opacity hover:bg-[var(--color-brand)] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#e2e2e2] disabled:hover:text-[var(--color-brand)] lg:flex"
            >
              <ChevronRightIcon />
            </button>
          </>
        ) : null}
      </div>

      {pageCount > 1 ? (
        <div className="mt-5 flex items-center justify-center gap-1.5">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              aria-current={i === activePage}
              onClick={() => scrollToPage(i)}
              className={`rounded-full transition-all ${
                i === activePage
                  ? 'size-[14px] bg-[var(--color-brand)]'
                  : 'size-3 bg-[#f4f4f4] hover:bg-[#d4d4d4]'
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
