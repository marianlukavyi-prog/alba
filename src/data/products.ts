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
    image: { src: '/figma/products/aluprof-skyroll-zip.jpg' },
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
          image: '/figma/products/aluprof-skyroll-zip-box.webp',
        },
        {
          title: 'Направляючі',
          description: 'SRS, SRS/SKT, SRS/SKB — дворазові з системою ZIP.',
          image: '/figma/products/aluprof-skyroll-zip-guide.webp',
        },
        {
          title: 'Кінцеві планки',
          description: 'Кінцеві елементи з алюмінію.',
          image: '/figma/products/aluprof-skyroll-zip-endslat.webp',
        },
      ],
      colors: [
        { name: 'RAL 9016 — Ultra white', hex: '#f1f0ea' },
        { name: 'RAL 9001 — Cream white', hex: '#fdf4e3' },
        { name: 'RAL 9006 — Silver', hex: '#a5a5a5' },
        { name: 'RAL 9007 — Grey aluminum', hex: '#8f8f8f' },
        { name: 'RAL 7039 — Quartz grey', hex: '#6b665e' },
        { name: 'RAL 7024 — Graphite grey', hex: '#474a51' },
        { name: 'RAL 7016 — Anthracite grey', hex: '#293133' },
        { name: 'RAL 9005 — Black', hex: '#0a0a0a' },
        { name: 'RAL 8014 — Brown', hex: '#4a3520' },
        { name: 'RAL 8019 — Dark brown', hex: '#3b2f2c' },
      ],
      gallery: [
        '/figma/products/aluprof-skyroll-zip.jpg',
        '/figma/products/aluprof-skyroll-zip-box.webp',
        '/figma/products/aluprof-skyroll-zip-guide.webp',
        '/figma/products/aluprof-skyroll-zip-endslat.webp',
      ],
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
    image: { src: '/figma/products/aluprof-skyroll-eco.jpg' },
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
          image: '/figma/products/aluprof-skyroll-eco-box.webp',
        },
        {
          title: 'Направляючі',
          description: 'SRS — інтегровані з тканиною та з механізмом ALU-CLICK.',
          image: '/figma/products/aluprof-skyroll-eco-guide.webp',
        },
        {
          title: 'Кінцеві планки',
          description: 'Адаптовані з москітної системи MKT.',
          image: '/figma/products/aluprof-skyroll-eco-endslat.webp',
        },
      ],
      colors: [
        { name: 'RAL 9016 — Ultra white', hex: '#f1f0ea' },
        { name: 'RAL 9001 — Cream white', hex: '#fdf4e3' },
        { name: 'RAL 9006 — Silver', hex: '#a5a5a5' },
        { name: 'RAL 9007 — Grey aluminum', hex: '#8f8f8f' },
        { name: 'RAL 7039 — Quartz grey', hex: '#6b665e' },
        { name: 'RAL 7024 — Graphite grey', hex: '#474a51' },
        { name: 'RAL 7016 — Anthracite grey', hex: '#293133' },
        { name: 'RAL 9005 — Black', hex: '#0a0a0a' },
        { name: 'RAL 8014 — Brown', hex: '#4a3520' },
        { name: 'RAL 8019 — Dark brown', hex: '#3b2f2c' },
      ],
      gallery: [
        '/figma/products/aluprof-skyroll-eco.jpg',
        '/figma/products/aluprof-skyroll-eco-box.webp',
        '/figma/products/aluprof-skyroll-eco-guide.webp',
        '/figma/products/aluprof-skyroll-eco-endslat.webp',
      ],
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
    image: { src: '/figma/products/aluprof-sk-front-mounted.jpg' },
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
          image: '/figma/products/aluprof-sk-box.webp',
        },
        {
          title: 'Направляючі',
          description: 'Алюмінієві напрямні рейки.',
          image: '/figma/products/aluprof-sk-guide.webp',
        },
        {
          title: 'Кінцеві планки',
          description: 'Кінцеві елементи з герметизацією.',
          image: '/figma/products/aluprof-sk-endslat.webp',
        },
      ],
      colors: [
        { name: '02 — White', hex: '#f5f5f0' },
        { name: '22 — Ultra white', hex: '#ededed' },
        { name: '40 — White pearl mat', hex: '#e6e6e0' },
        { name: '01 — Silver', hex: '#c0c0c0' },
        { name: '37 — Grey aluminum', hex: '#8f8f8f' },
        { name: '03 — Grey', hex: '#909090' },
        { name: '42 — Grey pearl mat', hex: '#a8a8a8' },
        { name: '44 — Dark grey pearl mat', hex: '#555555' },
        { name: '23 — Anthracite grey', hex: '#293133' },
        { name: '20 — Black', hex: '#0a0a0a' },
        { name: '05 — Beige', hex: '#d6c9a8' },
        { name: '09 — Brown', hex: '#6e3a1c' },
      ],
      gallery: [
        '/figma/products/aluprof-sk-front-mounted.jpg',
        '/figma/products/aluprof-sk-box.webp',
        '/figma/products/aluprof-sk-guide.webp',
        '/figma/products/aluprof-sk-endslat.webp',
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
    image: { src: '/figma/products/aluprof-sp-flush-mounted.jpg' },
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
          image: '/figma/products/aluprof-sp-box.webp',
        },
        {
          title: 'Направляючі',
          description: 'Алюмінієві напрямні з кольоровим підбором під вікно.',
          image: '/figma/products/aluprof-sp-guide.webp',
        },
        {
          title: 'Кінцеві планки',
          description: 'Кінцеві елементи з герметизацією.',
          image: '/figma/products/aluprof-sp-endslat.webp',
        },
      ],
      colors: [
        { name: '02 — White', hex: '#f5f5f0' },
        { name: '22 — Ultra white', hex: '#ededed' },
        { name: '40 — White pearl mat', hex: '#e6e6e0' },
        { name: '01 — Silver', hex: '#c0c0c0' },
        { name: '37 — Grey aluminum', hex: '#8f8f8f' },
        { name: '03 — Grey', hex: '#909090' },
        { name: '42 — Grey pearl mat', hex: '#a8a8a8' },
        { name: '44 — Dark grey pearl mat', hex: '#555555' },
        { name: '23 — Anthracite grey', hex: '#293133' },
        { name: '20 — Black', hex: '#0a0a0a' },
        { name: '05 — Beige', hex: '#d6c9a8' },
        { name: '09 — Brown', hex: '#6e3a1c' },
      ],
      gallery: [
        '/figma/products/aluprof-sp-flush-mounted.jpg',
        '/figma/products/aluprof-sp-box.webp',
        '/figma/products/aluprof-sp-guide.webp',
        '/figma/products/aluprof-sp-endslat.webp',
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
    image: { src: '/figma/products/aluprof-skt-opoterm.jpg' },
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
          image: '/figma/products/aluprof-skt-box.webp',
        },
        {
          title: 'Направляючі',
          description: 'Алюмінієві напрямні — стандартні та вузькі.',
          image: '/figma/products/aluprof-skt-guide.webp',
        },
        {
          title: 'Кінцеві планки',
          description: 'Кінцеві елементи з герметизацією.',
          image: '/figma/products/aluprof-skt-endslat.webp',
        },
        { title: 'Адаптивні профілі для коробів', description: '' },
      ],
      colors: [
        { name: '02 — White', hex: '#f5f5f0' },
        { name: '22 — Ultra white', hex: '#ededed' },
        { name: '40 — White pearl mat', hex: '#e6e6e0' },
        { name: '01 — Silver', hex: '#c0c0c0' },
        { name: '37 — Grey aluminum', hex: '#8f8f8f' },
        { name: '03 — Grey', hex: '#909090' },
        { name: '23 — Anthracite grey', hex: '#293133' },
        { name: '43 — Anthracite grey pearl mat', hex: '#4a4a4a' },
        { name: '20 — Black', hex: '#0a0a0a' },
        { name: '05 — Beige', hex: '#d6c9a8' },
        { name: '09 — Brown', hex: '#6e3a1c' },
        { name: '30 — Golden Oak', hex: '#9c6b3c' },
      ],
      gallery: [
        '/figma/products/aluprof-skt-opoterm.jpg',
        '/figma/products/aluprof-skt-box.webp',
        '/figma/products/aluprof-skt-guide.webp',
        '/figma/products/aluprof-skt-endslat.webp',
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
    image: { src: '/figma/products/aluprof-skb-styroterm.jpg' },
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
          image: '/figma/products/aluprof-skb-box.webp',
        },
        {
          title: 'Направляючі',
          description: 'SKB/RA та SKB/RI — для зовнішнього й внутрішнього монтажу.',
          image: '/figma/products/aluprof-skb-guide.webp',
        },
        {
          title: 'Кінцеві планки',
          description: 'Кінцеві елементи з герметизацією.',
          image: '/figma/products/aluprof-skb-endslat.webp',
        },
        {
          title: 'Профілі ролет',
          description: 'PT 37, PT 52, PA 37, PA 39, PA 40, PA 43, PA 45, PA 52, PA 55.',
        },
      ],
      colors: [
        { name: '02 — White', hex: '#f5f5f0' },
        { name: '22 — Ultra white', hex: '#ededed' },
        { name: '40 — White pearl mat', hex: '#e6e6e0' },
        { name: '01 — Silver', hex: '#c0c0c0' },
        { name: '37 — Grey aluminum', hex: '#8f8f8f' },
        { name: '03 — Grey', hex: '#909090' },
        { name: '23 — Anthracite grey', hex: '#293133' },
        { name: '43 — Anthracite grey pearl mat', hex: '#4a4a4a' },
        { name: '20 — Black', hex: '#0a0a0a' },
        { name: '05 — Beige', hex: '#d6c9a8' },
        { name: '09 — Brown', hex: '#6e3a1c' },
        { name: '30 — Golden Oak', hex: '#9c6b3c' },
      ],
      gallery: [
        '/figma/products/aluprof-skb-styroterm.jpg',
        '/figma/products/aluprof-skb-box.webp',
        '/figma/products/aluprof-skb-guide.webp',
        '/figma/products/aluprof-skb-endslat.webp',
      ],
    },
  },
]
