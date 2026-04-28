import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { ArticleBanner } from '@/components/sections/article-banner'
import { ArticleBody } from '@/components/sections/article-body'
import { BlogSidebar } from '@/components/sections/blog-sidebar'
import { JsonLd } from '@/components/seo/json-ld'
import { BLOG_POSTS, getBlogPost, LATEST_POSTS, POPULAR_POSTS } from '@/data/blog'
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

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    BLOG_POSTS.map((post) => ({ lang, slug: post.slug })),
  )
}

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/blog/[slug]'>): Promise<Metadata> {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return {}
  const post = getBlogPost(slug)
  if (!post) return {}

  const languages: Record<string, string> = {}
  for (const locale of locales) languages[locale] = localePath(locale, `/blog/${slug}`)

  return {
    title: post.title[lang],
    description: post.excerpt[lang],
    alternates: {
      canonical: localePath(lang, `/blog/${slug}`),
      languages,
    },
    openGraph: {
      type: 'article',
      siteName: 'Alba Ventanas',
      title: post.title[lang],
      description: post.excerpt[lang],
      url: localePath(lang, `/blog/${slug}`),
      images: [post.featuredImage],
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title[lang],
      description: post.excerpt[lang],
      images: [post.featuredImage],
    },
    other: {
      'reading-time': String(post.readingMinutes),
    },
  }
}

export default async function BlogPostPage({ params }: PageProps<'/[lang]/blog/[slug]'>) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()
  const post = getBlogPost(slug)
  if (!post) notFound()

  const dict = await getDictionary(lang)
  const t = dict.blogPage
  const tArticle = dict.blogPostPage

  const publishedLabel = DATE_FORMATTER[lang]
    .format(new Date(post.publishedAt))
    .replace(/\s?г\.?$/u, '')
    .replace(/\sр\.?$/u, '')
  const minutes = post.readingMinutes
  const minutesForm = tArticle.readingForms[READING_LOCALE[lang].select(minutes) as 'one' | 'few' | 'many' | 'other'] ?? tArticle.readingForms.other
  const readingLabel = `${minutes} ${minutesForm}`

  const articleUrl = `${SITE_URL}${localePath(lang, `/blog/${slug}`)}`
  const article = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title[lang],
    description: post.excerpt[lang],
    image: `${SITE_URL}${post.featuredImage}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { '@type': 'Person', name: post.author },
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
      { '@type': 'ListItem', position: 3, name: post.title[lang], item: articleUrl },
    ],
  }

  return (
    <>
      <JsonLd data={[article, breadcrumbLd]} />
      <Header lang={lang} dict={dict} position="absolute" />
      <main className="flex flex-1 flex-col">
        <ArticleBanner
          title={post.title[lang]}
          publishedLabel={publishedLabel}
          readingLabel={readingLabel}
          views={post.views}
          tags={post.tags}
          image={{ src: post.featuredImage, alt: post.title[lang] }}
          breadcrumb={[
            { label: t.breadcrumbHome, href: localePath(lang) },
            { label: t.breadcrumbCurrent, href: localePath(lang, '/blog') },
            { label: post.title[lang] },
          ]}
        />

        <section className="bg-white py-12 lg:py-16">
          <div className="mx-auto grid max-w-[1150px] gap-10 px-6 lg:grid-cols-[1fr_223px] lg:gap-[60px]">
            <article className="flex flex-col gap-8">
              <div className="relative h-[260px] w-full overflow-hidden rounded-[2px] sm:h-[340px] lg:h-[400px]">
                <Image
                  src={post.featuredImage}
                  alt={post.title[lang]}
                  fill
                  sizes="(min-width: 1024px) 860px, 100vw"
                  className="object-cover"
                />
              </div>
              <ArticleBody blocks={post.body} />
            </article>

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
              hrefForPost={(s) => localePath(lang, `/blog/${s}`)}
            />
          </div>
        </section>
      </main>
    </>
  )
}
