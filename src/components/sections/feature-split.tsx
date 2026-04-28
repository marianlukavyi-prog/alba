import Image from 'next/image'
import { RoundArrowButton } from '@/components/ui/round-arrow-button'

type Props = {
  title: string
  description: string
  href: string
  ctaLabel: string
  image: { src: string; alt: string }
  reverse?: boolean
}

export function FeatureSplit({ title, description, href, ctaLabel, image, reverse }: Props) {
  return (
    <section className="bg-[var(--color-surface)]">
      <div
        className={`mx-auto flex max-w-[1150px] flex-col lg:min-h-[314px] lg:flex-row lg:items-center ${
          reverse ? 'lg:flex-row' : 'lg:flex-row-reverse'
        }`}
      >
        <div className="relative aspect-[570/314] w-full shrink-0 lg:h-[314px] lg:w-[570px]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 570px, 100vw"
            className="object-cover"
          />
        </div>

        <div
          className={`flex flex-1 items-center gap-[22px] px-6 py-8 lg:py-[22px] ${
            reverse ? 'lg:flex-row-reverse lg:pl-[100px] lg:text-right' : 'lg:pr-[100px]'
          }`}
        >
          <div className="flex flex-1 flex-col gap-3">
            <h2 className="text-[20px] font-semibold text-[var(--color-brand)]">{title}</h2>
            <p className="text-[15px] text-[var(--color-brand-soft)]">{description}</p>
          </div>
          <RoundArrowButton href={href} ariaLabel={ctaLabel} />
        </div>
      </div>
    </section>
  )
}
