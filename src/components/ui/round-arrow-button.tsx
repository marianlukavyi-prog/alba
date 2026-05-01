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
  /**
   * 'dark' (default) — dark blue border/icon for white/light backgrounds.
   * 'light' — white border/icon for dark backgrounds.
   */
  tone?: 'dark' | 'light'
  iconSize?: number
}

export function RoundArrowButton({
  href,
  ariaLabel,
  className,
  tone = 'dark',
  iconSize = 15,
}: Props) {
  const base = `flex size-[50px] shrink-0 items-center justify-center rounded-full border-[0.5px] transition-colors ${
    tone === 'light'
      ? 'border-white text-white'
      : 'border-[var(--color-brand)] text-[var(--color-brand)]'
  }`
  const hover = href
    ? tone === 'light'
      ? 'hover:bg-white hover:text-[var(--color-brand)]'
      : 'hover:bg-[var(--color-brand)] hover:text-white'
    : tone === 'light'
      ? 'group-hover:bg-white group-hover:text-[var(--color-brand)]'
      : 'group-hover:bg-[var(--color-brand)] group-hover:text-white'

  if (href) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        className={`${base} ${hover} ${className ?? ''}`}
      >
        <ArrowUpRightIcon size={iconSize} />
      </Link>
    )
  }

  return (
    <span
      aria-hidden="true"
      className={`${base} ${hover} ${className ?? ''}`}
    >
      <ArrowUpRightIcon size={iconSize} />
    </span>
  )
}
