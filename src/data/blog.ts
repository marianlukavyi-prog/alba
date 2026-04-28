import type { Locale } from '@/i18n/config'

export type BlogTag = '#AI' | '#Чеклісти' | '#Апдейти' | '#E-commerce'

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'lead'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'note'; text: string }

export type BlogPost = {
  slug: string
  title: Record<Locale, string>
  excerpt: Record<Locale, string>
  cover: string
  featuredImage: string
  author: string
  publishedAt: string
  readingMinutes: number
  views: number
  tags: BlogTag[]
  body: ArticleBlock[]
}

const COMMON_COVER = '/blog/post-cover.png'
const FEATURED_IMAGE = '/figma/banner-hero.png'
const AUTHOR = 'Іванина Роман'

const TITLES = {
  es: 'Cómo elegir ventanas de PVC',
  en: 'How to choose PVC windows',
  uk: 'Як обрати ПВХ вікна',
  ru: 'Как выбрать ПВХ окна',
}

const EXCERPTS = {
  es: 'Aprende a elegir correctamente ventanas para tu casa con la mejor relación calidad-precio.',
  en: 'Learn how to correctly choose windows for your home with the best quality-to-price ratio.',
  uk: 'Дізнайтесь, як правильно обрати вікна для дому з ура...',
  ru: 'Узнайте, как правильно выбрать окна для дома с учё...',
}

// Demo article body (Ukrainian copy from Figma).
// In production each post would carry its own localized body.
const SAMPLE_BODY: ArticleBlock[] = [
  {
    type: 'lead',
    text: 'Вибір вікон — це важливий етап при будівництві або ремонті. Від правильного рішення залежить комфорт у приміщенні, рівень тепла, шумоізоляція та навіть витрати на опалення.',
  },
  {
    type: 'paragraph',
    text: 'Сучасні віконні системи пропонують широкий вибір рішень — від базових до преміум. Щоб не помилитися, важливо розуміти ключові характеристики та їх вплив на експлуатацію.',
  },
  { type: 'heading', text: 'Чому важливо правильно обрати вікна?' },
  {
    type: 'list',
    items: [
      'забезпечують теплоізоляцію та зменшують втрати енергії',
      'впливають на рівень шуму в приміщенні',
      'формують зовнішній вигляд будинку',
      'визначають комфорт щоденного використання',
    ],
  },
  { type: 'heading', text: 'Основні параметри вибору' },
  { type: 'subheading', text: '1. Монтажна глибина профілю' },
  {
    type: 'paragraph',
    text: 'Це один із ключових показників, який впливає на теплоізоляцію.',
  },
  {
    type: 'list',
    items: [
      '60 мм — базові системи',
      '70 мм — покращений комфорт',
      '80 мм і більше — високий рівень енергоефективності',
    ],
  },
  { type: 'subheading', text: '2. Камерність профілю' },
  {
    type: 'paragraph',
    text: 'Кількість камер у профілі визначає тепло- та шумоізоляцію.',
  },
  {
    type: 'list',
    items: [
      '3 камери — стандартний рівень',
      '5 камер — оптимальний варіант',
      '6–7 камер — преміум сегмент',
    ],
  },
  { type: 'subheading', text: '3. Склопакет' },
  {
    type: 'paragraph',
    text: 'Склопакет займає найбільшу площу вікна, тому має вирішальне значення.',
  },
  {
    type: 'list',
    items: [
      'двокамерний — стандарт',
      'енергозберігаючий — кращий вибір',
      'мультифункціональний — захист від холоду та спеки',
    ],
  },
  { type: 'subheading', text: '4. Теплоізоляція (Uf)' },
  {
    type: 'paragraph',
    text: 'Показник Uf демонструє, наскільки добре вікно утримує тепло.',
  },
  {
    type: 'list',
    items: [
      'Uf ≈ 1.6 — базовий рівень',
      'Uf ≈ 1.3 — хороший рівень',
      'Uf ≈ 1.0 і нижче — енергоефективні рішення',
    ],
  },
  { type: 'note', text: 'Чим менше значення — тим краще' },
  { type: 'heading', text: 'Висновок' },
  {
    type: 'paragraph',
    text: 'Правильний вибір вікон — це поєднання технічних характеристик і потреб вашого простору. Не варто орієнтуватися лише на ціну — важливо враховувати тепло, шум та довговічність.',
  },
  {
    type: 'paragraph',
    text: 'Якщо ви не впевнені у виборі, краще звернутися до фахівців, які допоможуть підібрати оптимальне рішення під ваш проєкт.',
  },
]

export const BLOG_POSTS: BlogPost[] = Array.from({ length: 9 }, (_, i) => ({
  slug: `how-to-choose-pvc-windows-${i + 1}`,
  cover: COMMON_COVER,
  featuredImage: FEATURED_IMAGE,
  author: AUTHOR,
  publishedAt: '2025-11-21',
  readingMinutes: 10,
  views: 9394,
  tags: ['#AI', '#Чеклісти', '#Апдейти'] as BlogTag[],
  title: TITLES,
  excerpt: EXCERPTS,
  body: SAMPLE_BODY,
}))

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

export const BLOG_TAGS: BlogTag[] = ['#Чеклісти', '#Апдейти', '#E-commerce']

export const BLOG_CATEGORIES = [
  'ai',
  'instructions',
  'foreignPromotion',
  'cases',
  'internetMarketing',
  'contextualAds',
  'siteSeo',
  'socialMedia',
] as const

export type BlogCategoryKey = (typeof BLOG_CATEGORIES)[number]

export type BlogPopularPost = {
  slug: string
  title: Record<Locale, string>
  cover: string
}

export const POPULAR_POSTS: BlogPopularPost[] = [
  {
    slug: 'synergy-1',
    cover: COMMON_COVER,
    title: {
      es: 'Promoción y crecimiento empresarial en internet — el efecto sinergia',
      en: 'Business promotion and growth online — the synergy effect',
      uk: 'Просування і розкрутка бізнесу в інтернеті – ефект синергії',
      ru: 'Продвижение и раскрутка бизнеса в интернете – эффект синергии',
    },
  },
  {
    slug: 'synergy-2',
    cover: COMMON_COVER,
    title: {
      es: 'Promoción y crecimiento empresarial en internet — el efecto sinergia',
      en: 'Business promotion and growth online — the synergy effect',
      uk: 'Просування і розкрутка бізнесу в інтернеті – ефект синергії',
      ru: 'Продвижение и раскрутка бизнеса в интернете – эффект синергии',
    },
  },
  {
    slug: 'synergy-3',
    cover: COMMON_COVER,
    title: {
      es: 'Promoción y crecimiento empresarial en internet — el efecto sinergia',
      en: 'Business promotion and growth online — the synergy effect',
      uk: 'Просування і розкрутка бізнесу в інтернеті – ефект синергії',
      ru: 'Продвижение и раскрутка бизнеса в интернете – эффект синергии',
    },
  },
]

export type LatestPost = {
  slug: string
  title: Record<Locale, string>
  author: string
  publishedAt: string
}

export const LATEST_POSTS: LatestPost[] = [
  {
    slug: 'cost-2025',
    author: AUTHOR,
    publishedAt: '2025-11-21',
    title: {
      es: 'Coste de promoción de un sitio web en 2025',
      en: 'Website promotion cost in 2025',
      uk: 'Вартість просування сайту у 2025 році',
      ru: 'Стоимость продвижения сайта в 2025 году',
    },
  },
  {
    slug: 'medical',
    author: AUTHOR,
    publishedAt: '2025-11-21',
    title: {
      es: 'Promoción de servicios médicos',
      en: 'Promotion of medical services',
      uk: 'Просування медичних послуг',
      ru: 'Продвижение медицинских услуг',
    },
  },
  {
    slug: 'germany',
    author: AUTHOR,
    publishedAt: '2025-11-21',
    title: {
      es: 'Promoción de sitios web en Alemania',
      en: 'Website promotion in Germany',
      uk: 'Просування сайтів у Німеччині',
      ru: 'Продвижение сайтов в Германии',
    },
  },
  {
    slug: 'ecommerce-strategy',
    author: AUTHOR,
    publishedAt: '2025-11-21',
    title: {
      es: 'Estrategia de promoción para tienda online',
      en: 'Online-store promotion strategy',
      uk: 'Стратегія просування інтернет-магазину',
      ru: 'Стратегия продвижения интернет-магазина',
    },
  },
]
