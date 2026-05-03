'use server'

import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { revalidatePath } from 'next/cache'
import productsJson from '@/data/products.json'
import type { PaletteKey, ProductRaw } from '@/data/products-types'
import { validateProducts } from '@/data/validate-products'
import { resolveUploads } from '@/lib/save-upload'

const PRODUCTS_JSON = resolve(process.cwd(), 'src/data/products.json')

type RawPayload = {
  slug: string
  name: string
  category: string
  subcategory: string
  family: string
  image: string  // path or "__upload_<n>__"
  specs: { key: string; value: string }[]
  subtitle: string
  description: string
  highlights: { label: string; value: string }[]
  components: { title: string; description: string; images: string[] }[]
  colorMode: 'palette' | 'custom'
  paletteKey: PaletteKey
  customColors: { name: string; hex?: string; image?: string }[]
  gallery: string[]
}

const buildRaw = (p: RawPayload): ProductRaw => {
  const family = p.family === 'pvc' || p.family === 'aluminum' ? p.family : undefined
  const colors = p.colorMode === 'palette' ? p.paletteKey : p.customColors
  const cleanComponents = p.components.map((c) => ({
    title: c.title,
    description: c.description,
    ...(c.images && c.images.length > 0 ? { images: c.images.filter(Boolean) } : {}),
  }))
  return {
    slug: p.slug,
    name: p.name,
    category: p.category as ProductRaw['category'],
    subcategory: p.subcategory as ProductRaw['subcategory'],
    ...(family ? { family } : {}),
    specs: p.specs as ProductRaw['specs'],
    image: { src: p.image },
    detail: {
      subtitle: p.subtitle,
      description: p.description,
      highlights: p.highlights,
      components: cleanComponents,
      colors,
      gallery: p.gallery.filter(Boolean),
    },
  }
}

const writeJson = async (data: ProductRaw[]) => {
  validateProducts(data)
  await writeFile(PRODUCTS_JSON, JSON.stringify(data, null, 2) + '\n', 'utf8')
}

const revalidate = (slug: string, category: string) => {
  revalidatePath('/admin/products')
  revalidatePath('/uk/products', 'layout')
  revalidatePath('/en/products', 'layout')
  revalidatePath(`/uk/products/${category}/${slug}`)
}

const parseAndResolve = async (formData: FormData, slug: string): Promise<RawPayload> => {
  const raw = JSON.parse(formData.get('payload') as string) as RawPayload
  return await resolveUploads(raw, formData, slug, slug)
}

export async function createProduct(
  formData: FormData,
): Promise<{ ok: boolean; error?: string; slug?: string }> {
  try {
    const slug = JSON.parse(formData.get('payload') as string).slug as string
    if (!slug) return { ok: false, error: 'slug required' }
    const all = [...(productsJson as ProductRaw[])]
    if (all.some((p) => p.slug === slug)) {
      return { ok: false, error: `slug "${slug}" already exists` }
    }
    const payload = await parseAndResolve(formData, slug)
    all.push(buildRaw(payload))
    await writeJson(all)
    revalidate(payload.slug, payload.category)
    return { ok: true, slug: payload.slug }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

export async function updateProduct(
  formData: FormData,
): Promise<{ ok: boolean; error?: string; slug?: string }> {
  try {
    const originalSlug = (formData.get('originalSlug') as string) ?? ''
    const newSlug = JSON.parse(formData.get('payload') as string).slug as string
    const all = [...(productsJson as ProductRaw[])]
    const idx = all.findIndex((p) => p.slug === originalSlug)
    if (idx < 0) return { ok: false, error: `product "${originalSlug}" not found` }
    if (originalSlug !== newSlug && all.some((p) => p.slug === newSlug)) {
      return { ok: false, error: `slug "${newSlug}" already exists` }
    }
    const payload = await parseAndResolve(formData, newSlug)
    all[idx] = buildRaw(payload)
    await writeJson(all)
    revalidate(payload.slug, payload.category)
    return { ok: true, slug: payload.slug }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

export async function deleteProduct(slug: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const all = (productsJson as ProductRaw[]).filter((p) => p.slug !== slug)
    if (all.length === productsJson.length) return { ok: false, error: 'not found' }
    await writeJson(all)
    revalidatePath('/admin/products')
    revalidatePath('/uk/products', 'layout')
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}
