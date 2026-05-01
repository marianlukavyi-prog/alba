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
      <div className="mx-auto flex max-w-[1150px] flex-col gap-[22px] px-4 py-10 md:gap-9 md:px-6 md:py-[60px] lg:py-[90px]">
        <div className="flex flex-col items-center gap-2 text-center md:gap-3">
          <h2 className="text-[22px] leading-tight font-semibold text-[var(--color-brand)] md:text-[28px]">
            {title}
          </h2>
          <p className="text-[14px] text-[var(--color-brand-soft)] md:text-[15px]">{description}</p>
        </div>

        <ul className="flex flex-col gap-[10px]">
          {items.map((item) => (
            <li key={item.question}>
              <details
                name="faq"
                className="group bg-white transition-colors open:bg-[var(--color-brand)] [&:not([open]):hover]:bg-[var(--color-surface)]"
              >
                <summary className="flex cursor-pointer list-none items-center gap-3 px-[22px] py-2 md:py-4 [&::-webkit-details-marker]:hidden">
                  <span className="flex-1 text-[18px] leading-tight font-semibold text-[var(--color-brand)] group-open:text-[var(--color-accent)] md:text-[20px]">
                    {item.question}
                  </span>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-[0.5px] border-[var(--color-brand)] text-[var(--color-brand)] group-open:border-[var(--color-accent)] group-open:text-[var(--color-accent)]">
                    <PlusMinusIcon />
                  </span>
                </summary>
                <div className="px-[22px] pt-1 pb-[22px]">
                  <p className="text-[14px] text-[#dcdcdc] md:text-[15px]">{item.answer}</p>
                </div>
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
