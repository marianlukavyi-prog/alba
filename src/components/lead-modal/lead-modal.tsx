'use client'

import Link from 'next/link'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from 'react'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { ConsentCheckbox } from '@/components/forms/consent-checkbox'
import { XIcon } from '@/components/icons/x'
import { submitLead } from '@/app/actions/lead'

type LeadLabels = {
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
  errorRequired: string
  errorGeneric: string
  errorConsent: string
  consentLabel: string
  consentLinkLabel: string
}

type LeadModalContextValue = {
  open: () => void
  showSuccess: () => void
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null)

export function useLeadModal(): LeadModalContextValue {
  const ctx = useContext(LeadModalContext)
  if (!ctx) throw new Error('useLeadModal must be used inside LeadModalProvider')
  return ctx
}

type Props = {
  labels: LeadLabels
  homeHref: string
  policyHref: string
  /** Auto-open after this many ms (once per browser session). Default 30s. */
  autoOpenDelayMs?: number
  children: ReactNode
}

const SESSION_FLAG = 'lead-modal-auto-fired'

export function LeadModalProvider({
  labels,
  homeHref,
  policyHref,
  autoOpenDelayMs = 30_000,
  children,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, startSubmit] = useTransition()

  const markAutoFired = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_FLAG, '1')
    } catch {
      /* sessionStorage unavailable (private mode, SSR) — ignore */
    }
  }, [])

  const open = useCallback(() => {
    setSubmitted(false)
    setErrorMessage(null)
    setIsOpen(true)
    markAutoFired()
  }, [markAutoFired])

  const showSuccess = useCallback(() => {
    setSubmitted(true)
    setErrorMessage(null)
    setIsOpen(true)
    markAutoFired()
  }, [markAutoFired])

  const close = useCallback(() => {
    setIsOpen(false)
    // Reset submitted state after close animation
    setTimeout(() => {
      setSubmitted(false)
      setErrorMessage(null)
    }, 200)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen, close])

  useEffect(() => {
    let alreadyFired = false
    try {
      alreadyFired = sessionStorage.getItem(SESSION_FLAG) === '1'
    } catch {
      /* ignore */
    }
    if (alreadyFired) return
    const timer = window.setTimeout(() => {
      setIsOpen(true)
      markAutoFired()
    }, autoOpenDelayMs)
    return () => window.clearTimeout(timer)
  }, [autoOpenDelayMs, markAutoFired])

  const ctx = useMemo(() => ({ open, showSuccess }), [open, showSuccess])

  const inputBase =
    'h-[46px] w-full border-b border-[var(--color-brand)] bg-transparent pr-2 text-[14px] text-[var(--color-brand)] placeholder:text-[#a5aeb7] focus:outline-none md:h-[50px] md:text-[15px]'

  return (
    <LeadModalContext.Provider value={ctx}>
      {children}

      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center px-4 py-10 transition-opacity duration-200 sm:px-6 ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={submitted ? labels.success.title : labels.title}
        aria-hidden={!isOpen}
      >
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" onClick={close} />

        <div className={`relative w-full ${submitted ? 'max-w-[640px]' : 'max-w-[750px]'}`}>
          <button
            type="button"
            aria-label={labels.close}
            onClick={close}
            className="absolute top-0 right-0 flex size-10 items-center justify-center bg-[var(--color-accent)] text-[var(--color-brand)] transition-opacity hover:opacity-90"
          >
            <XIcon size={15} />
          </button>

          {submitted ? (
            <div className="flex max-h-[calc(100vh-80px)] flex-col gap-5 overflow-y-auto bg-white p-[26px] md:gap-6 md:p-[40px] lg:gap-7 lg:p-[50px]">
              <div className="flex flex-col gap-2.5 pr-10">
                <h2 className="text-[22px] leading-tight font-semibold text-[var(--color-brand)] md:text-[26px] lg:text-[28px]">
                  {labels.success.title}
                </h2>
                <p className="text-[14px] text-[var(--color-brand-soft)] md:text-[15px]">
                  {labels.success.description}
                </p>
              </div>
              <Link
                href={homeHref}
                onClick={close}
                className="mt-1 flex h-[46px] items-center justify-center gap-2.5 rounded-[2px] bg-[var(--color-accent)] px-6 text-[14px] font-medium tracking-[0.28px] text-[var(--color-brand)] transition-colors hover:bg-[#e6b801] active:bg-[#d2a400] md:h-[50px] md:text-[15px] md:tracking-[0.3px]"
              >
                {labels.success.cta}
                <ArrowUpRightIcon size={15} />
              </Link>
            </div>
          ) : (
            <div className="flex max-h-[calc(100vh-80px)] flex-col gap-5 overflow-y-auto bg-white p-[26px] md:gap-6 md:p-[40px] lg:gap-7 lg:p-[50px]">
              <div className="flex flex-col gap-2.5 pr-10">
                <h2 className="text-[22px] leading-tight font-semibold text-[var(--color-brand)] md:text-[26px] lg:text-[28px]">
                  {labels.title}
                </h2>
                <p className="text-[14px] text-[var(--color-brand-soft)] md:text-[15px]">
                  {labels.description}
                </p>
              </div>

              <form
                className="flex flex-col gap-5"
                noValidate
                onSubmit={(e) => {
                  e.preventDefault()
                  if (isSubmitting) return
                  const formEl = e.currentTarget
                  const fd = new FormData(formEl)
                  setErrorMessage(null)
                  startSubmit(async () => {
                    const result = await submitLead({
                      name: String(fd.get('name') ?? ''),
                      phone: String(fd.get('phone') ?? ''),
                      city: String(fd.get('city') ?? ''),
                      needs: String(fd.get('needs') ?? ''),
                      consent: fd.get('consent') === 'on',
                    })
                    if (result.ok) {
                      setSubmitted(true)
                      formEl.reset()
                    } else {
                      setErrorMessage(
                        result.code === 'required'
                          ? labels.errorRequired
                          : result.code === 'consent'
                            ? labels.errorConsent
                            : labels.errorGeneric,
                      )
                    }
                  })
                }}
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <label className="flex flex-col">
                    <span className="sr-only">{labels.fields.name}</span>
                    <input
                      type="text"
                      name="name"
                      placeholder={labels.fields.name}
                      required
                      className={inputBase}
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="sr-only">{labels.fields.phone}</span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder={labels.fields.phone}
                      required
                      className={inputBase}
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="sr-only">{labels.fields.city}</span>
                    <input
                      type="text"
                      name="city"
                      placeholder={labels.fields.city}
                      className={inputBase}
                    />
                  </label>
                </div>
                <label className="flex flex-col">
                  <span className="sr-only">{labels.fields.needs}</span>
                  <input
                    type="text"
                    name="needs"
                    placeholder={labels.fields.needs}
                    className={inputBase}
                  />
                </label>

                <ConsentCheckbox
                  label={labels.consentLabel}
                  linkLabel={labels.consentLinkLabel}
                  policyHref={policyHref}
                  variant="light"
                />

                {errorMessage ? (
                  <p
                    role="alert"
                    className="text-[14px] text-red-600"
                  >
                    {errorMessage}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-1 flex h-[46px] items-center justify-center gap-2.5 rounded-[2px] bg-[var(--color-accent)] px-6 text-[14px] font-medium tracking-[0.28px] text-[var(--color-brand)] transition-colors hover:bg-[#e6b801] active:bg-[#d2a400] disabled:cursor-not-allowed disabled:opacity-60 md:h-[50px] md:text-[15px] md:tracking-[0.3px]"
                >
                  {labels.submit}
                  <ArrowUpRightIcon size={15} />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </LeadModalContext.Provider>
  )
}
