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
  energy: <EnergyIcon className="size-[70px]" />,
  sound: <SoundIcon className="size-[70px]" />,
  design: <DesignIcon className="size-[70px]" />,
  quality: <QualityIcon className="size-[70px]" />,
}

export function Benefits({ title, description, items }: Props) {
  return (
    <section className="bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-[1150px] flex-col gap-9 px-6 py-[90px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-[28px] font-semibold text-[var(--color-brand)]">{title}</h2>
          <p className="text-[15px] text-[var(--color-brand-soft)]">{description}</p>
        </div>

        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[10px]">
          {items.map((item) => (
            <li key={item.key} className="flex flex-col items-center gap-[22px] text-center">
              <span className="flex size-[100px] items-center justify-center text-[var(--color-brand)]">
                {ICONS[item.key]}
              </span>
              <span className="block h-px w-[100px] bg-[var(--color-brand)]" aria-hidden="true" />
              <div className="flex flex-col gap-2">
                <p className="text-[20px] font-semibold text-[var(--color-brand)]">{item.title}</p>
                <p className="text-[15px] text-[var(--color-brand-soft)]">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
