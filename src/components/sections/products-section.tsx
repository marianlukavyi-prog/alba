import Link from 'next/link'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { ProductCard } from '@/components/sections/product-card'
import { ProductsCarousel } from '@/components/sections/products-carousel'
import type { Product, ProductCategory, SpecKey } from '@/data/products'

type Props = {
  category: ProductCategory
  title: string
  viewAllLabel: string
  viewAllHref: string
  prevLabel: string
  nextLabel: string
  products: Product[]
  ctaLabelFor: (product: Product) => string
  productHrefFor: (product: Product) => string
  specLabels: Record<SpecKey, string>
}

export function ProductsSection({
  category,
  title,
  viewAllLabel,
  viewAllHref,
  prevLabel,
  nextLabel,
  products,
  ctaLabelFor,
  productHrefFor,
  specLabels,
}: Props) {
  return (
    <section
      id={`products-${category}`}
      className="mx-auto w-full max-w-[1150px] scroll-mt-24 px-6 py-10 lg:py-12"
    >
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-[28px] font-semibold text-[var(--color-brand)]">{title}</h2>
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-2.5 border-b border-[var(--color-cta)] pb-4 text-[15px] font-medium tracking-[0.3px] text-[var(--color-brand)] transition-opacity hover:opacity-70"
        >
          {viewAllLabel}
          <ArrowUpRightIcon />
        </Link>
      </header>

      <div className="mt-9">
        <ProductsCarousel prevLabel={prevLabel} nextLabel={nextLabel}>
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              href={productHrefFor(product)}
              ctaLabel={ctaLabelFor(product)}
              specLabels={specLabels}
            />
          ))}
        </ProductsCarousel>
      </div>
    </section>
  )
}
