import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/client'

type Props = {
  blocks: PortableTextBlock[]
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[15px] text-[#393939]">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-4 text-[20px] font-semibold text-black">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-2 text-[16px] font-semibold text-black">{children}</h3>
    ),
    lead: ({ children }) => <p className="text-[15px] text-[#393939]">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--color-accent)] pl-4 text-[15px] italic text-[#393939]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="ml-5 flex list-disc flex-col gap-1.5 text-[15px] text-[#393939]">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="ml-5 flex list-decimal flex-col gap-1.5 text-[15px] text-[#393939]">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = (value as { href?: string })?.href ?? '#'
      const external = (value as { external?: boolean })?.external
      if (external) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className="underline">
            {children}
          </a>
        )
      }
      return (
        <Link href={href} className="underline">
          {children}
        </Link>
      )
    },
  },
  types: {
    image: ({ value }) => {
      const v = value as { alt?: string; caption?: string; asset?: unknown }
      if (!v?.asset) return null
      const url = urlFor(v as Parameters<typeof urlFor>[0]).width(1024).fit('max').url()
      return (
        <figure className="my-2 flex flex-col gap-2">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2px] bg-[var(--color-surface)]">
            <Image src={url} alt={v.alt ?? ''} fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" />
          </div>
          {v.caption ? (
            <figcaption className="text-[13px] italic text-[#777]">{v.caption}</figcaption>
          ) : null}
        </figure>
      )
    },
    note: ({ value }) => {
      const text = (value as { text?: string })?.text
      if (!text) return null
      return (
        <p className="text-[15px] text-[#393939] italic">{text}</p>
      )
    },
  },
}

export function ArticleBody({ blocks }: Props) {
  return (
    <div className="flex flex-col gap-5 text-[15px] leading-[1.6] text-[#393939]">
      <PortableText value={blocks} components={components} />
    </div>
  )
}
