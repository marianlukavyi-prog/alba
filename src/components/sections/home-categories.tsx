import { FeatureSplit } from '@/components/sections/feature-split'

type CategoryKey = 'windows' | 'doors' | 'systems'

type Props = {
  categories: Record<CategoryKey, { title: string; description: string }>
  moreDetailsLabel: string
  hrefForCategory: (key: CategoryKey) => string
}

const ITEMS: Array<{ key: CategoryKey; image: string; reverse?: boolean }> = [
  { key: 'windows', image: '/figma/section-windows.png' },
  { key: 'doors', image: '/figma/section-doors.png', reverse: true },
  { key: 'systems', image: '/figma/section-systems.png' },
]

export function HomeCategories({ categories, moreDetailsLabel, hrefForCategory }: Props) {
  return (
    <>
      {ITEMS.map(({ key, image, reverse }) => (
        <FeatureSplit
          key={key}
          reverse={reverse}
          title={categories[key].title}
          description={categories[key].description}
          href={hrefForCategory(key)}
          ctaLabel={`${moreDetailsLabel} — ${categories[key].title}`}
          image={{ src: image, alt: categories[key].title }}
        />
      ))}
    </>
  )
}
