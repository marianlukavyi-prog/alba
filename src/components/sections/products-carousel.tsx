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
  const scrollerRef = useRef<HTMLUListElement>(null)
  const cardRefs = useRef<Array<HTMLLIElement | null>>([])
  const [active, setActive] = useState(0)

  const scrollToIndex = useCallback((index: number) => {
    const scroller = scrollerRef.current
    const target = cardRefs.current[index]
    if (!scroller || !target) return
    scroller.scrollTo({
      left: target.offsetLeft - scroller.offsetLeft,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length === 0) return
        const idx = cardRefs.current.indexOf(visible[0].target as HTMLLIElement)
        if (idx !== -1) setActive(idx)
      },
      { root: scroller, threshold: [0.5, 0.75, 1] },
    )

    cardRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [total])

  return (
    <div className="relative">
      <ul
        ref={scrollerRef}
        className={`grid snap-x snap-mandatory auto-cols-[100%] grid-flow-col gap-2.5 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          visibleDesktop === 3 ? 'lg:auto-cols-[calc(33.333%-7px)]' : 'lg:auto-cols-[calc(50%-5px)]'
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

      {total > 1 ? (
        <>
          <button
            type="button"
            aria-label={prevLabel}
            onClick={() => scrollToIndex(Math.max(0, active - 1))}
            disabled={active === 0}
            className="absolute top-1/2 left-0 hidden size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#e2e2e2] text-[var(--color-brand)] transition-opacity hover:bg-[var(--color-brand)] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#e2e2e2] disabled:hover:text-[var(--color-brand)] lg:flex"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            onClick={() => scrollToIndex(Math.min(total - 1, active + 1))}
            disabled={active >= total - 1}
            className="absolute top-1/2 right-0 hidden size-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#e2e2e2] text-[var(--color-brand)] transition-opacity hover:bg-[var(--color-brand)] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#e2e2e2] disabled:hover:text-[var(--color-brand)] lg:flex"
          >
            <ChevronRightIcon />
          </button>

          <div className="mt-5 flex items-center justify-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                aria-current={i === active}
                onClick={() => scrollToIndex(i)}
                className={`rounded-full transition-all ${
                  i === active
                    ? 'size-[14px] bg-[var(--color-cta)]'
                    : 'size-3 bg-[#f4f4f4] hover:bg-[#d4d4d4]'
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
