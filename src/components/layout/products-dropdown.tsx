'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@/components/icons/chevron-down'

type Item = { label: string; href: string }

type Props = {
  label: string
  href: string
  items: Item[]
}

export function ProductsDropdown({ label, href, items }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(false)}
        className="flex items-center gap-2 transition-opacity hover:opacity-80"
      >
        {label}
        <ChevronDownIcon
          className={`size-[18px] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </Link>

      {open ? (
        <div
          role="menu"
          className="absolute top-full left-0 z-50 min-w-[220px] bg-[var(--color-cta)] py-3 shadow-lg"
        >
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href} role="none">
                <Link
                  role="menuitem"
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center px-6 py-2.5 text-[15px] text-white transition-colors hover:bg-white/10"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
