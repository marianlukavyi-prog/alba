import Link from 'next/link'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { PRODUCT_CATEGORIES, type ProductCategory } from '@/data/products'

type Props = {
  allLabel: string
  categoryLabels: Record<ProductCategory, string>
}

const TAB_BASE =
  'inline-flex h-[58px] shrink-0 items-center justify-center gap-1.5 rounded-[2px] px-6 text-[15px] font-medium tracking-[0.3px] transition-colors'

export function ProductTabs({ allLabel, categoryLabels }: Props) {
  return (
    <nav aria-label="Product categories" className="overflow-x-auto">
      <ul className="flex min-w-max items-center gap-2.5">
        <li>
          <Link
            href="#products-top"
            className={`${TAB_BASE} bg-[var(--color-cta)] text-white hover:bg-[var(--color-brand)]`}
          >
            {allLabel}
            <ArrowUpRightIcon />
          </Link>
        </li>
        {PRODUCT_CATEGORIES.map((cat) => (
          <li key={cat}>
            <Link
              href={`#products-${cat}`}
              className={`${TAB_BASE} border border-[#f4f4f4] text-[var(--color-brand)] hover:bg-[var(--color-surface)] hover:border-[var(--color-surface)]`}
            >
              {categoryLabels[cat]}
              <ArrowUpRightIcon />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
