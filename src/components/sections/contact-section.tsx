import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
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
    'w-full border-b border-white bg-transparent py-4 pr-4 text-[15px] text-white placeholder:text-[#a5aeb7] focus:outline-none'

  return (
    <section className="relative isolate overflow-hidden">
      <iframe
        src={MAP_EMBED_URL}
        title={mapTitle}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 size-full border-0 grayscale"
      />

      <div className="pointer-events-none relative mx-auto flex min-h-screen max-w-[1150px] items-center px-6 py-16 lg:py-[100px]">
        <div className="pointer-events-auto flex w-full max-w-[570px] flex-col gap-9 rounded-[2px] bg-[var(--color-cta)] p-8 text-white sm:p-12 lg:p-[60px]">
          <div className="flex flex-col gap-3">
            <h2 className="text-[28px] leading-tight font-semibold">{title}</h2>
            <p className="text-[15px] text-[#cad1d9]">{description}</p>
          </div>

          <form className="flex flex-col gap-2.5" noValidate>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-2.5">
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
                className={`${inputBase} h-[50px]`}
              />
            </label>
            <button
              type="submit"
              className="mt-1 flex items-center justify-center gap-2.5 rounded-[2px] bg-white px-6 py-4 text-[15px] font-medium tracking-[0.3px] text-black transition-colors hover:bg-[#e5e7eb]"
            >
              {submitLabel}
              <ArrowUpRightIcon />
            </button>
          </form>

          <div className="flex flex-col gap-6 text-[15px] sm:flex-row sm:gap-[22px]">
            <div className="flex flex-1 flex-col gap-1.5">
              <p className="text-[14px]">{contactLabels.phone}:</p>
              <ul className="flex flex-col gap-1">
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
              <p className="text-[14px]">{contactLabels.email}:</p>
              <a
                href={`mailto:${EMAIL}`}
                className="transition-opacity hover:opacity-80"
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
