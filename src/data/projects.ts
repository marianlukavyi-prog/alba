import type { Locale } from '@/i18n/config'

export const PROJECT_CATEGORIES = [
  'residential',
  'commercial',
  'offices',
  'hotels',
  'facades',
  'terraces',
] as const

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]

export type Project = {
  slug: string
  title: string
  subtitle: string
  category: ProjectCategory
  country: string
  city: string
  system: string
  type: string
  image: string
  gallery: string[]
  details: {
    location: string
    architects: string
    manufacturer: string
    objectType: string
    client: string
    systems: string
  }
  productAreas: string[]
}

const PLACEHOLDER = '/projects/placeholder.png'

const DEFAULT_GALLERY = [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER]

const DEMO_DETAILS = {
  location: 'Київ, Україна',
  architects: 'Архітектурне бюро',
  manufacturer: 'Віконні системи REHAU / Schüco',
  objectType: 'Житловий будинок',
  client: 'Девелоперська компанія',
  systems: 'ПВХ та алюмінієві конструкції',
}

const DEMO_AREAS = ['Фасади', 'Розсувні двері', 'Двері']

export const PROJECTS: Project[] = [
  {
    slug: 'akademia-muzyczna',
    title: 'Akademia Muzyczna',
    category: 'commercial',
    country: 'Poland',
    city: 'Wrocław',
    system: 'Schüco FWS 50',
    type: 'facade',
    image: PLACEHOLDER,
    gallery: DEFAULT_GALLERY,
    details: DEMO_DETAILS,
    productAreas: DEMO_AREAS,
    subtitle: 'Fire-rated partitions with EI15 to EI90 fire doors',
  },
  {
    slug: 'regional-medical-chamber',
    title: 'Regional Medical Chamber – Training and Research Centre',
    category: 'commercial',
    country: 'Poland',
    city: 'Kraków',
    system: 'Reynaers MasterLine 8',
    type: 'windows',
    image: PLACEHOLDER,
    gallery: DEFAULT_GALLERY,
    details: DEMO_DETAILS,
    productAreas: DEMO_AREAS,
    subtitle: 'Fire-rated partitions with EI15 to EI90 fire doors',
  },
  {
    slug: 'office-house-i',
    title: 'Office House I',
    category: 'offices',
    country: 'Spain',
    city: 'Valencia',
    system: 'Schüco AWS WoodDesign',
    type: 'windows',
    image: PLACEHOLDER,
    gallery: DEFAULT_GALLERY,
    details: DEMO_DETAILS,
    productAreas: DEMO_AREAS,
    subtitle: 'Fire-rated partitions with EI15 to EI90 fire doors',
  },
  {
    slug: 'office-house-ii',
    title: 'Office House II',
    category: 'offices',
    country: 'Spain',
    city: 'Madrid',
    system: 'Schüco FWS 50',
    type: 'facade',
    image: PLACEHOLDER,
    gallery: DEFAULT_GALLERY,
    details: DEMO_DETAILS,
    productAreas: DEMO_AREAS,
    subtitle: 'Fire-rated partitions with EI15 to EI90 fire doors',
  },
  {
    slug: 'medical-chamber-extension',
    title: 'Medical Chamber Extension',
    category: 'commercial',
    country: 'Poland',
    city: 'Warsaw',
    system: 'Reynaers MasterLine 8',
    type: 'windows',
    image: PLACEHOLDER,
    gallery: DEFAULT_GALLERY,
    details: DEMO_DETAILS,
    productAreas: DEMO_AREAS,
    subtitle: 'Fire-rated partitions with EI15 to EI90 fire doors',
  },
  {
    slug: 'akademia-muzyczna-annex',
    title: 'Akademia Muzyczna — Annex',
    category: 'commercial',
    country: 'Poland',
    city: 'Wrocław',
    system: 'Schüco AS FD 90.HI',
    type: 'sliding',
    image: PLACEHOLDER,
    gallery: DEFAULT_GALLERY,
    details: DEMO_DETAILS,
    productAreas: DEMO_AREAS,
    subtitle: 'Fire-rated partitions with EI15 to EI90 fire doors',
  },
  {
    slug: 'medical-chamber-research',
    title: 'Medical Chamber — Research Wing',
    category: 'commercial',
    country: 'Poland',
    city: 'Poznań',
    system: 'Reynaers MasterLine 8',
    type: 'windows',
    image: PLACEHOLDER,
    gallery: DEFAULT_GALLERY,
    details: DEMO_DETAILS,
    productAreas: DEMO_AREAS,
    subtitle: 'Fire-rated partitions with EI15 to EI90 fire doors',
  },
  {
    slug: 'akademia-muzyczna-recital',
    title: 'Akademia Muzyczna — Recital Hall',
    category: 'commercial',
    country: 'Poland',
    city: 'Wrocław',
    system: 'Schüco FWS 50',
    type: 'facade',
    image: PLACEHOLDER,
    gallery: DEFAULT_GALLERY,
    details: DEMO_DETAILS,
    productAreas: DEMO_AREAS,
    subtitle: 'Fire-rated partitions with EI15 to EI90 fire doors',
  },
  {
    slug: 'office-house-iii',
    title: 'Office House III',
    category: 'offices',
    country: 'Spain',
    city: 'Barcelona',
    system: 'Schüco AS FD 90.HI',
    type: 'sliding',
    image: PLACEHOLDER,
    gallery: DEFAULT_GALLERY,
    details: DEMO_DETAILS,
    productAreas: DEMO_AREAS,
    subtitle: 'Fire-rated partitions with EI15 to EI90 fire doors',
  },
]

export function getProjectsByCategory(category?: ProjectCategory): Project[] {
  if (!category) return PROJECTS
  return PROJECTS.filter((p) => p.category === category)
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const current = getProject(slug)
  if (!current) return PROJECTS.slice(0, limit)
  const sameCategory = PROJECTS.filter((p) => p.slug !== slug && p.category === current.category)
  const others = PROJECTS.filter((p) => p.slug !== slug && p.category !== current.category)
  return [...sameCategory, ...others].slice(0, limit)
}

// Reserved for future per-locale fields.
export type ProjectLocaleHelper = (locale: Locale) => string
