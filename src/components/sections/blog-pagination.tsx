import Link from 'next/link'
import { ChevronLeftIcon } from '@/components/icons/chevron-left'
import { ChevronRightIcon } from '@/components/icons/chevron-right'

type Props = {
  currentPage: number
  totalPages: number
  hrefForPage: (page: number) => string
  prevLabel: string
  nextLabel: string
}

const BUTTON_BASE =
  'inline-flex size-10 items-center justify-center rounded-[2px] text-[15px] font-semibold transition-colors'

export function BlogPagination({ currentPage, totalPages, hrefForPage, prevLabel, nextLabel }: Props) {
  const pages = buildPageList(currentPage, totalPages)
  const prevPage = Math.max(1, currentPage - 1)
  const nextPage = Math.min(totalPages, currentPage + 1)
  const isFirst = currentPage === 1
  const isLast = currentPage === totalPages

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5">
      <Link
        href={hrefForPage(prevPage)}
        aria-label={prevLabel}
        aria-disabled={isFirst}
        className={`${BUTTON_BASE} text-black hover:bg-[var(--color-surface)] ${
          isFirst ? 'pointer-events-none opacity-40' : ''
        }`}
      >
        <ChevronLeftIcon />
      </Link>

      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`gap-${i}`} className={`${BUTTON_BASE} text-black`}>
            …
          </span>
        ) : (
          <Link
            key={p}
            href={hrefForPage(p)}
            aria-current={p === currentPage ? 'page' : undefined}
            className={`${BUTTON_BASE} ${
              p === currentPage
                ? 'bg-[var(--color-cta)] text-white'
                : 'text-black hover:bg-[var(--color-surface)]'
            }`}
          >
            {p.toString().padStart(2, '0')}
          </Link>
        ),
      )}

      <Link
        href={hrefForPage(nextPage)}
        aria-label={nextLabel}
        aria-disabled={isLast}
        className={`${BUTTON_BASE} bg-[#f4f4f4] text-black hover:bg-[var(--color-surface)] ${
          isLast ? 'pointer-events-none opacity-40' : ''
        }`}
      >
        <ChevronRightIcon />
      </Link>
    </nav>
  )
}

function buildPageList(current: number, total: number): Array<number | 'ellipsis'> {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
  const result: Array<number | 'ellipsis'> = []
  result.push(1)
  if (current > 3) result.push('ellipsis')
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) result.push(i)
  if (current < total - 2) result.push('ellipsis')
  result.push(total)
  return result
}
