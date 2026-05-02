'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { XIcon } from '@/components/icons/x'

type Labels = {
  title: string
  description: string
  accept: string
  reject: string
  settings: string
  close: string
}

const STORAGE_KEY = 'alba-cookie-consent'

export type ConsentValue = 'all' | 'essential' | 'dismissed'

export function readConsent(): ConsentValue | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'all' || v === 'essential' || v === 'dismissed') return v
    return null
  } catch {
    return null
  }
}

export function CookieBanner({
  labels,
  policyHref,
}: {
  labels: Labels
  policyHref: string
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (readConsent()) return
    const t = window.setTimeout(() => setVisible(true), 800)
    return () => window.clearTimeout(t)
  }, [])

  const persist = (value: ConsentValue) => {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label={labels.title}
      className="fixed inset-x-0 bottom-0 z-[90] bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.08)]"
    >
      <button
        type="button"
        aria-label={labels.close}
        onClick={() => persist('dismissed')}
        className="absolute top-0 right-0 flex size-10 items-center justify-center bg-[var(--color-accent)] text-[var(--color-brand)] transition-opacity hover:opacity-90"
      >
        <XIcon size={15} />
      </button>

      <div className="mx-auto flex max-w-[1150px] flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between md:gap-10 md:py-7">
        <div className="flex max-w-[700px] flex-col gap-1.5 pr-12 md:pr-0">
          <p className="text-[16px] leading-tight font-semibold text-[var(--color-brand)] md:text-[18px]">
            {labels.title}
          </p>
          <p className="text-[13px] text-[var(--color-brand-soft)] md:text-[14px]">
            {labels.description}
          </p>
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row md:shrink-0">
          <button
            type="button"
            onClick={() => persist('all')}
            className="flex h-[46px] items-center justify-center gap-[10px] rounded-[2px] bg-[var(--color-accent)] px-6 text-[14px] font-medium tracking-[0.28px] text-[var(--color-brand)] transition-colors hover:bg-[#e6b801] active:bg-[#d2a400] md:h-[50px] md:text-[15px] md:tracking-[0.3px]"
          >
            {labels.accept}
          </button>
          <button
            type="button"
            onClick={() => persist('essential')}
            className="flex h-[46px] items-center justify-center gap-[10px] rounded-[2px] border border-[var(--color-brand)] bg-white px-6 text-[14px] font-medium tracking-[0.28px] text-[var(--color-brand)] transition-colors hover:bg-[var(--color-surface)] md:h-[50px] md:text-[15px] md:tracking-[0.3px]"
          >
            {labels.reject}
          </button>
          <Link
            href={policyHref}
            className="flex h-[46px] items-center justify-center px-2 text-[14px] font-medium tracking-[0.28px] text-[var(--color-brand)] underline transition-opacity hover:opacity-70 md:h-[50px] md:text-[15px] md:tracking-[0.3px]"
          >
            {labels.settings}
          </Link>
        </div>
      </div>
    </div>
  )
}
