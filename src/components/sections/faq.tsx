export type FaqItem = {
  question: string
  answer: string
}

type Props = {
  title: string
  description: string
  items: FaqItem[]
}

export function Faq({ title, description, items }: Props) {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-[1150px] flex-col gap-9 px-6 py-[90px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-[28px] font-semibold text-[var(--color-brand)]">{title}</h2>
          <p className="text-[15px] text-[var(--color-brand-soft)]">{description}</p>
        </div>

        <ul className="flex flex-col gap-2.5">
          {items.map((item) => (
            <li key={item.question}>
              <details className="group rounded-[2px] open:bg-[var(--color-surface)] open:pb-[22px]">
                <summary className="flex list-none items-center gap-3 px-[22px] py-4 [&::-webkit-details-marker]:hidden cursor-pointer">
                  <span className="flex-1 text-[20px] font-semibold text-[var(--color-brand)]">
                    {item.question}
                  </span>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-[0.5px] border-[var(--color-brand)] text-[var(--color-brand)] transition-colors group-hover:bg-[var(--color-brand)] group-hover:text-white">
                    <PlusMinusIcon />
                  </span>
                </summary>
                <p className="px-[22px] pt-1 text-[15px] text-[var(--color-brand-soft)]">
                  {item.answer}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
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
