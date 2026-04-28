import Link from 'next/link'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'

type Props = {
  /**
   * If provided, renders as a Next.js Link. Otherwise renders as a non-interactive
   * `<span>` — useful when the parent element already serves as the click target
   * (e.g. when the indicator sits inside a card link with the `group` class).
   */
  href?: string
  ariaLabel?: string
  className?: string
}

const BASE =
  'flex size-[50px] shrink-0 items-center justify-center rounded-full border-[0.5px] border-[var(--color-brand)] text-[var(--color-brand)] transition-colors'

export function RoundArrowButton({ href, ariaLabel, className }: Props) {
  if (href) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        className={`${BASE} hover:bg-[var(--color-brand)] hover:text-white ${className ?? ''}`}
      >
        <ArrowUpRightIcon size={15} />
      </Link>
    )
  }

  return (
    <span
      aria-hidden="true"
      className={`${BASE} group-hover:bg-[var(--color-brand)] group-hover:text-white ${className ?? ''}`}
    >
      <ArrowUpRightIcon size={15} />
    </span>
  )
}
