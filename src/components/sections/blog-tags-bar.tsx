import Link from 'next/link'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { BLOG_TAGS, type BlogTag } from '@/data/blog'

type Props = {
  sortLabel: string
  activeTag?: BlogTag
  hrefForTag: (tag?: BlogTag) => string
  loadMoreLabel: string
}

const PILL_BASE =
  'inline-flex h-[58px] shrink-0 items-center gap-1.5 rounded-[2px] px-6 text-[15px] font-medium tracking-[0.3px] transition-colors'

export function BlogTagsBar({ sortLabel, activeTag, hrefForTag, loadMoreLabel }: Props) {
  return (
    <nav aria-label="Blog tags" className="flex items-center gap-2.5 overflow-x-auto">
      <Link
        href={hrefForTag(undefined)}
        className={`${PILL_BASE} bg-[var(--color-cta)] text-white hover:bg-[var(--color-brand)]`}
      >
        {sortLabel}
        <ArrowUpRightIcon />
      </Link>
      {BLOG_TAGS.map((tag) => {
        const isActive = activeTag === tag
        return (
          <Link
            key={tag}
            href={hrefForTag(tag)}
            className={`${PILL_BASE} text-[var(--color-brand)] ${
              isActive
                ? 'bg-[#f4f4f4] border border-[#f4f4f4]'
                : 'border border-[#f4f4f4] hover:bg-[var(--color-surface)] hover:border-[var(--color-surface)]'
            }`}
          >
            {tag}
            <ArrowUpRightIcon />
          </Link>
        )
      })}
      <button
        type="button"
        aria-label={loadMoreLabel}
        className="inline-flex size-[50px] shrink-0 items-center justify-center rounded-full border-[0.5px] border-black text-black transition-colors hover:bg-black hover:text-white"
      >
        <ArrowUpRightIcon size={15} />
      </button>
    </nav>
  )
}
