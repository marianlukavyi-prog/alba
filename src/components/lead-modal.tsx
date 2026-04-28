'use client'

import Link from 'next/link'
import { type FormEvent, useEffect, useState } from 'react'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { XIcon } from '@/components/icons/x'

type Props = {
  homeHref: string
  dict: {
    title: string
    description: string
    submit: string
    close: string
    fields: {
      name: string
      phone: string
      city: string
      needs: string
    }
    success: {
      title: string
      description: string
      cta: string
    }
  }
  /** Delay in milliseconds before the modal auto-opens. Default 10s. */
  delayMs?: number
}

export function LeadModal({ homeHref, dict, delayMs = 10_000 }: Props) {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<'form' | 'success'>('form')
  const [hasFired, setHasFired] = useState(false)

  useEffect(() => {
    if (hasFired) return
    const timer = window.setTimeout(() => {
      setOpen(true)
      setHasFired(true)
    }, delayMs)
    return () => window.clearTimeout(timer)
  }, [delayMs, hasFired])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  if (!open) return null

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setView('success')
  }

  const close = () => setOpen(false)

  const inputBase =
    'w-full border-b border-white bg-transparent py-4 pr-4 text-[15px] text-white placeholder:text-[#a5aeb7] focus:outline-none'

  const isSuccess = view === 'success'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
    >
      <button
        type="button"
        aria-label={dict.close}
        onClick={close}
        className="absolute inset-0 -z-10 cursor-default bg-black/60"
      />

      <div
        className={`relative w-full rounded-[2px] bg-[var(--color-cta)] p-8 text-white shadow-2xl sm:p-12 lg:p-[60px] ${
          isSuccess ? 'max-w-[580px]' : 'max-w-[764px]'
        }`}
      >
        <button
          type="button"
          aria-label={dict.close}
          onClick={close}
          className="absolute top-0 right-0 flex size-10 items-center justify-center rounded-[2px] bg-white text-black transition-colors hover:bg-[#e5e7eb]"
        >
          <XIcon size={15} />
        </button>

        {isSuccess ? (
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-3">
              <h2 id="lead-modal-title" className="text-[28px] leading-tight font-semibold">
                {dict.success.title}
              </h2>
              <p className="text-[15px] text-[#cad1d9]">{dict.success.description}</p>
            </div>
            <Link
              href={homeHref}
              onClick={close}
              className="inline-flex items-center justify-center gap-2.5 rounded-[2px] bg-white px-6 py-4 text-[15px] font-medium tracking-[0.3px] text-black transition-colors hover:bg-[#e5e7eb]"
            >
              {dict.success.cta}
              <ArrowUpRightIcon />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-3">
              <h2 id="lead-modal-title" className="text-[28px] leading-tight font-semibold">
                {dict.title}
              </h2>
              <p className="text-[15px] text-[#cad1d9]">{dict.description}</p>
            </div>

            <form className="flex flex-col gap-2.5" noValidate onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-2.5">
                <label className="flex flex-1 flex-col">
                  <span className="sr-only">{dict.fields.name}</span>
                  <input
                    type="text"
                    name="name"
                    placeholder={dict.fields.name}
                    required
                    className={inputBase}
                  />
                </label>
                <label className="flex flex-1 flex-col">
                  <span className="sr-only">{dict.fields.phone}</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder={dict.fields.phone}
                    required
                    className={inputBase}
                  />
                </label>
                <label className="flex flex-1 flex-col">
                  <span className="sr-only">{dict.fields.city}</span>
                  <input
                    type="text"
                    name="city"
                    placeholder={dict.fields.city}
                    className={inputBase}
                  />
                </label>
              </div>
              <label className="flex flex-col">
                <span className="sr-only">{dict.fields.needs}</span>
                <input
                  type="text"
                  name="needs"
                  placeholder={dict.fields.needs}
                  className={inputBase}
                />
              </label>
              <button
                type="submit"
                className="mt-1 flex items-center justify-center gap-2.5 rounded-[2px] bg-white px-6 py-4 text-[15px] font-medium tracking-[0.3px] text-black transition-colors hover:bg-[#e5e7eb]"
              >
                {dict.submit}
                <ArrowUpRightIcon />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
