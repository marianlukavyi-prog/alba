import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import {
  BLOG_CATEGORIES,
  type BlogCategoryKey,
  type BlogPopularPost,
  type LatestPost,
} from '@/data/blog'
import type { Locale } from '@/i18n/config'

type Props = {
  locale: Locale
  searchLabel: string
  searchPlaceholder: string
  categoriesTitle: string
  popularTitle: string
  latestTitle: string
  categoryLabels: Record<BlogCategoryKey, string>
  activeCategory?: BlogCategoryKey
  popularPosts: BlogPopularPost[]
  latestPosts: LatestPost[]
  hrefForCategory: (cat: BlogCategoryKey) => string
  hrefForPost: (slug: string) => string
}

export function BlogSidebar({
  locale,
  searchLabel,
  searchPlaceholder,
  categoriesTitle,
  popularTitle,
  latestTitle,
  categoryLabels,
  activeCategory,
  popularPosts,
  latestPosts,
  hrefForCategory,
  hrefForPost,
}: Props) {
  return (
    <aside className="flex flex-col gap-7">
      <form className="flex items-center justify-between gap-3 border-b border-black pb-4" noValidate>
        <input
          type="search"
          name="q"
          placeholder={searchPlaceholder}
          aria-label={searchLabel}
          className="flex-1 bg-transparent text-[15px] font-semibold text-black placeholder:font-semibold placeholder:text-black focus:outline-none"
        />
        <button
          type="submit"
          aria-label={searchLabel}
          className="flex size-[15px] items-center justify-center text-black transition-opacity hover:opacity-70"
        >
          <ArrowUpRightIcon size={15} />
        </button>
      </form>

      <section className="flex flex-col gap-4">
        <h2 className="text-[20px] font-semibold text-black">{categoriesTitle}</h2>
        <ul className="flex flex-col gap-4">
          {BLOG_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <li key={cat}>
                <Link
                  href={hrefForCategory(cat)}
                  className={`flex w-full items-center text-[15px] transition-opacity hover:opacity-70 ${
                    isActive
                      ? 'border-b border-[var(--color-cta)] pt-2 pb-4 font-semibold text-[var(--color-cta)]'
                      : 'font-normal text-[#393939]'
                  }`}
                >
                  {categoryLabels[cat]}
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[20px] font-semibold text-black">{popularTitle}</h2>
        <ul className="flex flex-col gap-4">
          {popularPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={hrefForPost(post.slug)}
                className="group flex flex-col gap-3 rounded-[2px]"
              >
                <div className="relative h-[100px] w-full overflow-hidden rounded-[2px]">
                  <Image
                    src={post.cover}
                    alt={post.title[locale]}
                    fill
                    sizes="223px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="text-[15px] font-semibold text-black">{post.title[locale]}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[20px] font-semibold text-black">{latestTitle}</h2>
        <ul className="flex flex-col gap-4">
          {latestPosts.map((post, i) => {
            const isHighlight = i === 2
            return (
              <li key={post.slug}>
                <Link
                  href={hrefForPost(post.slug)}
                  className="flex flex-col gap-2 transition-opacity hover:opacity-70"
                >
                  <p
                    className={`text-[14px] ${
                      isHighlight ? 'font-semibold text-[var(--color-cta)]' : 'font-normal text-black'
                    }`}
                  >
                    {post.title[locale]}
                  </p>
                  <div className="flex flex-col gap-0.5 text-[11px] leading-tight text-black">
                    <p className="font-medium">{post.author}</p>
                    <p>{formatDate(post.publishedAt)}</p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </aside>
  )
}

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-')
  return `${day}.${month}.${year}`
}

