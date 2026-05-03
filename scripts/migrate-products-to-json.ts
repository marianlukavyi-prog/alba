import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { PALETTES } from '../src/data/palettes'
import { PRODUCTS } from '../src/data/products'
import type { ProductRaw, PaletteKey } from '../src/data/products-types'

const PALETTE_REVERSE: [PaletteKey, unknown][] = [
  ['SK_SP', PALETTES.SK_SP],
  ['SKT_SKB', PALETTES.SKT_SKB],
  ['RAL', PALETTES.RAL],
  ['PERGOLA', PALETTES.PERGOLA],
]

function detectPaletteKey(colors: unknown): PaletteKey | null {
  for (const [key, palette] of PALETTE_REVERSE) {
    if (colors === palette) return key
  }
  return null
}

const raw: ProductRaw[] = PRODUCTS.map((p) => {
  const paletteKey = detectPaletteKey(p.detail.colors)
  return {
    ...p,
    detail: {
      ...p.detail,
      colors: paletteKey ?? p.detail.colors,
    },
  }
})

const outPath = resolve(process.cwd(), 'src/data/products.json')
writeFileSync(outPath, JSON.stringify(raw, null, 2) + '\n', 'utf8')

const paletteUsage = raw.reduce<Record<string, number>>((acc, p) => {
  if (typeof p.detail.colors === 'string') acc[p.detail.colors] = (acc[p.detail.colors] ?? 0) + 1
  else acc.inline = (acc.inline ?? 0) + 1
  return acc
}, {})

console.warn(`Wrote ${raw.length} products → ${outPath}`)
console.warn('Palette usage:', paletteUsage)
