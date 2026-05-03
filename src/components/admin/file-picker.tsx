'use client'

import { useEffect, useMemo, useRef } from 'react'

export type FileValue = File | string | null

type SingleProps = {
  value: FileValue
  onChange: (next: FileValue) => void
}

export function FilePicker({ value, onChange }: SingleProps) {
  const preview = useObjectUrl(value)
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div
      className="group relative flex items-center gap-4 rounded-[6px] border border-dashed border-[#dcdcdc] bg-white p-3 transition-colors hover:border-[var(--color-brand)]"
      onClick={() => !value && inputRef.current?.click()}
      role={value ? undefined : 'button'}
      tabIndex={value ? undefined : 0}
      onKeyDown={(e) => {
        if (!value && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          inputRef.current?.click()
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onChange(f)
          e.target.value = ''
        }}
        className="hidden"
      />

      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[4px] border border-[#eee] bg-[var(--color-surface)]">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="h-full w-full object-contain" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-[10px] text-[var(--color-brand-soft)]">
            <UploadIcon />
            <span>фото</span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {value ? (
          <>
            <p className="truncate text-[13px] font-medium text-[var(--color-brand)]">
              {value instanceof File ? value.name : value.split('/').pop()}
            </p>
            <p className="text-[11px] text-[var(--color-brand-soft)]">
              {value instanceof File
                ? `${(value.size / 1024).toFixed(0)} KB · нове фото`
                : 'збережено'}
            </p>
            <div className="mt-1 flex gap-3 text-[12px]">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-[var(--color-brand)] hover:underline"
              >
                Замінити
              </button>
              <button
                type="button"
                onClick={() => onChange(null)}
                className="text-red-600 hover:underline"
              >
                Видалити
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-[14px] font-medium text-[var(--color-brand)]">
              Натисніть щоб обрати фото
            </p>
            <p className="text-[12px] text-[var(--color-brand-soft)]">
              JPG, PNG, WebP, AVIF — до 5 MB
            </p>
          </>
        )}
      </div>
    </div>
  )
}

type MultiProps = {
  values: FileValue[]
  onChange: (next: FileValue[]) => void
}

export function MultiFilePicker({ values, onChange }: MultiProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const addFiles = (files: File[]) => {
    if (files.length === 0) return
    onChange([...values, ...files])
  }

  return (
    <div className="flex flex-col gap-3">
      {values.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {values.map((v, i) => (
            <li key={i}>
              <Thumb
                value={v}
                onRemove={() => onChange(values.filter((_, j) => j !== i))}
                onMove={(dir) => {
                  const to = i + (dir === 'left' ? -1 : 1)
                  if (to < 0 || to >= values.length) return
                  const next = [...values]
                  const [it] = next.splice(i, 1)
                  next.splice(to, 0, it)
                  onChange(next)
                }}
                canMoveLeft={i > 0}
                canMoveRight={i < values.length - 1}
              />
            </li>
          ))}
        </ul>
      ) : null}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex items-center justify-center gap-2 rounded-[6px] border border-dashed border-[#dcdcdc] bg-white px-4 py-4 text-[14px] font-medium text-[var(--color-brand)] transition-colors hover:border-[var(--color-brand)] hover:bg-[var(--color-surface)]"
      >
        <UploadIcon />
        {values.length === 0 ? 'Додати фото' : 'Додати ще фото'}
        <span className="text-[12px] font-normal text-[var(--color-brand-soft)]">
          (можна одразу декілька)
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          addFiles(Array.from(e.target.files ?? []))
          e.target.value = ''
        }}
        className="hidden"
      />
    </div>
  )
}

function Thumb({
  value,
  onRemove,
  onMove,
  canMoveLeft,
  canMoveRight,
}: {
  value: FileValue
  onRemove: () => void
  onMove: (dir: 'left' | 'right') => void
  canMoveLeft: boolean
  canMoveRight: boolean
}) {
  const url = useObjectUrl(value)
  const fileName = value instanceof File ? value.name : (value ?? '').split('/').pop()

  return (
    <div className="group relative aspect-square overflow-hidden rounded-[6px] border border-[#eee] bg-[var(--color-surface)]">
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-[11px] text-[var(--color-brand-soft)]">
          немає фото
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-gradient-to-t from-black/70 to-transparent px-2 pt-4 pb-1.5">
        <p className="truncate text-[10px] text-white" title={fileName}>
          {fileName}
        </p>
      </div>

      <div className="absolute top-1 right-1 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          type="button"
          onClick={() => onMove('left')}
          disabled={!canMoveLeft}
          aria-label="Перемістити вліво"
          className="flex size-6 items-center justify-center rounded-full bg-white/90 text-[12px] text-[var(--color-brand)] hover:bg-white disabled:opacity-30"
        >
          ◀
        </button>
        <button
          type="button"
          onClick={() => onMove('right')}
          disabled={!canMoveRight}
          aria-label="Перемістити вправо"
          className="flex size-6 items-center justify-center rounded-full bg-white/90 text-[12px] text-[var(--color-brand)] hover:bg-white disabled:opacity-30"
        >
          ▶
        </button>
        <button
          type="button"
          onClick={onRemove}
          aria-label="Видалити фото"
          className="flex size-6 items-center justify-center rounded-full bg-red-600 text-[12px] text-white hover:bg-red-700"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

function UploadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}

function useObjectUrl(v: FileValue): string | null {
  const url = useMemo(() => {
    if (v instanceof File) return URL.createObjectURL(v)
    if (typeof v === 'string') return v
    return null
  }, [v])

  useEffect(() => {
    return () => {
      if (url?.startsWith('blob:')) URL.revokeObjectURL(url)
    }
  }, [url])

  return url
}
