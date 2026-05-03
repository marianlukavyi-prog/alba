'use client'

import Link from 'next/link'

type Props = {
  name?: string
  label: string
  linkLabel: string
  policyHref: string
  variant?: 'dark' | 'light'
}

export function ConsentCheckbox({
  name = 'consent',
  label,
  linkLabel,
  policyHref,
  variant = 'light',
}: Props) {
  const text = variant === 'dark' ? 'text-[#dcdcdc]' : 'text-[var(--color-brand-soft)]'
  const linkColor = variant === 'dark' ? 'text-white' : 'text-[var(--color-brand)]'
  const boxBorder = variant === 'dark' ? 'border-white/40' : 'border-[var(--color-brand)]/40'
  const boxHover =
    variant === 'dark' ? 'group-hover:border-white' : 'group-hover:border-[var(--color-brand)]'

  return (
    <label
      className={`group flex cursor-pointer items-start gap-2.5 text-[12px] leading-relaxed select-none md:text-[13px] ${text}`}
    >
      <span className="relative mt-[1px] inline-flex size-[18px] shrink-0">
        <input
          type="checkbox"
          name={name}
          required
          defaultChecked={false}
          className="peer absolute inset-0 z-10 size-full cursor-pointer opacity-0"
        />
        <span
          aria-hidden="true"
          className={`absolute inset-0 flex items-center justify-center rounded-[3px] border bg-transparent transition-all ${boxBorder} ${boxHover} peer-checked:border-[var(--color-accent)] peer-checked:bg-[var(--color-accent)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-accent)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-transparent`}
        />
        <svg
          aria-hidden="true"
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute inset-0 m-auto scale-50 text-[var(--color-brand)] opacity-0 transition-all peer-checked:scale-100 peer-checked:opacity-100"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <span>
        {label}{' '}
        <Link
          href={policyHref}
          target="_blank"
          rel="noopener"
          onClick={(e) => e.stopPropagation()}
          className={`underline underline-offset-2 ${linkColor} hover:opacity-80`}
        >
          {linkLabel}
        </Link>
        .
      </span>
    </label>
  )
}
