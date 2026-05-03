# План: міграція PRODUCTS у JSON + dev-адмінка

## Поточний стан

- `src/data/products.ts` — 2343 рядки, 50 продуктів, 4 палітри кольорів
- 9 файлів імпортують з `products.ts`:
  - `src/app/sitemap.ts`
  - `src/app/[lang]/products/page.tsx`
  - `src/app/[lang]/products/[category]/page.tsx`
  - `src/app/[lang]/products/[category]/[slug]/page.tsx`
  - `src/components/sections/product-tabs.tsx`
  - `src/components/sections/product-card.tsx`
  - `src/components/sections/category-sub-filter.tsx`
  - `src/components/sections/product-detail-view.tsx`
  - `src/components/sections/products-section.tsx`
- 50 папок зображень у `public/figma/products/`

## Загальний обсяг роботи: ~6–8 годин

| Фаза | Обсяг | Ризик |
|---|---|---|
| 1. Міграція даних | 2 год | низький |
| 2. Loader + типізація | 1 год | низький |
| 3. Адмінка (форма + Server Actions) | 3–4 год | середній |
| 4. Тести + QA | 1 год | низький |

---

## Фаза 1 — Міграція PRODUCTS у JSON (2 год)

### 1.1. Створити структуру файлів

```
src/data/
  products.ts            ← залишається: типи, палітри, loader
  products.json          ← НОВИЙ: масив із 50 продуктів
  palettes.ts            ← НОВИЙ: COLORS_SK_SP, COLORS_SKT_SKB, COLORS_RAL, COLORS_PERGOLA
```

### 1.2. У JSON-продукті `colors` замінити на string key

Замість масиву кольорів — рядок `"colors": "SK_SP"`. Loader при імпорті резолвить:

```ts
// products.ts (loader)
import raw from './products.json'
import { PALETTES } from './palettes'

export const PRODUCTS: Product[] = raw.map(p => ({
  ...p,
  detail: {
    ...p.detail,
    colors: typeof p.detail.colors === 'string'
      ? PALETTES[p.detail.colors]
      : p.detail.colors,
  },
}))
```

### 1.3. Написати одноразовий міграційний скрипт

`scripts/migrate-products-to-json.ts`:
- імпортує поточний `PRODUCTS`
- замінює посилання на палітри на string-key (`COLORS_SK_SP` → `"SK_SP"`)
- `JSON.stringify` з `indent: 2`
- пише у `src/data/products.json`

### 1.4. Видалити DEMO_DETAIL (мертвий код)

### 1.5. Перевірка
- `npm run typecheck` без помилок
- `npm run dev` — всі сторінки рендеряться
- random-перевірка 5 продуктів через Chrome DevTools

---

## Фаза 2 — Loader + типізація (1 год)

### 2.1. Винести типи окремо

`src/data/products-types.ts`:
- `PRODUCT_CATEGORIES`, `ProductCategory`
- `PRODUCT_SUBCATEGORIES`, `ProductSubcategory`
- `SpecKey`, `Spec`, `ProductColor`, `ProductComponent`, `ProductHighlight`, `ProductDetail`, `Product`, `ProductFamily`
- `PaletteKey` = `'SK_SP' | 'SKT_SKB' | 'RAL' | 'PERGOLA'`

### 2.2. Loader API (без змін для решти коду)

`src/data/products.ts`:
- експортує: `PRODUCTS`, `PRODUCT_CATEGORIES`, `PRODUCT_SUBCATEGORIES` + всі типи
- усі імпорти у 9 файлах продовжують працювати **без змін**

### 2.3. Validation на запуску

При імпорті JSON — `Zod`-схема (або власний guard) перевіряє цілісність:
- унікальність `slug`
- `category` в `PRODUCT_CATEGORIES`
- `subcategory` в `PRODUCT_SUBCATEGORIES`
- `family` (якщо є) в `'pvc' | 'aluminum'`
- `colors` — або palette-key, або масив `ProductColor`

При помилці — кидає у dev. У prod — log + продовжує.

---

## Фаза 3 — Адмінка (3–4 год)

### 3.1. Маршрут та захист доступу

`src/app/admin/products/page.tsx`:
```ts
if (process.env.NODE_ENV !== 'development') notFound()
```

Без авторизації — тільки локально через `npm run dev`.

### 3.2. Список продуктів (`/admin/products`)

- Таблиця: thumbnail, name, category, subcategory, slug, дії (Edit / Delete)
- Кнопка `+ Add new`

### 3.3. Форма (`/admin/products/new`, `/admin/products/[slug]/edit`)

**Поля:**
- `slug` (auto-generate з name + manual override)
- `name`
- `category` (select із `PRODUCT_CATEGORIES`)
- `family` (select: `pvc` / `aluminum` / none)
- `subcategory` (select із `PRODUCT_SUBCATEGORIES`, відфільтрований за category/family)
- `image` (single drag-drop → `public/figma/products/<slug>/photo-1.<ext>`)
- `specs` (динамічний список: SpecKey dropdown + value)
- `detail.subtitle` (textarea)
- `detail.description` (textarea з підтримкою `\n\n`)
- `detail.highlights` (динамічний список: label + value)
- `detail.gallery` (multi-upload → `public/figma/products/<slug>/gallery-N.<ext>`)
- `detail.components` (динамічний список: title + description + multi-upload)
- `detail.colors`:
  - radio: "Палітра" або "Власні"
  - якщо палітра — dropdown: `SK_SP` / `SKT_SKB` / `RAL` / `PERGOLA`
  - якщо власні — динамічний список: name + (image upload або hex)

### 3.4. Server Actions

`src/app/admin/products/actions.ts`:
```ts
'use server'

export async function saveProduct(formData: FormData) {
  // 1. Валідація через Zod
  // 2. Створити папку public/figma/products/<slug>/
  // 3. Зберегти всі завантажені файли
  // 4. Прочитати products.json
  // 5. Додати/оновити запис
  // 6. Записати JSON.stringify(..., null, 2)
  // 7. revalidatePath('/products', '/products/' + slug)
}

export async function deleteProduct(slug: string) {
  // Видалити запис з JSON + папку зображень (опційно — bg)
}
```

### 3.5. Валідація поточних продуктів через Adminку

Після міграції — пройти через `/admin/products` і переконатися, що:
- усі 50 продуктів відкриваються в edit-режимі
- усі поля заповнені правильно
- `Save` без змін → файл байтово ідентичний (idempotent)

---

## Фаза 4 — QA + dev-experience (1 год)

### 4.1. Smoke tests

- [ ] `npm run build` без помилок
- [ ] `npm run typecheck` без помилок
- [ ] `npm run lint` без warnings
- [ ] `/products` рендерить усі 5 категорій
- [ ] `/products/pvc` показує 9 продуктів (вікна + двері + розсувні)
- [ ] `/products/aluminum` показує 33 продукти, 4 сторінки пагінації
- [ ] `/products/shading/aluprof-sk-front-mounted` — компоненти, кольори, gallery працюють
- [ ] sitemap.xml містить усі 50 продуктів
- [ ] hreflang працює на 4 локалях

### 4.2. Admin smoke tests

- [ ] Створити тестовий продукт через форму → з'являється в `/products/<category>`
- [ ] Edit → `Save` → зміни видно
- [ ] Delete → продукт зникає, файли видалено
- [ ] Завантажити zip-bomb / занадто великий файл → graceful error

### 4.3. Документація

- [ ] `README` секція "Admin"
- [ ] Як додати новий SpecKey
- [ ] Як додати нову палітру кольорів
- [ ] Як додати нову категорію/субкатегорію (нагадування про i18n)

---

## TODO List (детально)

### Дані
- [ ] Створити `src/data/palettes.ts` — винести `COLORS_SK_SP`, `COLORS_SKT_SKB`, `COLORS_RAL`, `COLORS_PERGOLA`
- [ ] Створити `src/data/products-types.ts` — винести всі типи
- [ ] Написати `scripts/migrate-products-to-json.ts`
- [ ] Запустити міграцію → `src/data/products.json`
- [ ] Видалити `DEMO_DETAIL`
- [ ] Переписати `src/data/products.ts` як loader

### Адмінка
- [ ] `src/app/admin/layout.tsx` — guard на `NODE_ENV`
- [ ] `src/app/admin/products/page.tsx` — список продуктів
- [ ] `src/app/admin/products/new/page.tsx` — форма створення
- [ ] `src/app/admin/products/[slug]/edit/page.tsx` — форма редагування
- [ ] `src/app/admin/products/actions.ts` — Server Actions (save/delete/upload)
- [ ] `src/components/admin/product-form.tsx` — компонент форми
- [ ] `src/components/admin/dynamic-list.tsx` — для specs/highlights/components/colors
- [ ] `src/components/admin/image-upload.tsx` — drag-drop + preview

### Утиліти
- [ ] `src/lib/slug.ts` — slugify name
- [ ] `src/lib/validate-product.ts` — Zod-схема
- [ ] `src/lib/file-storage.ts` — save/delete files in `public/figma/products/`

### Залежності (потрібно поставити)
- [ ] `zod` — валідація
- [ ] *(опційно)* `react-dropzone` — drag-drop upload

### QA
- [ ] `npm run build` зелений
- [ ] `npm run typecheck` зелений
- [ ] Перевірка 5 random продуктів у браузері
- [ ] Sitemap містить усі 50 продуктів

---

## Залишкові ризики

1. **Циклічні імпорти** — `palettes.ts` не має імпортувати з `products.ts`. Тримати їх незалежними.
2. **Hot reload JSON** — Next.js перечитує JSON при зміні; admin-зміни видно одразу.
3. **Concurrent writes** — якщо два таби форми відкриті, можна перезаписати чужі зміни. Acceptable для local-only dev.
4. **Encoding файлів** — uploads з macOS можуть мати NFD-форми imeni; нормалізувати через `slugify`.
5. **Збереження порядку** — `JSON.stringify(arr, null, 2)` зберігає порядок елементів. Нові продукти додаються в кінець.

---

## Швидкий план виконання (рекомендований порядок)

1. **Фаза 1** (міграція) → коміт `feat: migrate PRODUCTS to JSON`
2. **Фаза 2** (loader + Zod) → коміт `feat: add Zod validation to products loader`
3. **Фаза 3** (адмінка) → коміт `feat: add dev-only admin for product management`
4. **Фаза 4** (QA) → виправити знайдене → коміт `fix: ...`

Кожна фаза самостійна — можна зупинитися після Фази 1/2 і вже мати чисту JSON-базу.
