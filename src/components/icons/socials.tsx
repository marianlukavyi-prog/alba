type Props = { className?: string; size?: number }

export function InstagramIcon({ className, size = 28 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="4" y="4" width="20" height="20" rx="5" />
      <circle cx="14" cy="14" r="4.5" />
      <circle cx="20" cy="8" r="0.9" fill="currentColor" />
    </svg>
  )
}

export function TikTokIcon({ className, size = 28 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.5 4.5c.4 1.9 1.6 3.4 3.4 3.9v3.2c-1.7-.1-3.2-.6-4.5-1.6v6.6c0 4-2.7 6.4-6.2 6.4-3.4 0-6.2-2.5-6.2-5.9 0-3.5 2.7-6.1 6.4-6.1.3 0 .6 0 .9.1v3.4c-.3-.1-.6-.1-.9-.1-1.7 0-3 1.3-3 2.9 0 1.7 1.3 2.9 3 2.9 1.6 0 3-1.1 3-3V4.5h4.1z" />
    </svg>
  )
}

export function WhatsAppIcon({ className, size = 28 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M14 3.5c-5.8 0-10.5 4.7-10.5 10.5 0 1.9.5 3.7 1.4 5.3L3.5 24.5l5.4-1.4c1.5.8 3.3 1.3 5.1 1.3 5.8 0 10.5-4.7 10.5-10.5S19.8 3.5 14 3.5zm5.7 14.7c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.5-1.2-2.9 0-1.4.7-2.1 1-2.4.2-.3.5-.3.7-.3h.5c.2 0 .4-.1.6.5.2.6.7 2.1.8 2.2.1.1.1.3 0 .5-.1.2-.2.3-.4.4-.1.2-.3.4-.4.5-.1.1-.3.3-.1.6.2.4.7 1.3 1.6 2 1.1.9 2 1.2 2.3 1.4.3.1.5.1.7-.1.2-.2.8-.9 1-1.3.2-.3.4-.3.7-.2.3.1 1.8.9 2.1 1 .3.2.5.2.6.4.1.2.1.7-.1 1.4z" />
    </svg>
  )
}
