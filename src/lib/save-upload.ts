import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const PUBLIC_DIR = resolve(process.cwd(), 'public/figma/products')

const sanitizeExt = (name: string): string => {
  const m = name.toLowerCase().match(/\.([a-z0-9]{1,5})$/)
  if (!m) return 'webp'
  const ext = m[1]
  return ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext) ? ext : 'webp'
}

const sanitizeSlug = (slug: string): string =>
  slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

export async function saveUploadedFile(
  file: File,
  slug: string,
  role: string,
): Promise<string> {
  const cleanSlug = sanitizeSlug(slug)
  if (!cleanSlug) throw new Error('Invalid slug')

  const ext = sanitizeExt(file.name)
  const ts = Date.now() + Math.floor(Math.random() * 1000)
  const filename = `${role}-${ts}.${ext}`
  const dir = resolve(PUBLIC_DIR, cleanSlug)
  const fullPath = resolve(dir, filename)

  // Safety: must stay inside PUBLIC_DIR
  if (!fullPath.startsWith(PUBLIC_DIR + '/')) throw new Error('Path traversal blocked')

  await mkdir(dir, { recursive: true })
  const bytes = Buffer.from(await file.arrayBuffer())
  await writeFile(fullPath, bytes)

  return `/figma/products/${cleanSlug}/${filename}`
}

export async function resolveUploads<T>(
  value: T,
  formData: FormData,
  slug: string,
  role = 'photo',
): Promise<T> {
  if (typeof value === 'string' && value.startsWith('__upload_')) {
    const file = formData.get(value)
    if (file instanceof File && file.size > 0) {
      return (await saveUploadedFile(file, slug, role)) as T
    }
    return '' as T
  }
  if (Array.isArray(value)) {
    return (await Promise.all(
      value.map((v, i) => resolveUploads(v, formData, slug, `${role}-${i}`)),
    )) as T
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = await resolveUploads(v, formData, slug, `${role}-${k}`)
    }
    return out as T
  }
  return value
}
