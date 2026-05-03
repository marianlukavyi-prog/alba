import type {
  PaletteKey,
  ProductCategory,
  ProductFamily,
  ProductSubcategory,
  SpecKey,
} from '@/data/products-types'

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  pvc: 'Системи ПВХ',
  aluminum: 'Алюмінієві системи',
  doors: 'Двері',
  systems: 'Системи (розсувні, фасадні)',
  shading: 'Сонцезахист',
}

export const SUBCATEGORY_LABELS: Record<ProductSubcategory, string> = {
  windows: 'Вікна',
  'wood-aluminum': 'Дерево-алюміній',
  entrance: 'Вхідні двері',
  pivot: 'Pivot (поворотні)',
  sliding: 'Розсувні',
  'swing-doors': 'Розпашні двері',
  'auto-sliding': 'Автоматичні розсувні',
  facade: 'Фасадні',
  folding: 'Складані',
  'sliding-folding': 'Розсувно-складані',
  rollers: 'Ролети',
  screen: 'Screen-системи',
  'roller-screen': 'Ролета-screen',
  'venetian-blinds': 'Венеціанські жалюзі',
  pergolas: 'Перголи',
}

export const FAMILY_LABELS: Record<ProductFamily, string> = {
  pvc: 'PVC (вікна ПВХ)',
  aluminum: 'Aluminium (алюміній)',
}

export const SPEC_LABELS: Record<SpecKey, string> = {
  depth: 'Монтажна глибина',
  chambers: 'Кількість камер',
  glazing: 'Склопакет',
  thermal: 'Теплоізоляція (Uw)',
  sound: 'Шумоізоляція',
  material: 'Матеріал',
  type: 'Тип',
  mounting: 'Монтаж',
  control: 'Управління',
  maxSize: 'Макс. розмір',
  lamellaAngle: 'Кут ламелі',
}

export const PALETTE_LABELS: Record<PaletteKey, string> = {
  SK_SP: 'SK / SP — ролети Aluprof (40 кольорів)',
  SKT_SKB: 'SKT / SKB — теплоізольовані ролети Aluprof',
  RAL: 'RAL — стандартні кольори (10)',
  PERGOLA: 'Pergola — кольори перголи MB-OpenSky (9)',
}
