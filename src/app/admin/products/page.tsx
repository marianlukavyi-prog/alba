import Image from 'next/image'
import Link from 'next/link'
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-[var(--color-brand)]">Products</h1>
          <p className="text-[14px] text-[var(--color-brand-soft)]">{PRODUCTS.length} total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-[14px] font-medium text-[var(--color-brand)] hover:bg-[#e6b801]"
        >
          + Add product
        </Link>
      </div>

      <div className="overflow-hidden rounded-[4px] border border-[#e3e3e3] bg-white">
        <table className="w-full text-[14px]">
          <thead className="border-b border-[#e3e3e3] bg-[#fafafa] text-left text-[12px] uppercase tracking-wide text-[var(--color-brand-soft)]">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name / Slug</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Subcategory</th>
              <th className="px-4 py-3">Family</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p) => (
              <tr
                key={p.slug}
                className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#fafafa]"
              >
                <td className="px-4 py-3">
                  <div className="relative h-12 w-16 overflow-hidden rounded-[2px] bg-[var(--color-surface)]">
                    <Image
                      src={p.image.src}
                      alt={p.name}
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-[var(--color-brand)]">{p.name}</div>
                  <div className="text-[12px] text-[var(--color-brand-soft)]">{p.slug}</div>
                </td>
                <td className="px-4 py-3 text-[var(--color-brand-soft)]">{p.category}</td>
                <td className="px-4 py-3 text-[var(--color-brand-soft)]">{p.subcategory}</td>
                <td className="px-4 py-3 text-[var(--color-brand-soft)]">{p.family ?? '—'}</td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-3">
                    <Link
                      href={`/admin/products/${p.slug}/edit`}
                      className="text-[var(--color-brand)] hover:underline"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/uk/products/${p.category}/${p.slug}`}
                      target="_blank"
                      className="text-[var(--color-brand-soft)] hover:underline"
                    >
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
