'use client'

import { useEffect, useState } from 'react'

type ToastVariant = 'success' | 'error' | 'info'

type ToastEvent = { msg: string; variant: ToastVariant }

let listener: ((e: ToastEvent) => void) | null = null

export function showToast(msg: string, variant: ToastVariant = 'info') {
  listener?.({ msg, variant })
}

export function ToastHost() {
  const [toast, setToast] = useState<ToastEvent | null>(null)

  useEffect(() => {
    listener = (e) => {
      setToast(e)
      const t = setTimeout(() => setToast(null), 4000)
      return () => clearTimeout(t)
    }
    return () => {
      listener = null
    }
  }, [])

  if (!toast) return null

  const bg = {
    success: 'bg-green-50 border-green-300 text-green-900',
    error: 'bg-red-50 border-red-300 text-red-900',
    info: 'bg-white border-[#dcdcdc] text-[var(--color-brand)]',
  }[toast.variant]

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-50 max-w-sm rounded-[4px] border px-4 py-3 text-[14px] shadow-lg ${bg}`}
    >
      {toast.msg}
    </div>
  )
}
