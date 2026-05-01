const VIEW_W = 130.629
const VIEW_H = 40

type Inset = readonly [top: number, right: number, bottom: number, left: number]

type Part = readonly [light: string, dark: string, inset: Inset]

const PARTS: ReadonlyArray<Part> = [
  ['/figma/logo-4dacfea3.svg', '/figma/logo-4dacfea3.svg', [0, 68.84, 0, 0]],
  ['/figma/logo-2c107119.svg', '/figma/logo-2c107119.svg', [0, 68.84, 0, 0]],
  ['/figma/logo-fabc2101.svg', '/figma/logo-fabc2101.svg', [22.51, 73.91, 20.93, 5.03]],
  ['/figma/logo-d35bf4d2.svg', '/figma/logo-dark-f681896e.svg', [14.45, 33.25, 51.33, 57.82]],
  ['/figma/logo-2dafa8f2.svg', '/figma/logo-dark-77712f7c.svg', [14.69, 53.32, 51.4, 35.65]],
  ['/figma/logo-3f1b7e8c.svg', '/figma/logo-dark-7b00107f.svg', [14.69, 21.41, 51.2, 67.67]],
  ['/figma/logo-947bc572.svg', '/figma/logo-dark-a7c10fdb.svg', [55.94, 16.17, 17.83, 76.12]],
  ['/figma/logo-03b94245.svg', '/figma/logo-dark-a39db731.svg', [14.69, 44.11, 51.4, 48.39]],
  ['/figma/logo-ac1f22eb.svg', '/figma/logo-dark-87ea6fd4.svg', [55.94, 41.22, 17.83, 51.5]],
  ['/figma/logo-94744150.svg', '/figma/logo-dark-21020a5d.svg', [55.94, 25.16, 17.83, 66.49]],
  ['/figma/logo-3e7cbcb0.svg', '/figma/logo-dark-1097c9a5.svg', [55.94, 6.85, 17.79, 84.9]],
  ['/figma/logo-0504f792.svg', '/figma/logo-dark-c20fd8b0.svg', [55.94, 50.11, 17.83, 44.11]],
  ['/figma/logo-c0d94f74.svg', '/figma/logo-dark-470aa151.svg', [55.77, 0.03, 17.31, 93.58]],
  ['/figma/logo-14377105.svg', '/figma/logo-dark-00dfc6ce.svg', [55.83, 57.1, 17.8, 34.8]],
  ['/figma/logo-5657a46f.svg', '/figma/logo-dark-c674dd4e.svg', [56.29, 33.19, 17.83, 60.06]],
  ['/figma/logo-20bb2881.svg', '/figma/logo-20bb2881.svg', [36.36, 85.12, 44.06, 10.92]],
  ['/figma/logo-08de6626.svg', '/figma/logo-dark-4a3cd5c7.svg', [34.48, 35.92, 58.21, 60.49]],
  ['/figma/logo-822253f5.svg', '/figma/logo-dark-b165af4a.svg', [21.56, 36.38, 71.96, 60.49]],
  ['/figma/logo-05d1f928.svg', '/figma/logo-dark-3f3a5c41.svg', [24.83, 25.7, 64.34, 71.95]],
  ['/figma/logo-eb104721.svg', '/figma/logo-dark-386a2dd3.svg', [25.17, 57.71, 64.34, 39.94]],
  ['/figma/logo-8b877456.svg', '/figma/logo-dark-d5787ae8.svg', [63.99, 28.48, 27.62, 69.7]],
  ['/figma/logo-38ef07ed.svg', '/figma/logo-dark-0a654c3a.svg', [63.99, 10.06, 27.62, 88.12]],
]

const toRect = ([t, r, b, l]: Inset) => ({
  x: (l / 100) * VIEW_W,
  y: (t / 100) * VIEW_H,
  width: ((100 - l - r) / 100) * VIEW_W,
  height: ((100 - t - b) / 100) * VIEW_H,
})

type Props = {
  className?: string
  size?: 'sm' | 'lg'
  tone?: 'light' | 'dark'
  ariaLabel?: string
}

const SIZE = {
  sm: { w: 130.629, h: 40 },
  lg: { w: 195.944, h: 60 },
} as const

export function Logo({ className, size = 'sm', tone = 'light', ariaLabel = 'Alba Ventanas' }: Props) {
  const { w, h } = SIZE[size]
  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      width={w}
      height={h}
      className={className}
    >
      {PARTS.map(([light, dark, inset]) => {
        const src = tone === 'dark' ? dark : light
        const rect = toRect(inset)
        return <image key={src} href={src} {...rect} preserveAspectRatio="none" />
      })}
    </svg>
  )
}
