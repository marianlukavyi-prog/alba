import Image from 'next/image'
import type { ReactNode } from 'react'
import {
  DesignIcon,
  EnergyIcon,
  QualityIcon,
  SoundIcon,
} from '@/components/icons/benefit-icons'

export type BenefitKey = 'energy' | 'sound' | 'design' | 'quality'

export type BenefitItem = {
  key: BenefitKey
  title: string
  description: string
}

type Props = {
  title: string
  description: string
  items: BenefitItem[]
}

const ICONS: Record<BenefitKey, ReactNode> = {
  energy: <EnergyIcon className="size-[39.2px] md:size-[70px]" />,
  sound: <SoundIcon className="size-[39.2px] md:size-[70px]" />,
  design: <DesignIcon className="size-[39.2px] md:size-[70px]" />,
  quality: <QualityIcon className="size-[39.2px] md:size-[70px]" />,
}

export function Benefits({ title, description, items }: Props) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/figma/benefits-bg.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[var(--color-brand)]/50" aria-hidden="true" />

      <div className="mx-auto flex max-w-[1150px] flex-col gap-[22px] px-4 py-10 md:gap-9 md:px-6 md:py-[60px] lg:py-[90px]">
        <div className="flex flex-col items-center gap-2 text-center md:gap-3">
          <h2 className="text-[22px] leading-tight font-semibold text-white md:text-[28px]">
            {title}
          </h2>
          <p className="text-[14px] text-[#dcdcdc] md:text-[15px]">{description}</p>
        </div>

        <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li
              key={item.key}
              className="flex flex-col items-center gap-4 text-center md:gap-[22px]"
            >
              <span className="flex size-[56px] items-center justify-center text-[var(--color-accent)] md:size-[100px]">
                {ICONS[item.key]}
              </span>
              <span
                aria-hidden="true"
                className="block h-px w-[100px] bg-[var(--color-accent)]"
              />
              <div className="flex flex-col gap-2">
                <p className="text-[18px] leading-tight font-semibold text-white md:text-[20px]">
                  {item.title}
                </p>
                <p className="text-[14px] text-[#dcdcdc] md:text-[15px]">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
