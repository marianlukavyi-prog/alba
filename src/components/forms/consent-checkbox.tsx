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
  const text =
    variant === 'dark' ? 'text-[#dcdcdc]' : 'text-[var(--color-brand-soft)]'
  const linkColor =
    variant === 'dark' ? 'text-white' : 'text-[var(--color-brand)]'
  return (
    <label className={`flex items-start gap-2 text-[12px] md:text-[13px] ${text}`}>
      <input
        type="checkbox"
        name={name}
        required
        defaultChecked={false}
        className="mt-[3px] size-[14px] shrink-0 accent-[var(--color-accent)]"
      />
      <span>
        {label}
        <Link
          href={policyHref}
          target="_blank"
          rel="noopener"
          className={`underline ${linkColor} hover:opacity-80`}
        >
          {linkLabel}
        </Link>
        .
      </span>
    </label>
  )
}
