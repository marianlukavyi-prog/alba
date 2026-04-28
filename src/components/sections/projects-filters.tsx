import { ChevronDownIcon } from '@/components/icons/chevron-down'

type Props = {
  labels: {
    name: string
    country: string
    city: string
    system: string
    type: string
  }
  countries: string[]
  systems: string[]
  types: string[]
}

const INPUT_BASE =
  'flex w-full items-center justify-between gap-2.5 border-b border-[var(--color-cta)] bg-transparent py-4 pr-4 text-[15px] text-[var(--color-brand)] placeholder:text-[#a5aeb7] focus:outline-none'

export function ProjectsFilters({ labels, countries, systems, types }: Props) {
  return (
    <form
      className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:gap-2.5"
      noValidate
    >
      <label className="flex flex-1 flex-col">
        <span className="sr-only">{labels.name}</span>
        <input type="text" name="name" placeholder={labels.name} className={INPUT_BASE} />
      </label>

      <SelectField name="country" label={labels.country} options={countries} />
      <label className="flex flex-1 flex-col">
        <span className="sr-only">{labels.city}</span>
        <input type="text" name="city" placeholder={labels.city} className={INPUT_BASE} />
      </label>
      <SelectField name="system" label={labels.system} options={systems} />
      <SelectField name="type" label={labels.type} options={types} />
    </form>
  )
}

function SelectField({
  name,
  label,
  options,
}: {
  name: string
  label: string
  options: string[]
}) {
  return (
    <label className="relative flex flex-1 flex-col">
      <span className="sr-only">{label}</span>
      <select
        name={name}
        defaultValue=""
        className={`${INPUT_BASE} appearance-none cursor-pointer pr-10 ${
          'invalid:text-[#a5aeb7]'
        }`}
        required
      >
        <option value="" disabled hidden>
          {label}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="text-[var(--color-brand)]">
            {opt}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-0 size-[18px] -translate-y-1/2 text-[var(--color-brand)]" />
    </label>
  )
}
