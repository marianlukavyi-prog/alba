import Link from 'next/link'
import { Logo } from '@/components/brand/logo'
import { ChevronDownIcon } from '@/components/icons/chevron-down'
import { EMAIL, PHONES } from '@/data/contact'
import { defaultLocale, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'

type Props = {
  lang: Locale
  dict: Dictionary
}

const SOCIALS = ['instagram', 'facebook', 'tiktok', 'youtube', 'telegram'] as const

const localePath = (locale: Locale, path = '') =>
  locale === defaultLocale ? path || '/' : `/${locale}${path}`

export function Footer({ lang, dict }: Props) {
  return (
    <footer className="bg-[var(--color-night)] text-white">
      <div className="mx-auto flex max-w-[1150px] flex-col gap-12 px-6 py-[90px] lg:flex-row lg:gap-[100px]">
        <div className="flex flex-1 flex-col gap-12 border-[#666] lg:flex-row lg:items-center lg:gap-[60px] lg:border-r lg:pr-[100px]">
          <div className="flex flex-col items-start justify-between gap-12 lg:h-[194px] lg:gap-0">
            <Logo size="lg" />
            <div className="flex w-[258px] flex-col gap-3">
              <ul className="flex items-center gap-3" aria-label={dict.footer.social}>
                {SOCIALS.map((name) => (
                  <li key={name}>
                    <a
                      href="#"
                      aria-label={name}
                      className="flex size-[42px] items-center justify-center rounded-full border border-white/30 transition-colors hover:border-white"
                    />
                  </li>
                ))}
              </ul>
              <p className="text-[15px] font-semibold">{dict.footer.social}</p>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-8 lg:h-[194px] lg:gap-0">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap items-center gap-5 text-[15px] font-medium">
                <li>
                  <button
                    type="button"
                    className="flex items-center gap-2 transition-opacity hover:opacity-80"
                  >
                    {dict.nav.products}
                    <ChevronDownIcon />
                  </button>
                </li>
                <li>
                  <Link
                    href={localePath(lang, '/about')}
                    className="transition-opacity hover:opacity-80"
                  >
                    {dict.nav.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localePath(lang, '/blog')}
                    className="transition-opacity hover:opacity-80"
                  >
                    {dict.nav.blog}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localePath(lang, '/contact')}
                    className="transition-opacity hover:opacity-80"
                  >
                    {dict.nav.contact}
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex flex-col gap-2">
              <p className="text-[18px] font-semibold">{dict.footer.aboutTitle}</p>
              <p className="max-w-[420px] text-[15px] text-[var(--color-on-dark)]">
                {dict.footer.aboutText}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-[22px]">
          <div className="flex w-[183px] flex-col gap-2">
            <p className="text-[18px] font-semibold">{dict.footer.phone}:</p>
            <ul className="flex flex-col gap-1 text-[15px] text-[var(--color-on-dark)]">
              {PHONES.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="transition-opacity hover:opacity-80"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex w-[183px] flex-col gap-2">
            <p className="text-[18px] font-semibold">{dict.footer.email}:</p>
            <a
              href={`mailto:${EMAIL}`}
              className="text-[15px] text-[var(--color-on-dark)] transition-opacity hover:opacity-80"
            >
              {EMAIL}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
