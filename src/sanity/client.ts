import imageUrlBuilder from '@sanity/image-url'
import { createClient, type QueryParams } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // tag-based revalidation handles freshness; CDN is fine + free
  perspective: 'published',
})

const builder = imageUrlBuilder({ projectId, dataset })

export type SanityImageRef =
  | string
  | { asset?: { _ref?: string; _id?: string } }
  | { _ref?: string; _id?: string }

export const urlFor = (source: SanityImageRef) => builder.image(source as Parameters<typeof builder.image>[0])

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate,
}: {
  query: string
  params?: QueryParams
  tags?: string[]
  revalidate?: number
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      tags,
      ...(revalidate !== undefined ? { revalidate } : {}),
    },
  })
}
