'use client'

import { useState, useTransition } from 'react'
import { submitLead } from '@/app/actions/lead'
import { ConsentCheckbox } from '@/components/forms/consent-checkbox'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { useLeadModal } from '@/components/lead-modal/lead-modal'

type Props = {
  fields: { name: string; phone: string; comment: string }
  submitLabel: string
  errorMessages: { required: string; send_failed: string; consent: string }
  consent: { label: string; linkLabel: string; policyHref: string }
  /** 'dark' = white text on brand bg, 'light' = brand text on light bg */
  variant?: 'dark' | 'light'
}

export function LeadInlineForm({
  fields,
  submitLabel,
  errorMessages,
  consent,
  variant = 'dark',
}: Props) {
  const { showSuccess } = useLeadModal()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, startSubmit] = useTransition()

  const inputBase =
    variant === 'dark'
      ? 'h-[46px] w-full border-b border-white bg-transparent pr-4 text-[14px] text-white placeholder:text-[#a5aeb7] focus:outline-none md:h-[50px] md:text-[15px]'
      : 'h-[46px] w-full border-b border-[var(--color-cta)] bg-transparent pr-4 text-[14px] text-[var(--color-brand)] placeholder:text-[#aaa] focus:outline-none md:h-[50px] md:text-[15px]'

  const buttonBase =
    'mt-1 flex h-[46px] items-center justify-center gap-[10px] rounded-[2px] bg-[var(--color-accent)] px-6 text-[14px] font-medium tracking-[0.28px] transition-colors hover:bg-[#e6b801] active:bg-[#d2a400] disabled:cursor-not-allowed disabled:opacity-60 md:h-[50px] md:text-[15px] md:tracking-[0.3px]'
  const buttonText = variant === 'dark' ? 'text-black' : 'text-[var(--color-brand)]'
  const errorText = variant === 'dark' ? 'text-red-300' : 'text-red-600'

  return (
    <form
      className="flex flex-col gap-[10px]"
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        if (isSubmitting) return
        const formEl = e.currentTarget
        const fd = new FormData(formEl)
        setError(null)
        startSubmit(async () => {
          const result = await submitLead({
            name: String(fd.get('name') ?? ''),
            phone: String(fd.get('phone') ?? ''),
            needs: String(fd.get('comment') ?? ''),
            consent: fd.get('consent') === 'on',
          })
          if (result.ok) {
            formEl.reset()
            showSuccess()
          } else {
            setError(errorMessages[result.code])
          }
        })
      }}
    >
      <div className="flex flex-col gap-[10px] md:flex-row">
        <label className="flex flex-1 flex-col">
          <span className="sr-only">{fields.name}</span>
          <input
            type="text"
            name="name"
            placeholder={fields.name}
            required
            className={inputBase}
          />
        </label>
        <label className="flex flex-1 flex-col">
          <span className="sr-only">{fields.phone}</span>
          <input
            type="tel"
            name="phone"
            placeholder={fields.phone}
            required
            className={inputBase}
          />
        </label>
      </div>
      <label className="flex flex-col">
        <span className="sr-only">{fields.comment}</span>
        <input
          type="text"
          name="comment"
          placeholder={fields.comment}
          className={inputBase}
        />
      </label>
      <ConsentCheckbox
        label={consent.label}
        linkLabel={consent.linkLabel}
        policyHref={consent.policyHref}
        variant={variant}
      />
      {error ? (
        <p role="alert" className={`text-[13px] ${errorText}`}>
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={isSubmitting} className={`${buttonBase} ${buttonText}`}>
        {submitLabel}
        <ArrowUpRightIcon size={15} />
      </button>
    </form>
  )
}
