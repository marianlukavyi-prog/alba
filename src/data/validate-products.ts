import {
  PALETTE_KEYS,
  PRODUCT_CATEGORIES,
  PRODUCT_SUBCATEGORIES,
  type PaletteKey,
  type ProductCategory,
  type ProductRaw,
  type ProductSubcategory,
  type SpecKey,
} from './products-types'

const SPEC_KEYS: SpecKey[] = [
  'depth',
  'chambers',
  'glazing',
  'thermal',
  'sound',
  'material',
  'type',
  'mounting',
  'control',
  'maxSize',
  'lamellaAngle',
]

const FAMILIES = ['pvc', 'aluminum'] as const

class ProductValidationError extends Error {
  constructor(public errors: string[]) {
    super(`Invalid products.json:\n - ${errors.join('\n - ')}`)
    this.name = 'ProductValidationError'
  }
}

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

const isStr = (v: unknown): v is string => typeof v === 'string'

const inSet = <T extends string>(set: readonly T[], v: unknown): v is T =>
  isStr(v) && (set as readonly string[]).includes(v)

const validateOne = (raw: unknown, idx: number): string[] => {
  const errs: string[] = []
  const at = (msg: string) => `[${idx}] ${msg}`

  if (!isObj(raw)) return [at('not an object')]

  if (!isStr(raw.slug) || !raw.slug) errs.push(at('slug must be non-empty string'))
  if (!isStr(raw.name) || !raw.name) errs.push(at(`${raw.slug ?? '?'}: name required`))
  if (!inSet(PRODUCT_CATEGORIES, raw.category))
    errs.push(at(`${raw.slug}: category invalid (${String(raw.category)})`))
  if (!inSet(PRODUCT_SUBCATEGORIES, raw.subcategory))
    errs.push(at(`${raw.slug}: subcategory invalid (${String(raw.subcategory)})`))
  if (raw.family !== undefined && !inSet(FAMILIES, raw.family))
    errs.push(at(`${raw.slug}: family invalid (${String(raw.family)})`))

  if (!isObj(raw.image) || !isStr((raw.image as Record<string, unknown>).src))
    errs.push(at(`${raw.slug}: image.src missing`))

  if (!Array.isArray(raw.specs)) errs.push(at(`${raw.slug}: specs must be array`))
  else
    raw.specs.forEach((s, i) => {
      if (!isObj(s) || !inSet(SPEC_KEYS, s.key) || !isStr(s.value))
        errs.push(at(`${raw.slug}: specs[${i}] invalid`))
    })

  if (!isObj(raw.detail)) {
    errs.push(at(`${raw.slug}: detail missing`))
    return errs
  }

  const d = raw.detail
  if (!isStr(d.subtitle)) errs.push(at(`${raw.slug}: detail.subtitle required`))
  if (!isStr(d.description)) errs.push(at(`${raw.slug}: detail.description required`))
  if (!Array.isArray(d.highlights)) errs.push(at(`${raw.slug}: detail.highlights must be array`))
  if (!Array.isArray(d.components)) errs.push(at(`${raw.slug}: detail.components must be array`))
  if (!Array.isArray(d.gallery)) errs.push(at(`${raw.slug}: detail.gallery must be array`))

  // colors: either palette key string or array of {name, hex?, image?}
  const colors = d.colors
  if (isStr(colors)) {
    if (!(PALETTE_KEYS as readonly string[]).includes(colors))
      errs.push(at(`${raw.slug}: detail.colors palette key invalid (${colors})`))
  } else if (Array.isArray(colors)) {
    colors.forEach((c, i) => {
      if (!isObj(c) || !isStr(c.name)) errs.push(at(`${raw.slug}: detail.colors[${i}] invalid`))
    })
  } else {
    errs.push(at(`${raw.slug}: detail.colors must be palette key or array`))
  }

  return errs
}

export function validateProducts(raw: unknown): ProductRaw[] {
  if (!Array.isArray(raw)) throw new ProductValidationError(['products.json must be array'])

  const errors: string[] = []
  const slugs = new Set<string>()

  raw.forEach((p, i) => {
    errors.push(...validateOne(p, i))
    if (isObj(p) && isStr(p.slug)) {
      if (slugs.has(p.slug)) errors.push(`[${i}] duplicate slug: ${p.slug}`)
      slugs.add(p.slug)
    }
  })

  if (errors.length > 0) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[products] validation errors:', errors)
    } else {
      throw new ProductValidationError(errors)
    }
  }

  return raw as ProductRaw[]
}

// Re-export for external use (e.g. admin form pre-save check)
export { ProductValidationError }
export type { PaletteKey, ProductCategory, ProductSubcategory }
