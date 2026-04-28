import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import type { Project } from '@/data/projects'

type Props = {
  project: Project
  href: string
  detailsLabel: string
}

export function ProjectCard({ project, href, detailsLabel }: Props) {
  return (
    <article className="flex h-full flex-col">
      <Link href={href} className="group relative block h-[300px] w-full overflow-hidden rounded-[2px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 377px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between gap-3 pt-[22px]">
        <h3 className="text-[20px] font-semibold text-black">{project.title}</h3>
        <Link
          href={href}
          className="inline-flex items-center gap-2.5 self-start text-[15px] font-medium tracking-[0.3px] text-[var(--color-cta)] transition-opacity hover:opacity-80"
        >
          {detailsLabel}
          <ArrowUpRightIcon />
        </Link>
      </div>
    </article>
  )
}
