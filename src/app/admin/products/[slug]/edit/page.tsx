import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductForm } from '@/components/admin/product-form'
import { PRODUCTS } from '@/data/products'
import { updateProduct, deleteProduct } from '../../actions'
import { DeleteButton } from './delete-button'

export const dynamic = 'force-dynamic'

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = PRODUCTS.find((p) => p.slug === slug)
  if (!product) notFound()

  const submit = async (formData: FormData) => {
    'use server'
    formData.set('originalSlug', slug)
    return updateProduct(formData)
  }

  const onDelete = async () => {
    'use server'
    return deleteProduct(slug)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/products"
            className="text-[14px] text-[var(--color-brand-soft)] hover:text-[var(--color-brand)]"
          >
            ← Назад
          </Link>
          <h1 className="text-[24px] font-semibold text-[var(--color-brand)]">
            Редагування: {product.name}
          </h1>
          <p className="text-[12px] text-[var(--color-brand-soft)]">{product.slug}</p>
        </div>
        <DeleteButton slug={slug} onDelete={onDelete} />
      </div>
      <ProductForm initial={product} onSubmit={submit} submitLabel="Зберегти" />
    </div>
  )
}
