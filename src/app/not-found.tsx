import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you are looking for could not be found.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-white font-sans">
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="text-[64px] font-semibold text-[var(--color-brand)]">404</p>
          <h1 className="text-[28px] font-semibold text-[var(--color-brand)]">Page not found</h1>
          <p className="max-w-[420px] text-[15px] text-[var(--color-brand-soft)]">
            The page you are looking for could not be found or has been moved.
          </p>
          <Link
            href="/"
            className="flex h-[52px] items-center justify-center rounded-[2px] bg-[var(--color-cta)] px-8 text-[15px] font-medium tracking-[0.3px] text-white transition-colors hover:bg-[var(--color-brand)]"
          >
            Back to home
          </Link>
        </main>
      </body>
    </html>
  )
}
