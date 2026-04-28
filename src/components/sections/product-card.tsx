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
    <article className="flex h-full overflow-hidden rounded-[2px] bg-[var(--color-surface)]">
      <div className="flex flex-1 min-w-0 flex-col justify-between gap-[18px] p-[30px]">
        <div className="flex flex-col gap-[18px]">
          <h3 className="text-[20px] font-semibold text-[var(--color-brand)]">{product.name}</h3>
          <dl className="flex flex-col gap-2 text-[15px] text-[var(--color-brand-soft)]">
            {product.specs.map((spec) => (
              <div key={spec.key} className="flex items-start justify-between gap-3">
                <dt className="font-normal">{specLabels[spec.key]}:</dt>
                <dd className="text-right font-semibold">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <RoundArrowButton href={href} ariaLabel={ctaLabel} />
      </div>
      <div className="relative flex-1 min-w-0 self-stretch">
        <Image
          src={product.image.src}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 285px, 50vw"
          className="object-cover"
        />
      </div>
    </article>
  )
}
