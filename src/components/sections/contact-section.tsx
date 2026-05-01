'use client'

import { useState, useTransition } from 'react'
import { submitLead } from '@/app/actions/lead'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { useLeadModal } from '@/components/lead-modal/lead-modal'
import { EMAIL, MAP_EMBED_URL, PHONES } from '@/data/contact'

type Props = {
  title: string
  description: string
  fields: {
    name: string
    phone: string
    comment: string
  }
  submitLabel: string
  contactLabels: {
    phone: string
    email: string
  }
  mapTitle: string
}

export function ContactSection({
  title,
  description,
  fields,
  submitLabel,
  contactLabels,
  mapTitle,
}: Props) {
  const inputBase =
    'h-[46px] w-full border-b border-white bg-transparent pr-4 text-[14px] text-white placeholder:text-[#a5aeb7] focus:outline-none md:h-[50px] md:text-[15px]'

  const { showSuccess } = useLeadModal()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, startSubmit] = useTransition()

  return (
    <section className="relative">
      <div className="relative h-[350px] w-full md:h-[500px] lg:absolute lg:inset-0 lg:h-full">
        <iframe
          src={MAP_EMBED_URL}
          title={mapTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="size-full border-0 grayscale"
        />
      </div>

      <div className="relative mx-auto flex max-w-[1150px] px-4 pb-10 md:px-6 md:pb-[60px] lg:min-h-[700px] lg:items-center lg:px-6 lg:py-[100px]">
        <div className="-mt-px flex w-full flex-col gap-[22px] bg-[var(--color-brand)] p-9 text-white md:gap-9 md:p-[60px] lg:max-w-[570px]">
          <div className="flex flex-col gap-2 md:gap-3">
            <h2 className="text-[22px] leading-tight font-semibold md:text-[28px]">{title}</h2>
            <p className="text-[14px] text-[#dcdcdc] md:text-[15px]">{description}</p>
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
                  setError(result.error)
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
            {error ? (
              <p role="alert" className="text-[13px] text-red-300">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 flex h-[46px] items-center justify-center gap-[10px] rounded-[2px] bg-[var(--color-accent)] px-6 text-[14px] font-medium tracking-[0.28px] text-black transition-colors hover:bg-[#e6b801] active:bg-[#d2a400] disabled:cursor-not-allowed disabled:opacity-60 md:h-[50px] md:text-[15px] md:tracking-[0.3px]"
            >
              {submitLabel}
              <ArrowUpRightIcon size={15} />
            </button>
          </form>

          <div className="flex gap-[22px]">
            <div className="flex flex-1 flex-col gap-1.5">
              <p className="text-[12px] text-[#dcdcdc] md:text-[14px]">{contactLabels.phone}:</p>
              <ul className="flex flex-col gap-1 text-[14px] md:text-[15px]">
                {PHONES.map((phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="transition-opacity hover:opacity-80"
                    >
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              <p className="text-[12px] text-[#dcdcdc] md:text-[14px]">{contactLabels.email}:</p>
              <a
                href={`mailto:${EMAIL}`}
                className="text-[14px] break-all transition-opacity hover:opacity-80 md:text-[15px]"
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
