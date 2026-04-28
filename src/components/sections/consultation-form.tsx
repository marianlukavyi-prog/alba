import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'

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
}

export function ConsultationForm({ title, description, fields, submitLabel }: Props) {
  const inputBase =
    'w-full border-b border-[var(--color-cta)] bg-transparent py-4 pr-4 text-[15px] text-[var(--color-brand)] placeholder:text-[#aaa] focus:outline-none'

  const inlineFields: Field[] = [
    { name: 'name', label: fields.name, type: 'text', required: true },
    { name: 'phone', label: fields.phone, type: 'tel', required: true },
  ]

  return (
    <section className="bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-[1150px] flex-col items-stretch gap-12 px-6 py-12 lg:flex-row lg:items-center lg:gap-[150px] lg:py-[50px]">
        <div className="flex flex-1 flex-col gap-3">
          <h2 className="text-[29px] leading-tight font-semibold text-[var(--color-brand)]">
            {title}
          </h2>
          <p className="text-[15px] text-[var(--color-brand-soft)]">{description}</p>
        </div>

        <form className="flex flex-1 flex-col gap-2.5" noValidate>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-[10px]">
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
              className={`${inputBase} h-[50px]`}
            />
          </label>
          <button
            type="submit"
            className="mt-1 flex items-center justify-center gap-[10px] rounded-[2px] bg-[var(--color-cta)] px-6 py-4 text-[15px] font-medium tracking-[0.3px] text-white transition-colors hover:bg-[var(--color-brand)]"
          >
            {submitLabel}
            <ArrowUpRightIcon />
          </button>
        </form>
      </div>
    </section>
  )
}
