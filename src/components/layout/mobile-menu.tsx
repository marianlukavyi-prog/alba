'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeftIcon } from '@/components/icons/arrow-left'
import { ChevronDownIcon } from '@/components/icons/chevron-down'
import { MenuIcon } from '@/components/icons/menu'
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from '@/components/icons/socials'
import { Logo } from '@/components/brand/logo'
import { LanguageSwitcher } from '@/components/layout/language-switcher'
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
  showLanguageSwitcher?: boolean
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
  showLanguageSwitcher = false,
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
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-200 ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
        onClick={close}
      />

      <aside
        aria-label="Mobile menu"
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-[70] flex w-[min(420px,90vw)] flex-col gap-[22px] overflow-y-auto bg-[var(--color-surface)] px-[26px] py-[40px] transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          type="button"
          aria-label={ariaLabelClose}
          onClick={close}
          className="absolute top-0 right-0 flex size-10 items-center justify-center bg-[var(--color-accent)] text-[var(--color-brand)] transition-opacity hover:opacity-90"
        >
          <ArrowLeftIcon size={15} />
        </button>

        <Link
          href={homeHref}
          aria-label="Alba Ventanas"
          onClick={close}
          className="text-[var(--color-brand)]"
        >
          <Logo size="sm" tone="dark" />
        </Link>

        <nav
          aria-label="Mobile primary"
          className="flex flex-col gap-4 border-y border-[#a5aeb7] py-4"
        >
          <div className="flex flex-col gap-3">
            <button
              type="button"
              aria-expanded={productsOpen}
              onClick={() => setProductsOpen((v) => !v)}
              className="flex items-center justify-between text-[20px] font-medium text-[var(--color-brand)]"
            >
              <Link href={productsHref} onClick={close} className="hover:opacity-80">
                {productsLabel}
              </Link>
              <span aria-hidden="true">
                <ChevronDownIcon
                  className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`}
                />
              </span>
            </button>
            {productsOpen ? (
              <ul className="flex flex-col gap-2 pl-3 text-[15px] font-medium tracking-[0.3px] text-[var(--color-brand)]">
                {SUB_KEYS.map((key) => (
                  <li key={key}>
                    <Link
                      href={productSubHrefs[key]}
                      onClick={close}
                      className="block transition-opacity hover:opacity-80"
                    >
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
              className="text-[20px] font-medium text-[var(--color-brand)] transition-opacity hover:opacity-80"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-[var(--color-brand)]">
          <a href="#" aria-label="Instagram" className="transition-opacity hover:opacity-80">
            <InstagramIcon size={28} />
          </a>
          <a href="#" aria-label="TikTok" className="transition-opacity hover:opacity-80">
            <TikTokIcon size={28} />
          </a>
          <a href="#" aria-label="WhatsApp" className="transition-opacity hover:opacity-80">
            <WhatsAppIcon size={28} />
          </a>
        </div>

        {showLanguageSwitcher ? (
          <div className="text-[var(--color-brand)]">
            <LanguageSwitcher lang={lang} tone="dark" />
          </div>
        ) : null}
      </aside>
    </>
  )
}
