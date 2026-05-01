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
      className="mx-auto w-full max-w-[1150px] scroll-mt-24 px-4 py-10 md:px-6 lg:py-12"
    >
      <header className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-[22px] leading-tight font-semibold text-[var(--color-brand)] md:text-[28px]">
          {title}
        </h2>
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-2.5 border-b border-[var(--color-cta)] pb-2 text-[14px] font-medium tracking-[0.28px] text-[var(--color-brand)] transition-opacity hover:opacity-70 md:pb-4 md:text-[15px] md:tracking-[0.3px]"
        >
          {viewAllLabel}
          <ArrowUpRightIcon size={15} />
        </Link>
      </header>

      <div className="mt-5 md:mt-9">
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
