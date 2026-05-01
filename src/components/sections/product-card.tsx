import Image from 'next/image'
import { RoundArrowButton } from '@/components/ui/round-arrow-button'
import type { Product, SpecKey } from '@/data/products'

type Props = {
  product: Product
  href: string
  ctaLabel: string
  specLabels: Record<SpecKey, string>
}

export function ProductCard({ product, href, ctaLabel, specLabels }: Props) {
  return (
    <article className="group flex h-full flex-col overflow-hidden bg-[var(--color-surface)] lg:flex-row">
      <div className="relative h-[200px] w-full shrink-0 self-stretch bg-white lg:order-2 lg:h-auto lg:flex-1">
        <Image
          src={product.image.src}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 285px, (min-width: 768px) 50vw, 100vw"
          className="object-contain lg:object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-4 md:gap-[18px] md:p-[30px] lg:order-1">
        <div className="flex flex-col gap-3 md:gap-[18px]">
          <h3 className="text-[18px] leading-tight font-semibold text-[var(--color-brand)] transition-colors group-aria-current:text-[var(--color-accent)] md:text-[20px]">
            {product.name}
          </h3>
          <dl className="flex flex-col gap-2 text-[var(--color-brand-soft)]">
            {product.specs.map((spec) => (
              <div
                key={spec.key}
                className="flex flex-col gap-1.5 md:flex-row md:items-start md:justify-between md:gap-3"
              >
                <dt className="text-[12px] font-normal md:text-[15px]">
                  {specLabels[spec.key]}:
                </dt>
                <dd className="text-[14px] font-semibold md:text-right md:text-[15px]">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <RoundArrowButton
          href={href}
          ariaLabel={ctaLabel}
          className="!size-[46px] md:!size-[50px]"
        />
      </div>
    </article>
  )
}
