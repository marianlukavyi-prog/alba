'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowRightIcon } from '@/components/icons/arrow-right'
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right'
import { ChevronLeftIcon } from '@/components/icons/chevron-left'
import { ChevronRightIcon } from '@/components/icons/chevron-right'
import type { Product } from '@/data/products'

type Tab = 'general' | 'components' | 'colors'

type Props = {
  product: Product
  tabLabels: { general: string; components: string; colors: string }
  prevLabel: string
  nextLabel: string
}

export function ProductDetailView({
  product,
  tabLabels,
  prevLabel,
  nextLabel,
}: Props) {
  const images = product.detail.gallery
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState<Tab>('general')
  const tabsRef = useRef<HTMLUListElement>(null)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    const el = tabsRef.current
    if (!el) return
    const update = () => {
      setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [])

  const goPrev = () => setActiveImage((i) => Math.max(0, i - 1))
  const goNext = () => setActiveImage((i) => Math.min(images.length - 1, i + 1))
  const scrollTabsNext = () => {
    const el = tabsRef.current
    if (!el) return
    el.scrollBy({ left: el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2">
      {/* Gallery */}
      <div className="flex flex-col gap-2.5">
        <div className="relative aspect-[570/598] w-full overflow-hidden rounded-[2px] bg-white">
          <Image
            src={images[activeImage] ?? images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 570px, 100vw"
            className="object-contain"
            priority
          />
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label={prevLabel}
            onClick={goPrev}
            disabled={activeImage === 0}
            className="flex size-10 shrink-0 items-center justify-center rounded-[2px] text-[var(--color-brand)] transition-colors hover:bg-[var(--color-surface)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeftIcon />
          </button>

          <ul className="grid flex-1 grid-cols-4 gap-2.5">
            {images.slice(0, 4).map((img, i) => (
              <li key={img + i}>
                <button
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square w-full overflow-hidden rounded-[2px] bg-[var(--color-surface)] transition-shadow ${
                    i === activeImage ? 'ring-2 ring-[var(--color-cta)]' : ''
                  }`}
                  aria-current={i === activeImage}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    fill
                    sizes="110px"
                    className="object-contain"
                  />
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label={nextLabel}
            onClick={goNext}
            disabled={activeImage >= images.length - 1}
            className="flex size-10 shrink-0 items-center justify-center rounded-[2px] text-[var(--color-brand)] transition-colors hover:bg-[var(--color-surface)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* Info column */}
      <div className="flex flex-col gap-[26px]">
        <div className="flex flex-col gap-3">
          <h1 className="text-[22px] leading-tight font-semibold text-[var(--color-brand)] md:text-[28px]">
            {product.name}
          </h1>
          <p className="text-[14px] text-[var(--color-brand-soft)] md:text-[15px]">
            {product.detail.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-[2px] bg-[var(--color-surface)] p-[22px] text-[14px] md:p-[30px] md:text-[15px]">
          {product.detail.highlights.map((row, i) => (
            <div
              key={`${row.label}-${i}`}
              className={`flex items-center justify-between gap-3 ${
                i < product.detail.highlights.length - 1
                  ? 'border-b border-[#dfdfdf] pb-4'
                  : ''
              }`}
            >
              <span className="font-normal text-[var(--color-brand-soft)]">
                {row.label}
              </span>
              <span className="text-right font-semibold text-[var(--color-brand)]">
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <nav aria-label="Product tabs" className="flex items-center gap-2.5">
            <ul
              ref={tabsRef}
              className="flex flex-1 items-center gap-2.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {(
                [
                  { key: 'general' as const, label: tabLabels.general },
                  { key: 'components' as const, label: tabLabels.components },
                  { key: 'colors' as const, label: tabLabels.colors },
                ]
              ).map((tab) => {
                const isActive = activeTab === tab.key
                return (
                  <li key={tab.key} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      className={`inline-flex h-[46px] items-center justify-center gap-1.5 rounded-[2px] px-6 text-[14px] font-medium tracking-[0.28px] whitespace-nowrap transition-colors md:h-[58px] md:text-[15px] md:tracking-[0.3px] ${
                        isActive
                          ? 'bg-[var(--color-accent)] text-[var(--color-brand)] hover:bg-[#e6b801]'
                          : 'border border-[#f4f4f4] text-[var(--color-brand)] hover:bg-[var(--color-surface)]'
                      }`}
                      aria-pressed={isActive}
                    >
                      {tab.label}
                      <ArrowUpRightIcon size={15} />
                    </button>
                  </li>
                )
              })}
            </ul>
            {canScrollNext ? (
              <button
                type="button"
                aria-label={nextLabel}
                onClick={scrollTabsNext}
                className="flex size-[46px] shrink-0 items-center justify-center rounded-full border-[0.5px] border-[var(--color-brand)] text-[var(--color-brand)] transition-colors hover:bg-[var(--color-brand)] hover:text-white md:size-[50px] lg:hidden"
              >
                <ArrowRightIcon size={15} />
              </button>
            ) : null}
          </nav>

          {activeTab === 'general' ? <GeneralTab text={product.detail.description} /> : null}
          {activeTab === 'components' ? (
            <ComponentsTab items={product.detail.components} />
          ) : null}
          {activeTab === 'colors' ? <ColorsTab colors={product.detail.colors} /> : null}
        </div>
      </div>
    </div>
  )
}

function GeneralTab({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-4 text-[14px] leading-[1.5] text-[var(--color-brand-soft)] md:text-[15px]">
      {text.split('\n\n').map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  )
}

function ComponentsTab({
  items,
}: {
  items: Array<{ title: string; description: string; image?: string }>
}) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li key={item.title + i}>
          <details className="group rounded-[2px] open:bg-[var(--color-surface)] open:pb-[22px]">
            <summary className="flex list-none items-center gap-3 px-[22px] py-4 [&::-webkit-details-marker]:hidden cursor-pointer">
              <span className="flex-1 text-[15px] font-medium text-[var(--color-brand)]">
                {item.title}
              </span>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-[0.5px] border-[var(--color-brand)] text-[var(--color-brand)]">
                <PlusMinusIcon />
              </span>
            </summary>
            <div className="flex flex-col gap-3 px-[22px] pt-2 text-[15px] text-[var(--color-brand-soft)]">
              {item.description ? <p>{item.description}</p> : null}
              {item.image ? (
                <div className="relative h-[110px] w-[100px] overflow-hidden rounded-[2px] bg-white">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="100px"
                    className="object-contain"
                  />
                </div>
              ) : null}
            </div>
          </details>
        </li>
      ))}
    </ul>
  )
}

function ColorsTab({ colors }: { colors: Array<{ name: string; hex: string }> }) {
  return (
    <ul className="grid grid-cols-2 gap-x-2.5 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
      {colors.map((c, i) => (
        <li key={`${c.name}-${i}`} className="flex flex-col gap-2">
          <div
            className="aspect-[113/95] w-full rounded-[2px]"
            style={{ backgroundColor: c.hex }}
            aria-hidden="true"
          />
          <span className="text-[14px] text-[var(--color-brand-soft)]">{c.name}</span>
        </li>
      ))}
    </ul>
  )
}

function PlusMinusIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="3" y1="9" x2="15" y2="9" />
      <line
        x1="9"
        y1="3"
        x2="9"
        y2="15"
        className="origin-center transition-transform duration-200 group-open:scale-y-0"
      />
    </svg>
  )
}
