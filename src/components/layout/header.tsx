'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { Logo } from '@/components/brand/logo'
import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { MobileMenu } from '@/components/layout/mobile-menu'
import { ProductsDropdown } from '@/components/layout/products-dropdown'
import { PHONES } from '@/data/contact'
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

const PRIMARY_PHONE = PHONES[0]

export function Header({ lang, dict, position = 'fixed', variant = 'overlay' }: Props) {
  const home = localePath(lang)
  const productsHref = localePath(lang, '/products')
  const productSubHrefs = {
    pvc: `${productsHref}/pvc`,
    aluminum: `${productsHref}/aluminum`,
    doors: `${productsHref}/doors`,
    systems: `${productsHref}/systems`,
    shading: `${productsHref}/shading`,
  } as const

  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    if (position !== 'fixed') return
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [position])

  const positionClass =
    position === 'fixed' ? 'fixed inset-x-0 top-0 z-50' : 'absolute inset-x-0 top-0 z-50'
  const isSolid = variant === 'solid' || (position === 'fixed' && scrolled)
  const bgClass = isSolid ? 'bg-[var(--color-cta)] shadow-[0_2px_12px_rgba(0,0,0,0.18)]' : ''

  const navLinks = [
    { label: dict.nav.about, href: localePath(lang, '/about') },
    { label: dict.nav.contact, href: localePath(lang, '/contact') },
    { label: dict.nav.projects, href: localePath(lang, '/projects') },
    { label: dict.nav.process, href: localePath(lang, '/process') },
    { label: dict.nav.blog, href: localePath(lang, '/blog') },
  ]

  return (
    <header className={`${positionClass} ${bgClass} transition-colors duration-200`}>
      <div className="mx-auto flex h-[76px] max-w-[1150px] items-center justify-between gap-4 px-4 py-3 text-white sm:px-6">
        <Link href={home} aria-label="Alba Ventanas" className="shrink-0">
          <Logo size="sm" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 text-[15px] lg:flex">
          <ProductsDropdown
            label={dict.nav.products}
            href={productsHref}
            items={[
              { label: dict.productsPage.categories.pvc, href: productSubHrefs.pvc },
              { label: dict.productsPage.categories.aluminum, href: productSubHrefs.aluminum },
              { label: dict.productsPage.categories.doors, href: productSubHrefs.doors },
              { label: dict.productsPage.categories.systems, href: productSubHrefs.systems },
              { label: dict.productsPage.categories.shading, href: productSubHrefs.shading },
            ]}
          />
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium transition-opacity hover:opacity-80"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <LanguageSwitcher lang={lang} className="hidden sm:block" />
          <a
            href={`tel:${PRIMARY_PHONE.replace(/\s/g, '')}`}
            className="flex items-center gap-2.5 border-b border-white pb-3 text-[13px] font-medium tracking-[0.3px] whitespace-nowrap transition-opacity hover:opacity-80 sm:text-[15px]"
          >
            {PRIMARY_PHONE}
            <ArrowUpRightIcon size={15} />
          </a>
          <div className="lg:hidden">
            <MobileMenu
              lang={lang}
              homeHref={home}
              productsHref={productsHref}
              productSubHrefs={productSubHrefs}
              productsLabel={dict.nav.products}
              productCategoryLabels={dict.productsPage.categories}
              links={navLinks}
              ariaLabelOpen={dict.common.openMenu}
              ariaLabelClose={dict.common.closeMenu}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
