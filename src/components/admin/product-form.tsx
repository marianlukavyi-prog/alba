'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { FilePicker, MultiFilePicker, type FileValue } from '@/components/admin/file-picker'
import {
  CATEGORY_LABELS,
  FAMILY_LABELS,
  PALETTE_LABELS,
  SPEC_LABELS,
  SUBCATEGORY_LABELS,
} from '@/components/admin/product-labels'
import { SearchableSelect } from '@/components/admin/searchable-select'
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
        showToast(`Збережено: «${res.slug}»`, 'success')
        router.push('/admin/products')
        router.refresh()
      } else {
        setError(res.error ?? 'Не вдалося зберегти')
        showToast(res.error ?? 'Не вдалося зберегти', 'error')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error ? (
        <div className="rounded-[2px] bg-red-50 px-4 py-3 text-[14px] text-red-700">{error}</div>
      ) : null}

      <Section title="Основне">
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Slug (URL-адреса)"
            hint="Латиниця, цифри і дефіси. Заповниться автоматично з назви."
          >
            <input
              required
              value={state.slug}
              onChange={(e) => update('slug', e.target.value.trim())}
              className={inputCls}
              placeholder="my-product"
              pattern="^[a-z0-9]+(-[a-z0-9]+)*$"
              title="Тільки малі латинські літери, цифри і дефіси (без дефіса спереду чи в кінці)"
            />
          </Field>
          <Field label="Назва товару">
            <input
              required
              value={state.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className={inputCls}
              placeholder="Напр. Schüco Living"
            />
          </Field>
          <Field
            label="Категорія"
            hint="Головний розділ каталогу: вікна ПВХ, алюміній, двері, системи, сонцезахист"
          >
            <SearchableSelect<ProductCategory>
              value={state.category}
              onChange={(v) => update('category', v)}
              columns={1}
              searchPlaceholder="Пошук категорії…"
              options={PRODUCT_CATEGORIES.map((c) => ({
                value: c,
                label: CATEGORY_LABELS[c] ?? c,
              }))}
            />
          </Field>
          <Field label="Підкатегорія" hint="Тип товару всередині категорії">
            <SearchableSelect<ProductSubcategory>
              value={state.subcategory}
              onChange={(v) => update('subcategory', v)}
              columns={2}
              searchPlaceholder="Пошук підкатегорії…"
              options={PRODUCT_SUBCATEGORIES.map((s) => ({
                value: s,
                label: SUBCATEGORY_LABELS[s] ?? s,
              }))}
            />
          </Field>
          <Field
            label="Родина (необов'язково)"
            hint="Об'єднує товари в родину (PVC або Aluminium) — впливає на фільтри"
          >
            <SearchableSelect<ProductFamily | ''>
              value={state.family}
              onChange={(v) => update('family', v)}
              columns={1}
              searchPlaceholder="Пошук родини…"
              placeholder="— не вказано —"
              options={FAMILIES.map((f) => ({
                value: f,
                label: f === '' ? '— не вказано —' : FAMILY_LABELS[f],
              }))}
            />
          </Field>
          <div className="col-span-2">
            <Field
              label="Головне зображення"
              hint="Картинка для каталогу. Завантаж файл — він збережеться у public/figma/products/."
            >
              <FilePicker value={state.image} onChange={(v) => update('image', v)} />
            </Field>
          </div>
        </div>
      </Section>

      <Section
        title="Технічні характеристики"
        description="Параметри що показуються блоком на сторінці товару (глибина, склопакет, шумоізоляція тощо)."
      >
        <DynamicList
          items={state.specs}
          onChange={(specs) => update('specs', specs)}
          render={(item, onUpdate) => (
            <div className="grid grid-cols-2 gap-2">
              <SearchableSelect<SpecKey>
                value={item.key}
                onChange={(v) => onUpdate({ ...item, key: v })}
                columns={2}
                searchPlaceholder="Пошук параметра…"
                options={SPEC_KEYS.map((k) => ({ value: k, label: SPEC_LABELS[k] ?? k }))}
              />
              <input
                value={item.value}
                onChange={(e) => onUpdate({ ...item, value: e.target.value })}
                className={inputCls}
                placeholder="значення"
              />
            </div>
          )}
          emptyItem={() => ({ key: 'depth' as SpecKey, value: '' })}
          addLabel="Додати характеристику"
        />
      </Section>

      <Section
        title="Опис на сторінці товару"
        description="Текст який бачить відвідувач коли клікає товар."
      >
        <Field label="Підзаголовок">
          <textarea
            value={state.subtitle}
            onChange={(e) => update('subtitle', e.target.value)}
            className={`${inputCls} min-h-[60px]`}
            placeholder="Короткий опис під назвою товару"
          />
        </Field>
        <Field
          label="Повний опис"
          hint="Для нового абзацу натискай Enter двічі (або вставляй \\n\\n у тексті)."
        >
          <textarea
            value={state.description}
            onChange={(e) => update('description', e.target.value)}
            className={`${inputCls} min-h-[200px] font-mono text-[13px]`}
            placeholder="Детальний опис товару, переваги, особливості…"
          />
        </Field>
      </Section>

      <Section
        title="Ключові переваги"
        description="Карточки 'параметр / значення' під описом — Uw, шумоізоляція, гарантія тощо."
      >
        <DynamicList
          items={state.highlights}
          onChange={(highlights) => update('highlights', highlights)}
          render={(item, onUpdate) => (
            <div className="flex gap-2">
              <input
                value={item.label}
                onChange={(e) => onUpdate({ ...item, label: e.target.value })}
                className={inputCls}
                placeholder="назва (наприклад: Uw, Гарантія)"
              />
              <input
                value={item.value}
                onChange={(e) => onUpdate({ ...item, value: e.target.value })}
                className={inputCls}
                placeholder="значення (наприклад: 0.71 W/m²K, 10 років)"
              />
            </div>
          )}
          emptyItem={() => ({ label: '', value: '' })}
          addLabel="Додати перевагу"
        />
      </Section>

      <Section
        title="Складники / опції товару"
        description="Окремі блоки на сторінці — наприклад, типи скла, варіанти профілю, аксесуари. До кожного — фото."
      >
        <DynamicList<ComponentDraft>
          items={state.components}
          onChange={(components) => update('components', components)}
          render={(item, onUpdate) => (
            <div className="flex flex-col gap-3 rounded-[2px] border border-[#e3e3e3] bg-[#fafafa] p-3">
              <input
                value={item.title}
                onChange={(e) => onUpdate({ ...item, title: e.target.value })}
                className={inputCls}
                placeholder="назва (напр. Профіль, Склопакет)"
              />
              <input
                value={item.description}
                onChange={(e) => onUpdate({ ...item, description: e.target.value })}
                className={inputCls}
                placeholder="короткий опис"
              />
              <MultiFilePicker
                values={item.images}
                onChange={(images) => onUpdate({ ...item, images })}
              />
            </div>
          )}
          emptyItem={() => ({ title: '', description: '', images: [] })}
          addLabel="Додати складник"
        />
      </Section>

      <Section
        title="Кольори"
        description="Палітра — готовий набір кольорів виробника (RAL, SK_SP тощо). Власні — задаєш кольори вручну."
      >
        <div className="flex gap-4 text-[14px]">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={state.colorMode === 'palette'}
              onChange={() => update('colorMode', 'palette')}
            />
            Готова палітра
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={state.colorMode === 'custom'}
              onChange={() => update('colorMode', 'custom')}
            />
            Власні кольори
          </label>
        </div>
        {state.colorMode === 'palette' ? (
          <Field label="Виберіть палітру">
            <SearchableSelect<PaletteKey>
              value={state.paletteKey}
              onChange={(v) => update('paletteKey', v)}
              columns={1}
              searchPlaceholder="Пошук палітри…"
              options={PALETTE_KEYS.map((k) => ({ value: k, label: PALETTE_LABELS[k] ?? k }))}
            />
          </Field>
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
                  placeholder="назва кольору"
                />
                <input
                  value={item.hex ?? ''}
                  onChange={(e) => onUpdate({ ...item, hex: e.target.value || undefined })}
                  className={inputCls}
                  placeholder="#hex (опціонально)"
                />
                <input
                  value={item.image ?? ''}
                  onChange={(e) => onUpdate({ ...item, image: e.target.value || undefined })}
                  className={inputCls}
                  placeholder="шлях до зображення (опціонально)"
                />
              </div>
            )}
            emptyItem={() => ({ name: '' })}
            addLabel="Додати колір"
          />
        )}
      </Section>

      <Section
        title="Галерея"
        description="Додаткові фото для слайдера на сторінці товару. Можна вибрати кілька файлів одночасно."
      >
        <MultiFilePicker
          values={state.gallery}
          onChange={(gallery) => update('gallery', gallery)}
        />
      </Section>

      <div className="sticky bottom-0 z-20 -mx-px flex justify-end gap-3 rounded-b-[4px] border-t border-[#e3e3e3] bg-white/95 px-6 py-4 backdrop-blur">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border border-[#dcdcdc] bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--color-brand)] transition-colors hover:border-[var(--color-brand)] hover:bg-[var(--color-surface)]"
        >
          Скасувати
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-[14px] font-semibold text-[var(--color-brand)] shadow-sm transition-colors hover:bg-[#e6b801] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Spinner /> Зберігаю…
            </>
          ) : (
            <>
              <CheckMark /> {submitLabel}
            </>
          )}
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

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <fieldset className="flex flex-col gap-3 rounded-[4px] bg-white p-5">
      <legend className="text-[16px] font-semibold text-[var(--color-brand)]">{title}</legend>
      {description ? (
        <p className="-mt-1 text-[12px] leading-snug text-[var(--color-brand-soft)]">
          {description}
        </p>
      ) : null}
      {children}
    </fieldset>
  )
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5 text-[12px] font-medium uppercase tracking-wide text-[var(--color-brand-soft)]">
      {label}
      {children}
      {hint ? (
        <span className="mt-0.5 text-[11px] font-normal normal-case tracking-normal text-[var(--color-brand-soft)]">
          {hint}
        </span>
      ) : null}
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
        <div
          key={i}
          className="group flex items-start gap-2 rounded-[4px] border border-transparent p-1 hover:border-[#eee] hover:bg-[#fafafa]"
        >
          <div className="flex flex-col gap-0.5 pt-1">
            <button
              type="button"
              onClick={() => move(i, i - 1)}
              disabled={i === 0}
              className="flex size-6 items-center justify-center rounded-[3px] text-[var(--color-brand-soft)] hover:bg-white hover:text-[var(--color-brand)] disabled:opacity-30 disabled:hover:bg-transparent"
              aria-label="Перемістити вгору"
            >
              <ArrowIcon dir="up" />
            </button>
            <button
              type="button"
              onClick={() => move(i, i + 1)}
              disabled={i === items.length - 1}
              className="flex size-6 items-center justify-center rounded-[3px] text-[var(--color-brand-soft)] hover:bg-white hover:text-[var(--color-brand)] disabled:opacity-30 disabled:hover:bg-transparent"
              aria-label="Перемістити вниз"
            >
              <ArrowIcon dir="down" />
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
            className="mt-0.5 flex size-7 items-center justify-center rounded-[3px] text-[var(--color-brand-soft)] hover:bg-red-50 hover:text-red-600"
            aria-label="Видалити"
            title="Видалити"
          >
            <TrashIcon />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, emptyItem()])}
        className="inline-flex items-center gap-2 self-start rounded-full border border-dashed border-[#dcdcdc] bg-white px-4 py-2 text-[13px] font-medium text-[var(--color-brand)] transition-colors hover:border-[var(--color-brand)] hover:bg-[var(--color-surface)]"
      >
        <PlusIcon />
        {addLabel}
      </button>
    </div>
  )
}

function ArrowIcon({ dir }: { dir: 'up' | 'down' }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dir === 'up' ? <polyline points="6 15 12 9 18 15" /> : <polyline points="6 9 12 15 18 9" />}
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function CheckMark() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function Spinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className="animate-spin"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}
