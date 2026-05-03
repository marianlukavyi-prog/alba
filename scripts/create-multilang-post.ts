// Run with: npx sanity exec scripts/create-multilang-post.ts --with-user-token
// Creates one post in 4 languages (es/en/uk/ru) + translation.metadata.
// Uploads cover image, links to existing author + tag.

import { getCliClient } from 'sanity/cli'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { randomUUID } from 'node:crypto'

const AUTHOR_ID = '393afe83-dbae-4976-87c4-2516e1cb452d' // Іванина Роман
const TAG_ID = '3b3527dd-8698-4998-b25d-8877b2dc70ba' // #AI
const COVER_PATH = resolve(process.cwd(), 'public/figma/banner-hero.webp')

type Lang = 'es' | 'en' | 'uk' | 'ru'

type LangContent = {
  title: string
  slug: string
  excerpt: string
  alt: string
  body: PortableTextBlock[]
}

type Span = { _type: 'span'; _key: string; text: string; marks?: string[] }
type PortableTextBlock =
  | {
      _type: 'block'
      _key: string
      style: 'normal' | 'h2' | 'h3' | 'lead' | 'blockquote'
      markDefs?: { _key: string; _type: 'link'; href: string; external?: boolean }[]
      children: Span[]
      listItem?: 'bullet' | 'number'
      level?: number
    }
  | {
      _type: 'note'
      _key: string
      text: string
    }

const k = () => randomUUID().slice(0, 12)

const block = (
  style: 'normal' | 'h2' | 'h3' | 'lead' | 'blockquote',
  text: string,
  opts?: { listItem?: 'bullet' | 'number'; level?: number },
): PortableTextBlock => ({
  _type: 'block',
  _key: k(),
  style,
  markDefs: [],
  children: [{ _type: 'span', _key: k(), text, marks: [] }],
  ...(opts?.listItem ? { listItem: opts.listItem, level: opts.level ?? 1 } : {}),
})

const note = (text: string): PortableTextBlock => ({ _type: 'note', _key: k(), text })

const buildBody = (lang: Lang): PortableTextBlock[] => {
  const T = {
    es: {
      lead: 'Las ventanas adecuadas pueden reducir los costes de calefacción hasta un 40 %. Te explicamos cómo elegir el sistema correcto para tu hogar.',
      h21: '¿Por qué importa el coeficiente Uw?',
      p1: 'El coeficiente de transmitancia térmica Uw indica cuánto calor escapa a través de la ventana. Cuanto menor sea el valor, mejor aislamiento. Para un clima continental se recomienda Uw ≤ 1.0 W/m²K.',
      h22: 'Tres factores clave',
      l1: 'Vidrio de doble o triple cámara con relleno de argón.',
      l2: 'Perfil con cinco o más cámaras y refuerzo metálico.',
      l3: 'Sellado perimetral de tres juntas EPDM.',
      h23: 'Comparativa rápida de sistemas',
      p2: 'Schüco, Reynaers y Aluprof ofrecen perfiles con valores Uw entre 0.71 y 1.1 W/m²K. La diferencia real entre marcas suele ser inferior al 8 %, pero el calidad del montaje puede variar el rendimiento un 20 %.',
      n1: 'Una instalación deficiente arruina el mejor perfil. Verifica siempre que el instalador use el método RAL.',
      h24: 'ROI estimado',
      p3: 'En una vivienda de 90 m² en Madrid, el cambio de ventanas de PVC clase B a clase A+ se amortiza en 6–8 años considerando precios actuales del gas.',
    },
    en: {
      lead: 'The right windows can cut heating bills by up to 40 %. Here is how to pick the correct system for your home.',
      h21: 'Why does the Uw value matter?',
      p1: 'The Uw thermal transmittance coefficient shows how much heat escapes through the window. The lower the number, the better the insulation. For a continental climate aim for Uw ≤ 1.0 W/m²K.',
      h22: 'Three key factors',
      l1: 'Double or triple glazing filled with argon.',
      l2: 'Five-chamber or larger profile with steel reinforcement.',
      l3: 'Three-seal EPDM gasket around the perimeter.',
      h23: 'Quick system comparison',
      p2: 'Schüco, Reynaers and Aluprof offer profiles with Uw between 0.71 and 1.1 W/m²K. The real spread between brands is usually under 8 %, but installation quality can swing performance by 20 %.',
      n1: 'A poor install kills the best profile. Always check the installer follows the RAL method.',
      h24: 'Estimated ROI',
      p3: 'In a 90 m² apartment in Madrid, replacing class B PVC windows with class A+ pays back in 6–8 years at current gas prices.',
    },
    uk: {
      lead: 'Правильні вікна можуть зменшити витрати на опалення до 40 %. Розповідаємо як обрати систему під ваш дім.',
      h21: 'Чому коефіцієнт Uw такий важливий?',
      p1: 'Коефіцієнт теплопередачі Uw показує скільки тепла йде назовні через вікно. Чим менше значення — тим краща ізоляція. Для континентального клімату рекомендується Uw ≤ 1.0 Вт/м²K.',
      h22: 'Три ключові фактори',
      l1: 'Двокамерний або трикамерний склопакет з аргоновим заповненням.',
      l2: 'Профіль із п\'яти або більше камер зі сталевим армуванням.',
      l3: 'Тришаровий EPDM ущільнювач по периметру.',
      h23: 'Швидке порівняння систем',
      p2: 'Schüco, Reynaers і Aluprof пропонують профілі з Uw від 0.71 до 1.1 Вт/м²K. Реальна різниця між брендами зазвичай менше 8 %, але якість монтажу може змінити характеристики на 20 %.',
      n1: 'Поганий монтаж нівелює найкращий профіль. Завжди перевіряйте що монтажник використовує метод RAL.',
      h24: 'Орієнтовна окупність',
      p3: 'У квартирі 90 м² в Києві заміна вікон ПВХ класу Б на клас А+ окуповується за 6–8 років при поточних цінах на газ.',
    },
    ru: {
      lead: 'Правильные окна могут снизить расходы на отопление до 40 %. Рассказываем как выбрать систему под ваш дом.',
      h21: 'Почему важен коэффициент Uw?',
      p1: 'Коэффициент теплопередачи Uw показывает сколько тепла уходит через окно. Чем меньше значение — тем лучше изоляция. Для континентального климата рекомендуется Uw ≤ 1.0 Вт/м²K.',
      h22: 'Три ключевых фактора',
      l1: 'Двухкамерный или трёхкамерный стеклопакет с заполнением аргоном.',
      l2: 'Профиль из пяти и более камер со стальным армированием.',
      l3: 'Трёхслойный EPDM-уплотнитель по периметру.',
      h23: 'Быстрое сравнение систем',
      p2: 'Schüco, Reynaers и Aluprof предлагают профили с Uw от 0.71 до 1.1 Вт/м²K. Реальная разница между брендами обычно меньше 8 %, но качество монтажа может изменить характеристики на 20 %.',
      n1: 'Плохой монтаж сводит на нет лучший профиль. Всегда проверяйте чтобы монтажник использовал метод RAL.',
      h24: 'Ориентировочная окупаемость',
      p3: 'В квартире 90 м² в Москве замена окон ПВХ класса Б на класс А+ окупается за 6–8 лет при текущих ценах на газ.',
    },
  } as const

  const t = T[lang]
  return [
    block('lead', t.lead),
    block('h2', t.h21),
    block('normal', t.p1),
    block('h2', t.h22),
    block('normal', t.l1, { listItem: 'bullet' }),
    block('normal', t.l2, { listItem: 'bullet' }),
    block('normal', t.l3, { listItem: 'bullet' }),
    block('h2', t.h23),
    block('normal', t.p2),
    note(t.n1),
    block('h2', t.h24),
    block('normal', t.p3),
  ]
}

const CONTENT: Record<Lang, LangContent> = {
  es: {
    title: 'Eficiencia energética: cómo reducir tu factura de calefacción',
    slug: 'eficiencia-energetica-ventanas',
    excerpt:
      'Las ventanas adecuadas pueden reducir los costes de calefacción hasta un 40 %. Guía práctica de Uw, vidrio y montaje.',
    alt: 'Ventana de PVC con triple acristalamiento',
    body: buildBody('es'),
  },
  en: {
    title: 'Energy efficiency: how to cut your heating bills',
    slug: 'energy-efficiency-windows',
    excerpt:
      'The right windows can reduce heating costs by up to 40 %. Practical guide to Uw, glazing and installation.',
    alt: 'PVC window with triple glazing',
    body: buildBody('en'),
  },
  uk: {
    title: 'Енергоефективність: як зменшити рахунки за опалення',
    slug: 'energoefektivnist-vikna',
    excerpt:
      'Правильні вікна можуть знизити витрати на опалення до 40 %. Практичний гайд з Uw, склопакетів і монтажу.',
    alt: 'Вікно ПВХ з трикамерним склопакетом',
    body: buildBody('uk'),
  },
  ru: {
    title: 'Энергоэффективность: как снизить счета за отопление',
    slug: 'energoeffektivnost-okna',
    excerpt:
      'Правильные окна могут снизить расходы на отопление до 40 %. Практический гайд по Uw, стеклопакетам и монтажу.',
    alt: 'Окно ПВХ с трёхкамерным стеклопакетом',
    body: buildBody('ru'),
  },
}

const PUBLISHED_AT = '2026-05-03T13:00:00.000Z'
const READING_MINUTES = 6

async function main() {
  const client = getCliClient()
  console.log('→ uploading cover image…')
  const imgBuffer = readFileSync(COVER_PATH)
  const asset = await client.assets.upload('image', imgBuffer, {
    filename: 'energy-efficiency-cover.webp',
    contentType: 'image/webp',
  })
  console.log(`  asset uploaded: ${asset._id}`)

  const langs: Lang[] = ['es', 'en', 'uk', 'ru']
  const docIds: Record<Lang, string> = { es: '', en: '', uk: '', ru: '' }

  for (const lang of langs) {
    const c = CONTENT[lang]
    const doc = {
      _type: 'post',
      language: lang,
      title: c.title,
      slug: { _type: 'slug', current: c.slug },
      excerpt: c.excerpt,
      cover: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
        alt: c.alt,
      },
      author: { _type: 'reference', _ref: AUTHOR_ID },
      publishedAt: PUBLISHED_AT,
      readingMinutes: READING_MINUTES,
      views: 0,
      tags: [{ _type: 'reference', _ref: TAG_ID, _key: k() }],
      body: c.body,
    }
    const created = await client.create(doc)
    docIds[lang] = created._id
    console.log(`  ${lang} → ${created._id}`)
  }

  console.log('→ creating translation.metadata…')
  const metadata = await client.create({
    _type: 'translation.metadata',
    schemaTypes: ['post'],
    translations: langs.map((lang) => ({
      _key: randomUUID().replace(/-/g, ''),
      _type: 'internationalizedArrayReferenceValue',
      language: lang,
      value: {
        _type: 'reference',
        _ref: docIds[lang],
        _weak: true,
        _strengthenOnPublish: { type: 'post' },
      },
    })),
  })
  console.log(`  metadata: ${metadata._id}`)
  console.log('\n✅ Done. Refresh Studio to see the new translation group.')
}

main().catch((err) => {
  console.error('❌ Failed:', err)
  process.exit(1)
})
