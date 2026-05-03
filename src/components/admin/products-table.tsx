'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  CATEGORY_LABELS,
  FAMILY_LABELS,
  SUBCATEGORY_LABELS,
} from '@/components/admin/product-labels'
import { PRODUCT_CATEGORIES, type Product, type ProductCategory } from '@/data/products-types'

type Props = {
  products: Product[]
}

export function ProductsTable({ products }: Props) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ProductCategory | 'all'>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (!q) return true
      const haystack = [
        p.name,
        p.slug,
        CATEGORY_LABELS[p.category] ?? p.category,
        SUBCATEGORY_LABELS[p.subcategory] ?? p.subcategory,
        p.family ? (FAMILY_LABELS[p.family] ?? p.family) : '',
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [products, query, category])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[260px]">
          <SearchIcon />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Пошук за назвою, slug, категорією…"
            className="w-full rounded-full border border-[#dcdcdc] bg-white py-2.5 pr-10 pl-10 text-[14px] outline-none focus:border-[var(--color-brand)]"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Очистити пошук"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-[var(--color-brand-soft)] hover:text-[var(--color-brand)]"
            >
              <ClearIcon />
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <FilterChip active={category === 'all'} onClick={() => setCategory('all')}>
            Всі ({products.length})
          </FilterChip>
          {PRODUCT_CATEGORIES.map((c) => {
            const count = products.filter((p) => p.category === c).length
            if (count === 0) return null
            return (
              <FilterChip key={c} active={category === c} onClick={() => setCategory(c)}>
                {CATEGORY_LABELS[c] ?? c} ({count})
              </FilterChip>
            )
          })}
        </div>
      </div>

      <p className="text-[12px] text-[var(--color-brand-soft)]">
        Показано: {filtered.length} з {products.length}
      </p>

      <div className="overflow-hidden rounded-[4px] border border-[#e3e3e3] bg-white">
        <table className="w-full text-[14px]">
          <thead className="border-b border-[#e3e3e3] bg-[#fafafa] text-left text-[12px] tracking-wide text-[var(--color-brand-soft)] uppercase">
            <tr>
              <th className="px-4 py-3">Фото</th>
              <th className="px-4 py-3">Назва / Slug</th>
              <th className="px-4 py-3">Категорія</th>
              <th className="px-4 py-3">Підкатегорія</th>
              <th className="px-4 py-3">Родина</th>
              <th className="px-4 py-3 text-right">Дії</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-[14px] text-[var(--color-brand-soft)]"
                >
                  Нічого не знайдено
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
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
                    <div className="font-medium text-[var(--color-brand)]">
                      <Highlight text={p.name} query={query} />
                    </div>
                    <div className="text-[12px] text-[var(--color-brand-soft)]">
                      <Highlight text={p.slug} query={query} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-brand-soft)]">
                    {CATEGORY_LABELS[p.category] ?? p.category}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-brand-soft)]">
                    {SUBCATEGORY_LABELS[p.subcategory] ?? p.subcategory}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-brand-soft)]">
                    {p.family ? (FAMILY_LABELS[p.family] ?? p.family) : '—'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/admin/products/${p.slug}/edit`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#dcdcdc] bg-white px-3 py-1.5 text-[13px] font-medium text-[var(--color-brand)] transition-colors hover:border-[var(--color-brand)] hover:bg-[var(--color-surface)]"
                      >
                        <EditIcon />
                        Редагувати
                      </Link>
                      <Link
                        href={`/uk/products/${p.category}/${p.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] text-[var(--color-brand-soft)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-brand)]"
                      >
                        <ExternalIcon />
                        Переглянути
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors ${
        active
          ? 'border-[var(--color-brand)] bg-[var(--color-brand)] text-white'
          : 'border-[#dcdcdc] bg-white text-[var(--color-brand-soft)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]'
      }`}
    >
      {children}
    </button>
  )
}

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim()
  if (!q) return <>{text}</>
  const idx = text.toLowerCase().indexOf(q.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded-[2px] bg-[var(--color-accent)]/40 px-0.5 text-[var(--color-brand)]">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  )
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute top-1/2 left-3.5 -translate-y-1/2 text-[var(--color-brand-soft)]"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function ClearIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}
