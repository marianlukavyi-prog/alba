import { groq } from 'next-sanity'

const POST_FIELDS = `
  _id,
  "slug": slug.current,
  "language": language,
  title,
  excerpt,
  cover {
    asset->{ _id, url, metadata { dimensions } },
    alt,
    hotspot
  },
  featuredImage {
    asset->{ _id, url, metadata { dimensions } },
    alt,
    hotspot
  },
  publishedAt,
  readingMinutes,
  views,
  "tags": tags[]->{ _id, label, "slug": slug.current },
  "author": author->{ name, "slug": slug.current, image }
`

export const POSTS_LIST_QUERY = groq`
  *[_type == "post" && language == $lang]
  | order(publishedAt desc) {
    ${POST_FIELDS}
  }
`

export const POSTS_BY_TAG_QUERY = groq`
  *[_type == "post" && language == $lang && $tag in tags[]->slug.current]
  | order(publishedAt desc) {
    ${POST_FIELDS}
  }
`

export const POSTS_SEARCH_QUERY = groq`
  *[_type == "post" && language == $lang && (
    title match $q ||
    excerpt match $q ||
    pt::text(body) match $q
  )]
  | order(publishedAt desc) {
    ${POST_FIELDS}
  }
`

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && language == $lang && slug.current == $slug][0] {
    ${POST_FIELDS},
    body
  }
`

export const POPULAR_POSTS_QUERY = groq`
  *[_type == "post" && language == $lang]
  | order(views desc)[0...3] {
    "slug": slug.current,
    title,
    cover {
      asset->{ _id, url },
      alt,
      hotspot
    }
  }
`

export const LATEST_POSTS_QUERY = groq`
  *[_type == "post" && language == $lang]
  | order(publishedAt desc)[0...4] {
    "slug": slug.current,
    title,
    publishedAt,
    "author": author->name
  }
`

export const TAGS_QUERY = groq`
  *[_type == "tag"] | order(label asc) {
    _id,
    label,
    "slug": slug.current
  }
`

export const ALL_POST_PARAMS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && defined(language)] {
    "slug": slug.current,
    "lang": language
  }
`
