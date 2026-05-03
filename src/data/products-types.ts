export const PRODUCT_CATEGORIES = ['pvc', 'aluminum', 'doors', 'systems', 'shading'] as const
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

export const PRODUCT_SUBCATEGORIES = [
  'windows',
  'wood-aluminum',
  'entrance',
  'sliding',
  'swing-doors',
  'auto-sliding',
  'pivot',
  'facade',
  'folding',
  'sliding-folding',
  'screen',
  'rollers',
  'roller-screen',
  'venetian-blinds',
  'pergolas',
] as const
export type ProductSubcategory = (typeof PRODUCT_SUBCATEGORIES)[number]

export type SpecKey =
  | 'depth'
  | 'chambers'
  | 'glazing'
  | 'thermal'
  | 'sound'
  | 'material'
  | 'type'
  | 'mounting'
  | 'control'
  | 'maxSize'
  | 'lamellaAngle'

export type Spec = { key: SpecKey; value: string }

export type ProductColor = { name: string; hex?: string; image?: string }

export type ProductComponent = {
  title: string
  description: string
  image?: string
  images?: string[]
}

export type ProductHighlight = { label: string; value: string }

export const PALETTE_KEYS = ['SK_SP', 'SKT_SKB', 'RAL', 'PERGOLA'] as const
export type PaletteKey = (typeof PALETTE_KEYS)[number]

export type ProductDetail = {
  subtitle: string
  highlights: ProductHighlight[]
  description: string
  components: ProductComponent[]
  colors: ProductColor[]
  gallery: string[]
}

export type ProductFamily = 'pvc' | 'aluminum'

export type Product = {
  slug: string
  name: string
  category: ProductCategory
  subcategory: ProductSubcategory
  family?: ProductFamily
  specs: Spec[]
  image: { src: string }
  detail: ProductDetail
}

/**
 * Raw JSON shape — `colors` may be either a palette key (string) or inline array.
 * Loader resolves the string into ProductColor[].
 */
export type ProductRaw = Omit<Product, 'detail'> & {
  detail: Omit<ProductDetail, 'colors'> & {
    colors: ProductColor[] | PaletteKey
  }
}
