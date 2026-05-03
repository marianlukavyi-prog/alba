import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { urlFor } from '@/sanity/client'
import type { SanityLatestPost, SanityPopularPost } from '@/sanity/types'

type Props = {
  searchLabel: string
  searchPlaceholder: string
  searchAction: string
  searchInitialValue?: string
  popularTitle: string
  latestTitle: string
  popularPosts: SanityPopularPost[]
  latestPosts: SanityLatestPost[]
  hrefForPost: (slug: string) => string
}

export function BlogSidebar({
  searchLabel,
  searchPlaceholder,
  searchAction,
  searchInitialValue,
  popularTitle,
  latestTitle,
  popularPosts,
  latestPosts,
  hrefForPost,
}: Props) {
  return (
    <aside className="flex flex-col gap-7">
      <form
        action={searchAction}
        method="get"
        className="flex items-center justify-between gap-3 border-b border-black pb-4"
      >
        <input
          type="search"
          name="q"
          defaultValue={searchInitialValue}
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
        <h2 className="text-[20px] font-semibold text-black">{popularTitle}</h2>
        <ul className="flex flex-col gap-4">
          {popularPosts.map((post) => {
            const url = post.cover?.asset
              ? urlFor(post.cover as Parameters<typeof urlFor>[0]).width(446).height(200).fit('crop').url()
              : '/figma/banner-hero.webp'
            return (
              <li key={post.slug}>
                <Link
                  href={hrefForPost(post.slug)}
                  className="group flex flex-col gap-3 rounded-[2px]"
                >
                  <div className="relative h-[100px] w-full overflow-hidden rounded-[2px]">
                    <Image
                      src={url}
                      alt={post.cover?.alt ?? post.title}
                      fill
                      sizes="223px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-[15px] font-semibold text-black">{post.title}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[20px] font-semibold text-black">{latestTitle}</h2>
        <ul className="flex flex-col gap-4">
          {latestPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={hrefForPost(post.slug)}
                className="flex flex-col gap-2 transition-opacity hover:opacity-70"
              >
                <p className="text-[14px] font-normal text-black">{post.title}</p>
                <div className="flex flex-col gap-0.5 text-[11px] leading-tight text-black">
                  <p className="font-medium">{post.author}</p>
                  <p>{formatDate(post.publishedAt)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  return `${dd}.${mm}.${date.getFullYear()}`
}
