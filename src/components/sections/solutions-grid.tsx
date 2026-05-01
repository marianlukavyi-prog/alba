import Image from 'next/image'
import Link from 'next/link'
import { RoundArrowButton } from '@/components/ui/round-arrow-button'
import { SolutionsCarousel } from '@/components/sections/solutions-carousel'

export type SolutionItem = {
  title: string
  subtitle: string
  href: string
  image: { src: string; alt: string }
  tone?: 'light' | 'dark'
}

type Props = {
  title: string
  description: string
  items: SolutionItem[]
  slideLabel?: string
}

export function SolutionsGrid({ title, description, items, slideLabel = 'Slide' }: Props) {
  const top = items.slice(0, 3)
  const bottom = items.slice(3)

  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-[1150px] flex-col gap-[22px] px-4 py-10 md:gap-9 md:px-6 md:py-[60px] lg:py-[90px]">
        <div className="flex flex-col items-center gap-2 text-center md:gap-3">
          <h2 className="text-[22px] leading-tight font-semibold text-[var(--color-brand)] md:text-[28px]">
            {title}
          </h2>
          <p className="text-[14px] text-[var(--color-brand-soft)] md:text-[15px]">{description}</p>
        </div>

        <div className="hidden flex-col gap-[10px] lg:flex">
          <ul className="grid grid-cols-3 gap-[10px]">
            {top.map((item) => (
              <li key={item.title}>
                <SolutionCard item={item} />
              </li>
            ))}
          </ul>
          {bottom.length > 0 ? (
            <ul className="grid grid-cols-2 gap-[10px]">
              {bottom.map((item) => (
                <li key={item.title}>
                  <SolutionCard item={item} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <SolutionsCarousel slideLabel={slideLabel}>
          {items.map((item) => (
            <SolutionCard key={item.title} item={item} />
          ))}
        </SolutionsCarousel>
      </div>
    </section>
  )
}

function SolutionCard({ item }: { item: SolutionItem }) {
  const isDark = item.tone === 'dark'
  const surfaceClass = isDark ? 'bg-[var(--color-brand)]' : 'bg-[var(--color-surface)]'
  const titleClass = isDark ? 'text-white' : 'text-[var(--color-brand)]'
  const subtitleClass = isDark ? 'text-[#dcdcdc]' : 'text-[var(--color-brand-soft)]'

  return (
    <Link
      href={item.href}
      className={`group relative flex h-[200px] flex-col justify-between overflow-hidden p-[22px] lg:h-[225px] ${surfaceClass}`}
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[55%]">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
          className="object-cover object-left transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <RoundArrowButton
        tone={isDark ? 'light' : 'dark'}
        className="relative !size-[46px] md:!size-[50px]"
      />

      <div className="relative flex max-w-[55%] flex-col gap-1.5">
        <p className={`text-[18px] leading-tight font-semibold md:text-[20px] ${titleClass}`}>
          {item.title}
        </p>
        <p className={`text-[14px] md:text-[15px] ${subtitleClass}`}>{item.subtitle}</p>
      </div>
    </Link>
  )
}
