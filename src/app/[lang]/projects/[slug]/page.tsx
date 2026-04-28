import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { ChevronRightIcon } from '@/components/icons/chevron-right'
import { Header } from '@/components/layout/header'
import { ProjectCard } from '@/components/sections/project-card'
import { ProjectGallery } from '@/components/sections/project-gallery'
import { ProjectInfo } from '@/components/sections/project-info'
import { ProductsCarousel } from '@/components/sections/products-carousel'
import { getProject, getRelatedProjects, PROJECTS } from '@/data/projects'
import { defaultLocale, hasLocale, locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'

const localePath = (locale: Locale, path = '') =>
  locale === defaultLocale ? path || '/' : `/${locale}${path}`

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    PROJECTS.map((project) => ({ lang, slug: project.slug })),
  )
}

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/projects/[slug]'>): Promise<Metadata> {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return {}
  const project = getProject(slug)
  if (!project) return {}

  const languages: Record<string, string> = {}
  for (const locale of locales) languages[locale] = localePath(locale, `/projects/${slug}`)

  return {
    title: project.title,
    description: project.subtitle,
    alternates: {
      canonical: localePath(lang, `/projects/${slug}`),
      languages,
    },
    openGraph: {
      title: project.title,
      description: project.subtitle,
      url: localePath(lang, `/projects/${slug}`),
      images: project.gallery.length > 0 ? project.gallery.slice(0, 1) : [],
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: PageProps<'/[lang]/projects/[slug]'>) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()
  const project = getProject(slug)
  if (!project) notFound()

  const dict = await getDictionary(lang)
  const t = dict.projectsPage
  const tDetail = dict.projectDetailPage
  const related = getRelatedProjects(slug, 3)

  return (
    <>
      <Header lang={lang} dict={dict} position="fixed" variant="solid" />
      <main className="flex flex-1 flex-col bg-white pt-[76px]">
        <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-[1150px] px-6 pt-7">
          <ol className="flex flex-wrap items-center gap-1.5 text-[15px] text-[var(--color-brand-soft)]">
            {[
              { label: t.breadcrumbHome, href: localePath(lang) },
              { label: t.breadcrumbCurrent, href: localePath(lang, '/projects') },
              { label: project.title },
            ].map((item, i, arr) => {
              const isLast = i === arr.length - 1
              return (
                <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
                  {item.href && !isLast ? (
                    <Link href={item.href} className="transition-opacity hover:opacity-80">
                      {item.label}
                    </Link>
                  ) : (
                    <span className={isLast ? 'font-semibold text-[var(--color-brand)]' : ''}>
                      {item.label}
                    </span>
                  )}
                  {!isLast ? (
                    <ChevronRightIcon size={15} className="text-[var(--color-brand-soft)]" />
                  ) : null}
                </li>
              )
            })}
          </ol>
        </nav>

        <section className="mx-auto w-full max-w-[1150px] px-6 py-10 lg:px-0 lg:py-12">
          <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2">
            <ProjectGallery images={project.gallery} alt={project.title} />
            <ProjectInfo
              project={project}
              labels={tDetail.labels}
              mapTitle={`${tDetail.mapTitle} — ${project.title}`}
            />
          </div>
        </section>

        {related.length > 0 ? (
          <section className="bg-[var(--color-surface)]">
            <div className="mx-auto w-full max-w-[1150px] px-6 py-16 lg:px-0 lg:py-20">
              <header className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-[28px] font-semibold text-[var(--color-brand)]">
                  {tDetail.relatedTitle}
                </h2>
                <Link
                  href={localePath(lang, '/projects')}
                  className="inline-flex items-center gap-2.5 text-[15px] font-medium tracking-[0.3px] text-[var(--color-brand)] transition-opacity hover:opacity-80"
                >
                  {tDetail.viewAll}
                  <ArrowUpRightIcon />
                </Link>
              </header>

              <div className="mt-9">
                <ProductsCarousel prevLabel={t.prev} nextLabel={t.next} visibleDesktop={3}>
                  {related.map((p) => (
                    <ProjectCard
                      key={p.slug}
                      project={p}
                      href={localePath(lang, `/projects/${p.slug}`)}
                      detailsLabel={dict.common.moreDetails}
                    />
                  ))}
                </ProductsCarousel>
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </>
  )
}
