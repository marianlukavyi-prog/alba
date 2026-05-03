import Link from 'next/link'
import { ProductForm } from '@/components/admin/product-form'
import { createProduct } from '../actions'

export const dynamic = 'force-dynamic'

export default function AdminNewProductPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/admin/products"
          className="text-[14px] text-[var(--color-brand-soft)] hover:text-[var(--color-brand)]"
        >
          ← Back
        </Link>
        <h1 className="text-[24px] font-semibold text-[var(--color-brand)]">New product</h1>
      </div>
      <ProductForm onSubmit={createProduct} submitLabel="Create" />
    </div>
  )
}
