import Link from 'next/link'
import { Onest } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'
import { ToastHost } from '@/components/admin/toast'

const onest = Onest({
  variable: '--font-onest',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  display: 'swap',
})

export const metadata = {
  title: 'Alba Admin',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== 'development') notFound()

  return (
    <html lang="en" className={`${onest.variable} h-full antialiased`}>
      <body className="bg-background text-foreground min-h-full font-sans">
        <div className="min-h-screen bg-[var(--color-surface)]">
          <header className="sticky top-0 z-50 border-b border-[#e3e3e3] bg-white">
            <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
              <Link
                href="/admin/products"
                className="text-[18px] font-semibold text-[var(--color-brand)]"
              >
                Alba Admin
              </Link>
              <nav className="flex gap-4 text-[14px] text-[var(--color-brand-soft)]">
                <Link href="/admin/products" className="hover:text-[var(--color-brand)]">
                  Товари
                </Link>
                <Link href="/" className="hover:text-[var(--color-brand)]">
                  ← На сайт
                </Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-[1280px] px-6 py-8">{children}</main>
        </div>
        <ToastHost />
      </body>
    </html>
  )
}
