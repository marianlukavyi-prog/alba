type Props = {
  className?: string
  size?: number
}

export function MenuIcon({ className, size = 18 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 4.5h12M3 9h12M3 13.5h12" />
    </svg>
  )
}
