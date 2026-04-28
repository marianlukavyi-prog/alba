type Props = {
  className?: string
  size?: number
}

export function ArrowUpRightIcon({ className, size = 18 }: Props) {
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
      <path d="M5.25 5.25h7.5v7.5M12.75 5.25 5.25 12.75" />
    </svg>
  )
}
