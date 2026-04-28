type Props = {
  className?: string
  size?: number
}

export function XIcon({ className, size = 15 }: Props) {
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
      <path d="m4.5 4.5 9 9M13.5 4.5l-9 9" />
    </svg>
  )
}
