import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { PROJECTS } from '@/data/projects'

type Props = {
  title: string
  viewAllLabel: string
  viewAllHref: string
}

const HOUSE_MODERN = '/figma/projects/project-house-modern.png'
const PIVOT_DOOR = '/figma/projects/project-pivot-door.png'
const HOUSE_OVERHANG = '/figma/projects/project-house-overhang.png'

const BENTO_IMAGES = [
  HOUSE_MODERN,
  PIVOT_DOOR,
  HOUSE_OVERHANG,
  HOUSE_OVERHANG,
  HOUSE_MODERN,
  PIVOT_DOOR,
] as const

export function ProjectsBento({ title, viewAllLabel, viewAllHref }: Props) {
  const items = PROJECTS.slice(0, 6)
  const [a, b, c, d, e, f] = items

  return (
    <section className="bg-[var(--color-surface)]">
      <div className="mx-auto w-full max-w-[1150px] px-6 py-16 lg:px-0 lg:py-[90px]">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-[28px] font-semibold text-[var(--color-brand)]">{title}</h2>
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2.5 border-b border-[var(--color-cta)] pb-4 text-[15px] font-medium tracking-[0.3px] text-[var(--color-brand)] transition-opacity hover:opacity-80"
          >
            {viewAllLabel}
            <ArrowUpRightIcon />
          </Link>
        </header>

        <div className="mt-9 grid grid-cols-1 gap-2.5 sm:grid-cols-12">
          {a ? (
            <BentoTile
              project={a}
              image={BENTO_IMAGES[0]}
              className="aspect-[572/300] sm:col-span-6"
            />
          ) : null}
          {b ? (
            <BentoTile
              project={b}
              image={BENTO_IMAGES[1]}
              className="aspect-[278/300] sm:col-span-3"
            />
          ) : null}
          {c ? (
            <BentoTile
              project={c}
              image={BENTO_IMAGES[2]}
              className="aspect-[280/300] sm:col-span-3"
            />
          ) : null}
          {d ? (
            <BentoTile
              project={d}
              image={BENTO_IMAGES[3]}
              className="aspect-[281/300] sm:col-span-3"
            />
          ) : null}
          {e ? (
            <BentoTile
              project={e}
              image={BENTO_IMAGES[4]}
              className="aspect-[568/300] sm:col-span-6"
            />
          ) : null}
          {f ? (
            <BentoTile
              project={f}
              image={BENTO_IMAGES[5]}
              className="aspect-[281/300] sm:col-span-3"
            />
          ) : null}
        </div>
      </div>
    </section>
  )
}

function BentoTile({
  project,
  image,
  className,
}: {
  project: { slug: string; title: string }
  image: string
  className: string
}) {
  return (
    <Link
      href="#"
      aria-label={project.title}
      className={`group relative block overflow-hidden rounded-[2px] ${className}`}
    >
      <Image
        src={image}
        alt={project.title}
        fill
        sizes="(min-width: 1024px) 570px, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </Link>
  )
}
