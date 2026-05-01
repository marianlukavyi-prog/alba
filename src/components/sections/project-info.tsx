import type { Project } from '@/data/projects'

type Props = {
  project: Project
  labels: {
    location: string
    architects: string
    manufacturer: string
    objectType: string
    client: string
    systems: string
    productAreas: string
  }
}

export function ProjectInfo({ project, labels }: Props) {
  const rows: Array<{ label: string; value: string }> = [
    { label: labels.location, value: project.details.location },
    { label: labels.architects, value: project.details.architects },
    { label: labels.manufacturer, value: project.details.manufacturer },
    { label: labels.objectType, value: project.details.objectType },
    { label: labels.client, value: project.details.client },
    { label: labels.systems, value: project.details.systems },
  ]

  return (
    <div className="flex flex-col gap-4 rounded-[2px] bg-[var(--color-surface)] p-[22px] text-[14px] md:p-[30px] md:text-[15px]">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`flex items-center justify-between gap-3 ${
            i < rows.length - 1 ? 'border-b border-[#dfdfdf] pb-4' : ''
          }`}
        >
          <span className="font-normal text-[var(--color-brand-soft)]">{row.label}</span>
          <span className="text-right font-semibold text-[var(--color-brand)]">{row.value}</span>
        </div>
      ))}

      {project.productAreas.length > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#dfdfdf] pt-4">
          <span className="font-normal text-[var(--color-brand-soft)]">
            {labels.productAreas}
          </span>
          <ul className="flex flex-wrap items-center gap-2.5">
            {project.productAreas.map((area) => (
              <li
                key={area}
                className="inline-flex items-center rounded-[2px] bg-[#ececec] px-3 py-2 text-[14px] font-medium tracking-[0.28px] text-[var(--color-brand)] md:text-[15px] md:tracking-[0.3px]"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
