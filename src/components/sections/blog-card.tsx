import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { EyeIcon } from '@/components/icons/eye'
import type { BlogPost } from '@/data/blog'
import type { Locale } from '@/i18n/config'

type Props = {
  post: BlogPost
  locale: Locale
  href: string
  detailsLabel: string
}

export function BlogCard({ post, locale, href, detailsLabel }: Props) {
  return (
    <article className="flex h-full flex-col rounded-[2px] bg-[var(--color-surface)]">
      <div className="relative h-[200px] w-full shrink-0 overflow-hidden rounded-t-[2px]">
        <Image
          src={post.cover}
          alt={post.title[locale]}
          fill
          sizes="(min-width: 1024px) 273px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-[22px]">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[20px] font-semibold text-black">{post.title[locale]}</h3>
          <p className="text-[15px] text-[#393939]">{post.excerpt[locale]}</p>
        </div>
        <ul className="flex flex-wrap items-center gap-2.5 text-[13px] font-medium text-[#5f5f5f]">
          {post.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="flex items-center justify-between gap-3 text-[#5f5f5f]">
          <div className="flex flex-col">
            <p className="text-[15px] font-medium">{post.author}</p>
            <p className="text-[14px]">{formatDate(post.publishedAt)}</p>
          </div>
          <div className="flex items-center gap-2 text-[14px] font-medium">
            <EyeIcon size={20} />
            <span>{post.views}</span>
          </div>
        </div>
        <Link
          href={href}
          className="mt-1 inline-flex items-center gap-2.5 self-start text-[15px] font-medium tracking-[0.3px] text-[var(--color-cta)] transition-opacity hover:opacity-80"
        >
          {detailsLabel}
          <ArrowUpRightIcon />
        </Link>
      </div>
    </article>
  )
}

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-')
  return `${day}.${month}.${year}`
}
