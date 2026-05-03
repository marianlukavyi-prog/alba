import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRightIcon } from '@/components/icons/arrow-right'
import { Banner } from '@/components/layout/banner'
import { Header } from '@/components/layout/header'
import { BlogCard } from '@/components/sections/blog-card'
import { BlogPagination } from '@/components/sections/blog-pagination'
import { BlogSidebar } from '@/components/sections/blog-sidebar'
import { BlogTagsBar } from '@/components/sections/blog-tags-bar'
import { sanityFetch } from '@/sanity/client'
import {
  LATEST_POSTS_QUERY,
  POPULAR_POSTS_QUERY,
  POSTS_BY_TAG_QUERY,
  POSTS_LIST_QUERY,
  POSTS_SEARCH_QUERY,
  TAGS_QUERY,
} from '@/sanity/queries'
import type {
  SanityLatestPost,
  SanityPopularPost,
  SanityPostCard,
  SanityTag,
} from '@/sanity/types'
import { defaultLocale, hasLocale, locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'

const POSTS_PER_PAGE = 9

const localePath = (locale: Locale, path = '') =>
  locale === defaultLocale ? path || '/' : `/${locale}${path}`

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/blog'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)
  const t = dict.blogPage

  const languages: Record<string, string> = {}
  for (const locale of locales) languages[locale] = localePath(locale, '/blog')

  return {
    title: t.heroTitle,
    description: t.heroSubtitle,
    alternates: {
      canonical: localePath(lang, '/blog'),
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: 'Alba Ventanas',
      title: t.heroTitle,
      description: t.heroSubtitle,
      url: localePath(lang, '/blog'),
      images: ['/figma/banner-hero.webp'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.heroTitle,
      description: t.heroSubtitle,
      images: ['/figma/banner-hero.webp'],
    },
  }
}

export default async function BlogPage({
  params,
  searchParams,
}: PageProps<'/[lang]/blog'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const sp = await searchParams
  const tagParam = typeof sp?.tag === 'string' ? sp.tag : undefined
  const queryParam = typeof sp?.q === 'string' ? sp.q.trim() : ''
  const dict = await getDictionary(lang)
  const t = dict.blogPage

  let postsFetch: Promise<SanityPostCard[]>
  if (queryParam) {
    postsFetch = sanityFetch<SanityPostCard[]>({
      query: POSTS_SEARCH_QUERY,
      params: { lang, q: `${queryParam}*` } as Record<string, string>,
      tags: ['posts'],
    })
  } else if (tagParam) {
    postsFetch = sanityFetch<SanityPostCard[]>({
      query: POSTS_BY_TAG_QUERY,
      params: { lang, tag: tagParam } as Record<string, string>,
      tags: ['posts'],
    })
  } else {
    postsFetch = sanityFetch<SanityPostCard[]>({
      query: POSTS_LIST_QUERY,
      params: { lang },
      tags: ['posts'],
    })
  }

  const [posts, popularPosts, latestPosts, tags] = await Promise.all([
    postsFetch,
    sanityFetch<SanityPopularPost[]>({
      query: POPULAR_POSTS_QUERY,
      params: { lang },
      tags: ['posts'],
    }),
    sanityFetch<SanityLatestPost[]>({
      query: LATEST_POSTS_QUERY,
      params: { lang },
      tags: ['posts'],
    }),
    sanityFetch<SanityTag[]>({
      query: TAGS_QUERY,
      tags: ['tags'],
    }),
  ])

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE))
  const currentPage = 1
  const start = (currentPage - 1) * POSTS_PER_PAGE
  const visiblePosts = posts.slice(start, start + POSTS_PER_PAGE)

  return (
    <>
      <Header lang={lang} dict={dict} position="fixed" />
      <main className="flex flex-1 flex-col">
        <Banner
          title={t.heroTitle}
          subtitle={t.heroSubtitle}
          cta={{ label: dict.common.consult }}
          breadcrumb={[
            { label: t.breadcrumbHome, href: localePath(lang) },
            { label: t.breadcrumbCurrent },
          ]}
        />

        <section className="bg-white py-10 md:py-[60px] lg:py-20">
          <div className="mx-auto grid max-w-[1150px] grid-cols-1 gap-[22px] px-4 md:gap-10 md:px-6 lg:grid-cols-[minmax(0,1fr)_223px] lg:gap-[60px]">
            <div className="flex flex-col gap-[22px] md:gap-10">
              <form
                action={localePath(lang, '/blog')}
                method="get"
                className="flex items-center justify-between gap-3 border-b border-[var(--color-brand)] pb-4 lg:hidden"
              >
                <input
                  type="search"
                  name="q"
                  defaultValue={queryParam}
                  placeholder={t.search}
                  aria-label={t.search}
                  className="flex-1 bg-transparent text-[14px] text-[var(--color-brand)] placeholder:text-[#aaa] focus:outline-none md:text-[15px]"
                />
                <button
                  type="submit"
                  aria-label={t.search}
                  className="text-[var(--color-brand)] transition-opacity hover:opacity-70"
                >
                  <ArrowRightIcon size={15} />
                </button>
              </form>

              <BlogTagsBar
                sortLabel={t.sortByTags}
                activeTag={tagParam}
                baseHref={localePath(lang, '/blog')}
                loadMoreLabel={t.loadMore}
                tags={tags}
              />

              {visiblePosts.length === 0 ? (
                <p className="text-[15px] text-[var(--color-brand-soft)]">
                  {queryParam
                    ? `${t.search}: «${queryParam}» — 0`
                    : tagParam
                      ? `${t.sortByTags}: 0`
                      : dict.blogPage.heroSubtitle}
                </p>
              ) : (
                <ul className="grid grid-cols-1 gap-[10px] sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
                  {visiblePosts.map((post) => (
                    <li key={post._id}>
                      <BlogCard
                        post={post}
                        href={localePath(lang, `/blog/${post.slug}`)}
                        detailsLabel={dict.common.moreDetails}
                      />
                    </li>
                  ))}
                </ul>
              )}

              {totalPages > 1 ? (
                <BlogPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  prevLabel={t.prev}
                  nextLabel={t.next}
                  hrefForPage={(p) =>
                    p === 1 ? localePath(lang, '/blog') : localePath(lang, `/blog?page=${p}`)
                  }
                />
              ) : null}
            </div>

            <div className="hidden lg:block">
              <BlogSidebar
                searchLabel={t.search}
                searchPlaceholder={t.search}
                searchAction={localePath(lang, '/blog')}
                searchInitialValue={queryParam}
                popularTitle={t.popularTitle}
                latestTitle={t.latestTitle}
                popularPosts={popularPosts}
                latestPosts={latestPosts}
                hrefForPost={(slug) => localePath(lang, `/blog/${slug}`)}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
