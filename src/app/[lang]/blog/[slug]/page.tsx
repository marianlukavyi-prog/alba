import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRightIcon } from '@/components/icons/arrow-right'
import { Header } from '@/components/layout/header'
import { ArticleBanner } from '@/components/sections/article-banner'
import { ArticleBody } from '@/components/sections/article-body'
import { BlogSidebar } from '@/components/sections/blog-sidebar'
import { JsonLd } from '@/components/seo/json-ld'
import { sanityFetch, urlFor } from '@/sanity/client'
import {
  ALL_POST_PARAMS_QUERY,
  LATEST_POSTS_QUERY,
  POPULAR_POSTS_QUERY,
  POST_BY_SLUG_QUERY,
} from '@/sanity/queries'
import type { SanityLatestPost, SanityPopularPost, SanityPost } from '@/sanity/types'
import { defaultLocale, hasLocale, locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://albaventanas.com'

const localePath = (locale: Locale, path = '') =>
  locale === defaultLocale ? path || '/' : `/${locale}${path}`

const DATE_FORMATTER: Record<Locale, Intl.DateTimeFormat> = {
  es: new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long', year: 'numeric' }),
  en: new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }),
  uk: new Intl.DateTimeFormat('uk', { day: 'numeric', month: 'long', year: 'numeric' }),
  ru: new Intl.DateTimeFormat('ru', { day: 'numeric', month: 'long', year: 'numeric' }),
}

const READING_LOCALE: Record<Locale, Intl.PluralRules> = {
  es: new Intl.PluralRules('es'),
  en: new Intl.PluralRules('en'),
  uk: new Intl.PluralRules('uk'),
  ru: new Intl.PluralRules('ru'),
}

export async function generateStaticParams() {
  const all = await sanityFetch<{ slug: string; lang: string }[]>({
    query: ALL_POST_PARAMS_QUERY,
    tags: ['posts'],
  })
  return all
    .filter((p) => locales.includes(p.lang as Locale))
    .map((p) => ({ lang: p.lang as Locale, slug: p.slug }))
}

const getCoverUrl = (post: SanityPost) => {
  const src = post.featuredImage?.asset ? post.featuredImage : post.cover
  if (!src?.asset) return '/figma/banner-hero.webp'
  return urlFor(src as Parameters<typeof urlFor>[0]).width(1280).height(720).fit('crop').url()
}

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/blog/[slug]'>): Promise<Metadata> {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return {}
  const post = await sanityFetch<SanityPost | null>({
    query: POST_BY_SLUG_QUERY,
    params: { lang, slug },
    tags: [`post:${slug}`],
  })
  if (!post) return {}

  const languages: Record<string, string> = {}
  for (const locale of locales) languages[locale] = localePath(locale, `/blog/${slug}`)

  const cover = getCoverUrl(post)

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: localePath(lang, `/blog/${slug}`),
      languages,
    },
    openGraph: {
      type: 'article',
      siteName: 'Alba Ventanas',
      title: post.title,
      description: post.excerpt,
      url: localePath(lang, `/blog/${slug}`),
      images: [cover],
      publishedTime: post.publishedAt,
      authors: [post.author?.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [cover],
    },
    other: {
      'reading-time': String(post.readingMinutes ?? 0),
    },
  }
}

export default async function BlogPostPage({ params }: PageProps<'/[lang]/blog/[slug]'>) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()
  const [post, popularPosts, latestPosts] = await Promise.all([
    sanityFetch<SanityPost | null>({
      query: POST_BY_SLUG_QUERY,
      params: { lang, slug },
      tags: [`post:${slug}`],
    }),
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
  ])
  if (!post) notFound()

  const dict = await getDictionary(lang)
  const t = dict.blogPage
  const tArticle = dict.blogPostPage

  const publishedLabel = DATE_FORMATTER[lang]
    .format(new Date(post.publishedAt))
    .replace(/\s?г\.?$/u, '')
    .replace(/\sр\.?$/u, '')
  const minutes = post.readingMinutes ?? 0
  const minutesForm =
    tArticle.readingForms[
      READING_LOCALE[lang].select(minutes) as 'one' | 'few' | 'many' | 'other'
    ] ?? tArticle.readingForms.other
  const readingLabel = `${minutes} ${minutesForm}`

  const articleUrl = `${SITE_URL}${localePath(lang, `/blog/${slug}`)}`
  const coverUrl = getCoverUrl(post)
  const article = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: coverUrl.startsWith('http') ? coverUrl : `${SITE_URL}${coverUrl}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { '@type': 'Person', name: post.author?.name ?? '' },
    publisher: {
      '@type': 'Organization',
      name: 'Alba Ventanas',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/figma/banner-hero.webp` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    inLanguage: lang,
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t.breadcrumbHome,
        item: `${SITE_URL}${localePath(lang)}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t.breadcrumbCurrent,
        item: `${SITE_URL}${localePath(lang, '/blog')}`,
      },
      { '@type': 'ListItem', position: 3, name: post.title, item: articleUrl },
    ],
  }

  return (
    <>
      <JsonLd data={[article, breadcrumbLd]} />
      <Header lang={lang} dict={dict} position="fixed" />
      <main className="flex flex-1 flex-col">
        <ArticleBanner
          title={post.title}
          publishedLabel={publishedLabel}
          readingLabel={readingLabel}
          views={post.views ?? 0}
          tags={post.tags?.map((t) => t.label) ?? []}
          image={{ src: coverUrl, alt: post.cover?.alt ?? post.title }}
          breadcrumb={[
            { label: t.breadcrumbHome, href: localePath(lang) },
            { label: t.breadcrumbCurrent, href: localePath(lang, '/blog') },
            { label: post.title },
          ]}
        />

        <section className="bg-white py-10 md:py-[60px] lg:py-20">
          <div className="mx-auto grid max-w-[1150px] grid-cols-1 gap-[22px] px-4 md:gap-10 md:px-6 lg:grid-cols-[minmax(0,1fr)_223px] lg:gap-[60px]">
            <div className="flex flex-col gap-[22px] md:gap-10">
              <form
                className="flex items-center justify-between gap-3 border-b border-[var(--color-brand)] pb-4 lg:hidden"
                noValidate
              >
                <input
                  type="search"
                  name="q"
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

              <article className="flex flex-col gap-8">
                <div className="relative h-[220px] w-full overflow-hidden rounded-[2px] sm:h-[340px] lg:h-[400px]">
                  <Image
                    src={coverUrl}
                    alt={post.cover?.alt ?? post.title}
                    fill
                    sizes="(min-width: 1024px) 860px, 100vw"
                    className="object-cover"
                  />
                </div>
                {post.body ? <ArticleBody blocks={post.body} /> : null}
              </article>
            </div>

            <div className="hidden lg:block">
              <BlogSidebar
                searchLabel={t.search}
                searchPlaceholder={t.search}
                searchAction={localePath(lang, '/blog')}
                popularTitle={t.popularTitle}
                latestTitle={t.latestTitle}
                popularPosts={popularPosts}
                latestPosts={latestPosts}
                hrefForPost={(s) => localePath(lang, `/blog/${s}`)}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
