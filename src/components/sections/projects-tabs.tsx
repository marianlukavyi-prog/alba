import Link from 'next/link'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { PROJECT_CATEGORIES, type ProjectCategory } from '@/data/projects'

type Props = {
  allLabel: string
  loadMoreLabel: string
  activeCategory?: ProjectCategory
  hrefForCategory: (cat?: ProjectCategory) => string
  categoryLabels: Record<ProjectCategory, string>
}

const PILL_BASE =
  'inline-flex h-[58px] shrink-0 items-center gap-1.5 rounded-[2px] px-6 text-[15px] font-medium tracking-[0.3px] transition-colors'

export function ProjectsTabs({
  allLabel,
  loadMoreLabel,
  activeCategory,
  hrefForCategory,
  categoryLabels,
}: Props) {
  const allActive = !activeCategory
  return (
    <nav aria-label="Project categories" className="flex items-center gap-2.5 overflow-x-auto">
      <Link
        href={hrefForCategory(undefined)}
        className={`${PILL_BASE} ${
          allActive
            ? 'bg-[var(--color-cta)] text-white hover:bg-[var(--color-brand)]'
            : 'border border-[#f4f4f4] text-[var(--color-brand)] hover:bg-[var(--color-surface)] hover:border-[var(--color-surface)]'
        }`}
      >
        {allLabel}
        <ArrowUpRightIcon />
      </Link>
      {PROJECT_CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat
        return (
          <Link
            key={cat}
            href={hrefForCategory(cat)}
            className={`${PILL_BASE} ${
              isActive
                ? 'bg-[var(--color-cta)] text-white hover:bg-[var(--color-brand)]'
                : 'border border-[#f4f4f4] text-[var(--color-brand)] hover:bg-[var(--color-surface)] hover:border-[var(--color-surface)]'
            }`}
          >
            {categoryLabels[cat]}
            <ArrowUpRightIcon />
          </Link>
        )
      })}
      <button
        type="button"
        aria-label={loadMoreLabel}
        className="inline-flex size-[50px] shrink-0 items-center justify-center rounded-full border-[0.5px] border-black text-black transition-colors hover:bg-black hover:text-white"
      >
        <ArrowUpRightIcon size={15} />
      </button>
    </nav>
  )
}
