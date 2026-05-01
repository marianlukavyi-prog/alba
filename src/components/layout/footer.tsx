import Image from 'next/image'
import Link from 'next/link'
import { Logo } from '@/components/brand/logo'
import { ChevronDownIcon } from '@/components/icons/chevron-down'
import { EMAIL, PHONES } from '@/data/contact'
import { SOCIALS } from '@/data/socials'
import { defaultLocale, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'

type Props = {
  lang: Locale
  dict: Dictionary
}

const localePath = (locale: Locale, path = '') =>
  locale === defaultLocale ? path || '/' : `/${locale}${path}`

export function Footer({ lang, dict }: Props) {
  return (
    <footer className="bg-[var(--color-night)] text-white">
      <div className="mx-auto flex max-w-[1150px] flex-col gap-12 px-6 py-[90px] lg:flex-row lg:gap-10">
        <div className="lg:gap-[6 flex flex-1 flex-col gap-6 border-[#666] lg:flex-row lg:items-center lg:border-r lg:pr-10">
          <div className="flex flex-col items-start justify-between gap-12 lg:h-[194px] lg:gap-0">
            <Logo size="lg" />
            <div className="flex w-[258px] flex-col gap-3">
              <ul className="flex items-center gap-2" aria-label={dict.footer.social}>
                {SOCIALS.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      aria-label={s.name}
                      className="flex size-[42px] items-center justify-center rounded-full transition-opacity hover:opacity-80"
                      style={s.bg ? { backgroundColor: s.bg } : undefined}
                    >
                      {s.bg ? (
                        <Image
                          src={s.icon}
                          alt=""
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      ) : (
                        <Image
                          src={s.icon}
                          alt=""
                          width={42}
                          height={42}
                          className="object-contain"
                        />
                      )}
                    </a>
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
                  <Link
                    href={localePath(lang, '/products/pvc')}
                    className="flex items-center gap-2 transition-opacity hover:opacity-80"
                  >
                    {dict.home.categories.windows.title}
                    <ChevronDownIcon />
                  </Link>
                </li>
                <li>
                  <Link
                    href={localePath(lang, '/products/doors')}
                    className="flex items-center gap-2 transition-opacity hover:opacity-80"
                  >
                    {dict.home.categories.doors.title}
                    <ChevronDownIcon />
                  </Link>
                </li>
                <li>
                  <Link
                    href={localePath(lang, '/products/systems')}
                    className="flex items-center gap-2 transition-opacity hover:opacity-80"
                  >
                    {dict.home.categories.systems.title}
                    <ChevronDownIcon />
                  </Link>
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
                    href={localePath(lang, '/process')}
                    className="transition-opacity hover:opacity-80"
                  >
                    {dict.nav.process}
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
                <li>
                  <Link
                    href={localePath(lang, '/blog')}
                    className="transition-opacity hover:opacity-80"
                  >
                    {dict.nav.blog}
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
          <ul className="flex flex-col gap-1 text-[15px] whitespace-nowrap text-[var(--color-on-dark)]">
            <li>
              <Link
                href={localePath(lang, '/privacy')}
                className="transition-opacity hover:opacity-80"
              >
                {dict.footer.privacy}
              </Link>
            </li>
            <li>
              <Link
                href={localePath(lang, '/terms')}
                className="transition-opacity hover:opacity-80"
              >
                {dict.footer.terms}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
