'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@/components/icons/chevron-down'
import { defaultLocale, locales, localeNames, type Locale } from '@/i18n/config'

const ALL_LOCALES = locales as readonly string[]

const stripLocale = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length > 0 && ALL_LOCALES.includes(segments[0]!)) {
    const rest = segments.slice(1).join('/')
    return rest ? `/${rest}` : '/'
  }
  return pathname || '/'
}

const buildHref = (target: Locale, basePath: string) => {
  const path = basePath === '/' ? '' : basePath
  return target === defaultLocale ? path || '/' : `/${target}${path}`
}

type Props = {
  lang: Locale
  className?: string
}

export function LanguageSwitcher({ lang, className }: Props) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const basePath = stripLocale(pathname)

  return (
    <div ref={ref} className={`relative ${className ?? ''}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Change language. Current: ${localeNames[lang]}`}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-[15px] font-medium uppercase transition-opacity hover:opacity-80"
      >
        {lang}
        <ChevronDownIcon
          className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label="Languages"
          className="absolute top-full right-0 z-50 mt-2 min-w-[180px] overflow-hidden rounded-[2px] border border-white/15 bg-[var(--color-brand)] py-1 shadow-lg"
        >
          {locales.map((target) => {
            const active = target === lang
            return (
              <li key={target}>
                <Link
                  href={buildHref(target, basePath)}
                  hrefLang={target}
                  lang={target}
                  onClick={() => setOpen(false)}
                  aria-current={active ? 'true' : undefined}
                  className={`flex items-center justify-between gap-3 px-4 py-2 text-[14px] transition-colors ${
                    active ? 'bg-white/10 font-medium' : 'hover:bg-white/5'
                  }`}
                >
                  <span>{localeNames[target]}</span>
                  <span className="text-[12px] tracking-wider text-white/60 uppercase">
                    {target}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
