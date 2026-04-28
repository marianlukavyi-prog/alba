import Link from 'next/link'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { ChevronDownIcon } from '@/components/icons/chevron-down'
import { Logo } from '@/components/brand/logo'
import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { defaultLocale, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'

type Props = {
  lang: Locale
  dict: Dictionary
  position?: 'fixed' | 'absolute'
  /**
   * 'overlay' (default) — transparent background, used over a hero banner image.
   * 'solid' — brand background, used on pages without a hero image so the
   * white text stays legible.
   */
  variant?: 'overlay' | 'solid'
}

const localePath = (locale: Locale, path = '') =>
  locale === defaultLocale ? path || '/' : `/${locale}${path}`

export function Header({ lang, dict, position = 'fixed', variant = 'overlay' }: Props) {
  const home = localePath(lang)
  const positionClass =
    position === 'fixed' ? 'fixed inset-x-0 top-0 z-50' : 'absolute inset-x-0 top-0 z-50'
  const bgClass = variant === 'solid' ? 'bg-[var(--color-cta)]' : ''

  return (
    <header className={`${positionClass} ${bgClass}`}>
      <div className="mx-auto flex h-[76px] max-w-[1150px] items-center justify-between px-6 py-3 text-white">
        <Link href={home} aria-label="Alba Ventanas" className="shrink-0">
          <Logo size="sm" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 text-[15px] lg:flex">
          <Link
            href={localePath(lang, '/products')}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            {dict.nav.products}
            <ChevronDownIcon />
          </Link>
          <Link href={localePath(lang, '/about')} className="transition-opacity hover:opacity-80">
            {dict.nav.about}
          </Link>
          <Link
            href={localePath(lang, '/projects')}
            className="transition-opacity hover:opacity-80"
          >
            {dict.nav.projects}
          </Link>
          <Link href={localePath(lang, '/process')} className="transition-opacity hover:opacity-80">
            {dict.nav.process}
          </Link>
          <Link href={localePath(lang, '/blog')} className="transition-opacity hover:opacity-80">
            {dict.nav.blog}
          </Link>
          <Link href={localePath(lang, '/contact')} className="transition-opacity hover:opacity-80">
            {dict.nav.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-5">
          <LanguageSwitcher lang={lang} className="hidden lg:block" />
          <Link
            href={localePath(lang, '/contact')}
            className="hidden h-12 w-[272px] items-center justify-center gap-[10px] rounded-[2px] border border-white px-6 text-[15px] font-medium tracking-[0.3px] transition-colors hover:bg-white hover:text-[var(--color-brand)] lg:flex"
          >
            {dict.common.consult}
            <ArrowUpRightIcon />
          </Link>
        </div>
      </div>
    </header>
  )
}
