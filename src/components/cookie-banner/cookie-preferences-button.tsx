'use client'

const OPEN_EVENT = 'alba:open-cookie-banner'

export function CookiePreferencesButton({ label, className }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_EVENT))}
      className={
        className ??
        'underline transition-opacity hover:opacity-70'
      }
    >
      {label}
    </button>
  )
}
