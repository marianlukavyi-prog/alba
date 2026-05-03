import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { EyeIcon } from '@/components/icons/eye'
import { urlFor } from '@/sanity/client'
import type { SanityPostCard } from '@/sanity/types'

type Props = {
  post: SanityPostCard
  href: string
  detailsLabel: string
}

export function BlogCard({ post, href, detailsLabel }: Props) {
  const coverUrl = post.cover?.asset
    ? urlFor(post.cover as Parameters<typeof urlFor>[0]).width(560).height(400).fit('crop').url()
    : '/figma/banner-hero.webp'

  return (
    <Link
      href={href}
      aria-label={post.title}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2px] bg-[var(--color-surface)] transition-shadow hover:shadow-[0_8px_24px_rgba(8,31,72,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
    >
      <div className="relative h-[150px] w-full shrink-0 overflow-hidden rounded-[2px] md:h-[200px]">
        <Image
          src={coverUrl}
          alt={post.cover?.alt ?? post.title}
          fill
          sizes="(min-width: 1024px) 273px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="absolute top-0 right-0 z-10 flex items-center gap-1.5 bg-[var(--color-accent)] px-2 py-1.5">
        <EyeIcon size={20} className="text-[var(--color-brand)]" />
        <span className="text-[14px] leading-[1.3] font-medium text-[var(--color-brand)]">
          {post.views ?? 0}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-[22px]">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[18px] leading-tight font-semibold text-[var(--color-brand)] md:text-[20px]">
            {post.title}
          </h3>
          <p className="text-[14px] text-[var(--color-brand-soft)] md:text-[15px]">{post.excerpt}</p>
        </div>
        <ul className="flex flex-wrap items-center gap-2.5 text-[13px] leading-[1.3] font-medium text-[var(--color-brand-soft)]">
          {post.tags?.map((tag) => <li key={tag._id}>{tag.label}</li>)}
        </ul>
        <span className="mt-auto inline-flex items-center gap-2.5 self-start text-[14px] font-medium tracking-[0.28px] text-[var(--color-brand)] transition-opacity group-hover:opacity-70 md:text-[15px] md:tracking-[0.3px]">
          {detailsLabel}
          <ArrowUpRightIcon size={15} />
        </span>
      </div>
    </Link>
  )
}
