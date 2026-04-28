import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Banner } from '@/components/layout/banner'
import { Header } from '@/components/layout/header'
import { BlogCard } from '@/components/sections/blog-card'
import { BlogPagination } from '@/components/sections/blog-pagination'
import { BlogSidebar } from '@/components/sections/blog-sidebar'
import { BlogTagsBar } from '@/components/sections/blog-tags-bar'
import { BLOG_POSTS, LATEST_POSTS, POPULAR_POSTS } from '@/data/blog'
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
      title: t.heroTitle,
      description: t.heroSubtitle,
      url: localePath(lang, '/blog'),
    },
  }
}

export default async function BlogPage({ params }: PageProps<'/[lang]/blog'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const t = dict.blogPage

  const totalPages = Math.max(1, Math.ceil(BLOG_POSTS.length / POSTS_PER_PAGE))
  const currentPage = 1
  const start = (currentPage - 1) * POSTS_PER_PAGE
  const visiblePosts = BLOG_POSTS.slice(start, start + POSTS_PER_PAGE)

  return (
    <>
      <Header lang={lang} dict={dict} position="absolute" />
      <main className="flex flex-1 flex-col">
        <Banner
          title={t.heroTitle}
          subtitle={t.heroSubtitle}
          cta={{ label: dict.common.consult, href: localePath(lang, '/contact') }}
          breadcrumb={[
            { label: t.breadcrumbHome, href: localePath(lang) },
            { label: t.breadcrumbCurrent },
          ]}
        />

        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto grid max-w-[1150px] gap-10 px-6 lg:grid-cols-[1fr_223px] lg:gap-[60px]">
            <div className="flex flex-col gap-8">
              <BlogTagsBar
                sortLabel={t.sortByTags}
                hrefForTag={(tag) =>
                  tag
                    ? localePath(lang, `/blog?tag=${encodeURIComponent(tag)}`)
                    : localePath(lang, '/blog')
                }
                loadMoreLabel={t.loadMore}
              />

              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {visiblePosts.map((post) => (
                  <li key={post.slug}>
                    <BlogCard
                      post={post}
                      locale={lang}
                      href={localePath(lang, `/blog/${post.slug}`)}
                      detailsLabel={dict.common.moreDetails}
                    />
                  </li>
                ))}
              </ul>

              <BlogPagination
                currentPage={currentPage}
                totalPages={Math.max(totalPages, 10)}
                prevLabel={t.prev}
                nextLabel={t.next}
                hrefForPage={(p) =>
                  p === 1 ? localePath(lang, '/blog') : localePath(lang, `/blog?page=${p}`)
                }
              />
            </div>

            <BlogSidebar
              locale={lang}
              searchLabel={t.search}
              searchPlaceholder={t.search}
              categoriesTitle={t.categoriesTitle}
              popularTitle={t.popularTitle}
              latestTitle={t.latestTitle}
              categoryLabels={t.categories}
              activeCategory="foreignPromotion"
              popularPosts={POPULAR_POSTS}
              latestPosts={LATEST_POSTS}
              hrefForCategory={(cat) => localePath(lang, `/blog?cat=${cat}`)}
              hrefForPost={(slug) => localePath(lang, `/blog/${slug}`)}
            />
          </div>
        </section>
      </main>
    </>
  )
}
