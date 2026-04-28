export const PRODUCT_CATEGORIES = ['pvc', 'aluminum', 'doors', 'systems', 'shading'] as const
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

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

export type ProductColor = { name: string; hex: string }
export type ProductComponent = { title: string; description: string; image?: string }
export type ProductHighlight = { label: string; value: string }

export type ProductDetail = {
  subtitle: string
  highlights: ProductHighlight[]
  description: string
  components: ProductComponent[]
  colors: ProductColor[]
  gallery: string[]
}

export type Product = {
  slug: string
  name: string
  category: ProductCategory
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

export const PRODUCTS: Product[] = [
  {
    slug: 'euro-design-60',
    name: 'Euro Design 60',
    category: 'pvc',
    specs: [
      { key: 'depth', value: '60 мм' },
      { key: 'chambers', value: '3 камери' },
      { key: 'glazing', value: 'до 32 мм' },
      { key: 'thermal', value: 'Uf ≈ 1.6' },
      { key: 'sound', value: 'до 41 дБ' },
    ],
    image: { src: '/figma/products/euro-design-60.webp' },
    detail: DEMO_DETAIL,
  },
  {
    slug: 'euro-design-70',
    name: 'Euro Design 70',
    category: 'pvc',
    specs: [
      { key: 'depth', value: '70 мм' },
      { key: 'chambers', value: '5 камер' },
      { key: 'glazing', value: 'до 40 мм' },
      { key: 'thermal', value: 'Uf ≈ 1.3' },
      { key: 'sound', value: 'до 43–44 дБ' },
    ],
    image: { src: '/figma/products/euro-design-70.webp' },
    detail: DEMO_DETAIL,
  },
  {
    slug: 'schuco-aws-wooddesign',
    name: 'Schüco AWS WoodDesign',
    category: 'aluminum',
    specs: [
      { key: 'depth', value: '75 / 90 мм' },
      { key: 'material', value: 'алюміній + дерево' },
      { key: 'glazing', value: 'до 50 мм' },
      { key: 'thermal', value: 'Uf ≈ 1.2–1.5' },
      { key: 'sound', value: 'до 47–49 дБ' },
    ],
    image: { src: '/figma/products/schuco-aws-wooddesign.webp' },
    detail: DEMO_DETAIL,
  },
  {
    slug: 'reynaers-masterline-8',
    name: 'Reynaers MasterLine 8',
    category: 'aluminum',
    specs: [
      { key: 'depth', value: '77 мм' },
      { key: 'material', value: 'алюміній' },
      { key: 'glazing', value: 'до 57 мм' },
      { key: 'thermal', value: 'Uf ≈ 1.3' },
      { key: 'sound', value: 'до 43–46 дБ' },
    ],
    image: { src: '/figma/products/reynaers-masterline-8.webp' },
    detail: DEMO_DETAIL,
  },
  {
    slug: 'schuco-ad-up-75',
    name: 'Schüco AD UP 75',
    category: 'doors',
    specs: [
      { key: 'depth', value: '75 мм' },
      { key: 'material', value: 'алюміній' },
      { key: 'glazing', value: 'до 50–53 мм' },
      { key: 'thermal', value: 'Uf ≈ 1.4–1.6' },
      { key: 'sound', value: 'до 42–43 дБ' },
    ],
    image: { src: '/figma/products/schuco-ad-up-75.webp' },
    detail: DEMO_DETAIL,
  },
  {
    slug: 'reynaers-pivot-door',
    name: 'Reynaers MasterLine 8 Pivot Door',
    category: 'doors',
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
    slug: 'schuco-fws-50',
    name: 'Schüco FWS 50',
    category: 'systems',
    specs: [
      { key: 'depth', value: '50 мм' },
      { key: 'material', value: 'алюміній' },
      { key: 'glazing', value: 'до 62 мм' },
      { key: 'thermal', value: 'Uf ≈ 1.5' },
      { key: 'sound', value: 'до 48 дБ' },
    ],
    image: { src: '/figma/products/schuco-fws-50.webp' },
    detail: DEMO_DETAIL,
  },
  {
    slug: 'schuco-as-fd-90',
    name: 'Schüco AS FD 90.HI',
    category: 'systems',
    specs: [
      { key: 'depth', value: '90 мм' },
      { key: 'material', value: 'алюміній' },
      { key: 'glazing', value: 'до 65 мм' },
      { key: 'thermal', value: 'Uf ≈ 1.3' },
      { key: 'sound', value: 'до 47–48 дБ' },
    ],
    image: { src: '/figma/products/schuco-as-fd-90.webp' },
    detail: DEMO_DETAIL,
  },
  {
    slug: 'aluprof-skt-opoterm',
    name: 'Aluprof SKT Opoterm',
    category: 'shading',
    specs: [
      { key: 'type', value: 'накладні ролети' },
      { key: 'material', value: 'ПВХ + алюміній' },
      { key: 'mounting', value: 'на віконну раму' },
      { key: 'thermal', value: 'Usb ≈ 0.59–0.73' },
      { key: 'control', value: 'ручне / автоматичне' },
    ],
    image: { src: '/figma/products/aluprof-skt-opoterm.webp' },
    detail: DEMO_DETAIL,
  },
  {
    slug: 'aluprof-mb-opensky-120',
    name: 'Aluprof MB OpenSky 120',
    category: 'shading',
    specs: [
      { key: 'type', value: 'пергола (ламелі)' },
      { key: 'material', value: 'алюміній' },
      { key: 'maxSize', value: 'до 6 × 4 × 3 м' },
      { key: 'lamellaAngle', value: '0–135°' },
      { key: 'control', value: 'автоматичне' },
    ],
    image: { src: '/figma/products/aluprof-mb-opensky-120.webp' },
    detail: DEMO_DETAIL,
  },
]
