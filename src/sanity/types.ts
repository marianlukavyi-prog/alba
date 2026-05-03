import type { PortableTextBlock } from '@portabletext/types'

export type SanityImage = {
  asset?: { _id?: string; url?: string; metadata?: { dimensions?: { width: number; height: number } } }
  alt?: string
  hotspot?: { x: number; y: number; height: number; width: number }
}

export type SanityTag = {
  _id: string
  label: string
  slug: string
}

export type SanityAuthor = {
  name: string
  slug: string
  image?: SanityImage
}

export type SanityPost = {
  _id: string
  slug: string
  language: string
  title: string
  excerpt: string
  cover: SanityImage
  featuredImage?: SanityImage
  publishedAt: string
  readingMinutes: number
  views: number
  tags: SanityTag[]
  author: SanityAuthor
  body?: PortableTextBlock[]
}

export type SanityPostCard = Pick<
  SanityPost,
  '_id' | 'slug' | 'language' | 'title' | 'excerpt' | 'cover' | 'publishedAt' | 'readingMinutes' | 'views' | 'tags' | 'author'
>

export type SanityPopularPost = {
  slug: string
  title: string
  cover: SanityImage
}

export type SanityLatestPost = {
  slug: string
  title: string
  publishedAt: string
  author: string
}
