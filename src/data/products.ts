import { PALETTES } from './palettes'
import productsJson from './products.json'
import {
  PALETTE_KEYS,
  type PaletteKey,
  type Product,
  type ProductRaw,
} from './products-types'
import { validateProducts } from './validate-products'

export {
  PRODUCT_CATEGORIES,
  PRODUCT_SUBCATEGORIES,
  PALETTE_KEYS,
} from './products-types'
export type {
  ProductCategory,
  ProductSubcategory,
  SpecKey,
  Spec,
  ProductColor,
  ProductComponent,
  ProductHighlight,
  ProductDetail,
  ProductFamily,
  Product,
  PaletteKey,
  ProductRaw,
} from './products-types'

const isPaletteKey = (v: unknown): v is PaletteKey =>
  typeof v === 'string' && (PALETTE_KEYS as readonly string[]).includes(v)

const resolveProduct = (raw: ProductRaw): Product => ({
  ...raw,
  detail: {
    ...raw.detail,
    colors: isPaletteKey(raw.detail.colors) ? PALETTES[raw.detail.colors] : raw.detail.colors,
  },
})

export const PRODUCTS: Product[] = validateProducts(productsJson).map(resolveProduct)
