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

export type ProductColor = { name: string; hex?: string; image?: string }
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
    slug: 'aluprof-skyroll-zip',
    name: 'Aluprof SkyRoll ZIP',
    category: 'shading',
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
          description: 'SRS90, SRS90/2, SRS90E, SRS90E/2, SRS90E/3, SRS/SKT, SRS/SKB.',
          image: '/figma/products/aluprof/components/skyroll-zip-box.webp',
        },
        {
          title: 'Направляючі',
          description: 'SRS, SRS/SKT, SRS/SKB — дворазові з системою ZIP.',
          image: '/figma/products/aluprof/components/skyroll-zip-guide.webp',
        },
        {
          title: 'Кінцеві планки',
          description: 'Кінцеві елементи з алюмінію.',
          image: '/figma/products/aluprof/components/skyroll-zip-endslat.webp',
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
          description: 'SRS90, SRS90/2, SRS90E, SRS90E/2, SRS90_SP, SRS90E_SP.',
          image: '/figma/products/aluprof/components/skyroll-eco-box.webp',
        },
        {
          title: 'Направляючі',
          description: 'SRS — інтегровані з тканиною та з механізмом ALU-CLICK.',
          image: '/figma/products/aluprof/components/skyroll-eco-guide.webp',
        },
        {
          title: 'Кінцеві планки',
          description: 'Адаптовані з москітної системи MKT.',
          image: '/figma/products/aluprof/components/skyroll-eco-endslat.webp',
        },
      ],
      colors: COLORS_RAL,
      gallery: [`${ALUPROF_GALLERY}/skyroll_eco_a_0.jpg`, `${ALUPROF_GALLERY}/skyroll_eco_a_2.jpg`],
    },
  },
  {
    slug: 'aluprof-sk-front-mounted',
    name: 'Aluprof SK / SKE / SKP',
    category: 'shading',
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
          image: '/figma/products/aluprof/components/sk-box.webp',
        },
        {
          title: 'Направляючі',
          description: 'Алюмінієві напрямні рейки.',
          image: '/figma/products/aluprof/components/sk-guide.webp',
        },
        {
          title: 'Кінцеві планки',
          description: 'Кінцеві елементи з герметизацією.',
          image: '/figma/products/aluprof/components/sk-endslat.webp',
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
          image: '/figma/products/aluprof/components/sp-box.webp',
        },
        {
          title: 'Направляючі',
          description: 'Алюмінієві напрямні з кольоровим підбором під вікно.',
          image: '/figma/products/aluprof/components/sp-guide.webp',
        },
        {
          title: 'Кінцеві планки',
          description: 'Кінцеві елементи з герметизацією.',
          image: '/figma/products/aluprof/components/sp-endslat.webp',
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
          description: 'ПВХ-короби з внутрішньою ізоляцією EPS/Neopor.',
          image: '/figma/products/aluprof/components/skt-box.webp',
        },
        {
          title: 'Направляючі',
          description: 'Алюмінієві напрямні — стандартні та вузькі.',
          image: '/figma/products/aluprof/components/skt-guide.webp',
        },
        {
          title: 'Кінцеві планки',
          description: 'Кінцеві елементи з герметизацією.',
          image: '/figma/products/aluprof/components/skt-endslat.webp',
        },
        { title: 'Адаптивні профілі для коробів', description: '' },
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
]
