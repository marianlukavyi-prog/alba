import Image from 'next/image'
import Link from 'next/link'
import { RoundArrowButton } from '@/components/ui/round-arrow-button'

export type SolutionItem = {
  title: string
  subtitle: string
  href: string
  image: { src: string; alt: string }
}

type Props = {
  title: string
  description: string
  items: SolutionItem[]
}

export function SolutionsGrid({ title, description, items }: Props) {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-[1150px] flex-col gap-9 px-6 py-[90px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-[28px] font-semibold text-[var(--color-brand)]">{title}</h2>
          <p className="text-[15px] text-[var(--color-brand-soft)]">{description}</p>
        </div>

        <div className="flex flex-col gap-[10px]">
          <ul className="grid grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-3">
            {items.slice(0, 3).map((item) => (
              <li key={item.title}>
                <SolutionCard item={item} />
              </li>
            ))}
          </ul>
          {items.length > 3 ? (
            <ul className="grid grid-cols-1 gap-[10px] sm:grid-cols-2">
              {items.slice(3).map((item) => (
                <li key={item.title}>
                  <SolutionCard item={item} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function SolutionCard({ item }: { item: SolutionItem }) {
  return (
    <Link
      href={item.href}
      className="group relative flex h-[225px] flex-col justify-between overflow-hidden rounded-[2px] bg-[var(--color-surface)] p-[22px]"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[55%] overflow-hidden">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(min-width: 1024px) 210px, (min-width: 640px) 28vw, 55vw"
          className="object-cover object-left transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <RoundArrowButton className="relative" />

      <div className="relative flex max-w-[45%] flex-col gap-1.5">
        <p className="text-[20px] leading-tight font-semibold text-[var(--color-brand)]">
          {item.title}
        </p>
        <p className="text-[15px] text-[var(--color-brand-soft)]">{item.subtitle}</p>
      </div>
    </Link>
  )
}
