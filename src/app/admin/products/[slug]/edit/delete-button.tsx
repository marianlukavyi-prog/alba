'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { showToast } from '@/components/admin/toast'

type Props = {
  slug: string
  onDelete: () => Promise<{ ok: boolean; error?: string }>
}

export function DeleteButton({ slug, onDelete }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    if (!confirm(`Видалити «${slug}»? Це змінить файл products.json.`)) return
    startTransition(async () => {
      const res = await onDelete()
      if (res.ok) {
        showToast(`Видалено: «${slug}»`, 'success')
        router.push('/admin/products')
        router.refresh()
      } else {
        showToast(`Помилка видалення: ${res.error}`, 'error')
      }
    })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="rounded-full border border-red-300 bg-white px-4 py-2 text-[14px] text-red-600 hover:bg-red-50 disabled:opacity-50"
    >
      {isPending ? 'Видалення…' : 'Видалити'}
    </button>
  )
}
