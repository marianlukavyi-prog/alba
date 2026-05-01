import Image from 'next/image'
import { RoundArrowButton } from '@/components/ui/round-arrow-button'

type Props = {
  title: string
  description: string
  href: string
  ctaLabel: string
  image: { src: string; alt: string }
  reverse?: boolean
  background?: 'surface' | 'white' | 'brand'
}

export function FeatureSplit({
  title,
  description,
  href,
  ctaLabel,
  image,
  reverse,
  background = 'surface',
}: Props) {
  const isBrand = background === 'brand'
  const sectionBg = isBrand
    ? 'bg-[var(--color-brand)]'
    : background === 'white'
      ? 'bg-white'
      : 'bg-[var(--color-surface)]'
  const titleColor = isBrand ? 'text-white' : 'text-[var(--color-brand)]'
  const descColor = isBrand ? 'text-[#dcdcdc]' : 'text-[var(--color-brand-soft)]'

  return (
    <section className={`${sectionBg} transition-colors duration-300`}>
      <div
        className={`mx-auto flex flex-col-reverse md:h-[220px] md:flex-row md:items-center lg:h-auto lg:min-h-[314px] lg:max-w-[1150px] ${
          reverse ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}
      >
        <div className="relative h-[220px] w-full shrink-0 md:h-full md:flex-1 lg:h-[314px] lg:w-[570px] lg:flex-none">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 570px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div
          className={`flex flex-1 items-center gap-[22px] px-[26px] py-10 md:py-[60px] lg:py-[22px] ${
            reverse
              ? 'md:flex-row-reverse md:text-right lg:pl-[100px]'
              : 'lg:pr-[100px]'
          }`}
        >
          <div className="flex flex-1 flex-col gap-2 lg:gap-3">
            <h2 className={`text-[18px] font-semibold lg:text-[20px] ${titleColor}`}>{title}</h2>
            <p className={`text-[14px] lg:text-[15px] ${descColor}`}>{description}</p>
          </div>
          <RoundArrowButton
            href={href}
            ariaLabel={ctaLabel}
            tone={isBrand ? 'light' : 'dark'}
            className="!size-[46px] lg:!size-[50px]"
          />
        </div>
      </div>
    </section>
  )
}
