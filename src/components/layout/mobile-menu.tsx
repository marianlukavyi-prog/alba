'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRightIcon } from '@/components/icons/arrow-right'
import { ChevronDownIcon } from '@/components/icons/chevron-down'
import { MenuIcon } from '@/components/icons/menu'
import { XIcon } from '@/components/icons/x'
import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { SOCIALS } from '@/data/socials'
import type { Locale } from '@/i18n/config'

type CategoryKey = 'pvc' | 'aluminum' | 'doors' | 'systems' | 'shading'

type Props = {
  lang: Locale
  homeHref: string
  productsHref: string
  productSubHrefs: Record<CategoryKey, string>
  links: { label: string; href: string }[]
  productsLabel: string
  productCategoryLabels: Record<CategoryKey, string>
  ariaLabelOpen: string
  ariaLabelClose: string
}

const SUB_KEYS: CategoryKey[] = ['pvc', 'aluminum', 'doors', 'systems', 'shading']

export function MobileMenu({
  lang,
  homeHref,
  productsHref,
  productSubHrefs,
  links,
  productsLabel,
  productCategoryLabels,
  ariaLabelOpen,
  ariaLabelClose,
}: Props) {
  const [open, setOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(true)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <button
        type="button"
        aria-label={ariaLabelOpen}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex size-10 items-center justify-center bg-[var(--color-accent)] text-[var(--color-brand)] transition-opacity hover:opacity-90"
      >
        <MenuIcon size={18} />
      </button>

      <div
        className={`fixed inset-0 z-[60] bg-[rgba(8,31,72,0.5)] transition-opacity duration-200 ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
        onClick={close}
      />

      <aside
        aria-label="Mobile menu"
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-[70] flex w-[min(390px,100vw)] flex-col gap-[22px] overflow-y-auto bg-[#f6f6f6] px-[26px] pt-[60px] pb-[40px] transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          type="button"
          aria-label={ariaLabelClose}
          onClick={close}
          className="absolute top-0 right-0 flex size-10 items-center justify-center bg-[var(--color-accent)] text-[var(--color-brand)] transition-opacity hover:opacity-90"
        >
          <XIcon size={15} />
        </button>

        {/* Logo + lang */}
        <div className="flex items-center justify-between">
          <Link href={homeHref} aria-label="Alba Ventanas" onClick={close}>
            <Image src="/logo-dark.svg" alt="Alba Ventanas" width={131} height={40} />
          </Link>
          <div className="text-[var(--color-brand)]">
            <LanguageSwitcher lang={lang} tone="dark" />
          </div>
        </div>

        {/* Links section */}
        <nav
          aria-label="Mobile primary"
          className="flex flex-col gap-4 border-y border-[#a5aeb7] py-4"
        >
          {/* Products with sub-categories */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Link
                href={productsHref}
                onClick={close}
                className="text-[18px] font-medium text-[var(--color-brand)] transition-opacity hover:opacity-80"
              >
                {productsLabel}
              </Link>
              <button
                type="button"
                aria-expanded={productsOpen}
                aria-label={productsLabel}
                onClick={() => setProductsOpen((v) => !v)}
                className="flex size-[18px] items-center justify-center text-[var(--color-brand)]"
              >
                <ChevronDownIcon
                  className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
            {productsOpen ? (
              <ul className="flex flex-col gap-3 pl-3">
                {SUB_KEYS.map((key) => (
                  <li key={key}>
                    <Link
                      href={productSubHrefs[key]}
                      onClick={close}
                      className="flex items-center gap-1.5 text-[14px] font-medium tracking-[0.28px] text-[var(--color-brand)] transition-opacity hover:opacity-80"
                    >
                      <ArrowRightIcon size={15} />
                      {productCategoryLabels[key]}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="text-[18px] font-medium text-[var(--color-brand)] transition-opacity hover:opacity-80"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Socials */}
        <ul className="flex items-center gap-2">
          {SOCIALS.map((s) => {
            const isExternal = s.href.startsWith('http')
            return (
              <li key={s.name}>
                <a
                  href={s.href}
                  aria-label={s.name}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener' : undefined}
                  className="flex size-[42px] items-center justify-center rounded-full transition-opacity hover:opacity-80"
                  style={s.bg ? { backgroundColor: s.bg } : undefined}
                >
                  <Image
                    src={s.icon}
                    alt=""
                    width={s.bg ? 18 : 42}
                    height={s.bg ? 18 : 42}
                    className="object-contain"
                  />
                </a>
              </li>
            )
          })}
        </ul>
      </aside>
    </>
  )
}
