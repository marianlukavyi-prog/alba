import { PALETTES } from './palettes'
import productsJson from './products.json'
import type { Locale } from '@/i18n/config'
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
  TRANSLATION_LOCALES,
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
  TranslationLocale,
  ProductTranslation,
  ProductTranslations,
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

export function getLocalizedProduct(product: Product, locale: Locale): Product {
  if (locale === 'uk') return product
  const t = product.translations?.[locale as 'en' | 'es' | 'ru']
  if (!t) return product
  return {
    ...product,
    name: t.name ?? product.name,
    specs: t.specsValues
      ? product.specs.map((s, i) => ({ ...s, value: t.specsValues![i] ?? s.value }))
      : product.specs,
    detail: {
      ...product.detail,
      subtitle: t.detail?.subtitle ?? product.detail.subtitle,
      description: t.detail?.description ?? product.detail.description,
      highlights: t.detail?.highlights ?? product.detail.highlights,
      components: t.detail?.components
        ? product.detail.components.map((c, i) => ({
            ...c,
            title: t.detail!.components![i]?.title ?? c.title,
            description: t.detail!.components![i]?.description ?? c.description,
          }))
        : product.detail.components,
    },
  }
}
