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
  mapTitle: string
}

export function ProjectInfo({ project, labels, mapTitle }: Props) {
  const rows: Array<{ label: string; value: string }> = [
    { label: labels.location, value: project.details.location },
    { label: labels.architects, value: project.details.architects },
    { label: labels.manufacturer, value: project.details.manufacturer },
    { label: labels.objectType, value: project.details.objectType },
    { label: labels.client, value: project.details.client },
    { label: labels.systems, value: project.details.systems },
  ]

  const mapQuery = `${project.city}, ${project.country}`
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex flex-col gap-3">
        <h1 className="text-[28px] leading-tight font-semibold text-[var(--color-brand)]">
          {project.title}
        </h1>
        {project.subtitle ? (
          <p className="text-[15px] text-[var(--color-brand-soft)]">{project.subtitle}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 rounded-[2px] bg-[var(--color-surface)] p-[30px] text-[15px]">
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
            <span className="text-[15px] font-normal text-[var(--color-brand-soft)]">
              {labels.productAreas}
            </span>
            <ul className="flex flex-wrap items-center gap-2.5">
              {project.productAreas.map((area) => (
                <li
                  key={area}
                  className="inline-flex items-center rounded-[2px] bg-[#ececec] px-3 py-2 text-[15px] font-medium tracking-[0.3px] text-[var(--color-brand)]"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="relative h-[260px] w-full overflow-hidden rounded-[2px] sm:h-[300px] lg:h-[350px]">
        <iframe
          src={mapEmbedUrl}
          title={mapTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
        />
      </div>
    </div>
  )
}
