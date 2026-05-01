'use client'

import { useState, useTransition } from 'react'
import { submitLead } from '@/app/actions/lead'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { useLeadModal } from '@/components/lead-modal/lead-modal'

type Field = {
  name: string
  label: string
  type?: 'text' | 'tel'
  required?: boolean
}

type Props = {
  title: string
  description: string
  fields: {
    name: string
    phone: string
    comment: string
  }
  submitLabel: string
  errorMessages: { required: string; send_failed: string }
}

export function ConsultationForm({ title, description, fields, submitLabel, errorMessages }: Props) {
  const inputBase =
    'h-[46px] w-full border-b border-[var(--color-cta)] bg-transparent pr-4 text-[14px] text-[var(--color-brand)] placeholder:text-[#aaa] focus:outline-none md:h-[50px] md:text-[15px]'

  const inlineFields: Field[] = [
    { name: 'name', label: fields.name, type: 'text', required: true },
    { name: 'phone', label: fields.phone, type: 'tel', required: true },
  ]

  const { showSuccess } = useLeadModal()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, startSubmit] = useTransition()

  return (
    <section className="bg-[var(--color-surface)]">
      <div className="mx-auto grid max-w-[1150px] grid-cols-1 items-center gap-[22px] px-4 py-10 md:grid-cols-2 md:gap-[40px] md:px-6 md:py-[50px] lg:gap-[150px]">
        <div className="flex flex-col gap-2 md:gap-3">
          <h2 className="text-[22px] leading-tight font-semibold text-[var(--color-brand)] md:text-[28px]">
            {title}
          </h2>
          <p className="text-[14px] text-[var(--color-brand-soft)] md:text-[15px]">
            {description}
          </p>
        </div>

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
            {inlineFields.map((field) => (
              <label key={field.name} className="flex flex-1 flex-col">
                <span className="sr-only">{field.label}</span>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.label}
                  required={field.required}
                  className={inputBase}
                />
              </label>
            ))}
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
          {error ? (
            <p role="alert" className="text-[13px] text-red-600">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 flex h-[46px] items-center justify-center gap-[10px] rounded-[2px] bg-[var(--color-accent)] px-6 text-[14px] font-medium tracking-[0.28px] text-[var(--color-brand)] transition-colors hover:bg-[#e6b801] active:bg-[#d2a400] disabled:cursor-not-allowed disabled:opacity-60 md:h-[50px] md:text-[15px] md:tracking-[0.3px]"
          >
            {submitLabel}
            <ArrowUpRightIcon size={15} />
          </button>
        </form>
      </div>
    </section>
  )
}
