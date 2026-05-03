'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { FilePicker, MultiFilePicker, type FileValue } from '@/components/admin/file-picker'
import { showToast } from '@/components/admin/toast'
import { PALETTES } from '@/data/palettes'
import {
  PALETTE_KEYS,
  PRODUCT_CATEGORIES,
  PRODUCT_SUBCATEGORIES,
  type PaletteKey,
  type Product,
  type ProductCategory,
  type ProductColor,
  type ProductFamily,
  type ProductHighlight,
  type ProductSubcategory,
  type Spec,
  type SpecKey,
} from '@/data/products-types'

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

const FAMILIES: (ProductFamily | '')[] = ['', 'pvc', 'aluminum']

type ComponentDraft = {
  title: string
  description: string
  images: FileValue[]
}

type FormState = {
  slug: string
  name: string
  category: ProductCategory
  subcategory: ProductSubcategory
  family: ProductFamily | ''
  image: FileValue
  specs: Spec[]
  subtitle: string
  description: string
  highlights: ProductHighlight[]
  components: ComponentDraft[]
  colorMode: 'palette' | 'custom'
  paletteKey: PaletteKey
  customColors: ProductColor[]
  gallery: FileValue[]
}

const emptyState: FormState = {
  slug: '',
  name: '',
  category: 'pvc',
  subcategory: 'windows',
  family: 'pvc',
  image: null,
  specs: [],
  subtitle: '',
  description: '',
  highlights: [],
  components: [],
  colorMode: 'palette',
  paletteKey: 'SK_SP',
  customColors: [],
  gallery: [],
}

const detectPaletteKey = (colors: ProductColor[]): PaletteKey | null => {
  for (const key of PALETTE_KEYS) {
    if (colors === PALETTES[key]) return key
    const palette = PALETTES[key]
    if (
      colors.length === palette.length &&
      colors.every((c, i) => c.name === palette[i].name && c.image === palette[i].image)
    ) {
      return key
    }
  }
  return null
}

const productToState = (p: Product): FormState => {
  const paletteKey = detectPaletteKey(p.detail.colors)
  return {
    slug: p.slug,
    name: p.name,
    category: p.category,
    subcategory: p.subcategory,
    family: p.family ?? '',
    image: p.image.src as FileValue,
    specs: p.specs,
    subtitle: p.detail.subtitle,
    description: p.detail.description,
    highlights: p.detail.highlights,
    components: p.detail.components.map((c) => ({
      title: c.title,
      description: c.description,
      images: (c.images ?? (c.image ? [c.image] : [])) as FileValue[],
    })),
    colorMode: paletteKey ? 'palette' : 'custom',
    paletteKey: paletteKey ?? 'SK_SP',
    customColors: paletteKey ? [] : p.detail.colors,
    gallery: p.detail.gallery as FileValue[],
  }
}

type Action = (data: FormData) => Promise<{ ok: boolean; error?: string; slug?: string }>

type Props = {
  initial?: Product
  onSubmit: Action
  submitLabel: string
}

export function ProductForm({ initial, onSubmit, submitLabel }: Props) {
  const router = useRouter()
  const [state, setState] = useState<FormState>(initial ? productToState(initial) : emptyState)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setState((s) => ({ ...s, [key]: value }))

  const handleNameChange = (name: string) => {
    setState((s) => {
      const slugIsDerived = !s.slug || s.slug === slugify(s.name)
      return { ...s, name, slug: slugIsDerived ? slugify(name) : s.slug }
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const fd = new FormData()
    let counter = 0
    const files = new Map<string, File>()

    const stash = (v: unknown): unknown => {
      if (v instanceof File) {
        const id = `__upload_${counter++}__`
        files.set(id, v)
        return id
      }
      if (Array.isArray(v)) return v.map(stash)
      if (v && typeof v === 'object') {
        const out: Record<string, unknown> = {}
        for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
          out[k] = stash(val)
        }
        return out
      }
      return v
    }

    const payload = stash(state)
    fd.set('payload', JSON.stringify(payload))
    for (const [id, file] of files) fd.append(id, file)

    startTransition(async () => {
      const res = await onSubmit(fd)
      if (res.ok) {
        showToast(`Saved "${res.slug}"`, 'success')
        router.push('/admin/products')
        router.refresh()
      } else {
        setError(res.error ?? 'Save failed')
        showToast(res.error ?? 'Save failed', 'error')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error ? (
        <div className="rounded-[2px] bg-red-50 px-4 py-3 text-[14px] text-red-700">{error}</div>
      ) : null}

      <Section title="Basics">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Slug">
            <input
              required
              value={state.slug}
              onChange={(e) => update('slug', e.target.value.trim())}
              className={inputCls}
              placeholder="my-product"
              pattern="^[a-z0-9]+(-[a-z0-9]+)*$"
              title="lowercase letters, digits, hyphens (no leading/trailing hyphen)"
            />
          </Field>
          <Field label="Name">
            <input
              required
              value={state.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Category">
            <select
              value={state.category}
              onChange={(e) => update('category', e.target.value as ProductCategory)}
              className={inputCls}
            >
              {PRODUCT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Subcategory">
            <select
              value={state.subcategory}
              onChange={(e) => update('subcategory', e.target.value as ProductSubcategory)}
              className={inputCls}
            >
              {PRODUCT_SUBCATEGORIES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Family (optional)">
            <select
              value={state.family}
              onChange={(e) => update('family', e.target.value as ProductFamily | '')}
              className={inputCls}
            >
              {FAMILIES.map((f) => (
                <option key={f} value={f}>
                  {f || '— none —'}
                </option>
              ))}
            </select>
          </Field>
          <div className="col-span-2">
            <Field label="Main image">
              <FilePicker value={state.image} onChange={(v) => update('image', v)} />
            </Field>
          </div>
        </div>
      </Section>

      <Section title="Specs">
        <DynamicList
          items={state.specs}
          onChange={(specs) => update('specs', specs)}
          render={(item, onUpdate) => (
            <div className="flex gap-2">
              <select
                value={item.key}
                onChange={(e) => onUpdate({ ...item, key: e.target.value as SpecKey })}
                className={inputCls}
              >
                {SPEC_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
              <input
                value={item.value}
                onChange={(e) => onUpdate({ ...item, value: e.target.value })}
                className={inputCls}
                placeholder="value"
              />
            </div>
          )}
          emptyItem={() => ({ key: 'depth' as SpecKey, value: '' })}
          addLabel="+ Add spec"
        />
      </Section>

      <Section title="Detail">
        <Field label="Subtitle">
          <textarea
            value={state.subtitle}
            onChange={(e) => update('subtitle', e.target.value)}
            className={`${inputCls} min-h-[60px]`}
          />
        </Field>
        <Field label="Description (use \\n\\n for paragraphs)">
          <textarea
            value={state.description}
            onChange={(e) => update('description', e.target.value)}
            className={`${inputCls} min-h-[200px] font-mono text-[13px]`}
          />
        </Field>
      </Section>

      <Section title="Highlights">
        <DynamicList
          items={state.highlights}
          onChange={(highlights) => update('highlights', highlights)}
          render={(item, onUpdate) => (
            <div className="flex gap-2">
              <input
                value={item.label}
                onChange={(e) => onUpdate({ ...item, label: e.target.value })}
                className={inputCls}
                placeholder="label"
              />
              <input
                value={item.value}
                onChange={(e) => onUpdate({ ...item, value: e.target.value })}
                className={inputCls}
                placeholder="value"
              />
            </div>
          )}
          emptyItem={() => ({ label: '', value: '' })}
          addLabel="+ Add highlight"
        />
      </Section>

      <Section title="Components">
        <DynamicList<ComponentDraft>
          items={state.components}
          onChange={(components) => update('components', components)}
          render={(item, onUpdate) => (
            <div className="flex flex-col gap-3 rounded-[2px] border border-[#e3e3e3] bg-[#fafafa] p-3">
              <input
                value={item.title}
                onChange={(e) => onUpdate({ ...item, title: e.target.value })}
                className={inputCls}
                placeholder="title"
              />
              <input
                value={item.description}
                onChange={(e) => onUpdate({ ...item, description: e.target.value })}
                className={inputCls}
                placeholder="description"
              />
              <MultiFilePicker
                values={item.images}
                onChange={(images) => onUpdate({ ...item, images })}
              />
            </div>
          )}
          emptyItem={() => ({ title: '', description: '', images: [] })}
          addLabel="+ Add component"
        />
      </Section>

      <Section title="Colors">
        <div className="flex gap-4 text-[14px]">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={state.colorMode === 'palette'}
              onChange={() => update('colorMode', 'palette')}
            />
            Palette
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={state.colorMode === 'custom'}
              onChange={() => update('colorMode', 'custom')}
            />
            Custom
          </label>
        </div>
        {state.colorMode === 'palette' ? (
          <select
            value={state.paletteKey}
            onChange={(e) => update('paletteKey', e.target.value as PaletteKey)}
            className={inputCls}
          >
            {PALETTE_KEYS.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        ) : (
          <DynamicList<ProductColor>
            items={state.customColors}
            onChange={(customColors) => update('customColors', customColors)}
            render={(item, onUpdate) => (
              <div className="flex gap-2">
                <input
                  value={item.name}
                  onChange={(e) => onUpdate({ ...item, name: e.target.value })}
                  className={inputCls}
                  placeholder="name"
                />
                <input
                  value={item.hex ?? ''}
                  onChange={(e) => onUpdate({ ...item, hex: e.target.value || undefined })}
                  className={inputCls}
                  placeholder="#hex (optional)"
                />
                <input
                  value={item.image ?? ''}
                  onChange={(e) => onUpdate({ ...item, image: e.target.value || undefined })}
                  className={inputCls}
                  placeholder="image path (optional)"
                />
              </div>
            )}
            emptyItem={() => ({ name: '' })}
            addLabel="+ Add color"
          />
        )}
      </Section>

      <Section title="Gallery">
        <MultiFilePicker
          values={state.gallery}
          onChange={(gallery) => update('gallery', gallery)}
        />
      </Section>

      <div className="flex justify-end gap-3 border-t border-[#e3e3e3] bg-white px-6 py-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border border-[#dcdcdc] px-5 py-2.5 text-[14px] hover:bg-[var(--color-surface)]"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-[14px] font-medium text-[var(--color-brand)] hover:bg-[#e6b801] disabled:opacity-50"
        >
          {isPending ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  )
}

const inputCls =
  'w-full rounded-[2px] border border-[#dcdcdc] bg-white px-3 py-2 text-[14px] outline-none focus:border-[var(--color-brand)]'

const slugify = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-3 rounded-[4px] bg-white p-5">
      <legend className="text-[16px] font-semibold text-[var(--color-brand)]">{title}</legend>
      {children}
    </fieldset>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-[12px] font-medium uppercase tracking-wide text-[var(--color-brand-soft)]">
      {label}
      {children}
    </label>
  )
}

type DynamicListProps<T> = {
  items: T[]
  onChange: (items: T[]) => void
  render: (item: T, onUpdate: (next: T) => void, idx: number) => React.ReactNode
  emptyItem: () => T
  addLabel: string
}

function DynamicList<T>({ items, onChange, render, emptyItem, addLabel }: DynamicListProps<T>) {
  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return
    const next = [...items]
    const [it] = next.splice(from, 1)
    next.splice(to, 0, it)
    onChange(next)
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="flex flex-col gap-0.5 pt-1.5 text-[10px] text-[var(--color-brand-soft)]">
            <button
              type="button"
              onClick={() => move(i, i - 1)}
              disabled={i === 0}
              className="hover:text-[var(--color-brand)] disabled:opacity-30"
              aria-label="Move up"
            >
              ▲
            </button>
            <button
              type="button"
              onClick={() => move(i, i + 1)}
              disabled={i === items.length - 1}
              className="hover:text-[var(--color-brand)] disabled:opacity-30"
              aria-label="Move down"
            >
              ▼
            </button>
          </div>
          <div className="flex-1">
            {render(
              item,
              (next) => onChange(items.map((x, j) => (j === i ? next : x))),
              i,
            )}
          </div>
          <button
            type="button"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            className="text-[12px] text-red-600 hover:underline"
            aria-label="Remove"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, emptyItem()])}
        className="self-start text-[13px] text-[var(--color-brand)] hover:underline"
      >
        {addLabel}
      </button>
    </div>
  )
}
