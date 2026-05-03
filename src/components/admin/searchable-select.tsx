'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type Option<T extends string> = {
  value: T
  label: string
}

type Props<T extends string> = {
  value: T
  options: Option<T>[]
  onChange: (next: T) => void
  placeholder?: string
  searchPlaceholder?: string
  columns?: 1 | 2 | 3
}

export function SearchableSelect<T extends string>({
  value,
  options,
  onChange,
  placeholder = 'Оберіть…',
  searchPlaceholder = 'Пошук…',
  columns = 2,
}: Props<T>) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const selected = options.find((o) => o.value === value)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter(
      (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q),
    )
  }, [options, query])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const colsCls = columns === 3 ? 'grid-cols-3' : columns === 2 ? 'grid-cols-2' : 'grid-cols-1'

  return (
    <div ref={wrapRef} className="relative normal-case tracking-normal">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-[2px] border border-[#dcdcdc] bg-white px-3 py-2 text-left text-[14px] font-normal text-[var(--color-brand)] outline-none hover:border-[var(--color-brand)] focus:border-[var(--color-brand)]"
      >
        <span className={selected ? '' : 'text-[var(--color-brand-soft)]'}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open ? (
        <div className="absolute top-full right-0 left-0 z-30 mt-1 flex flex-col gap-2 rounded-[6px] border border-[#dcdcdc] bg-white p-2 shadow-lg">
          <div className="relative">
            <SearchIcon />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-[2px] border border-[#e3e3e3] bg-white py-2 pr-3 pl-9 text-[13px] outline-none focus:border-[var(--color-brand)]"
            />
          </div>

          {filtered.length === 0 ? (
            <p className="px-2 py-3 text-center text-[12px] text-[var(--color-brand-soft)]">
              Нічого не знайдено
            </p>
          ) : (
            <div className={`grid max-h-[280px] gap-1 overflow-y-auto ${colsCls}`}>
              {filtered.map((o) => {
                const active = o.value === value
                return (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => {
                      onChange(o.value)
                      setOpen(false)
                      setQuery('')
                    }}
                    className={`flex items-center gap-2 rounded-[4px] px-2.5 py-2 text-left text-[13px] transition-colors ${
                      active
                        ? 'bg-[var(--color-brand)] text-white'
                        : 'text-[var(--color-brand)] hover:bg-[var(--color-surface)]'
                    }`}
                  >
                    {active ? <CheckIcon /> : <span className="size-3.5 shrink-0" />}
                    <span className="truncate">{o.label}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 text-[var(--color-brand-soft)] transition-transform ${open ? 'rotate-180' : ''}`}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute top-1/2 left-3 -translate-y-1/2 text-[var(--color-brand-soft)]"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5 shrink-0"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
