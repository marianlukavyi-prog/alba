import Link from 'next/link'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { ProductCard } from '@/components/sections/product-card'
import {
  PRODUCT_SUBCATEGORIES,
  type Product,
  type ProductSubcategory,
  type SpecKey,
} from '@/data/products'

type Props = {
  products: Product[]
  basePath: string
  productHrefFor: (p: Product) => string
  ctaLabelFor: (p: Product) => string
  specLabels: Record<SpecKey, string>
  allLabel: string
  subcategoryLabels: Record<ProductSubcategory, string>
  activeSub: ProductSubcategory | null
  page: number
  pageSize: number
  prevLabel: string
  nextLabel: string
}

const TAB_BASE =
  'inline-flex h-[58px] shrink-0 items-center justify-center gap-1.5 rounded-[2px] px-6 text-[15px] font-medium tracking-[0.3px] whitespace-nowrap text-[var(--color-brand)] transition-colors'
const ACTIVE = 'bg-[var(--color-accent)] hover:bg-[#e6b801]'
const INACTIVE =
  'border border-[#f4f4f4] bg-white hover:border-[var(--color-surface)] hover:bg-[var(--color-surface)]'

const buildHref = (basePath: string, sub: ProductSubcategory | null, page: number) => {
  const params = new URLSearchParams()
  if (sub) params.set('sub', sub)
  if (page > 1) params.set('page', String(page))
  const qs = params.toString()
  return qs ? `${basePath}?${qs}` : basePath
}

export function CategorySubFilter({
  products,
  basePath,
  productHrefFor,
  ctaLabelFor,
  specLabels,
  allLabel,
  subcategoryLabels,
  activeSub,
  page,
  pageSize,
  prevLabel,
  nextLabel,
}: Props) {
  const presentSubs = new Set(products.map((p) => p.subcategory))
  const subcategories = PRODUCT_SUBCATEGORIES.filter((s) => presentSubs.has(s))

  const filtered = activeSub ? products.filter((p) => p.subcategory === activeSub) : products
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(Math.max(1, page), totalPages)
  const start = (currentPage - 1) * pageSize
  const pageItems = filtered.slice(start, start + pageSize)

  return (
    <>
      {subcategories.length > 1 ? (
        <nav aria-label="Subcategories" className="mb-6 lg:mb-8">
          <ul className="flex flex-wrap items-center gap-2.5">
            <li>
              <Link
                href={buildHref(basePath, null, 1)}
                aria-current={activeSub === null}
                className={`${TAB_BASE} ${activeSub === null ? ACTIVE : INACTIVE}`}
              >
                {allLabel}
                <ArrowUpRightIcon size={15} />
              </Link>
            </li>
            {subcategories.map((sub) => (
              <li key={sub}>
                <Link
                  href={buildHref(basePath, sub, 1)}
                  aria-current={activeSub === sub}
                  className={`${TAB_BASE} ${activeSub === sub ? ACTIVE : INACTIVE}`}
                >
                  {subcategoryLabels[sub]}
                  <ArrowUpRightIcon size={15} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      <ul className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
        {pageItems.map((product) => (
          <li key={product.slug}>
            <ProductCard
              product={product}
              href={productHrefFor(product)}
              ctaLabel={ctaLabelFor(product)}
              specLabels={specLabels}
            />
          </li>
        ))}
      </ul>

      {totalPages > 1 ? (
        <Pagination
          basePath={basePath}
          activeSub={activeSub}
          currentPage={currentPage}
          totalPages={totalPages}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
        />
      ) : null}
    </>
  )
}

type PaginationProps = {
  basePath: string
  activeSub: ProductSubcategory | null
  currentPage: number
  totalPages: number
  prevLabel: string
  nextLabel: string
}

function Pagination({
  basePath,
  activeSub,
  currentPage,
  totalPages,
  prevLabel,
  nextLabel,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const baseBtn =
    'inline-flex size-[46px] items-center justify-center rounded-full border-[0.5px] border-[var(--color-brand)] text-[15px] font-medium text-[var(--color-brand)] transition-colors hover:bg-[var(--color-brand)] hover:text-white md:size-[50px]'
  const activeBtn =
    'inline-flex size-[46px] items-center justify-center rounded-full bg-[var(--color-accent)] text-[15px] font-medium text-[var(--color-brand)] md:size-[50px]'
  const disabledBtn =
    'inline-flex size-[46px] items-center justify-center rounded-full border-[0.5px] border-[#dcdcdc] text-[15px] font-medium text-[#a5aeb7] md:size-[50px]'

  const prevHref = currentPage > 1 ? buildHref(basePath, activeSub, currentPage - 1) : null
  const nextHref = currentPage < totalPages ? buildHref(basePath, activeSub, currentPage + 1) : null

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-2 lg:mt-12"
    >
      {prevHref ? (
        <Link href={prevHref} aria-label={prevLabel} className={baseBtn} rel="prev">
          ‹
        </Link>
      ) : (
        <span aria-disabled className={disabledBtn}>
          ‹
        </span>
      )}
      {pages.map((p) =>
        p === currentPage ? (
          <span key={p} aria-current="page" className={activeBtn}>
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(basePath, activeSub, p)}
            aria-label={`Page ${p}`}
            className={baseBtn}
          >
            {p}
          </Link>
        ),
      )}
      {nextHref ? (
        <Link href={nextHref} aria-label={nextLabel} className={baseBtn} rel="next">
          ›
        </Link>
      ) : (
        <span aria-disabled className={disabledBtn}>
          ›
        </span>
      )}
    </nav>
  )
}
