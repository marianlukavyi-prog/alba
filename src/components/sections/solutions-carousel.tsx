'use client'

import { Children, useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Visually-hidden label prefix for dot buttons (e.g. "Slide"). */
  slideLabel: string
}

export function SolutionsCarousel({ children, slideLabel }: Props) {
  const items = Children.toArray(children)
  const ref = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const left = el.scrollLeft
        let nearest = 0
        let min = Infinity
        for (let i = 0; i < el.children.length; i++) {
          const c = el.children[i] as HTMLElement
          const d = Math.abs(c.offsetLeft - el.offsetLeft - left)
          if (d < min) {
            min = d
            nearest = i
          }
        }
        setActive(nearest)
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const scrollTo = (i: number) => {
    const el = ref.current
    if (!el) return
    const c = el.children[i] as HTMLElement | undefined
    if (c) el.scrollTo({ left: c.offsetLeft, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col gap-5 lg:hidden">
      <ul
        ref={ref}
        className="-mx-4 flex snap-x snap-mandatory gap-[10px] overflow-x-auto scroll-smooth px-4 [-ms-overflow-style:none] [scrollbar-width:none] md:-mx-6 md:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <li key={i} className="w-full shrink-0 snap-start md:w-[calc(50%-5px)]">
            {item}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center gap-1.5">
        {items.map((_, i) => {
          const isActive = active === i
          return (
            <button
              key={i}
              type="button"
              aria-label={`${slideLabel} ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`rounded-full transition-all ${
                isActive ? 'size-[14px] bg-[var(--color-brand)]' : 'size-[12px] bg-[#cecece]'
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}
