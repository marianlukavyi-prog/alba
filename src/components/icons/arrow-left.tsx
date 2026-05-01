type Props = {
  className?: string
  size?: number
}

export function ArrowLeftIcon({ className, size = 15 }: Props) {
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
      <path d="M12.5 7.5h-10M6.25 3.75 2.5 7.5l3.75 3.75" />
    </svg>
  )
}
