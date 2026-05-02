export const PRODUCT_CATEGORIES = ['pvc', 'aluminum', 'doors', 'systems', 'shading'] as const
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

export const PRODUCT_SUBCATEGORIES = [
  'windows',
  'wood-aluminum',
  'entrance',
  'sliding',
  'swing-doors',
  'auto-sliding',
  'pivot',
  'facade',
  'folding',
  'sliding-folding',
  'screen',
  'rollers',
  'roller-screen',
  'venetian-blinds',
  'pergolas',
] as const
export type ProductSubcategory = (typeof PRODUCT_SUBCATEGORIES)[number]

export type SpecKey =
  | 'depth'
  | 'chambers'
  | 'glazing'
  | 'thermal'
  | 'sound'
  | 'material'
  | 'type'
  | 'mounting'
  | 'control'
  | 'maxSize'
  | 'lamellaAngle'

export type Spec = { key: SpecKey; value: string }

export type ProductColor = { name: string; hex?: string; image?: string }
export type ProductComponent = {
  title: string
  description: string
  image?: string
  images?: string[]
}
export type ProductHighlight = { label: string; value: string }

export type ProductDetail = {
  subtitle: string
  highlights: ProductHighlight[]
  description: string
  components: ProductComponent[]
  colors: ProductColor[]
  gallery: string[]
}

export type ProductFamily = 'pvc' | 'aluminum'

export type Product = {
  slug: string
  name: string
  category: ProductCategory
  subcategory: ProductSubcategory
  family?: ProductFamily
  specs: Spec[]
  image: { src: string }
  detail: ProductDetail
}

const DEMO_DETAIL: ProductDetail = {
  subtitle: 'Fire-rated partitions with EI15 to EI90 fire doors',
  highlights: [
    { label: 'Air tightness', value: 'class A4' },
    { label: 'Watertightness', value: 'class RE 750' },
    { label: 'Fire rating', value: 'class EI120' },
  ],
  description:
    'Anti-burglary roller shutter system Safety Premium is a highly technically advanced product, which thanks to the design of innovative structural elements has successfully passed specialized tests and obtained the RC3 class of burglary resistance.\n\nModern design, functionality, ease of installation and operation, as well as aesthetic appearance will help the roller shutter to meet the requirements of the building and fit the colour of the façade. In this type of products, the individual elements, i.a. channels have special reinforcement, which prevents deflecting and pulling out the roller shutter profiles. In addition, the resistant structure of the curtain prevents any impact-induced damage to the roller shutter. In addition, the latch mechanism mounted in the bottom part of the roller shutter prevents raising of the roller shutter’s curtain, which ensures an effective protection of the house. Rollers shutters are made of aluminium, and are thus lightweight, weather resistant and easy to maintain. During our absence, they protect windows and balcony from the sight of potential attackers, and our possessions – from theft. The isolation helps us also to protect the interiors from excessive sunlight and warming up.',
  components: [
    { title: 'Короби', description: '' },
    {
      title: 'Направляючі',
      description: 'В середньому від 2 до 6 тижнів залежно від складності проєкту.',
      image: '/figma/products/euro-design-60.webp',
    },
    { title: 'Кінцеві планки', description: '' },
    { title: 'Профілі', description: '' },
  ],
  colors: [
    { name: '02 - white', hex: '#f5f5f0' },
    { name: '42 - Grey, pearl mat', hex: '#a8a8a8' },
    { name: '43 - Anthracite grey, pearl mat', hex: '#4a4a4a' },
    { name: '40 - White, pearl mat', hex: '#e6e6e0' },
    { name: '05 - beige', hex: '#d6c9a8' },
    { name: '09 - brown', hex: '#6e3a1c' },
    { name: '40 - White, pearl mat', hex: '#ededed' },
    { name: '44 - Dark grey, pearl mat', hex: '#555555' },
  ],
  gallery: [
    '/figma/products/euro-design-60.webp',
    '/figma/products/euro-design-70.webp',
    '/figma/products/schuco-aws-wooddesign.webp',
    '/figma/products/reynaers-masterline-8.webp',
  ],
}

const ALUPROF_GALLERY = '/figma/products/aluprof/gallery'
const ALUPROF_COLORS = '/figma/products/aluprof/colors'

const COLORS_RAL: ProductColor[] = [
  { name: 'RAL 7016 — Anthracite grey', image: `${ALUPROF_COLORS}/06-ral-7016-szary-antracyt_0.jpg` },
  { name: 'RAL 9007 — Grey aluminum', image: `${ALUPROF_COLORS}/ral_9007_0.jpg` },
  { name: 'RAL 9006 — Silver', image: `${ALUPROF_COLORS}/ral_9006_0.jpg` },
  { name: 'RAL 9005 — Black', image: `${ALUPROF_COLORS}/04-ral-9005-czarny_0.jpg` },
  { name: 'RAL 9001 — Cream white', image: `${ALUPROF_COLORS}/ral_9001_0.jpg` },
  { name: 'RAL 8019 — Dark brown', image: `${ALUPROF_COLORS}/ral_8019_0.png` },
  { name: 'RAL 8014 — Brown', image: `${ALUPROF_COLORS}/ral_8014_0.jpg` },
  { name: 'RAL 7039 — Quartz grey', image: `${ALUPROF_COLORS}/ral_7039_0.jpg` },
  { name: 'RAL 7024 — Graphite grey', image: `${ALUPROF_COLORS}/ral_7024_0.jpg` },
  { name: 'RAL 9016 — Ultra white', image: `${ALUPROF_COLORS}/05-ral-9016-ultra-bialy_m_0.jpg` },
]

const COLORS_SK_SP: ProductColor[] = [
  { name: '00 — Unpainted', image: `${ALUPROF_COLORS}/00-nielakierowane.jpg` },
  { name: '01 — Silver', image: `${ALUPROF_COLORS}/01_srebrny_0.jpg` },
  { name: '02 — White', image: `${ALUPROF_COLORS}/02_bialy.jpg` },
  { name: '03 — Grey', image: `${ALUPROF_COLORS}/03_szary.jpg` },
  { name: '04 — Dark beige', image: `${ALUPROF_COLORS}/04_ciemno_bezowy.jpg` },
  { name: '05 — Beige', image: `${ALUPROF_COLORS}/05_bezowy.jpg` },
  { name: '06 — Wood-dark', image: `${ALUPROF_COLORS}/06_ciemne_drewno.jpg` },
  { name: '07 — Good-light', image: `${ALUPROF_COLORS}/07_jasne_drewno.jpg` },
  { name: '08 — Dark brown', image: `${ALUPROF_COLORS}/08_ciemnobrazowy.jpg` },
  { name: '09 — Brown', image: `${ALUPROF_COLORS}/09_brazowy.jpg` },
  { name: '11 — Yellow', image: `${ALUPROF_COLORS}/11_zolty.jpg` },
  { name: '12 — Red', image: `${ALUPROF_COLORS}/12_czerwony.jpg` },
  { name: '13 — Green', image: `${ALUPROF_COLORS}/13_zielony.jpg` },
  { name: '15 — Cream white', image: `${ALUPROF_COLORS}/15_biel_kremowa.jpg` },
  { name: '16 — Ivory', image: `${ALUPROF_COLORS}/16_kosc_sloniowa.jpg` },
  { name: '17 — Fir green', image: `${ALUPROF_COLORS}/17_zielen_jodlowa.jpg` },
  { name: '18 — Steel blue', image: `${ALUPROF_COLORS}/18_stalowy_niebieski.jpg` },
  { name: '19 — Bordeau', image: `${ALUPROF_COLORS}/19_bordowy.jpg` },
  { name: '20 — Black', image: `${ALUPROF_COLORS}/20_czarny.jpg` },
  { name: '22 — Ultra white', image: `${ALUPROF_COLORS}/22_ultra_bialy.jpg` },
  { name: '23 — Anthracite grey', image: `${ALUPROF_COLORS}/23_szary_antracyt.jpg` },
  { name: '26 — Mahogany', image: `${ALUPROF_COLORS}/26_mahon.jpg` },
  { name: '28 — Nut', image: `${ALUPROF_COLORS}/28_orzech.jpg` },
  { name: '30 — Golden Oak', image: `${ALUPROF_COLORS}/30_zloty_dab.jpg` },
  { name: '31 — Light grey', image: `${ALUPROF_COLORS}/31_jasny_szary.jpg` },
  { name: '33 — Basalt grey', image: `${ALUPROF_COLORS}/33_bazaltowy_szary.jpg` },
  { name: '34 — Quartz grey', image: `${ALUPROF_COLORS}/34_kwarcowy_szary.jpg` },
  { name: '35 — Concrete gray', image: `${ALUPROF_COLORS}/35_betonowy_szary.jpg` },
  { name: '36 — Wenge', image: `${ALUPROF_COLORS}/36_wenge.jpg` },
  { name: '37 — Grey aluminum', image: `${ALUPROF_COLORS}/37_szare_aluminium.jpg` },
  { name: '38 — Frozen grey', image: `${ALUPROF_COLORS}/38-mrozny-szary.jpg` },
  { name: '39 — Satin grey', image: `${ALUPROF_COLORS}/39-satynowy-szary_0.jpg` },
  { name: '40 — White, pearl mat', image: `${ALUPROF_COLORS}/40_bialy-perlowy-mat.jpg` },
  { name: '41 — Light grey, pearl mat', image: `${ALUPROF_COLORS}/41_jasny-szary-perlowy-mat.jpg` },
  { name: '42 — Grey, pearl mat', image: `${ALUPROF_COLORS}/42_szary-perlowy-mat.jpg` },
  { name: '43 — Anthracite grey, pearl mat', image: `${ALUPROF_COLORS}/43_szary-antracyt-perlowy-mat.jpg` },
  { name: '44 — Dark grey, pearl mat', image: `${ALUPROF_COLORS}/44_ciemny-szary-perlowy-mat.jpg` },
  { name: '71 — Chartwell green', image: `${ALUPROF_COLORS}/71_zielony-chartwell.jpg` },
  { name: '75 — Metallic grey', image: `${ALUPROF_COLORS}/75_szary_metaliczny.jpg` },
  { name: '79 — Light oak', image: `${ALUPROF_COLORS}/79_jasny_dab.jpg` },
]

const COLORS_SKT_SKB: ProductColor[] = COLORS_SK_SP.filter(
  (c) =>
    !c.name.startsWith('41 ') && !c.name.startsWith('42 ') && !c.name.startsWith('44 '),
)

const COLORS_PERGOLA: ProductColor[] = [
  { name: 'R 319 — Anthracite grey, pearl', image: `${ALUPROF_COLORS}/x44-ciemny-szary-perlowy-mat_0.jpg` },
  { name: 'RAL 7016 — Anthracite grey', image: `${ALUPROF_COLORS}/06-ral-7016-szary-antracyt_0.jpg` },
  { name: 'RAL 7024 — Graphite grey', image: `${ALUPROF_COLORS}/ral_7024_0.jpg` },
  { name: 'RAL 7035 — Light grey', image: `${ALUPROF_COLORS}/09-ral-7035-jasny-szary_0.jpg` },
  { name: 'RAL 8019 — Dark brown', image: `${ALUPROF_COLORS}/ral_8019_0.png` },
  { name: 'RAL 9005 — Black', image: `${ALUPROF_COLORS}/04-ral-9005-czarny_0.jpg` },
  { name: 'RAL 9006 — Silver', image: `${ALUPROF_COLORS}/ral_9006_0.jpg` },
  { name: 'RAL 9007 — Grey aluminum', image: `${ALUPROF_COLORS}/ral_9007_0.jpg` },
  { name: 'RAL 9016 — Ultra white', image: `${ALUPROF_COLORS}/05-ral-9016-ultra-bialy_m_0.jpg` },
]

export const PRODUCTS: Product[] = [
  {
    slug: 'euro-design-60',
    name: 'Euro-Design 60',
    category: 'pvc',
    subcategory: 'windows',
    family: 'pvc',
    specs: [
      { key: 'depth', value: '60 мм' },
      { key: 'chambers', value: '3 камери' },
      { key: 'glazing', value: '4–36 мм' },
      { key: 'thermal', value: 'Uf 1.6 Вт/м²K' },
      { key: 'sound', value: 'до 44 дБ' },
    ],
    image: { src: '/figma/products/euro-design-60/photo-1.png' },
    detail: {
      subtitle:
        'Базова ПВХ-система (60 мм, 3 камери) з хорошою тепло- та шумоізоляцією за доступною ціною',
      highlights: [
        { label: 'Конструктивна глибина', value: '60 мм' },
        { label: 'Теплоізоляція', value: 'Uf 1.6 Вт/м²K' },
        { label: 'Звукоізоляція', value: 'до 44 дБ' },
      ],
      description:
        'Euro-Design 60 — базова ПВХ-система з конструктивною глибиною 60 мм та 3-камерною конструкцією. Подвійне ущільнення з EPDM у стику забезпечує надійну герметизацію та захист від продувань.\n\nТеплоізоляція Uf 1.6 Вт/м²K (для DVH 4/12/4) і шумоізоляція до 44 дБ при використанні ізоляційного скла. Можливість скління від 4 до 36 мм — усі з протисклом з коекструдованим ущільнювачем.\n\nДоступна велика кількість допоміжних профілів для спеціальних конструкцій та оздоблення у випадках реконструкції отворів. Багатоточкові фурнітури — для більшої безпеки та плавного закривання.\n\nНеобмежені варіанти відкривання: розпашні, поворотно-відкидні, відкидні, висувні, складні, паралельні, двері, нерухомі панелі та багато інших альтернатив.\n\nПереваги:\n• Гладкі поверхні, що легко миються\n• Елегантний вигляд завдяки фаскам під кутом 15°\n• Похилий фальц у рамі для поліпшення відведення води та полегшення чищення\n• Оптимальні статичні показники завдяки підсиленням із великою конструктивною глибиною\n• Екологічність завдяки можливості переробки\n• Доступні кольори з плівковим покриттям',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 60 мм, 3 камери, армування з оцинкованої сталі.' },
        { title: 'Стулка', description: 'З коекструдованим ущільнювачем, фаски під кутом 15°.' },
        { title: 'Ущільнення', description: 'Подвійне EPDM-ущільнення у стику.' },
        { title: 'Фурнітура', description: 'Багатоточкова — для безпеки та плавного закривання.' },
      ],
      colors: [
        { name: 'Білий', hex: '#f5f5f0' },
        { name: 'Кремово-білий', hex: '#fdf4e3' },
        { name: 'Світло-сірий', hex: '#c8c8c8' },
        { name: 'Антрацит', hex: '#293133' },
        { name: 'Чорний', hex: '#0a0a0a' },
        { name: 'Золотий дуб', hex: '#9c6b3c' },
        { name: 'Махагон', hex: '#5a2820' },
        { name: 'Горіх', hex: '#6e3a1c' },
      ],
      gallery: [
        '/figma/products/euro-design-60/photo-1.png',
        '/figma/products/euro-design-60/photo-2.png',
      ],
    },
  },
  {
    slug: 'euro-design-70',
    name: 'Euro-Design 70',
    category: 'pvc',
    subcategory: 'windows',
    family: 'pvc',
    specs: [
      { key: 'depth', value: '70 мм' },
      { key: 'chambers', value: '5 камер' },
      { key: 'glazing', value: '3–36 мм (до 41 мм)' },
      { key: 'thermal', value: 'Uv до 1.3 Вт/м²K' },
      { key: 'sound', value: 'Rw 45 дБ' },
    ],
    image: { src: '/figma/products/euro-design-70/photo-1.png' },
    detail: {
      subtitle:
        'ПВХ-система (70 мм, 5 камер) з підвищеною тепло- та шумоізоляцією — ідеальна для житлових приміщень і комфортного енергозбереження',
      highlights: [
        { label: 'Конструктивна глибина', value: '70 мм' },
        { label: 'Теплоізоляція', value: 'Uv до 1.3 Вт/м²K' },
        { label: 'Звукоізоляція', value: 'Rw 45 дБ' },
      ],
      description:
        'Euro-Design 70 — це ПВХ-система з конструктивною глибиною 70 мм та 5-камерною конструкцією, з підвищеною тепло- та шумоізоляцією для комфорту та енергозбереження.\n\nТеплоізоляція Uv до 1.3 Вт/м²K та звукоізоляція Rw = 45 дБ. Зломостійкість до класу RC3. Товщина склопакета до 41 мм. Периметральні ущільнювачі для надійного захисту від протягів та вологи.\n\nПовітропроникність 4 · Водонепроникність 9A · Вітростійкість C5.\n\nПереваги:\n• Різні варіанти конструкцій: розпашні, відкидні, розсувні, двері тощо\n• Скління від 3 до 36 мм\n• Широкий вибір додаткових профілів\n• Гладка поверхня, легка в догляді\n• Стильний дизайн (фаска 15°)\n• Ефективне відведення води\n• Міцність завдяки підсиленню\n• Екологічність та можливість вибору кольорів',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 70 мм, 5 камер, армування з оцинкованої сталі.' },
        { title: 'Стулка', description: 'Стилізована фаска 15°, периметральні ущільнювачі.' },
        { title: 'Склопакет', description: 'Товщина від 3 до 36 мм, до 41 мм максимум.' },
        { title: 'Фурнітура', description: 'Багатоточкова — клас зломостійкості до RC3.' },
      ],
      colors: [
        { name: 'Білий', hex: '#f5f5f0' },
        { name: 'Кремово-білий', hex: '#fdf4e3' },
        { name: 'Світло-сірий', hex: '#c8c8c8' },
        { name: 'Антрацит', hex: '#293133' },
        { name: 'Чорний', hex: '#0a0a0a' },
        { name: 'Золотий дуб', hex: '#9c6b3c' },
        { name: 'Махагон', hex: '#5a2820' },
        { name: 'Горіх', hex: '#6e3a1c' },
      ],
      gallery: ['/figma/products/euro-design-70/photo-1.png'],
    },
  },
  {
    slug: 'brilliant-design-70',
    name: 'Brilliant Design 70',
    category: 'pvc',
    subcategory: 'windows',
    family: 'pvc',
    specs: [
      { key: 'depth', value: '70 мм' },
      { key: 'chambers', value: '5–6 камер' },
      { key: 'thermal', value: 'Uf 1.3–1.6 Вт/м²K' },
      { key: 'sound', value: 'Rw до 45 дБ' },
    ],
    image: { src: '/figma/products/brilliant-design-70/photo-1.jpg' },
    detail: {
      subtitle:
        'Преміальна ПВХ-система (70 мм, 5–6 камер) з високою тепло- та шумоізоляцією, елегантним дизайном і підвищеною міцністю',
      highlights: [
        { label: 'Конструктивна глибина', value: '70 мм' },
        { label: 'Теплоізоляція', value: 'Uf 1.3–1.6 Вт/м²K' },
        { label: 'Звукоізоляція', value: 'Rw до 45 дБ' },
      ],
      description:
        'Загальна інформація:\n• Монтажна глибина профілю: 70 мм\n• Коефіцієнт теплопередачі (Uf): до 1,3–1,6 Вт/(м²·К)\n• Індекс ізоляції повітряного шуму (Rw): до 45 дБ\n• Клас протизламності: до RC2–RC3 (згідно EN 1627)\n• Опір вітровому навантаженню: до класу B5 (EN 12210)\n• Водонепроникність: до класу 9A (EN 12208)\n• Повітропроникність: до класу 4 (EN 12207)\n• Відповідність сучасним європейським стандартам енергоефективності та експлуатаційної надійності\n\nПереваги:\n• Високі показники термоізоляції та енергоефективності\n• Ефективна звукоізоляція (зниження зовнішнього шуму)\n• Підвищена протизламність і безпека експлуатації\n• Стійкість до атмосферних впливів (вітер, опади, перепади температур)\n• Висока герметичність конструкції\n• Можливість виготовлення різних типів вікон і дверей\n• Довговічність та збереження експлуатаційних характеристик у часі\n• Сучасний естетичний вигляд профілю',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 70 мм, 5–6 камер.' },
        { title: 'Стулка', description: 'Підвищена міцність, елегантний дизайн.' },
        { title: 'Ущільнення', description: 'Багатоконтурне для герметичності та водонепроникності.' },
        { title: 'Фурнітура', description: 'Багатоточкова — клас протизламності до RC2–RC3.' },
      ],
      colors: [
        { name: 'Білий', hex: '#f5f5f0' },
        { name: 'Кремово-білий', hex: '#fdf4e3' },
        { name: 'Світло-сірий', hex: '#c8c8c8' },
        { name: 'Антрацит', hex: '#293133' },
        { name: 'Чорний', hex: '#0a0a0a' },
        { name: 'Золотий дуб', hex: '#9c6b3c' },
        { name: 'Махагон', hex: '#5a2820' },
        { name: 'Горіх', hex: '#6e3a1c' },
      ],
      gallery: ['/figma/products/brilliant-design-70/photo-1.jpg'],
    },
  },
  {
    slug: 'synego-80',
    name: 'Synego 80',
    category: 'pvc',
    subcategory: 'windows',
    family: 'pvc',
    specs: [
      { key: 'depth', value: '80 мм' },
      { key: 'chambers', value: '6–7 камер' },
      { key: 'thermal', value: 'Uf до 0.94 Вт/м²K' },
      { key: 'sound', value: 'Rw до 47 дБ' },
    ],
    image: { src: '/figma/products/synego-80/photo-1.jpg' },
    detail: {
      subtitle:
        'Енергоефективна ПВХ-система преміум-класу (80 мм, 6–7 камер) з високими показниками тепло- та шумоізоляції — для сучасного житла та підвищеного комфорту',
      highlights: [
        { label: 'Монтажна глибина', value: '80 мм' },
        { label: 'Теплоізоляція Uf', value: 'до 0.94 Вт/м²K' },
        { label: 'Звукоізоляція Rw', value: 'до 47 дБ' },
      ],
      description:
        'Загальна інформація:\n• Монтажна глибина: 80 мм\n• Висота профілів (рама+стулка): від 109 мм\n• Коефіцієнт теплопередачі Uf (EN 12412-2): до 0,94 Вт/(м²K)\n• Коефіцієнт опору теплопередачі Rf*: 1,06 м²K/Вт\n• Звукоізоляція Rw (ISO 10140-2): до 47 дБ\n• Зламобезпека (EN 1627): до класу RC 3\n• Опір до вітрових навантажень (EN 12210): до класу C5/B5\n• Водонепроникність (EN 12208): до класу 9A\n• Повітропроникність (EN 12207): до класу 4\n\nПереваги:\n• Висока енергоефективність (мінімальні тепловтрати)\n• Підвищена шумоізоляція до 47 дБ\n• Високий рівень протизламності (до RC3)\n• Стійкість до сильних вітрових навантажень\n• Відмінна герметичність і водонепроникність\n• Довговічність та стабільність конструкції\n• Підходить для енергоощадних і пасивних будинків\n• Сучасний дизайн і можливість різних конфігурацій',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 80 мм, 6–7 камер, висота від 109 мм.' },
        { title: 'Стулка', description: 'Сучасний дизайн, підвищена жорсткість.' },
        { title: 'Ущільнення', description: 'Багатоконтурне — клас 4 повітропроникності, 9A водонепроникності.' },
        { title: 'Фурнітура', description: 'Багатоточкова — клас зламобезпеки до RC3.' },
      ],
      colors: [
        { name: 'Білий', hex: '#f5f5f0' },
        { name: 'Кремово-білий', hex: '#fdf4e3' },
        { name: 'Світло-сірий', hex: '#c8c8c8' },
        { name: 'Антрацит', hex: '#293133' },
        { name: 'Чорний', hex: '#0a0a0a' },
        { name: 'Золотий дуб', hex: '#9c6b3c' },
        { name: 'Махагон', hex: '#5a2820' },
        { name: 'Горіх', hex: '#6e3a1c' },
      ],
      gallery: ['/figma/products/synego-80/photo-1.jpg'],
    },
  },
  {
    slug: 'schueco-aws-90-si-plus',
    name: 'Schueco AWS 90 SI+',
    category: 'aluminum',
    subcategory: 'windows',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '100 мм' },
      { key: 'glazing', value: '28–68 мм' },
      { key: 'thermal', value: 'Uf від 0.71 Вт/м²K' },
      { key: 'sound', value: 'до 47 дБ' },
    ],
    image: { src: '/figma/products/schueco-aws-90-si-plus/photo-1.webp' },
    detail: {
      subtitle:
        'Schüco AWS 90.SI+ (Super Insulation) — алюмінієва віконна система з оптимізованою теплоізоляцією і сертифікацією «пасивний будинок»',
      highlights: [
        { label: 'Монтажна глибина', value: '100 мм' },
        { label: 'Теплоізоляція', value: 'Uf від 0.71 Вт/м²K' },
        { label: 'Звукоізоляція', value: 'до 47 дБ' },
      ],
      description:
        'Короткий опис:\nВіконна система Schüco AWS 90.SI+ (Super Insulation) ідеально відповідає конструктивним вимогам, забезпечуючи при цьому максимальну свободу дизайну, а також оптимізовану теплоізоляцію та сертифікацію «пасивного будинку».\n\nЗагальна інформація:\n• Монтажна глибина: 100 мм\n• Мін. видима ширина: 99 мм\n• Товщина склопакету: 28–68 мм (потрійне скління)\n• Коефіцієнт теплопередачі рами (Uf): від 0,71 Вт/(м²·К)\n• Звукоізоляція: до 47 дБ\n• Повітропроникність: клас 4\n• Водонепроникність: клас 9A\n• Опір вітровим навантаженням: клас C5/B5\n• Протизламність: до RC3\n\nМаксимальні розміри стулки:\n• ширина: до 1700 мм\n• висота: до 2500 мм\n• вага: до 250 кг\n\nФункціональність:\n• різні типи відкривання (поворотно-відкидні, розсувні, верхньопідвісні тощо)\n• можливість автоматизації (TipTronic)\n• прихована фурнітура\n\nДодатково:\n• безбар\'єрний поріг (0–20 мм)\n• високий рівень міцності та довговічності\n• захист від корозії (клас 5)\n• відповідність стандартам енергоефективності (Passive House phC)\n• можливість різних типів покриття (фарбування, анодування)\n• екологічна сертифікація (Cradle to Cradle Silver)\n\nСфера застосування: житлові та комерційні об\'єкти.\n\nПереваги:\n• Сертифікацію «пасивний будинок» можна отримати за допомогою певної комбінації профілів\n• Поєднання з прихованою фурнітурою системи Schüco AvanTec SimplySmart дозволяє використовувати великі ваги стулки та кут відкриття 180°\n• Рішення для безбар\'єрних дверей на терасу та балкон у варіантах з боковим відкриванням, поворотно-відкидним та подвійним відкриванням\n• Асортимент профілів стулок для використання з фурнітурою покоління Schüco TipTronic SimplySmart\n• Вставна зовнішня рама з перехідною прокладкою для компенсації різної товщини скління, для інтеграції у фасади Schüco з вертикальними та горизонтальними перемичками',
      components: [
        { title: 'Рамний профіль', description: 'Монтажна глибина 100 мм, мін. видима ширина 99 мм.' },
        { title: 'Стулка', description: 'Макс. розміри 1700 × 2500 мм, вага до 250 кг.' },
        { title: 'Ущільнення', description: 'Клас 4 повітропроникності, 9A водонепроникності.' },
        { title: 'Фурнітура', description: 'AvanTec SimplySmart / TipTronic — прихована, RC3.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Світло-сірий RAL 7035', hex: '#cbd0cc' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
        { name: 'Бронза анодована', hex: '#7a5a3a' },
      ],
      gallery: [
        '/figma/products/schueco-aws-90-si-plus/photo-1.webp',
        '/figma/products/schueco-aws-90-si-plus/photo-2.webp',
        '/figma/products/schueco-aws-90-si-plus/photo-3.webp',
        '/figma/products/schueco-aws-90-si-plus/photo-4.webp',
        '/figma/products/schueco-aws-90-si-plus/photo-5.webp',
      ],
    },
  },
  {
    slug: 'schueco-aws-75-si',
    name: 'Schueco AWS 75 SI',
    category: 'aluminum',
    subcategory: 'windows',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '85 мм' },
      { key: 'glazing', value: '18–61 мм' },
      { key: 'thermal', value: 'Uf від 0.9 Вт/м²K' },
      { key: 'sound', value: 'до 48 дБ' },
    ],
    image: { src: '/figma/products/schueco-aws-75-si/photo-1.webp' },
    detail: {
      subtitle:
        'Schüco AWS 75.SI+ (Super Insulation) — оптимізована стандартна алюмінієва віконна система з базовою глибиною 75 мм для енергоефективних огороджувальних конструкцій',
      highlights: [
        { label: 'Монтажна глибина', value: '85 мм' },
        { label: 'Теплоізоляція', value: 'Uf від 0.9 Вт/м²K' },
        { label: 'Звукоізоляція', value: 'до 48 дБ' },
      ],
      description:
        'Короткий опис:\nОптимізована стандартна система вікон Schüco AWS 75.SI+ (Super Insulation) для базової глибини 75 мм входить до системної платформи Schüco AWS і є основою для широкого спектра застосувань у енергоефективних огороджувальних конструкціях будівель.\n\nЗагальна інформація:\n• Монтажна глибина: 85 мм\n• Мінімальна видима ширина: 91 мм\n• Товщина склопакету: 18–61 мм (потрійне скління)\n• Коефіцієнт теплопередачі рами (Uf): від 0,9 Вт/(м²·К)\n• Звукоізоляція: до 48 дБ\n\nГерметичність і стійкість:\n• Повітропроникність: клас 4\n• Водонепроникність: клас 9A\n• Опір вітру: клас C5/B5\n• Протизламність: до RC3\n\nМаксимальні параметри стулки:\n• ширина: до 1700 мм\n• висота: до 2500 мм\n• вага: до 250 кг\n\nФункціональність:\n• різні типи відкривання (поворотні, відкидні, розсувні, верхньопідвісні тощо)\n• автоматизація (TipTronic)\n• прихована фурнітура\n\nДодаткові можливості:\n• безбар\'єрний поріг (до 20 мм)\n• інтегровані сонцезахисні рішення\n• високий рівень міцності та довговічності\n• антикорозійний захист фурнітури (клас 5)\n• різні типи покриття (фарбування, анодування)\n\nСертифікація та стандарти:\n• CE маркування\n• DGNB, Cradle to Cradle Silver\n• відповідність стандарту Minergie-P\n\nСфера застосування: житлові та комерційні об\'єкти.\n\nПереваги:\n• Оптимізована теплоізоляція при незмінній ширині фасаду забезпечує орієнтоване на дизайн проектування енергоефективних огороджувальних конструкцій будівель\n• Гнучкий рівень ізоляції завдяки різноманітним варіантам дизайну та масштабування, а також привабливим можливостям модернізації, наприклад, за допомогою системи внутрішнього сонцезахисту, захисту від відблисків та екранування Integralmaster\n• Сертифікат «Cradle to Cradle» срібного рівня: перевірена та сертифікована висока екологічна стійкість підвищує вартість нерухомості\n• Асортимент вентиляційних профілів для використання з фурнітурою покоління Schüco TipTronic SimplySmart, а також для типів вікон, що відкриваються назовні\n• Вставна зовнішня рама з перехідною прокладкою для компенсації різної товщини скління, для інтеграції у фасади Schüco з вертикальними та горизонтальними перемичками\n• Рішення для безбар\'єрних дверей на терасу та балкон у варіантах з боковим відкриванням, поворотно-відкидним та подвійним відкриванням',
      components: [
        { title: 'Рамний профіль', description: 'Монтажна глибина 85 мм, мін. видима ширина 91 мм.' },
        { title: 'Стулка', description: 'Макс. розміри 1700 × 2500 мм, вага до 250 кг.' },
        { title: 'Ущільнення', description: 'Клас 4 повітропроникності, 9A водонепроникності.' },
        { title: 'Фурнітура', description: 'TipTronic SimplySmart — прихована, RC3.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Світло-сірий RAL 7035', hex: '#cbd0cc' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
        { name: 'Бронза анодована', hex: '#7a5a3a' },
      ],
      gallery: [
        '/figma/products/schueco-aws-75-si/photo-1.webp',
        '/figma/products/schueco-aws-75-si/photo-2.webp',
        '/figma/products/schueco-aws-75-si/photo-3.webp',
        '/figma/products/schueco-aws-75-si/photo-4.webp',
        '/figma/products/schueco-aws-75-si/photo-5.webp',
        '/figma/products/schueco-aws-75-si/photo-6.webp',
        '/figma/products/schueco-aws-75-si/photo-7.webp',
      ],
    },
  },
  {
    slug: 'schuco-aws-wooddesign',
    name: 'Schüco AWS WoodDesign',
    category: 'aluminum',
    subcategory: 'wood-aluminum',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '75 / 90 мм' },
      { key: 'material', value: 'алюміній + дуб' },
      { key: 'glazing', value: 'до 50 мм' },
      { key: 'thermal', value: 'Uf ≈ 1.2–1.5' },
      { key: 'sound', value: 'до 47–49 дБ' },
    ],
    image: { src: '/figma/products/schuco-aws-wooddesign/photo-1.webp' },
    detail: {
      subtitle:
        'Schüco AWS WoodDesign — алюмінієве вікно з декоративними планками з натурального дуба з боку приміщення: поєднання експлуатаційних характеристик алюмінію та природного вигляду деревини',
      highlights: [
        { label: 'Монтажна глибина', value: '75 / 90 мм' },
        { label: 'Матеріал', value: 'алюміній + дуб' },
        { label: 'Теплоізоляція', value: 'Uf ≈ 1.2–1.5' },
      ],
      description:
        'Короткий опис:\nЗ внутрішньої сторони вікна Schüco WoodDesign облицьовані смужками з натурального дерева, що дозволяє створити вікно, яке поєднує в собі найкраще з обох світів: високі експлуатаційні характеристики алюмінієвого вікна та природний вигляд дерев\'яної поверхні.\n\nЗагальна інформація:\nСистема Schüco AWS WoodDesign доступна для блокових систем з базовою глибиною 75 та 90 мм. Поверхня під дерево створюється шляхом приклеювання декоративних дерев\'яних планок до внутрішньої сторони алюмінієвого вентиляційного профілю. У результаті отримуємо стійке до атмосферних впливів, стабільне та довговічне вікно з природним дерев\'яним дизайном з боку приміщення, яке також вражає чудовими експлуатаційними характеристиками, такими як видатна теплоізоляція, вузькі профілі з високим ступенем прозорості та широкий асортимент фурнітури та аксесуарів з модульної системи AWS.\n\nПереваги:\nОсобливості віконних систем Schüco AWS WoodDesign\n\n✓ Поєднання декоративних планок із натурального дуба та міцного, стійкого до атмосферних впливів алюмінію\n✓ Спрощення монтажу завдяки технології склеювання\n✓ Широкий вибір варіантів оформлення з використанням готових стандартів та у співпраці з партнерами',
      components: [
        { title: 'Рамний профіль', description: 'Алюмінієва основа, базова глибина 75 або 90 мм.' },
        { title: 'Декор', description: 'Декоративні планки з натурального дуба з внутрішнього боку.' },
        { title: 'Технологія', description: 'Склеювання дерев\'яних планок до алюмінієвого вентиляційного профілю.' },
        { title: 'Фурнітура', description: 'Модульна система AWS — широкий асортимент.' },
      ],
      colors: [
        { name: 'Дуб натуральний', hex: '#c8a36a' },
        { name: 'Дуб світлий', hex: '#d8b483' },
        { name: 'Дуб димчастий', hex: '#7d5a3a' },
        { name: 'Венге', hex: '#3d2a1f' },
      ],
      gallery: ['/figma/products/schuco-aws-wooddesign/photo-1.webp'],
    },
  },
  {
    slug: 'reynaers-sensity',
    name: 'Reynaers Sensity',
    category: 'aluminum',
    subcategory: 'wood-aluminum',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '86 мм' },
      { key: 'material', value: 'алюміній + дерево' },
      { key: 'glazing', value: 'до 55 мм' },
      { key: 'thermal', value: 'Uf ≈ 1.4 Вт/м²K' },
    ],
    image: { src: '/figma/products/reynaers-sensity/photo-1.jpg' },
    detail: {
      subtitle:
        'Reynaers Sensity — преміальна алюмінієво-дерев\'яна система: термоізольований алюміній на основі CS 86-HI зовні + суцільний масив італійських сортів дерева зсередини',
      highlights: [
        { label: 'Теплоізоляція', value: 'Uf ≈ 1.4 Вт/м²K' },
        { label: 'Скління', value: 'до 55 мм' },
        { label: 'Макс. розміри', value: 'до 2600 мм / 180 кг' },
      ],
      description:
        'Короткий опис:\nСистема SENSITY — це нова унікальна високоякісна алюмінієво-дерев\'яна система.\n\nЗагальна інформація:\nЗовнішня частина та каркас вікна SENSITY виготовлені з термоізольованого алюмінію — це вдосконалений варіант однієї з найбільш теплоізольованих і технологічних систем Reynaers CS 86-HI.\n\nАлюмінієва конструкція може витримати будь-які, навіть найнесприятливіші кліматичні умови. Особливістю моделі є те, що замовник може сам вибрати колір вікна.\n\nКоефіцієнт теплопровідності Вт/м²К становить 1,4 (не враховуючи дерев\'яних накладок) залежно від комбінації рама/стулка. У цю систему можна встановити склопакет товщиною до 55 мм.\n\nВнутрішнє дерево — це суцільний масив з найкращих італійських сортів, рекомендованих дизайнерами.\n\nДля виготовлення дерев\'яних складових виробу використовується цілісний масив з найкращих італійських сортів деревини, варіанти колірного оформлення якого — «світлий дуб», «табако» та «венге» — дозволяють підібрати вікно «Sensity» під будь-який інтер\'єр.\n\nПереваги:\n• для протистояння навіть екстремальним погодним умовам\n• з високими теплотехнічними характеристиками\n• фарбується у вибраний колір\n• великі розміри: висота до 2600 мм\n• вага стулки до 180 кг',
      components: [
        { title: 'Зовнішня рама', description: 'Термоізольований алюміній на базі CS 86-HI.' },
        { title: 'Внутрішнє оздоблення', description: 'Суцільний масив італійських сортів деревини.' },
        { title: 'Скління', description: 'Склопакет до 55 мм.' },
        { title: 'Стулка', description: 'Висота до 2600 мм, вага до 180 кг.' },
      ],
      colors: [
        { name: 'Світлий дуб', hex: '#c8a36a' },
        { name: 'Табако', hex: '#7d5a3a' },
        { name: 'Венге', hex: '#3d2a1f' },
      ],
      gallery: [
        '/figma/products/reynaers-sensity/photo-1.jpg',
        '/figma/products/reynaers-sensity/photo-2.jpg',
        '/figma/products/reynaers-sensity/photo-3.jpg',
      ],
    },
  },
  {
    slug: 'reynaers-masterline-8',
    name: 'Reynaers MasterLine 8',
    category: 'aluminum',
    subcategory: 'windows',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '77 / 87 мм' },
      { key: 'glazing', value: '13–72 мм' },
      { key: 'thermal', value: 'Uf до 1.3 Вт/м²K' },
      { key: 'sound', value: 'до 44–46 дБ' },
    ],
    image: { src: '/figma/products/reynaers-masterline-8/photo-1.webp' },
    detail: {
      subtitle:
        'Reynaers MasterLine 8 — універсальна серія високоякісних алюмінієвих вікон з відмінною теплоізоляцією, герметичністю та широкими можливостями для дизайну й функціональних застосувань',
      highlights: [
        { label: 'Монтажна глибина', value: '77 / 87 мм' },
        { label: 'Теплоізоляція', value: 'Uf до 1.3 / Uw до 0.89' },
        { label: 'Звукоізоляція', value: 'до 44–46 дБ' },
      ],
      description:
        'Короткий опис:\nMasterLine 8 — універсальне рішення. Ця серія високоякісних алюмінієвих вікон відрізняється надійністю, різноманітними дизайнерськими можливостями та широким спектром функціональних застосувань. Насолоджуйтесь чудовими результатами навіть у найсуворіших погодних умовах.\n\nЗагальна інформація:\n\nТеплоізоляція:\n• Коефіцієнт теплопередачі рами (Uf): до 1,3 Вт/м²К\n• Коефіцієнт теплопередачі вікна (Uw): до 0,89 Вт/м²К\n\nГерметичність і стійкість:\n• Повітропроникність: клас 4 (600 Па)\n• Водонепроникність: клас E900 (900 Па)\n• Опір вітровим навантаженням: клас C5 (2000 Па)\n\nЗвукоізоляція:\n• до 44–46 дБ\n\nБезпека:\n• Протизламність: RC2–RC3 (PAS 24)\n• Ударостійкість: класи I5 / E5\n\nДовговічність:\n• Клас 3 (до 20 000 циклів відкривання)\n\nКонструктивні параметри:\n• Монтажна глибина рами: 77 мм\n• Глибина стулки: 87 мм\n• Мінімальна видима ширина: від 97 мм\n\nСкління:\n• Товщина скла: 13–72 мм\n• Тип: сухе або структурне скління\n\nОсобливості:\n• Підходить для різних типів відкривання (всередину/назовні)\n• Висока енергоефективність і герметичність\n• Можливість адаптації під різні типи проєктів (житлові, комерційні)\n\nПереваги:\n• Висока енергоефективність\n• Відмінна герметичність\n• Ефективна шумоізоляція\n• Підвищена безпека (до RC3)\n• Стійкість до вітру та опадів\n• Довговічність конструкції\n• Гнучкість у проєктуванні та склінні',
      components: [
        { title: 'Рамний профіль', description: 'Глибина рами 77 мм, мін. видима ширина від 97 мм.' },
        { title: 'Стулка', description: 'Глибина 87 мм, відкривання всередину/назовні.' },
        { title: 'Ущільнення', description: 'Клас 4 повітропроникності, E900 водонепроникності.' },
        { title: 'Фурнітура', description: 'Багатоточкова — клас протизламності RC2–RC3 (PAS 24).' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Світло-сірий RAL 7035', hex: '#cbd0cc' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
        { name: 'Бронза анодована', hex: '#7a5a3a' },
      ],
      gallery: ['/figma/products/reynaers-masterline-8/photo-1.webp'],
    },
  },
  {
    slug: 'cortizo-cor-70-hv',
    name: 'Cortizo COR 70 HV',
    category: 'aluminum',
    subcategory: 'windows',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '70 мм' },
      { key: 'thermal', value: 'Uw ≥ 0.84 Вт/м²K' },
      { key: 'sound', value: 'до 46 дБ' },
    ],
    image: { src: '/figma/products/cortizo-cor-70-hv/photo-1.jpg' },
    detail: {
      subtitle:
        'Cortizo COR 70 Hoja Oculta — алюмінієве вікно з прихованою стулкою (видимий переріз 66 мм), прихованою фурнітурою ARCH INVISIBLE та системою водовідведення',
      highlights: [
        { label: 'Теплоізоляція Uw', value: '≥ 0.84 Вт/м²K' },
        { label: 'Звукоізоляція', value: 'до 46 дБ' },
        { label: 'Безпека', value: 'PAS24' },
      ],
      description:
        'Короткий опис:\nЦе не рама, це вікно. Саме так можна описати модель COR 70 Hoja Oculta, яка, як і версія шириною 80 мм, має видимий переріз усього 66 мм і дозволяє встановити ручку ARCH INVISIBLE, а також приховати петлі та систему водовідведення.\n\nЗагальна інформація:\n• Теплоізоляція (Uw): ≥ 0,84 Вт/м²К\n• Звукоізоляція (Rw): до 46 дБ\n• Повітропроникність: клас 4\n• Водонепроникність: до класу 1800\n• Опір вітровим навантаженням: клас C5\n• Безпека: відповідність стандарту PAS24\n\nВипробування:\n• AEV тест: 1,23 × 1,48 м (1 стулка)\n• Тест безпеки: 1,10 × 2,40 м (1 стулка)\n\nСертифікація: лабораторія CSTB (DTA)\n\nПереваги:\n• Висока енергоефективність (Uw до 0,84 Вт/м²К)\n• Ефективна шумоізоляція (до 46 дБ)\n• Висока герметичність (клас 4)\n• Відмінна водонепроникність\n• Стійкість до сильних вітрових навантажень (клас C5)\n• Підвищена безпека (відповідність PAS24)\n• Надійність, підтверджена сертифікацією CSTB',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 70 мм, видимий переріз 66 мм (Hoja Oculta).' },
        { title: 'Стулка', description: 'Прихована — для мінімального видимого профілю.' },
        { title: 'Фурнітура', description: 'ARCH INVISIBLE — прихована ручка та петлі.' },
        { title: 'Сертифікація', description: 'CSTB (DTA), відповідність PAS24.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Світло-сірий RAL 7035', hex: '#cbd0cc' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
        { name: 'Бронза анодована', hex: '#7a5a3a' },
      ],
      gallery: ['/figma/products/cortizo-cor-70-hv/photo-1.jpg'],
    },
  },
  {
    slug: 'cortizo-cor-80-passivhaus',
    name: 'Cortizo COR 80 Passivhaus',
    category: 'aluminum',
    subcategory: 'windows',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '80 мм' },
      { key: 'thermal', value: 'Uw ≥ 0.66 Вт/м²K' },
      { key: 'sound', value: 'до 46 дБ' },
    ],
    image: { src: '/figma/products/cortizo-cor-80-passivhaus/photo-1.jpg' },
    detail: {
      subtitle:
        'Cortizo COR 80 Passivhaus — алюмінієва система, сертифікована для пасивного будинку (тепло-помірний клімат): Uw від 0.66 Вт/м²K, виняткова теплоізоляція завдяки пінопластовим вставкам у рамі та стулці',
      highlights: [
        { label: 'Теплоізоляція Uw', value: '≥ 0.66 Вт/м²K' },
        { label: 'Звукоізоляція', value: 'до 46 дБ' },
        { label: 'Сертифікація', value: 'Passivhaus' },
      ],
      description:
        'Короткий опис:\nЦя система, сертифікована для кліматичної категорії «тепло-помірний клімат», забезпечує виняткову теплоізоляцію завдяки спеціальним пінопластовим матеріалам у рамі та стулці. З коефіцієнтом теплопередачі Uw від 0,66 Вт/м²К вона є ідеальним рішенням для будівель з низьким енергоспоживанням.\n\nЗагальна інформація:\n• Теплоізоляція (Uw): ≥ 0,66 Вт/м²К\n• Звукоізоляція (Rw): до 46 дБ\n• Повітропроникність: клас 4\n• Водонепроникність: клас E1950\n• Опір вітровим навантаженням: клас C5\n• Випробування (AEV): 1,23 × 1,48 м (2 стулки)\n\nПереваги:\n• Підвищена енергоефективність\n• Висока герметичність\n• Ефективна шумоізоляція\n• Стійкість до складних погодних умов\n• Надійність конструкції',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 80 мм з пінопластовими вставками.' },
        { title: 'Стулка', description: 'З пінопластовими вставками для теплоізоляції.' },
        { title: 'Сертифікація', description: 'Passivhaus — для тепло-помірного клімату.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Світло-сірий RAL 7035', hex: '#cbd0cc' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
        { name: 'Бронза анодована', hex: '#7a5a3a' },
      ],
      gallery: ['/figma/products/cortizo-cor-80-passivhaus/photo-1.jpg'],
    },
  },
  {
    slug: 'cortizo-cor-60',
    name: 'Cortizo COR 60',
    category: 'aluminum',
    subcategory: 'windows',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '60 мм' },
      { key: 'thermal', value: 'Uw ≥ 1.0 Вт/м²K' },
      { key: 'sound', value: 'до 48 дБ' },
    ],
    image: { src: '/figma/products/cortizo-cor-60/photo-1.jpg' },
    detail: {
      subtitle:
        'Cortizo COR 60 — алюмінієва система на петлях з глибиною рами 60 мм та 24-мм поліамідними профілями: видатний тепловий і акустичний комфорт, шумоізоляція до 48 дБ',
      highlights: [
        { label: 'Монтажна глибина', value: '60 мм' },
        { label: 'Теплоізоляція Uw', value: '≥ 1.0 Вт/м²K' },
        { label: 'Звукоізоляція', value: 'до 48 дБ' },
      ],
      description:
        'Короткий опис:\nСистема на петлях із глибиною рами 60 мм, оснащена 24-міліметровими поліамідними профілями, що забезпечує видатний тепловий та акустичний комфорт, досягаючи рівня шумоізоляції до 48 дБ.\n\nЗагальна інформація:\n• Теплоізоляція (Uw): ≥ 1,0 Вт/м²К\n• Звукоізоляція (Rw): до 48 дБ\n• Повітропроникність: клас 4\n• Водонепроникність: клас E1350\n• Опір вітровим навантаженням: клас C5\n• Випробування (AEV): 1,23 × 1,48 м (2 стулки)\n\nПереваги:\n• Надійна теплоізоляція\n• Високий рівень шумоізоляції\n• Відмінна герметичність\n• Стійкість до погодних впливів\n• Стабільність і довговічність конструкції',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 60 мм, 24-мм поліамідні профілі.' },
        { title: 'Стулка', description: 'На петлях, для відмінної звуко- та теплоізоляції.' },
        { title: 'Ущільнення', description: 'Клас 4 повітропроникності, E1350 водонепроникності.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Світло-сірий RAL 7035', hex: '#cbd0cc' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
        { name: 'Бронза анодована', hex: '#7a5a3a' },
      ],
      gallery: ['/figma/products/cortizo-cor-60/photo-1.jpg'],
    },
  },
  {
    slug: 'schuco-ad-up-75',
    name: 'Schueco AD UP 75',
    category: 'doors',
    subcategory: 'entrance',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '75 мм' },
      { key: 'glazing', value: '13–53 мм' },
      { key: 'thermal', value: 'Uf ≥ 1.4 Вт/м²K' },
      { key: 'sound', value: 'до 42 дБ' },
    ],
    image: { src: '/figma/products/schuco-ad-up-75/photo-1.webp' },
    detail: {
      subtitle:
        'Schüco AD UP 75 — алюмінієва дверна система з базовою глибиною 75 мм: відмінна теплоізоляція, висока стабільність і функціональна надійність для престижних житлових та комерційних об\'єктів',
      highlights: [
        { label: 'Монтажна глибина', value: '75 мм' },
        { label: 'Теплоізоляція', value: 'Uf ≥ 1.4 Вт/м²K' },
        { label: 'Звукоізоляція', value: 'до 42 дБ' },
      ],
      description:
        'Короткий опис:\nВідмінні теплоізоляційні властивості в поєднанні з високою стабільністю — дверна система Schüco AD UP 75 з базовою глибиною 75 мм забезпечує високу функціональну надійність для будь-яких потреб у престижних житлових та комерційних будівлях.\n\nЗагальна інформація:\n• Теплоізоляція (Uf): ≥ 1,4 Вт/(м²·К)\n• Звукоізоляція: до 42 дБ\n• Повітропроникність: клас 4\n• Водонепроникність: клас E750\n• Опір вітровим навантаженням: клас C3/B3\n• Протизламність: до RC3\n• Ударостійкість: клас 1\n\nГабарити та навантаження:\n• максимальна висота: до 3000 мм\n• максимальна ширина: до 1400 мм\n• максимальна вага стулки: до 200 кг\n• товщина заповнення: 13–53 мм\n\nКонструкція:\n• товщина дверного полотна: 75 мм\n• різні варіанти виконання (одностулкові, двостулкові, з фрамугою, боковими частинами)\n• можливість відкривання всередину/назовні\n\nФункціональність:\n• прихована або накладна фурнітура\n• електричні замки, функція антипаніка\n• захист від защемлення пальців\n• різні типи порогів (у т.ч. безбар\'єрний)\n\nОздоблення: RAL, анодування\n\nСертифікація: CE, RAL, Cradle to Cradle Silver\n\nСфера застосування: житлові та комерційні об\'єкти.\n\nПереваги:\n• Тришарова конструкція профілю забезпечує максимальну стабільність та функціональну надійність\n• Відмінна теплоізоляція\n• Модульна система ущільнювачів для оптимальної адаптації до необхідних властивостей системи, наприклад, найкращих показників водонепроникності\n• Випробування на механічну міцність до 1 мільйона циклів забезпечують тривалий термін експлуатації та високу несучу здатність\n• Асортимент типів вентиляційних отворів, приховані петлі в поєднанні з системою зв\'язку та контролем доступу для високого рівня свободи планування\n• Циліндрична петля для великих висот стулок\n• Перевірена безпека та комфорт системи',
      components: [
        { title: 'Дверне полотно', description: 'Товщина 75 мм, тришарова конструкція профілю.' },
        { title: 'Стулка', description: 'Макс. висота 3000 мм, ширина 1400 мм, вага до 200 кг.' },
        { title: 'Заповнення', description: 'Товщина 13–53 мм.' },
        { title: 'Фурнітура', description: 'Прихована/накладна — електрозамки, антипаніка, RC3.' },
        { title: 'Поріг', description: 'Різні типи, у т.ч. безбар\'єрний.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Світло-сірий RAL 7035', hex: '#cbd0cc' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
        { name: 'Бронза анодована', hex: '#7a5a3a' },
      ],
      gallery: [
        '/figma/products/schuco-ad-up-75/photo-1.webp',
        '/figma/products/schuco-ad-up-75/photo-2.webp',
        '/figma/products/schuco-ad-up-75/photo-3.webp',
        '/figma/products/schuco-ad-up-75/photo-4.webp',
        '/figma/products/schuco-ad-up-75/photo-5.webp',
        '/figma/products/schuco-ad-up-75/photo-6.webp',
      ],
    },
  },
  {
    slug: 'entrance-euro-design-60',
    name: 'Euro Design 60',
    category: 'doors',
    subcategory: 'entrance',
    family: 'pvc',
    specs: [
      { key: 'depth', value: '60 мм' },
      { key: 'chambers', value: '3 камери' },
      { key: 'glazing', value: 'до 33 мм' },
      { key: 'thermal', value: 'Uf 1.6 Вт/м²K' },
      { key: 'sound', value: 'до 41 дБ' },
    ],
    image: { src: '/figma/products/entrance-euro-design-60/photo-1.webp' },
    detail: {
      subtitle:
        'Entrance Doors Euro Design 60 — практична дверна ПВХ-система (60 мм, 3 камери) з базовою тепло- та шумоізоляцією, надійною конструкцією та доступною вартістю',
      highlights: [
        { label: 'Конструктивна глибина', value: '60 мм' },
        { label: 'Теплоізоляція', value: 'Uf 1.6 Вт/м²K' },
        { label: 'Звукоізоляція', value: 'до 41 дБ' },
      ],
      description:
        'Загальна інформація:\n• Конструктивна глибина: 60 мм\n• Максимальна товщина склопакету: до 33 мм\n• Висота профілів (рама + стулка): 117 мм\n• Коефіцієнт теплопередачі (Uf): 1,6 Вт/м²К\n• Коефіцієнт опору теплопередачі (Rf): 0,65 м²К/Вт\n• Звукоізоляція: до 41 дБ\n• Клас протизламності: до RC2 (ENV 1627)\n• Повітропроникність: клас 4 (EN 12207)\n• Водонепроникність: до класу 9A (EN 12208)\n• Ущільнення: EPDM, 2 контури\n• Оздоблення: білий, кольоровий, декор "під дерево"\n\nПереваги:\nПрофіль REHAU Euro-Design 60 має трикамерну будову з монтажною глибиною 60 мм. За останніми вимогами до теплоізоляції житлових приміщень така система рекомендована до застосування в ІІ температурній зоні України (Південь країни та Закарпаття).\n\nСистема з монтажною глибиною 60 мм є економічно обґрунтованим вибором для застосування в різноманітних будівельних проєктах, оскільки забезпечує оптимальне співвідношення ціни та якості.\n\n• Вікна з трикамерної профільної системи використовуються для засклення балконних блоків, балконів та лоджій.\n• Оптимальні для засклення міжетажних маршів багатоквартирних будинків.\n• Ідеально пасують для будинків з центральною системою опалення, в яких немає ексклюзивних вимог до тепло- та звукоізоляції.',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 60 мм, 3 камери, армування з оцинкованої сталі.' },
        { title: 'Стулка', description: 'Висота профілів (рама + стулка) 117 мм.' },
        { title: 'Ущільнення', description: 'EPDM, 2 контури — клас 4 повітропроникності, 9A водонепроникності.' },
        { title: 'Фурнітура', description: 'Багатоточкова — клас протизламності до RC2.' },
      ],
      colors: [
        { name: 'Білий', hex: '#f5f5f0' },
        { name: 'Кремово-білий', hex: '#fdf4e3' },
        { name: 'Світло-сірий', hex: '#c8c8c8' },
        { name: 'Антрацит', hex: '#293133' },
        { name: 'Чорний', hex: '#0a0a0a' },
        { name: 'Золотий дуб', hex: '#9c6b3c' },
        { name: 'Махагон', hex: '#5a2820' },
        { name: 'Горіх', hex: '#6e3a1c' },
      ],
      gallery: ['/figma/products/entrance-euro-design-60/photo-1.webp'],
    },
  },
  {
    slug: 'entrance-brilliant-design-70',
    name: 'Brilliant Design 70',
    category: 'doors',
    subcategory: 'entrance',
    family: 'pvc',
    specs: [
      { key: 'depth', value: '70 мм' },
      { key: 'glazing', value: 'до 41 мм' },
      { key: 'thermal', value: 'Uf 1.2–1.6 Вт/м²K' },
      { key: 'sound', value: 'до 43–45 дБ' },
    ],
    image: { src: '/figma/products/entrance-brilliant-design-70/photo-1.jpg' },
    detail: {
      subtitle:
        'Універсальна ПВХ-система Brilliant Design 70 для вхідних, балконних і терасних дверей — з підвищеною тепло- та шумоізоляцією, протизламністю до RC3 і сучасним дизайном',
      highlights: [
        { label: 'Монтажна глибина', value: '70 мм' },
        { label: 'Теплоізоляція', value: 'Uf 1.2–1.6 Вт/м²K' },
        { label: 'Звукоізоляція', value: 'до 43–45 дБ' },
      ],
      description:
        'Загальна інформація:\n• Монтажна глибина: 70 мм\n• Товщина склопакету: до 41 мм (EURO-DESIGN 70)\n• Висота профілів (рама + стулка): 108–177 мм (в залежності від системи та типу конструкції)\n• Коефіцієнт теплопередачі (Uf): 1,2–1,6 Вт/(м²·К)\n• Коефіцієнт опору теплопередачі (Rf): 0,77–0,80 м²К/Вт\n• Звукоізоляція: до 43–45 дБ\n• Клас протизламності: до RC3 (EN 1627)\n• Опір вітру: до класу C5/B5\n• Водонепроникність: до класу 9A\n• Повітропроникність: до класу 4\n• Ущільнення: EPDM, 2 контури\n• Вікна, балконні та терасні двері\n• Вхідні двері (залежно від системи)\n\nЕксплуатаційні властивості:\n• Висока герметичність\n• Стійкість до кліматичних впливів\n• Надійність та довговічність конструкцій\n\nПереваги:\n• Висока тепло- та шумоізоляція\n• Підвищена герметичність конструкції\n• Надійний захист від злому (до RC3)\n• Стійкість до вітру та опадів\n• Довговічність і стабільність профілю\n• Універсальність застосування (вікна, двері)\n• Сучасний дизайн і варіативність виконання',
      components: [
        { title: 'Рамний профіль', description: 'Монтажна глибина 70 мм, висота 108–177 мм.' },
        { title: 'Стулка', description: 'Підвищена герметичність і стабільність форми.' },
        { title: 'Ущільнення', description: 'EPDM, 2 контури — клас 4 повітропроникності, 9A водонепроникності.' },
        { title: 'Фурнітура', description: 'Багатоточкова — клас протизламності до RC3.' },
      ],
      colors: [
        { name: 'Білий', hex: '#f5f5f0' },
        { name: 'Кремово-білий', hex: '#fdf4e3' },
        { name: 'Світло-сірий', hex: '#c8c8c8' },
        { name: 'Антрацит', hex: '#293133' },
        { name: 'Чорний', hex: '#0a0a0a' },
        { name: 'Золотий дуб', hex: '#9c6b3c' },
        { name: 'Махагон', hex: '#5a2820' },
        { name: 'Горіх', hex: '#6e3a1c' },
      ],
      gallery: ['/figma/products/entrance-brilliant-design-70/photo-1.jpg'],
    },
  },
  {
    slug: 'synego-80-slide',
    name: 'Synego 80',
    category: 'doors',
    subcategory: 'sliding',
    family: 'pvc',
    specs: [
      { key: 'depth', value: '156 / 80 мм' },
      { key: 'glazing', value: 'до 51 мм' },
      { key: 'thermal', value: 'Uf 1.3 Вт/м²K' },
      { key: 'maxSize', value: '4000 × 2600 мм' },
    ],
    image: { src: '/figma/products/synego-80-slide/photo-1.webp' },
    detail: {
      subtitle:
        'REHAU SYNEGO SLIDE — паралельно-зсувні вікна та двері з AST-типом відкривання і герметичним ущільненням по периметру притвору',
      highlights: [
        { label: 'Глибина по рамі / стулці', value: '156 / 80 мм' },
        { label: 'Теплоізоляція', value: 'Uf 1.3 Вт/м²K' },
        { label: 'Макс. розміри', value: '4000 × 2600 мм' },
      ],
      description:
        'Короткий опис:\nREHAU SYNEGO SLIDE — це паралельно-зсувні вікна та двері з AST-типом відкривання і герметичним ущільненням по периметру притвору.\n\nЗагальна інформація:\n• Схема відкривання: A\n• Коефіцієнт теплопровідності: Uf 1,3 Вт/м²K\n• Глибина по рамі: 156 мм\n• Глибина по стулці: 80 мм\n• Максимальні розміри конструкції: 4000 × 2600 мм\n• Максимальні розміри стулки: 2000 × 2500 мм\n• Максимальна вага стулки: 200 кг\n• Товщина склопакету: до 51 мм\n• Водонепроникність: 9A\n• Повітропроникність: клас 4\n• Зламобезпека: RC2\n\nПереваги:\nВ момент зачинення механізм AST-фурнітури надійно притискає стулку до рами по всьому периметру, гарантуючи високі показники повітро- та вологонепроникності, а відтак і хороші теплоізоляційні властивості.\n\n• Герметичність: ущільнення з EPDM каучуку по всьому периметру притвору.\n• Smart-принцип: зручна інноваційна фурнітура, яка на відміну від інших розсувних рішень позбавлена ризиків неправильного спрацювання механізмів, що робить її дружньою для непідготовлених споживачів.\n• Ідеальний вигляд: прихована фурнітура.\n• Вигідно: відсутній «дорогий» масивний поріг, непримхливі в експлуатації.\n• Широка кольорова палітра.',
      components: [
        { title: 'Рамний профіль', description: 'Глибина по рамі 156 мм.' },
        { title: 'Стулка', description: 'Глибина 80 мм, макс. розміри 2000 × 2500 мм, вага до 200 кг.' },
        { title: 'Ущільнення', description: 'EPDM каучук по всьому периметру — клас 4 повітропроникності, 9A водонепроникності.' },
        { title: 'Фурнітура', description: 'AST-типу — прихована, з притиском по периметру; зламобезпека RC2.' },
      ],
      colors: [
        { name: 'Білий', hex: '#f5f5f0' },
        { name: 'Кремово-білий', hex: '#fdf4e3' },
        { name: 'Світло-сірий', hex: '#c8c8c8' },
        { name: 'Антрацит', hex: '#293133' },
        { name: 'Чорний', hex: '#0a0a0a' },
        { name: 'Золотий дуб', hex: '#9c6b3c' },
        { name: 'Махагон', hex: '#5a2820' },
        { name: 'Горіх', hex: '#6e3a1c' },
      ],
      gallery: [
        '/figma/products/synego-80-slide/photo-1.webp',
        '/figma/products/synego-80-slide/photo-2.webp',
      ],
    },
  },
  {
    slug: 'entrance-reynaers-masterline-8',
    name: 'Reynaers Masterline 8',
    category: 'doors',
    subcategory: 'entrance',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '77 мм' },
      { key: 'thermal', value: 'Uf до 1.3 / Ud до 0.98' },
      { key: 'sound', value: 'до 43 дБ' },
      { key: 'maxSize', value: '3000 × 1400 мм' },
    ],
    image: { src: '/figma/products/entrance-reynaers-masterline-8/photo-1.webp' },
    detail: {
      subtitle:
        'Reynaers MasterLine 8 — флагманська алюмінієва дверна система: висока теплоізоляція, сертифікований екологічний дизайн і довічний комфорт у простому в експлуатації рішенні',
      highlights: [
        { label: 'Монтажна глибина', value: '77 мм' },
        { label: 'Теплоізоляція', value: 'Uf до 1.3 / Ud до 0.98' },
        { label: 'Звукоізоляція', value: 'до 43 дБ' },
      ],
      description:
        'Короткий опис:\nВибравши MasterLine 8, ви обираєте оптимальну ефективність у кожній деталі. Наша флагманська система дверей поєднує високі теплоізоляційні характеристики, сертифікований екологічний дизайн та довічний комфорт у єдиному, простому в експлуатації алюмінієвому рішенні.\n\nЗагальна інформація:\n\nТеплоізоляція:\n• Коефіцієнт теплопередачі рами (Uf): до 1,3 Вт/м²К\n• Коефіцієнт теплопередачі дверей (Ud): до 0,98 Вт/м²К\n\nГерметичність і стійкість:\n• Повітропроникність: клас 4 (600 Па)\n• Водонепроникність: клас 8A (450 Па)\n• Опір вітровим навантаженням: клас C2 (800 Па)\n\nЗвукоізоляція:\n• до 43 дБ\n\nБезпека:\n• Протизламність: RC2–RC3 (PAS 24)\n• Ударостійкість: класи I5 / E5\n• Вогнестійкість: EI₂ 30\n\nДовговічність:\n• Клас 8 (до 1 000 000 циклів відкривання)\n\nГабарити та навантаження:\n• Висота: 500–3000 мм\n• Ширина: 500–1400 мм\n• Вага стулки: до 250 кг\n\nКонструктивні параметри:\n• Монтажна глибина: 77 мм\n• Мінімальна видима ширина: від 153 мм\n\nСкління:\n• Тип: сухе або силіконізоване скління\n• Висота фальца: 27 мм\n\nОсобливості:\n• Підходить для відкривання всередину та назовні\n• Висока енергоефективність і герметичність\n• Можливість використання у житлових та комерційних об\'єктах\n\nПереваги:\n• Енергоефективність і збереження тепла\n• Високий рівень безпеки та вогнестійкість\n• Надійність і довговічність конструкції\n• Комфорт у використанні та шумоізоляція\n• Гнучкість у проєктуванні та застосуванні',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 77 мм, мін. видима ширина від 153 мм.' },
        { title: 'Стулка', description: 'Висота 500–3000 мм, ширина 500–1400 мм, вага до 250 кг.' },
        { title: 'Скління', description: 'Сухе або силіконізоване, висота фальца 27 мм.' },
        { title: 'Фурнітура', description: 'Багатоточкова — RC2–RC3 (PAS 24), вогнестійкість EI₂ 30.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Світло-сірий RAL 7035', hex: '#cbd0cc' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
        { name: 'Бронза анодована', hex: '#7a5a3a' },
      ],
      gallery: ['/figma/products/entrance-reynaers-masterline-8/photo-1.webp'],
    },
  },
  {
    slug: 'cortizo-millenium-plus-70',
    name: 'Cortizo Millenium Plus 70',
    category: 'doors',
    subcategory: 'entrance',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '70 мм' },
      { key: 'thermal', value: 'Ud ≥ 0.9 Вт/м²K' },
      { key: 'sound', value: 'до 38 дБ' },
    ],
    image: { src: '/figma/products/cortizo-millenium-plus-70/photo-1.jpg' },
    detail: {
      subtitle:
        'Cortizo Millenium Plus 70 — алюмінієва система плоских пішохідних дверей глибиною 70 мм з високим рівнем тепло- та звукоізоляції',
      highlights: [
        { label: 'Монтажна глибина', value: '70 мм' },
        { label: 'Теплоізоляція', value: 'Ud ≥ 0.9 Вт/м²K' },
        { label: 'Звукоізоляція', value: 'до 38 дБ' },
      ],
      description:
        'Короткий опис:\nСистема плоских пішохідних дверей глибиною 70 мм, що забезпечує високий рівень тепло- та звукоізоляції.\n\nЗагальна інформація:\n• Теплоізоляція (Ud): ≥ 0,9 Вт/м²К\n• Звукоізоляція (Rw): до 38 дБ\n• Повітропроникність: клас 4\n• Водонепроникність: клас 6A\n• Опір вітровим навантаженням: клас C4\n• Протизламність: RC2 (WK2)\n• Ударостійкість (м\'яке тіло): клас 5\n• Довговічність: до 1 000 000 циклів відкривання/закривання\n• Випробування (AEV): 1,20 × 2,30 м (1 стулка)\n\nПереваги:\n• Конструкція забезпечує належний рівень енергоефективності, що сприяє зниженню тепловтрат і оптимізації енергоспоживання будівлі.\n• Високі показники герметичності (повітро- та водонепроникності) гарантують ефективний захист внутрішнього середовища від впливу зовнішніх кліматичних чинників, зокрема вологи, вітру та інфільтрації повітря.\n• Звукоізоляційні характеристики сприяють зменшенню рівня акустичного навантаження, що забезпечує підвищений комфорт перебування у приміщенні.\n• Конструкція характеризується достатнім рівнем протизламності, що підвищує безпеку експлуатації та захист від несанкціонованого доступу.\n• Висока механічна міцність і стійкість до вітрових навантажень забезпечують стабільність геометричних параметрів та надійність роботи в умовах інтенсивної експлуатації.\n• Довговічність конструкції підтверджується значним ресурсом циклів відкривання, що забезпечує тривалий термін служби без втрати функціональних властивостей.',
      components: [
        { title: 'Дверне полотно', description: 'Плоске, глибина 70 мм.' },
        { title: 'Ущільнення', description: 'Клас 4 повітропроникності, 6A водонепроникності.' },
        { title: 'Фурнітура', description: 'Клас протизламності RC2 (WK2).' },
        { title: 'Довговічність', description: 'До 1 000 000 циклів відкривання/закривання.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: ['/figma/products/cortizo-millenium-plus-70/photo-1.jpg'],
    },
  },
  {
    slug: 'cortizo-millenium-plus-80',
    name: 'Cortizo Millenium Plus 80',
    category: 'doors',
    subcategory: 'entrance',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '80 мм' },
      { key: 'thermal', value: 'Ud ≥ 0.8 Вт/м²K' },
      { key: 'sound', value: 'до 40 дБ' },
    ],
    image: { src: '/figma/products/cortizo-millenium-plus-80/photo-1.jpg' },
    detail: {
      subtitle:
        'Cortizo Millenium Plus 80 — алюмінієва система плоских пішохідних дверей з прямими лініями (глибина 80 мм, тепловий розрив 34 мм) для торгових приміщень та будівель',
      highlights: [
        { label: 'Монтажна глибина', value: '80 мм' },
        { label: 'Теплоізоляція', value: 'Ud ≥ 0.8 Вт/м²K' },
        { label: 'Звукоізоляція', value: 'до 40 дБ' },
      ],
      description:
        'Короткий опис:\nСистема плоских пішохідних дверей з прямими лініями, глибиною 80 мм та тепловим розривом 34 мм, що особливо підходить для торгових приміщень та будівель.\n\nЗагальна інформація:\n• Теплопередача (Ud): ≥ 0,8 Вт/м²К\n• Звукоізоляція: до 40 дБ\n• Повітропроникність: клас 4\n• Водонепроникність: клас 6A\n• Стійкість до вітру: клас C4\n• Стійкість до удару (м\'яке тіло): клас 5 (макс.)\n• Довговічність: до 1 000 000 циклів відкривання/закривання\n• Протизламність: клас RC2 (WK2)\n\nПереваги:\n• Висока енергоефективність — зменшення тепловтрат\n• Хороша звукоізоляція — до 40 дБ\n• Герметичність — захист від дощу та протягів\n• Стійкість до вітру та погодних умов\n• Довговічність — до 1 млн циклів відкривання\n• Підвищена безпека — захист від злому (RC2)\n• Міцність конструкції — витримує механічні навантаження',
      components: [
        { title: 'Дверне полотно', description: 'Глибина 80 мм, тепловий розрив 34 мм.' },
        { title: 'Ущільнення', description: 'Клас 4 повітропроникності, 6A водонепроникності.' },
        { title: 'Фурнітура', description: 'RC2 (WK2), 1 млн циклів.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: ['/figma/products/cortizo-millenium-plus-80/photo-1.jpg'],
    },
  },
  {
    slug: 'cortizo-panel-door',
    name: 'Cortizo Panel Door',
    category: 'doors',
    subcategory: 'entrance',
    family: 'aluminum',
    specs: [
      { key: 'type', value: 'панельні двері' },
      { key: 'maxSize', value: 'клас C5' },
    ],
    image: { src: '/figma/products/cortizo-panel-door/photo-1.jpg' },
    detail: {
      subtitle:
        'Cortizo Panel Door — алюмінієві двері з вбудованою в стулку панеллю (сумісні з Millennium Plus 70/80): світлодіодна ручка, відкривання за відбитком пальця, широкі дизайн-можливості',
      highlights: [
        { label: 'Стійкість до вітру', value: 'клас C5' },
        { label: 'Довговічність', value: '1 000 000 циклів' },
        { label: 'Сумісність', value: 'Millennium Plus 70/80' },
      ],
      description:
        'Короткий опис:\nСумісна з серіями Millennium Plus 80 та Millennium Plus 70, вона оснащена вбудованою в стулку панеллю, що відкриває широкі можливості для дизайну. Крім того, вона дозволяє встановити вбудовану ручку зі світлодіодним підсвічуванням та систему відкривання за допомогою відбитка пальця.\n\nЗагальна інформація:\n• Повітропроникність: клас 4\n• Водонепроникність: клас 6A\n• Стійкість до вітру: клас C5\n• Довговічність: 1 000 000 циклів відкривання/закривання\n\nПереваги:\n• Максимальна герметичність — без протягів\n• Надійний захист від дощу та вологи\n• Висока стійкість до сильного вітру (клас C5)\n• Довгий термін служби — до 1 000 000 циклів\n• Стабільність і міцність конструкції\n• Комфорт у будь-яких погодних умовах',
      components: [
        { title: 'Панель', description: 'Вбудована в стулку — широкі можливості дизайну.' },
        { title: 'Ручка', description: 'Вбудована, опційно зі світлодіодним підсвічуванням.' },
        { title: 'Замок', description: 'Опційно — система відкривання за відбитком пальця.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: ['/figma/products/cortizo-panel-door/photo-1.jpg'],
    },
  },
  {
    slug: 'reynaers-masterline-8-hi-pivot',
    name: 'Reynaers Masterline 8 HI Pivot',
    category: 'doors',
    subcategory: 'swing-doors',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '77 мм' },
      { key: 'thermal', value: 'Ud 1.3 Вт/м²K' },
      { key: 'maxSize', value: '4000 × 2500 мм' },
    ],
    image: { src: '/figma/products/reynaers-masterline-8-hi-pivot/photo-1.webp' },
    detail: {
      subtitle:
        'Reynaers MasterLine 8 HI Pivot — флагманська алюмінієва шарнірна система: висока теплоізоляція, безпека до RC2, великі габарити (до 4000 мм / 500 кг)',
      highlights: [
        { label: 'Теплоізоляція', value: 'Uf 1.5 / Ud 1.3' },
        { label: 'Макс. розміри', value: '4000 × 2500 мм' },
        { label: 'Макс. вага', value: '500 кг' },
      ],
      description:
        'Короткий опис:\nНаша флагманська система 8-дверних дверей MasterLine поєднує високі теплоізоляційні характеристики, сертифіковану екологічну конструкцію та довічний комфорт у єдиному, простому в експлуатації алюмінієвому рішенні. Двері на шарнірах чудово підходять для вхідних груп і доступні як у стандартному розмірі, так і у вражаючому варіанті XL.\n\nЕнергоефективність:\n• Теплоізоляція (Uf): 1,5 Вт/м²К\n• Теплоізоляція дверей (Ud): 1,3 Вт/м²К\n\nКомфорт:\n• Повітронепроникність: клас 4 (600 Па)\n• Водонепроникність: клас 4A (150 Па)\n• Стійкість до вітру: клас C3 (1200 Па)\n• Довговічність: клас 5 (100 000 циклів)\n\nБезпека:\n• Протизламність: RC2\n\nГабарити та навантаження:\n• Макс. висота стулки: 4000 мм\n• Мін. ширина: 1150 мм\n• Макс. ширина: 2500 мм\n• Макс. вага: 500 кг\n\nКонструкція:\n• Ширина рами: від 80 мм\n• Ширина стулки: від 43 мм\n• Монтажна глибина: 77 мм\n\nСклопакет:\n• Висота фальца: 27 мм\n• Тип скління: сухе / силіконізоване / внутрішнє\n\n👉 Примітка: характеристики можуть змінюватися залежно від конфігурації профілю.\n\nПереваги:\n• Висока теплоізоляція — економія енергії\n• Герметичність — захист від протягів, вологи та шуму\n• Стійкість до вітру та погодних навантажень\n• Довговічність — витримує до 100 000 циклів\n• Підвищена безпека — клас протизламності RC2\n• Великі габарити — можливість встановлення широких і високих дверей\n• Висока вантажопідйомність — до 500 кг\n• Сучасний дизайн — тонкі профілі, більше світла',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 77 мм, ширина рами від 80 мм.' },
        { title: 'Стулка', description: 'Ширина від 43 мм, висота до 4000 мм, вага до 500 кг.' },
        { title: 'Скління', description: 'Сухе / силіконізоване / внутрішнє, фальц 27 мм.' },
        { title: 'Фурнітура', description: 'Шарнірна, RC2, 100 000 циклів.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: ['/figma/products/reynaers-masterline-8-hi-pivot/photo-1.webp'],
    },
  },
  {
    slug: 'cortizo-millenium-plus-pivot',
    name: 'Cortizo Millenium Plus Pivot',
    category: 'doors',
    subcategory: 'swing-doors',
    family: 'aluminum',
    specs: [
      { key: 'thermal', value: 'Up ≥ 0.77 Вт/м²K' },
      { key: 'maxSize', value: 'клас C5' },
    ],
    image: { src: '/figma/products/cortizo-millenium-plus-pivot/photo-1.jpg' },
    detail: {
      subtitle:
        'Cortizo Millenium Plus Pivot — алюмінієва шарнірна система вхідних дверей з варіантами панелей або скління: великі прорізи, мінімалістичний дизайн, висока герметичність',
      highlights: [
        { label: 'Теплоізоляція', value: 'Up ≥ 0.77 Вт/м²K' },
        { label: 'Стійкість до вітру', value: 'клас C5' },
        { label: 'Водонепроникність', value: 'клас 5A' },
      ],
      description:
        'Опис:\nСистема вхідних дверей на шарнірах, що пропонується у варіантах із панелями або склінням, відповідає найсучаснішим тенденціям дизайну. Завдяки шарнірним осям вона дозволяє створювати прорізи великих розмірів, стаючи передовим рішенням для сучасної архітектури. Безпека та чудові тепло- і звукоізоляційні характеристики також виділяють цю систему, яка доповнює лінійку мінімалістичних рішень CORTIZO.\n\nЗагальна інформація:\n• Теплопровідність (Up): ≥ 0,77 Вт/м²К\n• Повітропроникність: клас 4\n• Водонепроникність: клас 5A\n• Стійкість до вітру: клас C5\n\nПереваги:\n• Висока енергоефективність\n• Максимальна герметичність\n• Надійний захист від дощу\n• Стійкість до сильного вітру\n• Комфорт у будь-яких погодних умовах',
      components: [
        { title: 'Шарнірна вісь', description: 'Дозволяє створювати великі прорізи.' },
        { title: 'Стулка', description: 'Варіанти із панелями або склінням.' },
        { title: 'Ущільнення', description: 'Клас 4 повітропроникності, 5A водонепроникності.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: ['/figma/products/cortizo-millenium-plus-pivot/photo-1.jpg'],
    },
  },
  {
    slug: 'automatic-doors-gu',
    name: 'Automatic entrance doors G-U',
    category: 'doors',
    subcategory: 'auto-sliding',
    family: 'aluminum',
    specs: [
      { key: 'type', value: 'автоматичні розсувні' },
      { key: 'material', value: 'алюміній + загартоване скло' },
      { key: 'control', value: 'сенсори руху, 220В' },
    ],
    image: { src: '/figma/products/automatic-doors-gu/photo-1.jpg' },
    detail: {
      subtitle:
        'Automatic entrance doors G-U — автоматичні алюмінієві розсувні двері з електроприводом і сенсорами руху для комерційних та громадських будівель',
      highlights: [
        { label: 'Тип', value: 'автоматичні розсувні' },
        { label: 'Привід', value: 'електричний, безшумний' },
        { label: 'Живлення', value: '220В' },
      ],
      description:
        'Опис:\nАвтоматичні вхідні двері G-U — це сучасні розсувні системи з електроприводом, які забезпечують комфортний, безконтактний доступ до приміщень. Використовуються у комерційних та громадських будівлях.\n\nЗагальна інформація:\n• Автоматичне відкривання/закривання (сенсори руху)\n• Тип: розсувні (одностулкові / двостулкові)\n• Матеріал: алюміній + загартоване скло\n• Інтелектуальна система керування\n• Регулювання швидкості руху стулок\n• Безшумна робота приводу\n• Живлення: 220В\n• Високий ресурс роботи (інтенсивна експлуатація)\n\nПереваги:\n• Комфорт і безконтактний доступ\n• Енергоефективність (мінімальні тепловтрати)\n• Сучасний зовнішній вигляд\n• Безпека (датчики перешкод)\n• Надійність і довговічність\n• Підходять для інтенсивного використання',
      components: [
        { title: 'Привід', description: 'Електричний з регулюванням швидкості.' },
        { title: 'Сенсори', description: 'Сенсори руху, датчики перешкод.' },
        { title: 'Керування', description: 'Інтелектуальна система керування.' },
        { title: 'Стулки', description: 'Алюміній + загартоване скло.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: [
        '/figma/products/automatic-doors-gu/photo-1.jpg',
        '/figma/products/automatic-doors-gu/photo-2.jpg',
        '/figma/products/automatic-doors-gu/photo-3.jpg',
      ],
    },
  },
  {
    slug: 'reynaers-pivot-door',
    name: 'Reynaers MasterLine 8 Pivot Door',
    category: 'doors',
    subcategory: 'pivot',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '77 мм' },
      { key: 'material', value: 'алюміній' },
      { key: 'glazing', value: 'до 50–62 мм' },
      { key: 'thermal', value: 'Uf ≈ 1.5' },
      { key: 'sound', value: 'до 43–46 дБ' },
    ],
    image: { src: '/figma/products/reynaers-pivot-door.webp' },
    detail: DEMO_DETAIL,
  },
  {
    slug: 'euro-design-70-slide-fold',
    name: 'Euro Design 70 Slide & Fold',
    category: 'systems',
    subcategory: 'sliding',
    family: 'pvc',
    specs: [
      { key: 'depth', value: '70 мм' },
      { key: 'chambers', value: '5 камер' },
      { key: 'glazing', value: '8–43 мм' },
      { key: 'thermal', value: 'Uf 1.3 Вт/м²K' },
      { key: 'sound', value: 'до 45 дБ' },
    ],
    image: { src: '/figma/products/euro-design-70-slide-fold/photo-1.webp' },
    detail: {
      subtitle:
        'REHAU Euro-Design 70 S774 — паралельно-зсувна та складна (Slide & Fold) ПВХ-система з підвищеною тепло- та шумоізоляцією для комфортного житлового та комерційного будівництва',
      highlights: [
        { label: 'Товщина стін', value: '70 мм' },
        { label: 'Теплоізоляція', value: 'Uf 1.3 Вт/м²K' },
        { label: 'Звукоізоляція', value: 'до 45 дБ' },
      ],
      description:
        'Короткий опис:\nREHAU Euro-Design 70 S774 — це ідеальний вибір для забудовників та власників житла, які ставлять особливі вимоги до тепло- та звукоізоляції. Конструкція профілів оптимізована для економічно ефективного будівництва.\n\nЗагальна інформація:\n• Товщина стін: 70 мм\n• Камери: 5 камер\n• Теплоізоляція: Uf = 1,3 Вт/м²·К\n• Звукоізоляція: до 45 дБ\n• Повітряна герметичність: клас 4\n• Водонепроникність: клас 9A / E 750\n• Товщина скління: 8 мм ~ 43 мм\n\nПереваги:\n• Високий рівень тепло- та звукоізоляції\n• Енергоефективність при оптимальній вартості\n• Надійна герметичність (захист від протягів і вологи)\n• Стійкість до атмосферних впливів\n• Міцність і стабільність конструкції\n• Можливість використання різних типів склопакетів\n• Підходить для житлового та комерційного будівництва\n• Сучасний вигляд і універсальність застосування',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 70 мм, 5 камер.' },
        { title: 'Стулка', description: 'Slide & Fold — паралельно-зсувне та складне відкривання.' },
        { title: 'Ущільнення', description: 'Клас 4 повітропроникності, 9A / E 750 водонепроникності.' },
        { title: 'Склопакет', description: 'Товщина скління від 8 до 43 мм.' },
      ],
      colors: [
        { name: 'Білий', hex: '#f5f5f0' },
        { name: 'Кремово-білий', hex: '#fdf4e3' },
        { name: 'Світло-сірий', hex: '#c8c8c8' },
        { name: 'Антрацит', hex: '#293133' },
        { name: 'Чорний', hex: '#0a0a0a' },
        { name: 'Золотий дуб', hex: '#9c6b3c' },
        { name: 'Махагон', hex: '#5a2820' },
        { name: 'Горіх', hex: '#6e3a1c' },
      ],
      gallery: [
        '/figma/products/euro-design-70-slide-fold/photo-1.webp',
        '/figma/products/euro-design-70-slide-fold/photo-2.webp',
        '/figma/products/euro-design-70-slide-fold/photo-3.webp',
        '/figma/products/euro-design-70-slide-fold/photo-4.webp',
        '/figma/products/euro-design-70-slide-fold/photo-5.webp',
      ],
    },
  },
  {
    slug: 'synego-slide-156',
    name: 'Synego Slide 156',
    category: 'systems',
    subcategory: 'sliding',
    family: 'pvc',
    specs: [
      { key: 'depth', value: '156 / 80 мм' },
      { key: 'glazing', value: 'до 51 мм' },
      { key: 'thermal', value: 'Uf 1.3 Вт/м²K' },
      { key: 'maxSize', value: '4000 × 2600 мм' },
    ],
    image: { src: '/figma/products/synego-slide-156/photo-1.webp' },
    detail: {
      subtitle:
        'REHAU SYNEGO SLIDE — паралельно-зсувні вікна та двері з AST-типом відкривання і герметичним ущільненням по периметру притвору',
      highlights: [
        { label: 'Глибина по рамі / стулці', value: '156 / 80 мм' },
        { label: 'Теплоізоляція', value: 'Uf 1.3 Вт/м²K' },
        { label: 'Макс. розміри', value: '4000 × 2600 мм' },
      ],
      description:
        'Короткий опис:\nREHAU SYNEGO SLIDE — це паралельно-зсувні вікна та двері з AST-типом відкривання і герметичним ущільненням по периметру притвору.\n\nЗагальна інформація:\n• Схема відкривання: A\n• Коефіцієнт теплопровідності: Uf 1,3 Вт/м²K\n• Глибина по рамі: 156 мм\n• Глибина по стулці: 80 мм\n• Максимальні розміри конструкції: 4000 × 2600 мм\n• Максимальні розміри стулки: 2000 × 2500 мм\n• Максимальна вага стулки: 200 кг\n• Товщина склопакету: до 51 мм\n• Водонепроникність: 9A\n• Повітропроникність: клас 4\n• Зламобезпека: RC2\n\nПереваги:\nВ момент зачинення механізм AST-фурнітури надійно притискає стулку до рами по всьому периметру, гарантуючи високі показники повітро- та вологонепроникності, а відтак і хороші теплоізоляційні властивості.\n\n• Герметичність: ущільнення з EPDM каучуку по всьому периметру притвору.\n• Smart-принцип: зручна інноваційна фурнітура, яка на відміну від інших розсувних рішень позбавлена ризиків неправильного спрацювання механізмів, що робить її дружньою для непідготовлених споживачів.\n• Ідеальний вигляд: прихована фурнітура.\n• Вигідно: відсутній «дорогий» масивний поріг, непримхливі в експлуатації.\n• Широка кольорова палітра.',
      components: [
        { title: 'Рамний профіль', description: 'Глибина по рамі 156 мм.' },
        { title: 'Стулка', description: 'Глибина 80 мм, макс. розміри 2000 × 2500 мм, вага до 200 кг.' },
        { title: 'Ущільнення', description: 'EPDM каучук по всьому периметру — клас 4 повітропроникності, 9A водонепроникності.' },
        { title: 'Фурнітура', description: 'AST-типу — прихована, з притиском по периметру; зламобезпека RC2.' },
      ],
      colors: [
        { name: 'Білий', hex: '#f5f5f0' },
        { name: 'Кремово-білий', hex: '#fdf4e3' },
        { name: 'Світло-сірий', hex: '#c8c8c8' },
        { name: 'Антрацит', hex: '#293133' },
        { name: 'Чорний', hex: '#0a0a0a' },
        { name: 'Золотий дуб', hex: '#9c6b3c' },
        { name: 'Махагон', hex: '#5a2820' },
        { name: 'Горіх', hex: '#6e3a1c' },
      ],
      gallery: [
        '/figma/products/synego-slide-156/photo-1.webp',
        '/figma/products/synego-slide-156/photo-2.webp',
      ],
    },
  },
  {
    slug: 'schueco-ase-60',
    name: 'Schueco ASE 60',
    category: 'systems',
    subcategory: 'sliding-folding',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '140–232 мм' },
      { key: 'glazing', value: '24–40 мм' },
      { key: 'thermal', value: 'Uw ≥ 1.1 Вт/м²K' },
      { key: 'sound', value: 'до 41 дБ' },
      { key: 'maxSize', value: 'до 21000 мм' },
    ],
    image: { src: '/figma/products/schueco-ase-60/photo-1.webp' },
    detail: {
      subtitle:
        'Schüco ASE 60 — модульна та масштабована алюмінієва розсувна та підйомно-розсувна система з відмінною теплоізоляцією, малою шириною рами і комплексними рішеннями для дизайну та комфорту',
      highlights: [
        { label: 'Глибина системи', value: '140–232 мм' },
        { label: 'Теплоізоляція', value: 'Uw ≥ 1.1 Вт/м²K' },
        { label: 'Макс. розміри', value: 'до 21 000 мм' },
      ],
      description:
        'Опис:\nМодульна та масштабована система розсувних та підйомно-розсувних вікон Schüco ASE 60 відрізняється чудовими показниками теплоізоляції, невеликою шириною рами та комплексними рішеннями в плані дизайну та комфорту.\n\nЗагальна інформація:\nРозміри стулки:\n• висота: 1334–3500 мм\n• ширина: 630–3500 мм\n• Максимальна вага стулки: до 500 кг\n• Максимальна ширина конструкції: до 21 000 мм\n• Глибина системи: 140–232 мм\n• Товщина заповнення: 24–40 мм\n• Теплоізоляція: Uw ≥ 1.1 Вт/(м²·K)\n• Звукоізоляція: до 41 дБ\n• Водонепроникність: клас E900\n• Повітропроникність: клас 4\n• Вітростійкість: C5/B5\n• Зломостійкість: до RC2\n• Тип відкривання: розсувні (1–3 рейки)\n• Поріг: < 12,5 мм\n• Матеріал напрямних: нержавіюча сталь\n• Автоматизація: електропривід, TipTronic, сенсори\n• Покриття: порошкове, анодоване, фарбоване\n\nПереваги:\n• Модульність та різноманітність варіантів відкривання, включаючи кутове відкривання на 90°, гарантують свободу дизайну та високий рівень гнучкості\n• Вузькі лицьові ширини провітрювальних рам створюють витончений вигляд\n• Варіанти DesignLine з рівним порогом та тонкою секцією замикання забезпечують високий рівень комфорту та сучасний дизайн\n• Прихований паз для фурнітури без видимих технічних компонентів забезпечує чистий та елегантний вигляд\n• Schüco SmartStop та SmartClose як опціональна фурнітура гарантують підвищену зручність та максимальну безпеку під час експлуатації вентиляційних вікон',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 140–232 мм, поріг < 12,5 мм.' },
        { title: 'Стулка', description: 'Висота 1334–3500 мм, ширина 630–3500 мм, вага до 500 кг.' },
        { title: 'Скління', description: 'Заповнення 24–40 мм.' },
        { title: 'Напрямні', description: 'Нержавіюча сталь, 1–3 рейки.' },
        { title: 'Автоматизація', description: 'Електропривід, TipTronic, SmartStop / SmartClose.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Світло-сірий RAL 7035', hex: '#cbd0cc' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
        { name: 'Бронза анодована', hex: '#7a5a3a' },
      ],
      gallery: [
        '/figma/products/schueco-ase-60/photo-1.webp',
        '/figma/products/schueco-ase-60/photo-2.webp',
        '/figma/products/schueco-ase-60/photo-3.webp',
        '/figma/products/schueco-ase-60/photo-4.webp',
      ],
    },
  },
  {
    slug: 'schueco-ase-80-hi',
    name: 'Schueco ASE 80 HI',
    category: 'systems',
    subcategory: 'sliding-folding',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '180–292 мм' },
      { key: 'glazing', value: '36–60 мм' },
      { key: 'thermal', value: 'Uw ≥ 0.99 Вт/м²K' },
      { key: 'sound', value: 'до 43 дБ' },
      { key: 'maxSize', value: 'до 21 000 мм' },
    ],
    image: { src: '/figma/products/schueco-ase-80-hi/photo-1.webp' },
    detail: {
      subtitle:
        'Schüco ASE 80.HI (High Insulated) — безбар\'єрна високоізоляційна розсувна та підйомно-розсувна алюмінієва система для пасивного будинку: вузькі рами, елегантний дизайн, екологічна архітектура',
      highlights: [
        { label: 'Глибина системи', value: '180–292 мм' },
        { label: 'Теплоізоляція', value: 'Uw ≥ 0.99 Вт/м²K' },
        { label: 'Макс. розміри', value: 'до 21 000 мм' },
      ],
      description:
        'Опис:\nБезбар\'єрна, надзвичайно проста у використанні та з витонченим зовнішнім виглядом — високоізоляційна розсувна та підйомно-розсувна система Schüco ASE 80.HI (High Insulated) пропонує елегантні дизайнерські рішення для екологічної, орієнтованої на користувача архітектури, що відповідає стандартам пасивного будинку.\n\nЗагальна інформація:\nРозміри стулки:\n• висота: 1334–3500 мм\n• ширина: 630–3500 мм\n\n• Максимальна вага стулки: до 500 кг\n• Максимальна ширина конструкції: до 21 000 мм\n• Глибина системи: 180–292 мм\n• Товщина заповнення: 36–60 мм\n• Теплоізоляція: Uw ≥ 0.99 Вт/(м²·K)\n• Звукоізоляція: до 43 дБ\n• Водонепроникність: клас E900\n• Повітропроникність: клас 4\n• Вітростійкість: C5/B5\n• Зломостійкість: до RC2\n• Кількість направляючих: 1–3 рейки\n• Матеріал рейок: сталь / нержавіюча сталь\n• Поріг: < 12,5 мм\n• Автоматизація: електропривід, TipTronic, сенсори\n• Покриття: порошкове, анодоване, фарбоване\n\nПереваги:\n• Модульність та різноманітність варіантів відкривання, включаючи кутове відкривання на 90°, гарантують свободу дизайну та високий рівень гнучкості\n• Вузькі лицьові ширини провітрювальних рам створюють витончений вигляд\n• Варіанти DesignLine з рівним порогом та тонкою секцією замикання забезпечують високий рівень комфорту та сучасний дизайн\n• Прихований паз для фурнітури без видимих технічних компонентів забезпечує чистий та елегантний вигляд\n• Schüco SmartStop та SmartClose як опціональна фурнітура гарантують підвищену зручність та максимальну безпеку під час експлуатації вентиляційних вікон',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 180–292 мм, поріг < 12,5 мм.' },
        { title: 'Стулка', description: 'Висота 1334–3500 мм, ширина 630–3500 мм, вага до 500 кг.' },
        { title: 'Скління', description: 'Заповнення 36–60 мм.' },
        { title: 'Напрямні', description: 'Сталь / нержавіюча сталь, 1–3 рейки.' },
        { title: 'Автоматизація', description: 'TipTronic, SmartStop / SmartClose.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: ['/figma/products/schueco-ase-80-hi/photo-1.webp'],
    },
  },
  {
    slug: 'schueco-ase-67-pd',
    name: 'Schueco ASE 67 PD',
    category: 'systems',
    subcategory: 'sliding-folding',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '177–267 мм' },
      { key: 'glazing', value: '36–49 мм' },
      { key: 'thermal', value: 'Uw ≥ 1.0 Вт/м²K' },
      { key: 'sound', value: 'до 46 дБ' },
      { key: 'maxSize', value: 'до 19 200 мм' },
    ],
    image: { src: '/figma/products/schueco-ase-67-pd/photo-1.webp' },
    detail: {
      subtitle:
        'Schüco ASE 67 PD (Panorama Design) — теплоізольована розсувна алюмінієва система: гнучкі рішення, найвищі вимоги до зручності та дизайну, лауреат Red Dot Design Award 2019',
      highlights: [
        { label: 'Глибина системи', value: '177–267 мм' },
        { label: 'Теплоізоляція', value: 'Uw ≥ 1.0 Вт/м²K' },
        { label: 'Макс. розміри', value: 'до 19 200 мм' },
      ],
      description:
        'Опис:\nТеплоізольована розсувна система Schüco ASE 67 PD (Panorama Design) забезпечує гнучкі рішення, що відповідають найвищим вимогам щодо зручності використання та дизайну; вона була удостоєна премії Red Dot Design Award 2019.\n\nЗагальна інформація:\nРозміри стулки:\n• висота: 2000–3000 мм\n• ширина: 1000–3200 мм\n\n• Максимальна вага стулки: до 400 кг\n• Максимальна ширина конструкції: до 19 200 мм\n• Глибина системи: 177–267 мм\n• Товщина заповнення: 36–49 мм\n• Теплоізоляція: Uw ≥ 1.0 Вт/(м²·K)\n• Звукоізоляція: до 46 дБ\n• Водонепроникність: клас 9A\n• Повітропроникність: клас 4\n• Вітростійкість: клас C3\n• Зломостійкість: до RC2\n• Кількість стулок: до 6\n• Кількість рейок: 1–3\n• Матеріал направляючих: алюміній\n• Поріг: < 12,5 мм\n• Тип керування: ручний\n• Покриття: порошкове, анодоване, фарбоване\n\nПереваги:\n• Теплоізольована розсувна система Panorama Design із максимальною прозорістю та максимальним проникненням світла\n• Два типи зовнішніх рам, що забезпечують високу свободу дизайну\n• Просте поєднання різних профілів стулки та зовнішньої рами дозволяє гнучко реагувати на побажання клієнтів\n• Спеціальна точка фіксації в зоні зчеплення також дозволяє фіксувати відкриті стулки\n• Мінімалістичний дизайн ручок та з\'єднувальних профілів',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 177–267 мм, поріг < 12,5 мм.' },
        { title: 'Стулка', description: 'Висота 2000–3000 мм, ширина 1000–3200 мм, вага до 400 кг.' },
        { title: 'Скління', description: 'Заповнення 36–49 мм.' },
        { title: 'Напрямні', description: 'Алюміній, 1–3 рейки.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: [
        '/figma/products/schueco-ase-67-pd/photo-1.webp',
        '/figma/products/schueco-ase-67-pd/photo-2.webp',
        '/figma/products/schueco-ase-67-pd/photo-3.webp',
        '/figma/products/schueco-ase-67-pd/photo-4.webp',
        '/figma/products/schueco-ase-67-pd/photo-5.webp',
      ],
    },
  },
  {
    slug: 'schueco-ass-39-pd-ni',
    name: 'Schueco ASS 39 PD NI',
    category: 'systems',
    subcategory: 'sliding-folding',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '107–162 мм' },
      { key: 'glazing', value: '6–32 мм' },
      { key: 'thermal', value: 'Uw ≥ 1.9 Вт/м²K' },
      { key: 'maxSize', value: 'до 18 000 мм' },
    ],
    image: { src: '/figma/products/schueco-ass-39-pd-ni/photo-1.webp' },
    detail: {
      subtitle:
        'Schüco ASS 39 PD.NI (Panorama Design Non-Insulated) — високопрозора алюмінієва розсувна система від підлоги до стелі для приміщень без вимог до теплоізоляції',
      highlights: [
        { label: 'Глибина системи', value: '107–162 мм' },
        { label: 'Скління', value: '6–32 мм' },
        { label: 'Макс. розміри', value: 'до 18 000 мм' },
      ],
      description:
        'Опис:\nВисокопрозорі рішення для приміщень, де не передбачено вимог до теплоізоляції. Завдяки склінню від підлоги до стелі розсувна система Schüco ASS 39 PD.NI (Panorama Design Non-Insulated) забезпечує візуально плавні переходи як у приміщенні, так і назовні.\n\nЗагальна інформація:\nРозміри стулки:\n• висота: 2000–3500 мм\n• ширина: 1000–3000 мм\n\n• Максимальна вага стулки: до 300 кг\n• Максимальна ширина конструкції: до 18 000 мм\n• Глибина системи: 107–162 мм\n• Товщина заповнення: 6–32 мм\n• Теплоізоляція: Uw ≥ 1.9 Вт/(м²·K)\n• Водонепроникність: клас 7A\n• Повітропроникність: клас 3\n• Вітростійкість: C2/B2\n• Зломостійкість: до RC1\n• Кількість стулок: до 6\n• Кількість рейок: 2–3\n• Матеріал направляючих: алюміній\n• Поріг: < 12,5 мм\n• Тип керування: ручний\n• Покриття: порошкове, анодоване, фарбоване\n\nПереваги:\n• Система без ручок забезпечує лаконічний та мінімалістичний дизайн\n• Скляні конструкції від підлоги до стелі: максимальна прозорість та естетичний вигляд\n• Широкий вибір типів відкривання на основі зовнішніх рам з двома та трьома напрямними, включаючи кутові конструкції, що відкриваються на 90°\n• Суцільна ручка-засувка для елегантного, цілісного дизайну\n• Випробування відповідно до європейських стандартів та стандартів AAMA (США) гарантують надійність інвестиції\n• Ручне керування з вбудованим фіксуючим затискачем',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 107–162 мм, поріг < 12,5 мм.' },
        { title: 'Стулка', description: 'Висота 2000–3500 мм, ширина 1000–3000 мм, вага до 300 кг.' },
        { title: 'Скління', description: 'Заповнення 6–32 мм, від підлоги до стелі.' },
        { title: 'Напрямні', description: 'Алюміній, 2–3 рейки.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: [
        '/figma/products/schueco-ass-39-pd-ni/photo-1.webp',
        '/figma/products/schueco-ass-39-pd-ni/photo-2.webp',
        '/figma/products/schueco-ass-39-pd-ni/photo-3.webp',
        '/figma/products/schueco-ass-39-pd-ni/photo-4.webp',
      ],
    },
  },
  {
    slug: 'schueco-ass-pd-75-ni',
    name: 'Schueco ASS PD 75 NI',
    category: 'systems',
    subcategory: 'sliding-folding',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '218 мм' },
      { key: 'glazing', value: '40–60 мм' },
      { key: 'thermal', value: 'Uw ≥ 0.84 Вт/м²K' },
      { key: 'maxSize', value: 'до 16 300 мм' },
    ],
    image: { src: '/figma/products/schueco-ass-pd-75-ni/photo-1.webp' },
    detail: {
      subtitle:
        'Schüco AS PD 75.HI (Panorama Design) — багатофункціональні розсувні алюмінієві двері: рівний поріг, сучасний дизайн, висока теплоізоляція та опційний електропривід TipTronic',
      highlights: [
        { label: 'Глибина системи', value: '218 мм' },
        { label: 'Теплоізоляція', value: 'Uw ≥ 0.84 Вт/м²K' },
        { label: 'Макс. вага', value: '800 кг' },
      ],
      description:
        'Опис:\nРозсувні двері Schüco Panorama Design AS PD 75.HI поєднують у собі багатофункціональність і стиль різних серій продукції, не втрачаючи при цьому їхньої індивідуальності.\n\nЗагальна інформація:\nРозміри стулки:\n• висота: 1000–3500 мм\n• ширина: 1000–3500 мм\n\n• Максимальна вага стулки: до 800 кг\n• Максимальна ширина конструкції: до 16 300 мм\n• Глибина системи: 218 мм\n• Товщина заповнення: 40–60 мм\n• Теплоізоляція: Uw ≥ 0.84 Вт/(м²·K)\n• Водонепроникність: клас E900\n• Повітропроникність: клас 4\n• Вітростійкість: B4/C2\n• Зломостійкість: до RC2\n• Кількість стулок: до 4\n• Кількість рейок: 2\n• Матеріал: алюміній\n• Ролики: алюмінієві\n• Керування: ручне + електропривід (TipTronic)\n• Покриття: RAL, порошкове, анодоване, фарбоване\n\nПереваги:\n• Рівний поріг для високого рівня комфорту користувачів.\n• Динамічний профіль накладки на зовнішній рамі, що забезпечує рівний вигляд навіть у відкритому стані.\n• Вільна конфігурація вентиляційних отворів для максимальної гнучкості при плануванні.\n• Зменшений огляд рами завдяки прихованій бічній та верхній вентиляційній рамі.\n• Опціональний дизайн з дерева та алюмінію в секції з\'єднання для підвищеного комфорту.\n• Опціональний контроль відкриття та закриття для додаткової безпеки.\n• Серія Access Line також доступна за запитом з опцією TipTronic та може керуватися за допомогою мехатроніки.\n• Може поєднуватися з сонцезахистом Schüco AB ZDS.',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 218 мм, рівний поріг.' },
        { title: 'Стулка', description: 'Висота / ширина 1000–3500 мм, вага до 800 кг.' },
        { title: 'Скління', description: 'Заповнення 40–60 мм.' },
        { title: 'Ролики', description: 'Алюмінієві, до 4 стулок на 2 рейках.' },
        { title: 'Керування', description: 'Ручне + електропривід TipTronic.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: [
        '/figma/products/schueco-ass-pd-75-ni/photo-1.webp',
        '/figma/products/schueco-ass-pd-75-ni/photo-2.webp',
        '/figma/products/schueco-ass-pd-75-ni/photo-3.webp',
        '/figma/products/schueco-ass-pd-75-ni/photo-4.webp',
      ],
    },
  },
  {
    slug: 'schueco-as-fd-75',
    name: 'Schueco AS FD 75',
    category: 'systems',
    subcategory: 'sliding-folding',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '75 мм' },
      { key: 'glazing', value: '8–50 мм' },
      { key: 'thermal', value: 'Uw ≥ 1.1 Вт/м²K' },
      { key: 'sound', value: 'до 47 дБ' },
      { key: 'maxSize', value: 'до 10 500 мм' },
    ],
    image: { src: '/figma/products/schueco-as-fd-75/photo-1.webp' },
    detail: {
      subtitle:
        'Schüco AS FD 75 — розсувно-складна алюмінієва система: 3 типи порогів (зокрема плоский), 7 стулок, ширина прорізу майже 100% — для житлових і комерційних будівель',
      highlights: [
        { label: 'Монтажна глибина', value: '75 мм' },
        { label: 'Теплоізоляція', value: 'Uw ≥ 1.1 Вт/м²K' },
        { label: 'Звукоізоляція', value: 'до 47 дБ' },
      ],
      description:
        'Опис:\nШирокий вибір типів відкривання та замикання дозволяє створювати індивідуальні конструкції з максимальною свободою проектування. 3 різні типи порогів, у тому числі плоский поріг із великою проїжджою висотою, роблять систему придатною для використання в багатьох умовах монтажу.\n\nЗагальна інформація:\nРозміри стулки:\n• висота: 660–3000 мм\n• ширина: 500–1500 мм\n\n• Максимальна вага стулки: до 150 кг\n• Максимальна ширина конструкції: до 10 500 мм\n• Глибина системи: 75 мм\n• Товщина заповнення: 8–50 мм\n• Теплоізоляція: Uw ≥ 1.1 Вт/(м²·K)\n• Звукоізоляція: до 47 дБ\n• Водонепроникність: клас E750\n• Повітропроникність: клас 4\n• Вітростійкість: C3 / B5\n• Зломостійкість: до RC2, PAS 24\n• Кількість стулок: до 7\n• Кількість рейок: 1\n• Матеріал направляючих: нержавіюча сталь\n• Ролики: алюміній / PVC-U / нержавіюча сталь\n• Поріг: < 12,5 мм / < 20 мм / > 20 мм\n• Тип керування: ручний\n• Покриття: RAL, порошкове, анодоване, фарбоване\n\nПереваги:\n• Система розсувних дверей, що складаються, може складатися всередину, назовні, а також вліво чи вправо відповідно до ваших особистих уподобань, завдяки чому вона відповідає вимогам до проживання найрізноманітніших користувачів.\n• Надзвичайно вузькі фасади забезпечують максимальну прозорість і створюють приміщення, наповнені світлом, при цьому забезпечуючи ширину прорізу майже 100%.\n• Широкий вибір кольорів для внутрішньої та зовнішньої частини системи забезпечує повну свободу дизайну.\n• Приховані перехідні зони та опційні накладки на плоскі пороги забезпечують високоякісний зовнішній вигляд.\n• Високий рівень гнучкості планування забезпечується завдяки різноманітним варіантам монтажу (як у житловому, так і в комерційному будівництві), широкому асортименту типів відкривання та порогів, а також значно збільшеним значенням розміру та ваги прорізу.',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 75 мм, 1 рейка.' },
        { title: 'Стулка', description: 'Висота 660–3000 мм, ширина 500–1500 мм, вага до 150 кг.' },
        { title: 'Скління', description: 'Заповнення 8–50 мм.' },
        { title: 'Напрямні', description: 'Нержавіюча сталь.' },
        { title: 'Ролики', description: 'Алюміній / PVC-U / нержавіюча сталь.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: [
        '/figma/products/schueco-as-fd-75/photo-1.webp',
        '/figma/products/schueco-as-fd-75/photo-2.webp',
        '/figma/products/schueco-as-fd-75/photo-3.webp',
        '/figma/products/schueco-as-fd-75/photo-4.webp',
      ],
    },
  },
  {
    slug: 'reynaers-masterpatio',
    name: 'Reynaers MasterPatio',
    category: 'systems',
    subcategory: 'sliding-folding',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '180 / 283 мм' },
      { key: 'glazing', value: '16–62 мм' },
      { key: 'thermal', value: 'Uw до 0.8 Вт/м²K' },
      { key: 'sound', value: 'до 44 дБ' },
    ],
    image: { src: '/figma/products/reynaers-masterpatio/photo-1.webp' },
    detail: {
      subtitle:
        'Reynaers MasterPatio — алюмінієва розсувна система з чудовою теплоізоляцією та використанням перероблених матеріалів: ідеальний вибір для екологічних преміум-проєктів',
      highlights: [
        { label: 'Теплоізоляція', value: 'Uw до 0.8 Вт/м²K' },
        { label: 'Звукоізоляція', value: 'до 44 дБ' },
        { label: 'Макс. вага стулки', value: 'до 600 кг' },
      ],
      description:
        'Опис:\nMasterPatio — це алюмінієва розсувна система, яку обирають усі наші партнери та клієнти. Завдяки чудовій теплоізоляції та використанню перероблених матеріалів це високоякісне алюмінієве рішення є ідеальним вибором для підвищення екологічності будь-якого будівельного проєкту.\n\nЗагальна інформація:\n• Теплоізоляція: Uw до 0.8 Вт/(м²·K)\n• Звукоізоляція: до 44 дБ\n• Повітропроникність: клас 4 (600 Па)\n• Водонепроникність: клас E1200 (1200 Па)\n• Вітростійкість: клас C5 (2000 Па)\n• Зломостійкість: RC2, PAS 24\n• Довговічність: клас 4 (до 50 000 циклів)\n\nРозміри та навантаження:\n• Висота стулки: 500–3600 мм\n• Ширина стулки: 700–3000 мм\n• Максимальна вага стулки: до 600 кг\n\nКонструкція:\n• Глибина системи:\n  • рама: 180 мм (2 рейки)\n  • рама: 283 мм (3 рейки)\n• Глибина стулки: 77 мм\n• Товщина скла: 16–62 мм\n• Мінімальна висота порогу: від 0 мм\n• Мінімальна видима частина профілю: від 50 мм\n\nПереваги:\n• Висока енергоефективність (Uw до 0.8)\n• Можливість великих панорамних конструкцій\n• Високий рівень герметичності (E1200)\n• Підтримка важких стулок (до 600 кг)\n• Сучасний мінімалістичний дизайн\n• Надійність і довговічність\n• Високий рівень безпеки\n• Підходить для преміум житла та комерційних об\'єктів',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 180 мм (2 рейки) / 283 мм (3 рейки).' },
        { title: 'Стулка', description: 'Глибина 77 мм, висота 500–3600 мм, вага до 600 кг.' },
        { title: 'Скління', description: 'Товщина 16–62 мм.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: ['/figma/products/reynaers-masterpatio/photo-1.webp'],
    },
  },
  {
    slug: 'reynaers-cp-130',
    name: 'Reynaers CP 130',
    category: 'systems',
    subcategory: 'sliding-folding',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '139 / 210 мм' },
      { key: 'glazing', value: '4–45 мм' },
      { key: 'thermal', value: 'Uw до 1.4 Вт/м²K' },
      { key: 'sound', value: 'до 39 дБ' },
    ],
    image: { src: '/figma/products/reynaers-cp-130/photo-1.webp' },
    detail: {
      subtitle:
        'Reynaers ConceptPatio 130 — універсальна алюмінієва розсувно-підйомна система з оптимальним співвідношенням ціни та якості, ідеальна для проєктів реконструкції',
      highlights: [
        { label: 'Теплоізоляція', value: 'Uw до 1.4 Вт/м²K' },
        { label: 'Макс. вага стулки', value: 'до 300 кг' },
        { label: 'Зломостійкість', value: 'RC2, PAS 24' },
      ],
      description:
        'Опис:\nОбираючи ConceptPatio 130, ви обираєте універсальну розсувно-підйомну систему, яка задовольнить усі ваші стандартні будівельні потреби. Завдяки оптимальному співвідношенню ціни та якості, а також надійній роботі ця система є ідеальним рішенням для проєктів з реконструкції.\n\nЗагальна інформація:\n• Теплоізоляція: Uw до 1.4 Вт/(м²·K)\n• Звукоізоляція: до 39 дБ\n• Повітропроникність: клас 4 (600 Па)\n• Водонепроникність: клас E750 (750 Па)\n• Вітростійкість: клас B5\n• Зломостійкість: RC2, PAS 24\n• Довговічність: клас 4 (до 50 000 циклів)\n\nРозміри та навантаження:\n• Висота стулки: 500–2700 мм\n• Ширина стулки: 700–2700 мм\n• Максимальна вага стулки: до 300 кг\n\nКонструкція:\n• Глибина системи:\n  • рама: 139 мм (2 рейки)\n  • рама: 210 мм (3 рейки)\n• Глибина стулки: 59 мм\n• Товщина скла: 4–45 мм\n• Мінімальна висота порогу: від 4 мм\n• Мінімальна видима частина профілю: від 50 мм\n\nПереваги:\n• Оптимальне співвідношення ціна/якість\n• Надійна базова конструкція\n• Сучасний вигляд алюмінієвих систем\n• Підходить для стандартних прорізів\n• Достатній рівень герметичності\n• Простота експлуатації\n• Універсальне застосування',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 139 мм (2 рейки) / 210 мм (3 рейки).' },
        { title: 'Стулка', description: 'Глибина 59 мм, висота 500–2700 мм, вага до 300 кг.' },
        { title: 'Скління', description: 'Товщина 4–45 мм.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: ['/figma/products/reynaers-cp-130/photo-1.webp'],
    },
  },
  {
    slug: 'reynaers-cp-68',
    name: 'Reynaers CP 68',
    category: 'systems',
    subcategory: 'sliding-folding',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '68 / 124 мм' },
      { key: 'glazing', value: '24–38 мм' },
      { key: 'thermal', value: 'Uw до 1.4 Вт/м²K' },
      { key: 'sound', value: 'до 38 дБ' },
    ],
    image: { src: '/figma/products/reynaers-cp-68/photo-1.webp' },
    detail: {
      subtitle:
        'Reynaers ConceptPatio 68 — алюмінієва розсувна система з унікальним стилем, високою функціональністю і захистом від злому',
      highlights: [
        { label: 'Теплоізоляція', value: 'Uw до 1.4 Вт/м²K' },
        { label: 'Макс. вага стулки', value: 'до 200 кг' },
        { label: 'Зломостійкість', value: 'до RC2' },
      ],
      description:
        'Опис:\nАлюмінієва розсувна система ConceptPatio 68 поєднує в собі унікальний стиль, високу функціональність та чудову безпеку. Для додаткової впевненості система доступна у варіанті, захищеному від злому.\n\nЗагальна інформація:\n• Теплоізоляція: Uw до 1.4 Вт/(м²·K)\n• Звукоізоляція: до 38 дБ\n• Повітропроникність: клас 4 (600 Па)\n• Водонепроникність: клас 7B (300 Па)\n• Вітростійкість: клас C4 (1600 Па)\n• Зломостійкість: до RC2\n• Довговічність: клас 2 (до 10 000 циклів)\n\nРозміри та навантаження:\n• Висота стулки: 1300–2800 мм\n• Ширина стулки: 500–1500 мм\n• Максимальна вага стулки: до 200 кг\n\nКонструкція:\n• Глибина системи:\n  • рама: 68 мм (2 рейки)\n  • рама: 124 мм (3 рейки)\n• Глибина стулки: 38 мм\n• Товщина скла: 24–38 мм\n• Мінімальна висота порогу: від 48 мм\n• Мінімальна видима частина профілю: від 35 мм\n\nПереваги:\n• Доступна ціна\n• Простота конструкції\n• Підходить для невеликих прорізів\n• Легка експлуатація\n• Сучасний вигляд\n• Надійна базова функціональність\n• Універсальне застосування',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 68 мм (2 рейки) / 124 мм (3 рейки).' },
        { title: 'Стулка', description: 'Глибина 38 мм, висота 1300–2800 мм, вага до 200 кг.' },
        { title: 'Скління', description: 'Товщина 24–38 мм.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: ['/figma/products/reynaers-cp-68/photo-1.webp'],
    },
  },
  {
    slug: 'reynaers-sp-68',
    name: 'Reynaers SP 68',
    category: 'systems',
    subcategory: 'sliding-folding',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '120 / 176 мм' },
      { key: 'glazing', value: '24–38 мм' },
      { key: 'thermal', value: 'Uw до 1.4 Вт/м²K' },
      { key: 'sound', value: 'до 40 дБ' },
    ],
    image: { src: '/figma/products/reynaers-sp-68/photo-1.webp' },
    detail: {
      subtitle:
        'Reynaers SlimPatio 68 — ультратонка теплоізольована алюмінієва розсувна система преміум-класу з мінімалістичним дизайном і максимальним доступом денного світла',
      highlights: [
        { label: 'Теплоізоляція', value: 'Uw до 1.4 Вт/м²K' },
        { label: 'Звукоізоляція', value: 'до 40 дБ' },
        { label: 'Макс. вага стулки', value: 'до 250 кг' },
      ],
      description:
        'Опис:\nSlimPatio 68 — це наша надзвичайно теплоізольована ультратонка розсувна система, яка виводить комфорт і стиль на новий рівень. Завдяки мінімалістичному дизайну ці розсувні вікна преміум-класу забезпечують максимальний доступ денного світла та оптимальний панорамний вид.\n\nЗагальна інформація:\n• Теплоізоляція: Uw до 1.4 Вт/(м²·K)\n• Звукоізоляція: до 40 дБ\n• Повітропроникність: клас 4 (600 Па)\n• Водонепроникність: клас 8A (450 Па)\n• Вітростійкість: клас C4 (1600 Па)\n• Зломостійкість: до RC2\n• Довговічність: клас 3 (до 20 000 циклів)\n\nРозміри та навантаження:\n• Висота стулки: 700–3000 мм\n• Ширина стулки: 700–2300 мм\n• Максимальна вага стулки: до 250 кг\n\nКонструкція:\n• Глибина системи:\n  • рама: 120 мм (2 рейки)\n  • рама: 176 мм (3 рейки)\n• Глибина стулки: 38 мм\n• Товщина скла: 24–38 мм\n• Мінімальна висота порогу: від 0 мм\n• Мінімальна видима частина профілю: від 35 мм\n\nПереваги:\n• Краща герметичність (клас 8A)\n• Підвищена довговічність (20 000 циклів)\n• Оптимальна вага стулок (до 250 кг)\n• Сучасний мінімалістичний вигляд\n• Плавний рух стулок\n• Підходить для стандартних і середніх прорізів\n• Універсальне застосування',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 120 мм (2 рейки) / 176 мм (3 рейки).' },
        { title: 'Стулка', description: 'Глибина 38 мм, висота 700–3000 мм, вага до 250 кг.' },
        { title: 'Скління', description: 'Товщина 24–38 мм.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: ['/figma/products/reynaers-sp-68/photo-1.webp'],
    },
  },
  {
    slug: 'reynaers-hifinity',
    name: 'Reynaers HiFinity',
    category: 'systems',
    subcategory: 'sliding-folding',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '148–325 мм' },
      { key: 'glazing', value: '36–54 мм' },
      { key: 'thermal', value: 'Uw 0.8 Вт/м²K' },
      { key: 'sound', value: 'до 46 дБ' },
    ],
    image: { src: '/figma/products/reynaers-hifinity/photo-1.jpg' },
    detail: {
      subtitle:
        'Reynaers HiFinity — преміальна алюмінієва розсувна система з ультратонким профілем (видима ширина 8 мм): максимальне панорамне скління та мінімалістичний дизайн',
      highlights: [
        { label: 'Теплоізоляція', value: 'Uw 0.8 Вт/м²K' },
        { label: 'Видима ширина', value: '8 мм' },
        { label: 'Макс. вага стулки', value: '750 кг' },
      ],
      description:
        'Опис:\nReynaers HiFinity — це преміальна алюмінієва розсувна система з ультратонким профілем, що забезпечує максимальне панорамне скління та мінімалістичний дизайн.\n\nЗагальна інформація:\n• Теплоізоляція: Uw 0,8 Вт/м²К (Ug 0,6, теплий дистанційний профіль)\n• Герметичність: повітря — клас 4; вода — E750; вітер — C5\n• Акустика: 46 дБ\n• Довговічність: клас 3 (20 000 циклів)\n• Безпека: PAS 24, RC2, RC3\n\nРозміри:\n• висота 1800–4000 мм\n• ширина 1000–3500 мм\n• вага до 750 кг\n\nПрофілі:\n• мін. видима ширина — 8 мм\n• рама — 148–325 мм\n\nСклопакет:\n• 36–54 мм, вклеєне скління\n\nПереваги:\n• Висока енергоефективність (Uw 0,8) — менші втрати тепла\n• Відмінна герметичність — захист від протягів, дощу й вітру\n• Хороша шумоізоляція (≈46 дБ) — комфорт у приміщенні\n• Підвищена безпека — класи RC2/RC3, захист від злому\n• Міцність і довговічність — до 20 000 циклів роботи\n• Великі розміри стулок — більше світла та сучасний вигляд\n• Тонкі профілі — мінімалістичний дизайн\n• Товстий склопакет (до 54 мм) — краща тепло- та звукоізоляція',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 148–325 мм, мін. видима ширина 8 мм.' },
        { title: 'Стулка', description: 'Висота 1800–4000 мм, ширина 1000–3500 мм, вага до 750 кг.' },
        { title: 'Скління', description: 'Вклеєне, товщина 36–54 мм.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: ['/figma/products/reynaers-hifinity/photo-1.jpg'],
    },
  },
  {
    slug: 'schuco-fws-50',
    name: 'Schueco FWS 50',
    category: 'systems',
    subcategory: 'facade',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '6–255 мм' },
      { key: 'glazing', value: '4–62 мм' },
      { key: 'thermal', value: 'Uf ≥ 1.5 Вт/м²K' },
      { key: 'sound', value: 'до 48 дБ' },
    ],
    image: { src: '/figma/products/schuco-fws-50/photo-1.webp' },
    detail: {
      subtitle:
        'Schüco FWS 50 — базова алюмінієва стоєчно-ригельна фасадна система (50 мм) для фасадів і скляних дахів: висока гнучкість, широкий асортимент, оптимізоване виготовлення',
      highlights: [
        { label: 'Ширина профілю', value: '50 мм' },
        { label: 'Теплоізоляція', value: 'Uf ≥ 1.5 Вт/м²K' },
        { label: 'Звукоізоляція', value: 'до 48 дБ' },
      ],
      description:
        'Опис:\nФасадна система Schüco FWS 50 — це базова система для фасадів і світлопрозорих покрівель (скляних дахів), яка вирізняється високою гнучкістю та широкими можливостями дизайну, а також оптимізованими процесами виготовлення і монтажу. Завдяки широкому асортименту системи можна реалізувати рішення для найрізноманітніших вимог і сфер застосування.\n\nЗагальна інформація:\n• Теплотехніка: Uf ≥ 1,5 Вт/м²·К\n• Профіль: ширина 50 мм, глибина 6–255 мм\n• Скло/заповнення: 4–62 мм, вага до 1080 кг\n• Герметичність: повітря — AE, вода — RE1200\n• Звукоізоляція: до 48 дБ\n• Вітрове навантаження: 2,0–3,0 кН/м²\n• Ударостійкість: I5/E5\n• Безпека: до RC3, кулестійкість FB4\n• Скляні дахи: 5–90° (підтримуються)\n\nДодатково:\n• сонцезахист (інтегрований/навісний)\n• дренаж (3 рівні)\n• сейсмостійкість\n• відповідність Passive House (phA)\n• перероблюваність\n\n• Покриття: порошкове, анодування, фарбування\n• Сертифікація: CE, DIN/EN, AAMA, CWCT\n\nПереваги:\n• Висока гнучкість системи — підходить для різних типів фасадів і дахів\n• Енергоефективність — відповідає стандарту Passive House\n• Великі формати скління — до 1080 кг на елемент\n• Хороша шумоізоляція (до 48 дБ)\n• Надійна герметичність — захист від дощу, вітру та повітря\n• Підвищена безпека — до RC3, кулестійкість до FB4\n• Сумісність із сонцезахистом — інтегровані та зовнішні системи\n• Сейсмостійкість і витривалість до вітрових навантажень\n• Різні варіанти оздоблення — анодування, фарбування, порошкове покриття\n• Довговічність і екологічність — придатність до переробки\n• Можливість складних форм (кутові, похилі, дахові конструкції)',
      components: [
        { title: 'Стійки/ригелі', description: 'Ширина 50 мм, глибина 6–255 мм.' },
        { title: 'Скління', description: 'Заповнення 4–62 мм, вага до 1080 кг.' },
        { title: 'Ущільнення', description: 'Повітря — AE, вода — RE1200.' },
        { title: 'Сонцезахист', description: 'Інтегрований або навісний.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: ['/figma/products/schuco-fws-50/photo-1.webp'],
    },
  },
  {
    slug: 'schueco-fws-35-pd',
    name: 'Schueco FWS 35 PD',
    category: 'systems',
    subcategory: 'facade',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '65–150 мм' },
      { key: 'glazing', value: '4–50 мм' },
      { key: 'thermal', value: 'Uf ≥ 1.4 Вт/м²K' },
      { key: 'sound', value: 'до 51 дБ' },
    ],
    image: { src: '/figma/products/schueco-fws-35-pd/photo-1.jpg' },
    detail: {
      subtitle:
        'Schüco FWS 35 PD (Panorama Design) — алюмінієва стоєчно-ригельна фасадна система з ультратонкими профілями (35 мм) і повністю скляними кутами без вертикальних стояків',
      highlights: [
        { label: 'Ширина профілю', value: '35 мм' },
        { label: 'Теплоізоляція', value: 'Uf ≥ 1.4 Вт/м²K' },
        { label: 'Звукоізоляція', value: 'до 51 дБ' },
      ],
      description:
        'Опис:\nАрхітектура, наповнена світлом і максимальною прозорістю без компромісів: фасадна система Schüco FWS 35 PD (Panorama Design) пропонує інтегроване рішення, яке дозволяє створювати повністю скляні кути без вертикальних стоєчних профілів.\n\nЗагальна інформація:\n• Теплотехніка: Uf ≥ 1,4 Вт/м²·К\n• Профіль: ширина 35 мм, глибина 65–150 мм\n• Скло: 4–50 мм, вага до 400 кг\n• Герметичність: повітря — AE, вода — RE1200\n• Звукоізоляція: до 51 дБ\n• Вітрове навантаження: 2,0–3,0 кН/м²\n• Ударостійкість: I5/E5\n• Безпека: до RC3\n• Кути: суцільноскляні (без стояків) — протестовано\n\nДодатково:\n• дренаж (3 рівні)\n• сейсмостійкість\n• сонцезахист\n• Passive House (phA)\n\n• Покриття: порошкове, анодування, фарбування\n• Сертифікація: CE, DIN/EN, CWCT\n\nПереваги:\n• Максимальна прозорість і вузькі профілі (35 мм)\n• Суцільноскляні кути без вертикальних стояків\n• Висока шумоізоляція (до 51 дБ)\n• Енергоефективність (Passive House)\n• Надійна герметичність і стійкість до негоди\n• Сучасний преміальний вигляд фасаду\n• Підходить для житлових і комерційних проєктів high-end',
      components: [
        { title: 'Стійки/ригелі', description: 'Ширина 35 мм, глибина 65–150 мм.' },
        { title: 'Кути', description: 'Суцільноскляні, без вертикальних стояків.' },
        { title: 'Скління', description: 'Заповнення 4–50 мм, вага до 400 кг.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: ['/figma/products/schueco-fws-35-pd/photo-1.jpg'],
    },
  },
  {
    slug: 'reynaers-cw-50',
    name: 'Reynaers CW 50',
    category: 'systems',
    subcategory: 'facade',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '42–300 мм' },
      { key: 'glazing', value: 'до 62 мм' },
      { key: 'sound', value: 'до 48 дБ' },
    ],
    image: { src: '/figma/products/reynaers-cw-50/photo-1.png' },
    detail: {
      subtitle:
        'Reynaers CW 50 (Curtain Wall 50) — високофункціональна стоєчно-ригельна фасадна система: широкі можливості дизайну, максимальне світлопропускання, до 1080 кг на елемент',
      highlights: [
        { label: 'Видима ширина', value: '50 мм' },
        { label: 'Глибина', value: '42–300 мм' },
        { label: 'Скління', value: 'до 62 мм / 1080 кг' },
      ],
      description:
        'Опис:\nReynaers CW 50 (Curtain Wall 50) — це високофункціональна стоєчно-ригельна фасадна система від бельгійського виробника, що призначена для скління вертикальних фасадів та дахів. Вона пропонує широкі можливості дизайну, максимальне проникнення світла та відмінні технічні характеристики.\n\nЗагальна інформація:\n• Ширина профілю (видима): 50 мм (як стійки, так і ригелі).\n• Монтажна глибина: від 42 до 300 мм.\n• Максимальна товщина скла/панелі: до 62 мм.\n• Максимальна вага елемента: до 1080 кг.\n• Звукоізоляція: Rw (C; Ctr) до 48 (-2; -8) дБ, залежно від типу скління.\n• Водонепроникність: клас RE1200.\n• Повітронепроникність: клас A4 (600 Па) або AE1200.\n• Термоізоляція: залежить від варіанту виконання (від стандартного до підвищеного HI).\n\nПереваги:\n• Універсальність та дизайн: Система пропонує різні варіанти зовнішнього вигляду — від стандартних притискних планок до структурного скління, де профіль непомітний ззовні.\n• Максимальне світлопропускання: Забезпечує високий рівень природного освітлення приміщень.\n• Високі експлуатаційні показники: Система розрахована на суворі кліматичні умови, забезпечуючи відмінну герметичність (захист від води та повітря).\n• Енергоефективність (HI): Варіант CW 50-HI (High Insulation) дозволяє використовувати двокамерні склопакети для пасивних будинків.\n• Безпека та вогнестійкість: Існують спеціальні версії (FP — Fire Proof) для підвищення безпеки будівлі (EI30, EI60).\n• Інтеграція: Можливість легкого вбудовування віконних та дверних стулок (верхньопідвісних, прихованих тощо).',
      components: [
        { title: 'Стійки/ригелі', description: 'Ширина 50 мм, глибина 42–300 мм.' },
        { title: 'Скління', description: 'До 62 мм, вага до 1080 кг.' },
        { title: 'Варіанти', description: 'Стандарт / HI (High Insulation) / FP (Fire Proof).' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: ['/figma/products/reynaers-cw-50/photo-1.png'],
    },
  },
  {
    slug: 'reynaers-slim-wall-35',
    name: 'Reynaers Slim Wall 35',
    category: 'systems',
    subcategory: 'facade',
    family: 'aluminum',
    specs: [
      { key: 'glazing', value: 'до 52 мм' },
      { key: 'thermal', value: 'Passive House' },
    ],
    image: { src: '/figma/products/reynaers-slim-wall-35/photo-1.png' },
    detail: {
      subtitle:
        'Reynaers SlimWall 35 (SW 35) — інноваційна ультратонка стоєчно-ригельна фасадна система преміум-класу для мінімалістичних фасадів з сертифікацією Passive House',
      highlights: [
        { label: 'Видима ширина', value: '35 мм' },
        { label: 'Скління', value: 'до 52 мм / 450 кг' },
        { label: 'Сертифікація', value: 'Passive House' },
      ],
      description:
        'Опис:\nReynaers SlimWall 35 (SW 35) — це інноваційна, ультратонка стоєчно-ригельна фасадна система від бельгійського виробника преміум-класу Reynaers Aluminium, розроблена для створення мінімалістичних фасадів з максимальною кількістю світла та відмінними показниками енергоефективності.\n\nЗагальна інформація:\n• Видима ширина (стійка/ригель): 35 мм.\n• Глибина системи: Система спроєктована для максимальної стабільності при невеликій глибині.\n• Максимальна вага склопакета: До 450 кг.\n• Товщина склопакета: До 52 мм (дозволяє використовувати енергоефективні двокамерні склопакети).\n• Теплоізоляція: Система сертифікована як Passive House (сертифікат Пасивного будинку), що гарантує найвищий рівень енергозбереження (тепло не виходить назовні).\n• Водонепроникність та повітропроникність: Має відмінні показники, захищаючи від несприятливих погодних умов.\n• Конструктивні можливості: Можливість створення конструкцій заввишки до двох поверхів.\n\nПереваги:\n• Енергоефективність (Passive House): Забезпечує чудову теплоізоляцію, що значно знижує витрати на опалення та кондиціонування.\n• Максимальне природне світло: Завдяки тонким профілям 35 мм площа скління стає максимальною.\n• Висока вантажопідйомність: Можливість встановлення важких склопакетів до 450 кг.\n• Естетика та дизайн: Витончений зовнішній вигляд фасаду, що відповідає сучасним архітектурним трендам (мінімалізм).\n• Екологічність та сталість: Профілі SlimWall 35 підлягають переробці та спроєктовані для довготривалого використання (принцип циркулярної економіки).\n• Зручність монтажу: Система розроблена так, щоб полегшити роботу виробникам алюмінієвих конструкцій (економічна та зручна конструкція).',
      components: [
        { title: 'Стійки/ригелі', description: 'Видима ширина 35 мм.' },
        { title: 'Скління', description: 'Двокамерні склопакети до 52 мм, вага до 450 кг.' },
        { title: 'Сертифікація', description: 'Passive House.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: ['/figma/products/reynaers-slim-wall-35/photo-1.png'],
    },
  },
  {
    slug: 'schuco-as-fd-90',
    name: 'Schueco AS FD 90 HI',
    category: 'systems',
    subcategory: 'sliding-folding',
    family: 'aluminum',
    specs: [
      { key: 'depth', value: '90 мм' },
      { key: 'glazing', value: '23–65 мм' },
      { key: 'thermal', value: 'Uw ≥ 0.8 Вт/м²K' },
      { key: 'sound', value: 'до 48 дБ' },
      { key: 'maxSize', value: 'до 10 500 мм' },
    ],
    image: { src: '/figma/products/schueco-as-fd-90-hi/photo-1.webp' },
    detail: {
      subtitle:
        'Schueco AS FD 90 HI — компактна алюмінієва розсувно-складна система: оптимальний баланс між енергоефективністю, шумоізоляцією та вартістю для житла й комерційних об\'єктів',
      highlights: [
        { label: 'Монтажна глибина', value: '90 мм' },
        { label: 'Теплоізоляція', value: 'Uw ≥ 0.8 Вт/м²K' },
        { label: 'Звукоізоляція', value: 'до 48 дБ' },
      ],
      description:
        'Опис:\nКомпактна розсувна система з оптимальним балансом між енергоефективністю, шумоізоляцією та вартістю. Підходить для житлових і комерційних об\'єктів із середніми навантаженнями.\n\nЗагальна інформація:\nРозміри стулки:\n• висота: 660–3500 мм\n• ширина: 600–1500 мм\n\n• Максимальна вага стулки: до 150 кг\n• Максимальна ширина конструкції: до 10 500 мм\n• Глибина системи: 90 мм\n• Товщина заповнення: 23–65 мм\n• Теплоізоляція: Uw ≥ 0.8 Вт/(м²·K)\n• Звукоізоляція: до 48 дБ\n• Водонепроникність: клас E750\n• Повітропроникність: клас 4\n• Вітростійкість: C3 / B5\n• Зломостійкість: до RC2, PAS 24\n• Кількість стулок: до 7\n• Кількість рейок: 1\n• Матеріал направляючих: нержавіюча сталь\n• Ролики: алюміній / PVC-U / нержавіюча сталь\n• Поріг: < 12,5 мм / < 20 мм / > 20 мм\n• Тип керування: ручний\n• Покриття: RAL, порошкове, анодоване, фарбоване\n\nПереваги:\n• Система розсувних дверей, що складаються, може складатися всередину, назовні, а також вліво чи вправо відповідно до ваших особистих уподобань, завдяки чому вона відповідає вимогам до проживання найрізноманітніших користувачів.\n• Надзвичайно вузькі фасади забезпечують максимальну прозорість і створюють приміщення, наповнені світлом, при цьому забезпечуючи ширину прорізу майже 100%.\n• Широкий вибір кольорів для внутрішньої та зовнішньої частини системи забезпечує повну свободу дизайну.\n• Приховані перехідні зони та опційні накладки на плоскі пороги забезпечують високоякісний зовнішній вигляд.\n• Високий рівень гнучкості планування забезпечується завдяки різноманітним варіантам монтажу (як у житловому, так і в комерційному будівництві), широкому асортименту типів відкривання та порогів, а також значно збільшеним значенням розміру та ваги прорізу.',
      components: [
        { title: 'Рамний профіль', description: 'Глибина 90 мм, 1 рейка.' },
        { title: 'Стулка', description: 'Висота 660–3500 мм, ширина 600–1500 мм, вага до 150 кг.' },
        { title: 'Скління', description: 'Заповнення 23–65 мм.' },
        { title: 'Напрямні', description: 'Нержавіюча сталь.' },
        { title: 'Ролики', description: 'Алюміній / PVC-U / нержавіюча сталь.' },
      ],
      colors: [
        { name: 'Білий RAL 9016', hex: '#f1f0e9' },
        { name: 'Антрацит RAL 7016', hex: '#293133' },
        { name: 'Чорний RAL 9005', hex: '#0a0a0a' },
        { name: 'Срібло анодоване', hex: '#b8b8b8' },
      ],
      gallery: [
        '/figma/products/schueco-as-fd-90-hi/photo-1.webp',
        '/figma/products/schueco-as-fd-90-hi/photo-2.webp',
        '/figma/products/schueco-as-fd-90-hi/photo-3.webp',
        '/figma/products/schueco-as-fd-90-hi/photo-4.webp',
      ],
    },
  },
  {
    slug: 'aluprof-skyroll-zip',
    name: 'Aluprof SkyRoll ZIP',
    category: 'shading',
    subcategory: 'screen',
    specs: [
      { key: 'type', value: 'зовнішня скрин-система' },
      { key: 'material', value: 'алюміній / ПВХ' },
      { key: 'mounting', value: 'накладний / врізний' },
      { key: 'maxSize', value: 'до 5000 × 5000 мм' },
      { key: 'control', value: 'моторне керування' },
    ],
    image: { src: `${ALUPROF_GALLERY}/skyroll_zip_p_0.jpg` },
    detail: {
      subtitle:
        'Зовнішня скрин-система нового покоління із застібкою-блискавкою — для великих заскленнях',
      highlights: [
        { label: 'Максимальний розмір', value: '5000 × 5000 мм' },
        { label: 'Робоча площа', value: 'до 16 м²' },
        { label: 'Тип керування', value: 'моторне' },
      ],
      description:
        'SkyRoll ZIP — це нове покоління скрин-систем для затінення приміщень із великими заскленими поверхнями. Інноваційна технологія застібки-блискавки, інтегрована в краї тканини, разом зі спеціально розробленими дворазовими направляючими, забезпечує максимальну герметичність і захист від комах.\n\nСистема зберігає правильне натягнення тканини й тверде положення в направляючих, захищаючи її від поривів вітру. Доступні три варіанти монтажу: накладний, врізний і надкладений. Конструктивні елементи можуть бути виготовлені з алюмінієвого листа, ПВХ або екструдованого алюмінію — останній дозволяє підбір кольору за RAL під вікна або фасад.\n\nТелескопічна ручка спрощує монтаж, демонтаж і обслуговування без зіткнень. Ручне керування недоступне — система працює виключно з електроприводом.',
      components: [
        {
          title: 'Короби',
          description: 'SRS90, SRS90/2, SRS90E, SRS90ES, SRS90E/2, SRS90ES/2, SRS90E/3, SRS90E/120/160, SRS90_SP, SRS90_SP/2, SRS90_SP/120/160, SRS90E_SP/120, SRS/SKT, SRS/SKB.',
          images: Array.from({ length: 15 }, (_, i) => `/figma/products/aluprof/components/skyroll-zip-box-${i + 1}.webp`),
        },
        {
          title: 'Направляючі',
          description: 'SRS, SRS/SKT, SRS/SKB — дворазові з системою ZIP.',
          images: [
            '/figma/products/aluprof/components/skyroll-zip-guide-1.webp',
            '/figma/products/aluprof/components/skyroll-zip-guide-2.webp',
            '/figma/products/aluprof/components/skyroll-zip-guide-3.webp',
          ],
        },
        {
          title: 'Кінцеві планки',
          description: 'Кінцеві елементи з алюмінію.',
          images: ['/figma/products/aluprof/components/skyroll-zip-endslat-1.webp'],
        },
      ],
      colors: COLORS_RAL,
      gallery: [`${ALUPROF_GALLERY}/skyroll_zip_p_0.jpg`, `${ALUPROF_GALLERY}/skyroll_zip_p_2.jpg`],
    },
  },
  {
    slug: 'aluprof-skyroll-eco',
    name: 'Aluprof SkyRoll ECO',
    category: 'shading',
    subcategory: 'screen',
    specs: [
      { key: 'type', value: 'зовнішня скрин-система' },
      { key: 'material', value: 'алюміній / ПВХ' },
      { key: 'mounting', value: 'накладний / врізний' },
      { key: 'maxSize', value: 'до 2000 × 2500 мм' },
      { key: 'control', value: 'ручне (пружина)' },
    ],
    image: { src: `${ALUPROF_GALLERY}/skyroll_eco_a_0.jpg` },
    detail: {
      subtitle:
        'Бюджетна зовнішня скрин-система з ручним керуванням — для балконів, бесідок і пергол',
      highlights: [
        { label: 'Максимальний розмір', value: '2000 × 2500 мм' },
        { label: 'Тип керування', value: 'ручне (пружинна система)' },
        { label: 'Захист', value: 'сонце + комахи' },
      ],
      description:
        'SkyRoll ECO (SRS ECO) — економічне рішення для менш вимогливих інвесторів. Продукт ідеально підходить для будівель, що потребують постійного сонцезахисту, а також для балконів, літніх кухонь або пергол.\n\nХарактерною особливістю є ручне керування на пружинній системі та інтуїтивний механізм ALU-CLICK для зручного відкривання й закривання москітної сітки. Закриття не вимагає зусиль — досить акуратно опустити кінцеву планку. Доступні накладний і врізний варіанти монтажу. Конструктивні елементи виготовлено з алюмінієвого листа або екструдованого алюмінію.\n\nДирекційна напрямна, інтегрована з тканиною, додатково захищає інтер’єр від комах. Нижня планка адаптована з системи москітної сітки MKT, що оптимізує складські запаси. Телескопічний ковпак у круглому валу робить монтаж і демонтаж швидким і простим — особливо корисно під час обслуговування.',
      components: [
        {
          title: 'Короби',
          description: 'SRS90, SRS90/2, SRS90E, SRS90E/2, SRS90_SP, SRS90_SP/2, SRS90E_SP.',
          images: [
            '/figma/products/aluprof/components/skyroll-eco-box-1.webp',
            '/figma/products/aluprof/components/skyroll-zip-box-2.webp',
            '/figma/products/aluprof/components/skyroll-zip-box-3.webp',
            '/figma/products/aluprof/components/skyroll-zip-box-4.webp',
            '/figma/products/aluprof/components/skyroll-zip-box-5.webp',
            '/figma/products/aluprof/components/skyroll-zip-box-6.webp',
            '/figma/products/aluprof/components/skyroll-zip-box-10.webp',
            '/figma/products/aluprof/components/skyroll-zip-box-11.webp',
            '/figma/products/aluprof/components/skyroll-zip-box-13.webp',
          ],
        },
        {
          title: 'Направляючі',
          description: 'SRS — інтегровані з тканиною та з механізмом ALU-CLICK.',
          images: ['/figma/products/aluprof/components/skyroll-eco-guide-1.webp'],
        },
        {
          title: 'Кінцеві планки',
          description: 'Адаптовані з москітної системи MKT.',
          images: ['/figma/products/aluprof/components/skyroll-eco-endslat-1.webp'],
        },
      ],
      colors: COLORS_RAL,
      gallery: [`${ALUPROF_GALLERY}/skyroll_eco_a_0.jpg`, `${ALUPROF_GALLERY}/skyroll_eco_a_2.jpg`],
    },
  },
  {
    slug: 'aluprof-skytwin',
    name: 'Aluprof SkyTwin',
    category: 'shading',
    subcategory: 'roller-screen',
    specs: [
      { key: 'type', value: 'ролето-скрин у одному коробі' },
      { key: 'material', value: 'алюміній' },
      { key: 'mounting', value: 'врізний (новобудови)' },
      { key: 'thermal', value: 'до −35% тепловтрат' },
      { key: 'control', value: 'моторне керування' },
    ],
    image: { src: `${ALUPROF_GALLERY}/roleto_screen_SkyTwin.jpg` },
    detail: {
      subtitle:
        'Інноваційне рішення «два в одному» — ролета і скрин в єдиному коробі 180×260 мм',
      highlights: [
        { label: 'Розмір короба', value: '180 × 260 мм' },
        { label: 'Економія тепла', value: 'до 35% (Kraków University)' },
        { label: 'Тканини', value: 'Copaco / Serge Ferrari' },
      ],
      description:
        'Інновація системи SkyTwin полягає в інтеграції зовнішньої ролети та скрина в одному продукті — це революційне технологічне рішення на ринку.\n\nПродукт розроблено з урахуванням енергоефективної конструкції, тому його дизайн повністю адаптовано для врізного монтажу. Система ідеально підходить для нових будівель або для існуючих після внесення необхідних змін у перемичку. Кронштейни доступні в кількох розмірах для оздоблення будь-якими матеріалами.\n\nГоловний елемент рішення — алюмінієвий короб 180×260 мм із гнутого алюмінієвого листа, в якому розміщені два круглі вали. Технологія SkyTwin передбачає версії скрина SkyRoll ZIP і SkyRoll Classic. ZIP-технологія забезпечує максимальну герметизацію та захист від комах.\n\nПолотно ролети виготовляється з алюмінієвих профілів із поліуретановою піною, ПВХ-профілів PT37 або екструдованих PE41. Aluprof пропонує колекцію спеціалізованих скрин-тканин від Copaco та Serge Ferrari — стійкі до використання, деформацій, розривів та погодних умов.\n\nЗакриваючи водночас ролету і скрин, можна зменшити тепловтрати через вікно до 35% (за дослідженням Краківського технологічного університету разом з Aluprof).',
      components: [
        {
          title: 'Короби',
          description: 'Алюмінієвий короб 180×260 мм із двома круглими валами.',
          images: ['/figma/products/aluprof/components/skytwin-box-1.webp'],
        },
        {
          title: 'Направляючі',
          description: 'Спеціально розроблені для системи SkyTwin.',
          images: ['/figma/products/aluprof/components/skytwin-guide-1.webp'],
        },
        {
          title: 'Профілі ролет',
          description: 'Алюмінієві з ПУ-піною, ПВХ-профілі PT37 або екструдовані PE41.',
          images: ['/figma/products/aluprof/components/skytwin-shutter-1.webp'],
        },
        {
          title: 'Кінцеві планки',
          description: 'Кінцеві елементи з герметизацією.',
          images: [
            '/figma/products/aluprof/components/skytwin-endslat-1.webp',
            '/figma/products/aluprof/components/skytwin-endslat-2.webp',
          ],
        },
      ],
      colors: COLORS_SK_SP,
      gallery: [
        `${ALUPROF_GALLERY}/roleto_screen_SkyTwin.jpg`,
        `${ALUPROF_GALLERY}/Skrzynka_SkyTwin_ZIP.webp`,
        `${ALUPROF_GALLERY}/Prowadnice_SkyTwin.webp`,
      ],
    },
  },
  {
    slug: 'aluprof-sk-front-mounted',
    name: 'Aluprof SK / SKE / SKP',
    category: 'shading',
    subcategory: 'rollers',
    specs: [
      { key: 'type', value: 'накладні ролети' },
      { key: 'material', value: 'алюміній / ПВХ' },
      { key: 'mounting', value: 'на віконну раму або стіну' },
      { key: 'thermal', value: 'теплоізоляція + захист' },
      { key: 'control', value: 'ручне / автоматичне' },
    ],
    image: { src: `${ALUPROF_GALLERY}/roleta_sk_mkt.jpg` },
    detail: {
      subtitle:
        'Накладні ролети SK, SKE, SKP — універсальне рішення для існуючих будівель без переробки фасаду',
      highlights: [
        { label: 'Тип монтажу', value: 'на раму або стіну' },
        { label: 'Сумісність', value: 'будь-яка віконна система' },
        { label: 'Москітна сітка', value: 'опційно інтегрована' },
      ],
      description:
        'Ролети систем SK, SKE та SKP розроблені для застосування в існуючих будівлях. Ці продукти не потребують спеціальної підготовки до монтажу або зміни існуючих конструкцій, оскільки вони не інтегровані з вікнами. Установка може відбуватися в будь-який час — продукти кріпляться до віконного профілю (у нішах) або безпосередньо до стіни.\n\nДля монтажу в нішах Aluprof рекомендує напівовальні короби SKP, що добре поєднуються з зовнішніми стінами, або системи SK і SKE з коробами, обрізаними під кутом 45°.\n\nРолетне полотно зазвичай виготовлене з високоякісного алюмінієвого листа, заповненого поліуретановою піною з дворазовим лакофарбовим покриттям (система PU/PA) — для підвищеної стійкості до стирання та погодних умов. Екструдовані алюмінієві та пластикові профілі забезпечують більшу жорсткість і стабільність. Накладні ролети інтегруються з москітними сітками — захист від комах влітку та зменшення тепловтрат взимку.',
      components: [
        {
          title: 'Короби',
          description: 'Ролетні короби з різними формами — півовальні, з кутом 45°.',
          images: [
            '/figma/products/aluprof/components/sk-box-1.webp',
            '/figma/products/aluprof/components/sk-box-2.webp',
            '/figma/products/aluprof/components/sk-box-3.webp',
          ],
        },
        {
          title: 'Направляючі',
          description: 'Алюмінієві напрямні рейки.',
          images: [
            '/figma/products/aluprof/components/sk-guide-1.webp',
            '/figma/products/aluprof/components/sk-guide-2.webp',
            '/figma/products/aluprof/components/sk-guide-3.webp',
          ],
        },
        {
          title: 'Профілі ролет',
          description: 'Алюмінієві та ПВХ-профілі для ролетного полотна.',
          images: [
            '/figma/products/aluprof/components/sk-shutter-1.webp',
            '/figma/products/aluprof/components/sk-shutter-2.webp',
            '/figma/products/aluprof/components/sk-shutter-3.webp',
          ],
        },
        {
          title: 'Кінцеві планки',
          description: 'Кінцеві елементи з герметизацією.',
          images: [
            '/figma/products/aluprof/components/sk-endslat-1.webp',
            '/figma/products/aluprof/components/sk-endslat-2.webp',
            '/figma/products/aluprof/components/sk-endslat-3.webp',
          ],
        },
      ],
      colors: COLORS_SK_SP,
      gallery: [
        `${ALUPROF_GALLERY}/roleta_sk_mkt.jpg`,
        `${ALUPROF_GALLERY}/aluprof_sk_mkt_niche.jpg`,
        `${ALUPROF_GALLERY}/aluprof_sk_mkt_wall.jpg`,
        `${ALUPROF_GALLERY}/aluprof_sk_niche.jpg`,
        `${ALUPROF_GALLERY}/aluprof_sk_wall.jpg`,
        `${ALUPROF_GALLERY}/aluprof_sk-niche_in.jpg`,
        `${ALUPROF_GALLERY}/aluprof_ske_niche.jpg`,
        `${ALUPROF_GALLERY}/aluprof_ske_wall.jpg`,
        `${ALUPROF_GALLERY}/aluprof_skp_niche.jpg`,
        `${ALUPROF_GALLERY}/aluprof_skp_wall.jpg`,
        `${ALUPROF_GALLERY}/aluprof_skp_mkt_niche.jpg`,
        `${ALUPROF_GALLERY}/aluprof_skp_mkt_wall.jpg`,
      ],
    },
  },
  {
    slug: 'aluprof-sp-flush-mounted',
    name: 'Aluprof SP / SP-E',
    category: 'shading',
    subcategory: 'rollers',
    specs: [
      { key: 'type', value: 'прикриті ролети' },
      { key: 'material', value: 'алюміній / ПВХ' },
      { key: 'mounting', value: 'інтегровані в перемичку' },
      { key: 'thermal', value: 'Uw ≤ 0.80 W/m²K' },
      { key: 'control', value: 'ручне / автоматичне' },
    ],
    image: { src: `${ALUPROF_GALLERY}/roleta_sp.jpg` },
    detail: {
      subtitle:
        'Прикриті ролетні системи для нових будівель — сертифіковані Passive House Institute',
      highlights: [
        { label: 'Висота короба', value: '165 мм або менше' },
        { label: 'Сертифікація', value: 'PHI Darmstadt (Passive House)' },
        { label: 'Сумісність', value: 'Uw ≤ 0.80 W/(m²K)' },
      ],
      description:
        'Системи SP і SP-E з прикритим монтажем призначені переважно для нових будівель, але можуть встановлюватися й у існуючих — після внесення необхідних змін у перемичку. Планування таких рішень на ранній стадії проєктування дозволяє ефективно використовувати функціональні можливості системи.\n\nЦі системи забезпечують відмінну тепло- та звукоізоляцію без втручання у вікна, двері або перемички — вони не впливають на енергоспоживання будівлі та інтегруються у фасад як непомітний елемент. Передня частина короба слугує основою для оздоблювальних матеріалів (наприклад, клінкеру). Ревізійні кришки та канали можуть кольорово відповідати вікнам.\n\nРолетне полотно виготовляється з заповнених піною пластикових або екструдованих профілів. Опційна москітна сітка забезпечує захист від комах із збереженням потоків світла та повітря.\n\nІнститут пасивного будинку в Дармштадті (PHI) сертифікував системи SP і SP-E для пасивних будинків з висотою короба 165 мм або меншою. Компоненти не порушують герметичність будівлі. Системи сумісні з вікнами PHI (Uw ≤ 0.80 W/(m²K), Ug ≤ 0.70 W/(m²K)).',
      components: [
        {
          title: 'Короби',
          description: 'Прикриті короби з основою під оздоблення фасаду.',
          images: [
            '/figma/products/aluprof/components/sp-box-1.webp',
            '/figma/products/aluprof/components/sp-box-2.webp',
          ],
        },
        {
          title: 'Направляючі',
          description: 'Алюмінієві напрямні з кольоровим підбором під вікно.',
          images: [
            '/figma/products/aluprof/components/sp-guide-1.webp',
            '/figma/products/aluprof/components/sp-guide-2.webp',
          ],
        },
        {
          title: 'Профілі ролет',
          description: 'Заповнені піною пластикові або екструдовані профілі.',
          images: [
            '/figma/products/aluprof/components/sp-shutter-1.webp',
            '/figma/products/aluprof/components/sp-shutter-2.webp',
          ],
        },
        {
          title: 'Кінцеві планки',
          description: 'Кінцеві елементи з герметизацією.',
          images: [
            '/figma/products/aluprof/components/sp-endslat-1.webp',
            '/figma/products/aluprof/components/sp-endslat-2.webp',
          ],
        },
      ],
      colors: COLORS_SK_SP,
      gallery: [
        `${ALUPROF_GALLERY}/roleta_sp.jpg`,
        `${ALUPROF_GALLERY}/aluprof_sp.jpg`,
        `${ALUPROF_GALLERY}/aluprof_sp_mkt.jpg`,
        `${ALUPROF_GALLERY}/auprof_sp-e.jpg`,
        `${ALUPROF_GALLERY}/aluprof_sp-e_mkt.jpg`,
        `${ALUPROF_GALLERY}/aluprof_sp-e_s_onro.jpg`,
      ],
    },
  },
  {
    slug: 'aluprof-skt-opoterm',
    name: 'Aluprof SKT Opoterm',
    category: 'shading',
    subcategory: 'rollers',
    specs: [
      { key: 'type', value: 'надкладені ролети' },
      { key: 'material', value: 'ПВХ + алюміній' },
      { key: 'mounting', value: 'на віконну раму' },
      { key: 'thermal', value: 'Usb ≈ 0.73 W/m²K' },
      { key: 'control', value: 'ручне / автоматичне' },
    ],
    image: { src: `${ALUPROF_GALLERY}/roleta_skt_opoterm.jpg` },
    detail: {
      subtitle:
        'Універсальні надкладені ролети з ПВХ-коробом — для нових будівель і заміни вікон',
      highlights: [
        { label: 'Теплопередача (Usb)', value: '0.73 W/(m²K)' },
        { label: 'Матеріал короба', value: 'ПВХ з утепленням EPS/Neopor' },
        { label: 'Тестування', value: 'IFT Rosenheim' },
      ],
      description:
        'SKT OPOTERM — універсальний продукт, призначений переважно для монтажу в нових будівлях (зокрема, у девелоперському будівництві) або для заміни віконних виробів.\n\nСистема має ПВХ-короб для ролет, що монтується безпосередньо на віконні рами через адаптивні профілі. Внутрішня ізоляція покращує теплові характеристики. Конструкція дозволяє монтаж без оздоблення або з частковим/повним оздобленням, оскільки фронтальна частина слугує основою для фінішних матеріалів (пінопласт, штукатурка, клінкер).\n\nДоступ до короба — знизу або спереду — обирається перед остаточним монтажем. В одному коробі може розміщуватись одна або декілька ролетних завіс. Опційні вузькі алюмінієві канали приймають максі/міні-профілі для додаткової ізоляції рами. Для тонкостінних будівель доступні округлі бічні профілі. Завіса виготовляється з високоякісних алюмінієвих або ПВХ-профілів. Підтримується інтеграція з москітними сітками.\n\nДоступні варіанти: SKT OPOTERM NOVA, RENO та MONOBLOCK.',
      components: [
        {
          title: 'Короби',
          description: 'ПВХ-короби з внутрішньою ізоляцією EPS/Neopor — стандартний, NOVA, RENO та MONOBLOCK.',
          images: [
            '/figma/products/aluprof/components/skt-box-1.webp',
            '/figma/products/aluprof/components/skt-box-2.webp',
            '/figma/products/aluprof/components/skt-box-3.webp',
            '/figma/products/aluprof/components/skt-box-4.webp',
          ],
        },
        {
          title: 'Направляючі',
          description: 'Алюмінієві напрямні — стандартні та вузькі для maxi/mini-профілів.',
          images: [
            '/figma/products/aluprof/components/skt-guide-1.webp',
            '/figma/products/aluprof/components/skt-guide-2.webp',
            '/figma/products/aluprof/components/skt-guide-3.webp',
            '/figma/products/aluprof/components/skt-guide-4.webp',
          ],
        },
        {
          title: 'Профілі ролет',
          description: 'Алюмінієві або ПВХ-профілі для ролетного полотна.',
          images: ['/figma/products/aluprof/components/skt-shutter-1.webp'],
        },
        {
          title: 'Кінцеві планки',
          description: 'Кінцеві елементи з герметизацією.',
          images: ['/figma/products/aluprof/components/skt-endslat-1.webp'],
        },
        {
          title: 'Адаптивні профілі для коробів',
          description: 'Профілі для прямого монтажу на віконну раму.',
          images: ['/figma/products/aluprof/components/skt-adapter-1.webp'],
        },
      ],
      colors: COLORS_SKT_SKB,
      gallery: [
        `${ALUPROF_GALLERY}/roleta_skt_opoterm.jpg`,
        `${ALUPROF_GALLERY}/aluprof_skt_opoterm_0.jpg`,
        `${ALUPROF_GALLERY}/aluprof_skt_opoterm_p.jpg`,
        `${ALUPROF_GALLERY}/aluprof_skt_opoterm_nova.jpg`,
        `${ALUPROF_GALLERY}/aluprof_skt_opoterm_l.jpg`,
        `${ALUPROF_GALLERY}/aluprof_skt_opoterm_l_p.jpg`,
        `${ALUPROF_GALLERY}/aluprof_skt_opoterm_mkt_0.jpg`,
        `${ALUPROF_GALLERY}/aluprof_skt_opoterm_mkt_l.jpg`,
        `${ALUPROF_GALLERY}/aluprof_skt_opoterm_mkt_l_p.jpg`,
        `${ALUPROF_GALLERY}/aluprof_skt_opoterm_mkt_p.jpg`,
        `${ALUPROF_GALLERY}/aluprof_skt_opoterm_alu.jpg`,
        `${ALUPROF_GALLERY}/aluprof_skt_opoterm_psbo.jpg`,
      ],
    },
  },
  {
    slug: 'aluprof-skb-styroterm',
    name: 'Aluprof SKB Styroterm',
    category: 'shading',
    subcategory: 'rollers',
    specs: [
      { key: 'type', value: 'надкладені ролети' },
      { key: 'material', value: 'композит + алюміній' },
      { key: 'mounting', value: 'на віконну раму' },
      { key: 'thermal', value: 'Usb від 0.29 W/m²K' },
      { key: 'control', value: 'ручне / автоматичне' },
    ],
    image: { src: `${ALUPROF_GALLERY}/roleta_skb_styroterm_venti.jpg` },
    detail: {
      subtitle:
        'Енергоефективні надкладені ролети — теплопередача від 0.29 W/m²K, лідер у своїй категорії',
      highlights: [
        { label: 'Теплопередача (Usb)', value: 'від 0.29 W/(m²K)' },
        { label: 'Розміри коробу', value: '260×260 та 300×300 мм' },
        { label: 'Сумісність', value: '~90% ринкових віконних профілів' },
      ],
      description:
        'SKB STYROTERM — це передове ролетне рішення, розроблене для підвищення енергоефективності будівлі. Дослідження, проведені інститутом IFT ROSENHEIM, продемонстрували виключно низький коефіцієнт теплопередачі — від 0.29 W/m²K, що ставить продукт серед лідерів у своїй категорії.\n\nМонтаж передбачає пряме кріплення короба до віконної рами через адаптивні профілі, сумісні приблизно з 90% ринкових профілів. Система повністю утеплена та залишається візуально непомітною на фасаді будівлі.\n\nКороб виготовлено зі спеціально розробленого матеріалу з відмінними тепловими властивостями. Доступний у двох розмірах: 260×260 мм і 300×300 мм. Швидкий монтаж із засобом «клац» або вставкою підходить як для нового будівництва, так і для заміни вікон.\n\nСистема підтримує сталеві підкріплення (фіксовані консолі) для більших розмірів — з ізольованою фурнітурою, що не порушує функціональність ролет. В одному коробі можуть розміщуватись одна або кілька завіс. Опційні москітні сітки встановлюються за технологією click. Зовнішня ревізійна кришка використовує вставний алюмінієвий профіль із підбором кольору за RAL.',
      components: [
        {
          title: 'Короби',
          description: 'Розміри 260×260 та 300×300 мм з винятковою теплоізоляцією.',
          image: '/figma/products/aluprof/components/skb-box.webp',
        },
        {
          title: 'Направляючі',
          description: 'SKB/RA та SKB/RI — для зовнішнього й внутрішнього монтажу.',
          image: '/figma/products/aluprof/components/skb-guide.webp',
        },
        {
          title: 'Кінцеві планки',
          description: 'Кінцеві елементи з герметизацією.',
          image: '/figma/products/aluprof/components/skb-endslat.webp',
        },
        {
          title: 'Профілі ролет',
          description: 'PT 37, PT 52, PA 37, PA 39, PA 40, PA 43, PA 45, PA 52, PA 55.',
        },
      ],
      colors: COLORS_SKT_SKB,
      gallery: [
        `${ALUPROF_GALLERY}/roleta_skb_styroterm_venti.jpg`,
        `${ALUPROF_GALLERY}/roleta_skb_styroterm_f_0.jpg`,
        `${ALUPROF_GALLERY}/roleta_skb_styroterm_ra_0.jpg`,
        `${ALUPROF_GALLERY}/roleta_skb_styroterm_k_0.jpg`,
      ],
    },
  },
  {
    slug: 'aluprof-mb-opensky-120',
    name: 'Aluprof MB-OpenSky 120',
    category: 'shading',
    subcategory: 'pergolas',
    specs: [
      { key: 'type', value: 'пергола з рухомими ламелями' },
      { key: 'material', value: 'екструдований алюміній' },
      { key: 'lamellaAngle', value: '0–135°' },
      { key: 'maxSize', value: '6 × 4 × 3 м (вільностояча)' },
      { key: 'control', value: 'електричне (пульт / Smart Home)' },
    ],
    image: { src: `${ALUPROF_GALLERY}/pergola_opensky_120.jpg` },
    detail: {
      subtitle:
        'Алюмінієва пергола з рухомими ламелями (0–135°), прихованим електроприводом і дренажною системою',
      highlights: [
        { label: 'Кут нахилу ламелей', value: '0–135°' },
        { label: 'Снігове / вітрове навантаження', value: '72 кг/м² / ~110 км/год' },
        { label: 'Освітлення', value: 'опційне LED' },
      ],
      description:
        'MB-OPENSKY 120 — унікальний продукт, що ідеально вписується в тренди сучасного будівництва й вирізняється високою міцністю та якістю деталей.\n\nІнноваційна технологія монтажу профілів забезпечила стабільність всієї системи, а також естетично завершені з’єднання без видимих зазорів. Покриття перголи MB-OpenSky 120 — модуль із рухомих ламелей з механізмом плавної зміни кута нахилу від 0° до 135°. Доступні дві форми ламелей: SLIM (тип Z) і STANDARD (тип FLAT).\n\nТрансмісія з системою автоматичного налаштування забезпечує швидкий монтаж і легке налаштування кожної ламелі. Конструкція стійка до погодних умов. Двосхила дренажна система ефективно відводить дощову воду з даху всередині колон. Випробування показали, що для конструкцій максимального розміру допустиме снігове навантаження — 72 кг/м², одночасне вітрове — близько 110 км/год. Доступна вільностояча версія максимального розміру 6 × 4 × 3 м.\n\nПергола обладнана повністю електричним механізмом керування, повністю прихованим у конструкції. Керування — пульт, вимикач, мобільний застосунок або сценарій у системі розумного будинку. Опційно — датчики вітру, дощу і сонця, бічні жалюзі або панелі (інтегруються в загальне керування).\n\nОсобливості: міцна конструкція з екструдованого алюмінію • естетично приховані шарнірні консолі • два типи ламелей SLIM/STANDARD • прихований мотор • LED-підсвітка • можливість бічних розсувних склопанелей або скринів • ревізія крокв для встановлення інфрачервоних обігрівачів • 12 RAL-кольорів стандартної палітри.',
      components: [],
      colors: COLORS_PERGOLA,
      gallery: [
        `${ALUPROF_GALLERY}/pergola_opensky_120.jpg`,
        `${ALUPROF_GALLERY}/opensky_120.jpg`,
        `${ALUPROF_GALLERY}/opensky_120_3.png`,
        `${ALUPROF_GALLERY}/Pergola120_przyscienna_news3.png`,
        `${ALUPROF_GALLERY}/Pergola120_przyscienna_news2.png`,
        `${ALUPROF_GALLERY}/Pergola120_przyscienna_news.png`,
      ],
    },
  },
]
