'use client'

import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { useLeadModal } from '@/components/lead-modal/lead-modal'

type Props = {
  label: string
  className?: string
}

const DEFAULT_CLASSES =
  'flex h-[46px] items-center justify-center gap-[10px] rounded-[2px] bg-[var(--color-accent)] px-6 text-[14px] font-medium tracking-[0.28px] text-[var(--color-brand)] transition-colors hover:bg-[#e6b801] active:bg-[#d2a400] sm:h-[50px] sm:w-[300px] sm:text-[15px] sm:tracking-[0.3px]'

export function LeadConsultButton({ label, className = DEFAULT_CLASSES }: Props) {
  const { open } = useLeadModal()
  return (
    <button type="button" onClick={open} className={className}>
      {label}
      <ArrowUpRightIcon size={15} />
    </button>
  )
}
