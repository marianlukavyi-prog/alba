import Link from 'next/link'
import { ProductsTable } from '@/components/admin/products-table'
import { PRODUCTS } from '@/data/products'

export const dynamic = 'force-dynamic'

export default function AdminProductsPage() {
  const sorted = [...PRODUCTS].sort((a, b) => {
    const cat = a.category.localeCompare(b.category)
    if (cat !== 0) return cat
    const sub = a.subcategory.localeCompare(b.subcategory)
    if (sub !== 0) return sub
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-semibold text-[var(--color-brand)]">Товари</h1>
          <p className="text-[14px] text-[var(--color-brand-soft)]">Всього: {PRODUCTS.length}</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-[14px] font-semibold text-[var(--color-brand)] shadow-sm transition-colors hover:bg-[#e6b801]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Додати товар
        </Link>
      </div>

      <ProductsTable products={sorted} />
    </div>
  )
}
