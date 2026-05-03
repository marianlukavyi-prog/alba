'use client'

import Image from 'next/image'
import { useEffect, useMemo } from 'react'

export type FileValue = File | string | null

type SingleProps = {
  value: FileValue
  onChange: (next: FileValue) => void
  label?: string
}

export function FilePicker({ value, onChange, label }: SingleProps) {
  const preview = useObjectUrl(value)

  return (
    <div className="flex items-start gap-3 rounded-[2px] border border-dashed border-[#dcdcdc] bg-white p-3">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[2px] bg-[var(--color-surface)]">
        {preview ? (
          <Image src={preview} alt="" fill sizes="80px" className="object-contain" unoptimized />
        ) : (
          <span className="flex h-full items-center justify-center text-[11px] text-[var(--color-brand-soft)]">
            no image
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) onChange(f)
          }}
          className="text-[12px]"
        />
        <div className="flex items-center gap-2 text-[11px] text-[var(--color-brand-soft)]">
          <span className="truncate">
            {value instanceof File
              ? `📤 ${value.name} (${(value.size / 1024).toFixed(0)} KB)`
              : value
                ? value
                : label ?? 'Pick a file'}
          </span>
          {value ? (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-red-600 hover:underline"
            >
              ✕ clear
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

type MultiProps = {
  values: FileValue[]
  onChange: (next: FileValue[]) => void
}

export function MultiFilePicker({ values, onChange }: MultiProps) {
  return (
    <div className="flex flex-col gap-2">
      {values.map((v, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="flex-1">
            <FilePicker
              value={v}
              onChange={(next) =>
                onChange(next === null ? values.filter((_, j) => j !== i) : values.map((x, j) => (j === i ? next : x)))
              }
            />
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files ?? [])
            if (files.length > 0) onChange([...values, ...files])
            e.target.value = ''
          }}
          className="text-[12px]"
        />
        <span className="text-[11px] text-[var(--color-brand-soft)]">
          add more (multi-select supported)
        </span>
      </div>
    </div>
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
