import type { ArticleBlock } from '@/data/blog'

type Props = {
  blocks: ArticleBlock[]
}

export function ArticleBody({ blocks }: Props) {
  return (
    <div className="flex flex-col gap-5 text-[15px] leading-[1.6] text-[#393939]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'lead':
            return (
              <p key={i} className="text-[15px] text-[#393939]">
                {block.text}
              </p>
            )
          case 'paragraph':
            return (
              <p key={i} className="text-[15px] text-[#393939]">
                {block.text}
              </p>
            )
          case 'heading':
            return (
              <h2 key={i} className="mt-4 text-[20px] font-semibold text-black">
                {block.text}
              </h2>
            )
          case 'subheading':
            return (
              <h3 key={i} className="mt-2 text-[16px] font-semibold text-black">
                {block.text}
              </h3>
            )
          case 'list':
            return (
              <ul key={i} className="ml-5 flex list-disc flex-col gap-1.5 text-[15px] text-[#393939]">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )
          case 'note':
            return (
              <p key={i} className="text-[15px] text-[#393939] italic">
                {block.text}
              </p>
            )
        }
      })}
    </div>
  )
}
