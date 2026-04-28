type Props = {
  className?: string
  size?: number
}

export function ChevronRightIcon({ className, size = 18 }: Props) {
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
      <path d="m6.75 4.5 4.5 4.5-4.5 4.5" />
    </svg>
  )
}
