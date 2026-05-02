'use client'

import { useState } from 'react'
import { FeatureSplit } from '@/components/sections/feature-split'

type CategoryKey = 'windows' | 'doors' | 'systems'

type Props = {
  categories: Record<CategoryKey, { title: string; description: string }>
  moreDetailsLabel: string
  hrefs: Record<CategoryKey, string>
}

const ITEMS: Array<{
  key: CategoryKey
  image: string
  reverse?: boolean
}> = [
  { key: 'windows', image: '/figma/section-windows.webp' },
  { key: 'doors', image: '/figma/section-doors.webp', reverse: true },
  { key: 'systems', image: '/figma/section-systems.webp' },
]

export function HomeCategories({ categories, moreDetailsLabel, hrefs }: Props) {
  const [hovered, setHovered] = useState<CategoryKey | null>(null)

  return (
    <>
      {ITEMS.map(({ key, image, reverse }, idx) => {
        const background: 'brand' | 'white' = hovered === key ? 'brand' : 'white'
        return (
          <div
            key={key}
            onMouseEnter={() => setHovered(key)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(key)}
            onBlur={() => setHovered(null)}
            className="transition-colors"
            data-category={key}
            data-index={idx}
          >
            <FeatureSplit
              reverse={reverse}
              background={background}
              title={categories[key].title}
              description={categories[key].description}
              href={hrefs[key]}
              ctaLabel={`${moreDetailsLabel} — ${categories[key].title}`}
              image={{ src: image, alt: categories[key].title }}
            />
          </div>
        )
      })}
    </>
  )
}
