'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@/components/icons/chevron-down'

type Props = {
  name: string
  label: string
  options: string[]
  className?: string
}

export function CustomSelect({ name, label, options, className = '' }: Props) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
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

  const select = (opt: string) => {
    setValue(opt)
    setOpen(false)
  }

  return (
    <div ref={ref} className={`relative flex flex-1 flex-col ${className}`}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex h-[46px] w-full items-center justify-between gap-2.5 border-b border-[var(--color-cta)] bg-transparent pr-2 text-left text-[14px] focus:outline-none md:h-[50px] md:text-[15px] ${
          value ? 'text-[var(--color-brand)]' : 'text-[#a5aeb7]'
        }`}
      >
        <span className="truncate">{value || label}</span>
        <ChevronDownIcon
          className={`size-[18px] shrink-0 text-[var(--color-brand)] transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute top-full right-0 left-0 z-30 max-h-[300px] overflow-y-auto border-r border-b border-l border-[var(--color-brand)] bg-[var(--color-surface)] shadow-lg"
        >
          {options.map((opt) => {
            const isActive = opt === value
            return (
              <li
                key={opt}
                role="option"
                aria-selected={isActive}
                onClick={() => select(opt)}
                className={`flex cursor-pointer items-center px-4 py-2 text-[14px] tracking-[0.3px] text-[var(--color-brand)] transition-colors hover:bg-[#e4e4e4] md:text-[15px] ${
                  isActive ? 'bg-[#e4e4e4] font-medium' : 'font-normal'
                }`}
              >
                {opt}
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
