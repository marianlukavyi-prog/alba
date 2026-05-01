type Props = {
  className?: string
  size?: number
}

export function ArrowRightIcon({ className, size = 15 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M2.5 7.5h10M8.75 3.75 12.5 7.5l-3.75 3.75" />
    </svg>
  )
}
