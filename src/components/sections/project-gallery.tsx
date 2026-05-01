import Image from 'next/image'

type Props = {
  images: string[]
  alt: string
}

export function ProjectGallery({ images, alt }: Props) {
  const [hero, secondA, secondB, thirdA, thirdB, thirdC] = images
  return (
    <div className="flex flex-col gap-2.5">
      {hero ? (
        <div className="relative aspect-[1150/420] w-full overflow-hidden rounded-[2px]">
          <Image
            src={hero}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 1150px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      ) : null}

      {secondA || secondB ? (
        <div className="grid grid-cols-2 gap-2.5">
          {[secondA, secondB].filter(Boolean).map((src, i) => (
            <div
              key={i}
              className="relative aspect-[570/300] w-full overflow-hidden rounded-[2px]"
            >
              <Image
                src={src as string}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 570px, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}

      {thirdA || thirdB || thirdC ? (
        <div className="grid grid-cols-3 gap-2.5">
          {[thirdA, thirdB, thirdC].filter(Boolean).map((src, i) => (
            <div
              key={i}
              className="relative aspect-[378/280] w-full overflow-hidden rounded-[2px]"
            >
              <Image
                src={src as string}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 378px, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
