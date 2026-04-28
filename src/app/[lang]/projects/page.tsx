import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Banner } from '@/components/layout/banner'
import { Header } from '@/components/layout/header'
import { BlogPagination } from '@/components/sections/blog-pagination'
import { ProjectCard } from '@/components/sections/project-card'
import { ProjectsFilters } from '@/components/sections/projects-filters'
import { ProjectsTabs } from '@/components/sections/projects-tabs'
import { PROJECTS } from '@/data/projects'
import { defaultLocale, hasLocale, locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'

const PROJECTS_PER_PAGE = 9

const localePath = (locale: Locale, path = '') =>
  locale === defaultLocale ? path || '/' : `/${locale}${path}`

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/projects'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)
  const t = dict.projectsPage

  const languages: Record<string, string> = {}
  for (const locale of locales) languages[locale] = localePath(locale, '/projects')

  return {
    title: t.heroTitle,
    description: t.heroSubtitle,
    alternates: {
      canonical: localePath(lang, '/projects'),
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: 'Alba Ventanas',
      title: t.heroTitle,
      description: t.heroSubtitle,
      url: localePath(lang, '/projects'),
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

export default async function ProjectsPage({ params }: PageProps<'/[lang]/projects'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const t = dict.projectsPage

  const totalPages = Math.max(1, Math.ceil(PROJECTS.length / PROJECTS_PER_PAGE))
  const currentPage = 1
  const start = (currentPage - 1) * PROJECTS_PER_PAGE
  const visibleProjects = PROJECTS.slice(start, start + PROJECTS_PER_PAGE)

  const countries = Array.from(new Set(PROJECTS.map((p) => p.country))).sort()
  const systems = Array.from(new Set(PROJECTS.map((p) => p.system))).sort()
  const types = Array.from(new Set(PROJECTS.map((p) => p.type))).sort()

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

        <section className="bg-white">
          <div className="mx-auto max-w-[1150px] px-6 pt-12 pb-10 lg:px-0">
            <ProjectsTabs
              allLabel={t.tabAll}
              loadMoreLabel={t.loadMore}
              hrefForCategory={(cat) =>
                cat
                  ? localePath(lang, `/projects?cat=${cat}`)
                  : localePath(lang, '/projects')
              }
              categoryLabels={t.categories}
            />
          </div>
        </section>

        <section className="bg-[var(--color-surface)]">
          <div className="mx-auto max-w-[1150px] px-6 py-10">
            <ProjectsFilters
              labels={t.filters}
              countries={countries}
              systems={systems}
              types={types}
            />
          </div>
        </section>

        <section className="bg-white pb-16 lg:pb-20">
          <div className="mx-auto flex max-w-[1150px] flex-col gap-10 px-6 pt-10">
            <ul className="grid grid-cols-1 gap-x-2.5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((project) => (
                <li key={project.slug}>
                  <ProjectCard
                    project={project}
                    href={localePath(lang, `/projects/${project.slug}`)}
                    detailsLabel={dict.common.moreDetails}
                  />
                </li>
              ))}
            </ul>

            <BlogPagination
              currentPage={currentPage}
              totalPages={Math.max(totalPages, 7)}
              prevLabel={t.prev}
              nextLabel={t.next}
              hrefForPage={(p) =>
                p === 1 ? localePath(lang, '/projects') : localePath(lang, `/projects?page=${p}`)
              }
            />
          </div>
        </section>
      </main>
    </>
  )
}
