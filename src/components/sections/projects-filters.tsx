'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { XIcon } from '@/components/icons/x'
import { CustomSelect } from '@/components/sections/custom-select'

type Props = {
  labels: {
    name: string
    country: string
    city: string
    system: string
    type: string
    showFilter: string
    applyFilter: string
    title: string
    close: string
  }
  countries: string[]
  systems: string[]
  types: string[]
}

const INPUT_BASE =
  'flex h-[46px] w-full items-center justify-between gap-2.5 border-b border-[var(--color-cta)] bg-transparent pr-4 text-[14px] text-[var(--color-brand)] placeholder:text-[#a5aeb7] focus:outline-none md:h-[50px] md:text-[15px]'

export function ProjectsFilters({ labels, countries, systems, types }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      {/* Desktop inline filter */}
      <div className="hidden bg-[var(--color-surface)] lg:block">
        <div className="mx-auto max-w-[1150px] px-6 py-10 lg:px-0">
          <FilterForm labels={labels} countries={countries} systems={systems} types={types} />
        </div>
      </div>

      {/* Tablet/mobile show-filter button */}
      <div className="bg-white lg:hidden">
        <div className="mx-auto max-w-[1150px] px-6 pb-10">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-[46px] w-full items-center justify-center gap-2.5 rounded-[2px] bg-[var(--color-brand)] px-6 text-[14px] font-medium tracking-[0.28px] text-white transition-colors hover:bg-[var(--color-cta)] md:h-[58px] md:text-[15px] md:tracking-[0.3px]"
          >
            <FilterIcon size={18} />
            {labels.showFilter}
          </button>
        </div>
      </div>

      {/* Drawer overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-200 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
        onClick={close}
      />

      {/* Drawer */}
      <aside
        aria-label={labels.title}
        aria-hidden={!open}
        className={`fixed inset-y-0 left-0 z-[70] flex w-[min(420px,90vw)] flex-col gap-[22px] overflow-y-auto bg-[var(--color-surface)] px-[26px] py-[40px] transition-transform duration-300 ease-out lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <h2 className="text-[20px] font-semibold text-[var(--color-brand)]">{labels.title}</h2>

        <FilterForm
          labels={labels}
          countries={countries}
          systems={systems}
          types={types}
          onSubmit={close}
          showApplyButton
        />
      </aside>

      {/* Close button positioned outside drawer */}
      <button
        type="button"
        aria-label={labels.close}
        onClick={close}
        className={`fixed top-0 z-[80] flex size-10 items-center justify-center bg-[var(--color-accent)] text-[var(--color-brand)] transition-all duration-300 ease-out hover:opacity-90 lg:hidden ${
          open
            ? 'pointer-events-auto left-[min(420px,90vw)] opacity-100'
            : 'pointer-events-none left-0 opacity-0'
        }`}
      >
        <XIcon size={15} />
      </button>
    </>
  )
}

function FilterForm({
  labels,
  countries,
  systems,
  types,
  onSubmit,
  showApplyButton = false,
}: {
  labels: Props['labels']
  countries: string[]
  systems: string[]
  types: string[]
  onSubmit?: () => void
  showApplyButton?: boolean
}) {
  return (
    <form
      className="flex flex-col gap-[22px] lg:flex-row lg:items-center lg:gap-2.5"
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.()
      }}
    >
      <label className="flex flex-1 flex-col">
        <span className="sr-only">{labels.name}</span>
        <input type="text" name="name" placeholder={labels.name} className={INPUT_BASE} />
      </label>

      <CustomSelect name="country" label={labels.country} options={countries} />
      <label className="flex flex-1 flex-col">
        <span className="sr-only">{labels.city}</span>
        <input type="text" name="city" placeholder={labels.city} className={INPUT_BASE} />
      </label>
      <CustomSelect name="system" label={labels.system} options={systems} />
      <CustomSelect name="type" label={labels.type} options={types} />

      {showApplyButton ? (
        <button
          type="submit"
          className="mt-2 flex h-[46px] items-center justify-center gap-2.5 rounded-[2px] bg-[var(--color-accent)] px-6 text-[14px] font-medium tracking-[0.28px] text-[var(--color-brand)] transition-colors hover:bg-[#e6b801] md:h-[50px] md:text-[15px] md:tracking-[0.3px]"
        >
          {labels.applyFilter}
          <ArrowUpRightIcon size={15} />
        </button>
      ) : null}
    </form>
  )
}

function FilterIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="2.5" y1="5" x2="15.5" y2="5" />
      <line x1="4.5" y1="9" x2="13.5" y2="9" />
      <line x1="6.5" y1="13" x2="11.5" y2="13" />
    </svg>
  )
}
