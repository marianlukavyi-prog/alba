# План: міграція блогу на Sanity (CMS)

## Sanity project info

- **projectId:** `l8ugmljw`
- **dataset:** `production`
- **apiVersion:** `2024-01-01`

---

## Поточний стан блогу

### Структура файлів

```
src/data/blog.ts                              — 255 рядків, статичні дані
  ├ BlogPost[] (9 копій 1 поста)
  ├ POPULAR_POSTS[] (3 шт)
  ├ LATEST_POSTS[] (4 шт)
  ├ BLOG_TAGS, BLOG_CATEGORIES
  └ ArticleBlock union type (paragraph/heading/subheading/lead/list/note)

src/app/[lang]/blog/page.tsx                  — 153 рядки, листинг + sidebar
src/app/[lang]/blog/[slug]/page.tsx           — 212 рядків, детальна сторінка
src/components/sections/
  ├ blog-card.tsx
  ├ blog-pagination.tsx
  ├ blog-sidebar.tsx
  ├ blog-tags-bar.tsx
  └ article-body.tsx                          — рендерить ArticleBlock[]
```

### Поточний шейп BlogPost

```ts
type BlogPost = {
  slug: string
  title: Record<Locale, string>      // 4 локалі inline
  excerpt: Record<Locale, string>
  cover: string
  featuredImage: string
  author: string
  publishedAt: string
  readingMinutes: number
  views: number
  tags: BlogTag[]
  body: ArticleBlock[]                // не локалізований у поточних даних
}
```

### Імпортерів `blog.ts`

7 файлів:
- `src/app/sitemap.ts`
- `src/app/[lang]/blog/page.tsx`
- `src/app/[lang]/blog/[slug]/page.tsx`
- `src/components/sections/blog-card.tsx`
- `src/components/sections/blog-sidebar.tsx`
- `src/components/sections/blog-tags-bar.tsx`
- `src/components/sections/article-body.tsx`

---

## TODO List (детально)

### 1. Sanity Studio — інтеграція в існуючий Next.js app

> Не створювати окремий `studio-alba` як в офіційному гайді. Embed Studio в поточний Next.js на `/studio` маршруті — один деплой, одне репо, одна `package.json`.

- [ ] `npm install sanity @sanity/vision next-sanity @sanity/image-url @sanity/document-internationalization styled-components --legacy-peer-deps`
- [ ] Створити `src/sanity/client.ts` — Sanity client + image URL builder
- [ ] Створити `src/sanity/env.ts` — projectId, dataset, apiVersion з env-змінних
- [ ] Створити `src/sanity/structure.ts` — кастомна structure (групування по локалях)
- [ ] Створити `sanity.config.ts` у корені проекту — підключення studio + плагінів
- [ ] Додати `.env.local`:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID=l8ugmljw`
  - `NEXT_PUBLIC_SANITY_DATASET=production`
  - `SANITY_API_TOKEN=<viewer/editor token>` (для server-side fetch + draft preview)
  - `SANITY_REVALIDATE_SECRET=<random>` (для webhook signature)
- [ ] Створити `src/app/studio/[[...tool]]/page.tsx` — embed Studio
- [ ] Виключити `/studio` з proxy.ts (як ми робили з `/admin`)

### 2. Schema — типи документів

#### `src/sanity/schemas/post.ts`

document-level i18n: окремий документ на кожну мову, з'єднані через `@sanity/document-internationalization`. Поля:

- `title: string` (required)
- `slug: slug` (auto з title, required, unique)
- `language: string` (es/en/uk/ru, fixed для перекладу)
- `excerpt: text` (макс 200 char, required)
- `cover: image` (required, з alt-полем + hot-spot crop)
- `featuredImage: image` (опційно)
- `author: reference → author`
- `publishedAt: datetime` (required)
- `readingMinutes: number` (auto-розрахунок з body, або manual)
- `views: number` (manual lock — пізніше можна live counter)
- `tags: array<reference → tag>`
- `body: portableText` (rich text замість ArticleBlock[]):
  - paragraph, h2, h3
  - lists (bullet + numbered)
  - inline images (з alt + caption)
  - lead (custom block style)
  - note callout (custom block)
  - links (internal/external)

#### `src/sanity/schemas/author.ts`
- `name: string`
- `slug: slug`
- `image: image`
- `bio: text`

#### `src/sanity/schemas/tag.ts`
- `name: string`
- `slug: slug`
- `language: string` (для локалізованих тегів)

#### `src/sanity/schemas/category.ts`
- `key: string` (відповідає BLOG_CATEGORIES)
- `name: object<locale, string>` (field-level — це довідник, не документ-сторінка)

#### `src/sanity/schemas/index.ts`
- export всіх схем

### 3. Document i18n plugin

- [ ] Налаштувати `@sanity/document-internationalization` у `sanity.config.ts`
- [ ] supportedLanguages: `[{ id: 'es', title: 'Español' }, { id: 'en', ... }, { id: 'uk', ... }, { id: 'ru', ... }]`
- [ ] schemaTypes: `['post']` — тільки post документи перекладаються
- [ ] Кнопка "Translate" з'являється у студії — клон документа з усіма полями для іншої мови

### 4. Frontend integration

#### Sanity client (`src/sanity/client.ts`)
- [ ] `createClient` з config
- [ ] Helper для fetch з cache tags: `client.fetch(query, params, { next: { tags: [...] } })`
- [ ] `urlFor(image)` — Sanity image URL builder з оптимізацією

#### Запити (`src/sanity/queries.ts`)
- [ ] `POSTS_LIST_QUERY` — для `/blog` (filter by language, sort by publishedAt desc, project author/tags)
- [ ] `POST_BY_SLUG_QUERY` — для `/blog/[slug]`
- [ ] `POPULAR_POSTS_QUERY` — top by views (поки vstub: top 3)
- [ ] `LATEST_POSTS_QUERY` — last 4 by publishedAt
- [ ] `TAGS_QUERY` — для tags bar
- [ ] `CATEGORIES_QUERY` — статичний довідник (можна залишити в коді)
- [ ] `ALL_SLUGS_FOR_SITEMAP_QUERY`

#### Заміна імпортів (7 файлів)

- [ ] `src/app/sitemap.ts` — замість `BLOG_POSTS` тягне `ALL_SLUGS_FOR_SITEMAP_QUERY` (з усіма локалями)
- [ ] `src/app/[lang]/blog/page.tsx` — fetch `POSTS_LIST_QUERY` + sidebar з `POPULAR_POSTS_QUERY`/`LATEST_POSTS_QUERY`
- [ ] `src/app/[lang]/blog/[slug]/page.tsx` — fetch `POST_BY_SLUG_QUERY`, рендер Portable Text
- [ ] `src/components/sections/article-body.tsx` — переписати на `@portabletext/react` (заміна ArticleBlock[] на PortableText)
- [ ] `src/components/sections/blog-card.tsx` — оновити props (з SanityPost)
- [ ] `src/components/sections/blog-sidebar.tsx` — оновити props
- [ ] `src/components/sections/blog-tags-bar.tsx` — fetch tags динамічно

#### Типи (`src/sanity/types.ts`)
- [ ] `SanityPost`, `SanityAuthor`, `SanityTag`, `SanityImage`
- [ ] (опційно: генерувати через `sanity-codegen`, але manual швидше)

### 5. Portable Text → custom components

`@portabletext/react` рендерить блоки. Кастомізувати під поточний дизайн:

- [ ] `paragraph` → `<p>` з тими самими класами що зараз
- [ ] `h2` → `<h2>` heading
- [ ] `h3` → `<h3>` subheading
- [ ] `blockquote` як "lead"
- [ ] `note` (custom block) — callout з yellow border
- [ ] `image` — `<Image>` з `urlFor()` + alt
- [ ] `link` — `<Link>` для internal, `<a target="_blank">` для external

### 6. Webhook + revalidation

- [ ] `src/app/api/revalidate-sanity/route.ts`:
  - Verify signature через `parseBody` from `next-sanity/webhook`
  - `revalidateTag('posts')` — інвалідує `/blog` та всі `/blog/[slug]`
  - Якщо в payload є slug — додатково `revalidateTag(\`post:${slug}\`)`
- [ ] Налаштувати webhook у Sanity Manage Console (https://www.sanity.io/manage/project/l8ugmljw):
  - URL: `https://albaventanas.com/api/revalidate-sanity` (або dev tunnel для тестування)
  - Trigger: Create / Update / Delete
  - Filter: `_type == "post"`
  - Secret: `SANITY_REVALIDATE_SECRET`

### 7. Безпека на хостингу

- [ ] `/studio` route доступний тільки за Sanity Auth (Sanity сам редиректить на login)
- [ ] Виключити `/studio` з robots.txt (`Disallow: /studio`)
- [ ] Виключити `/studio/*` з sitemap
- [ ] `metadata.robots: noindex` на `/studio`
- [ ] CORS налаштувати в Sanity dashboard: дозволити origin `https://albaventanas.com` + `http://localhost:3000` для dev

### 8. SEO + контент-міграція

- [ ] У `sanity.config.ts` — preview action з посиланням на `/blog/[slug]?preview=1`
- [ ] (опційно) Draft mode у Next.js для preview неопублікованого
- [ ] Один тестовий пост у студії заповнити вручну (es/en/uk/ru)
- [ ] Видалити `src/data/blog.ts` коли всі сторінки переключились
- [ ] Зберегти `BLOG_CATEGORIES` довідник у новому файлі `src/data/blog-static.ts` (бо це UI-довідник, не контент)

### 9. QA

- [ ] `npm run typecheck` без помилок
- [ ] `npm run lint` без помилок
- [ ] `npm run build` — sitemap містить пости з Sanity
- [ ] `/uk/blog` показує пости (динамічно через GROQ)
- [ ] `/uk/blog/<slug>` показує контент з Portable Text
- [ ] `/en/blog/<slug>` показує переклад (інший документ у Sanity)
- [ ] Webhook end-to-end: змінити пост у студії → подивитись на сайт через 1-2 сек → бачити зміни
- [ ] Build на українському VPS — переконатись що Sanity API доступне з мережі сервера

### 10. Документація

- [ ] README — як зайти у студію (`/studio`), як додати нового редактора (через Sanity Manage → Members)
- [ ] CLAUDE.md update: блог тепер у Sanity, типи у `src/sanity/`, не редагувати JSON (його нема)

---

## Обсяг роботи

| Фаза | Час |
|---|---|
| 1. Studio embed + dependencies | 1 год |
| 2. Schemas (post, author, tag, category) + i18n plugin | 1 год |
| 3. Sanity client + GROQ queries | 30 хв |
| 4. Замінити імпорти у 7 файлах | 1.5 год |
| 5. Portable Text custom components | 30 хв |
| 6. Webhook + revalidation | 30 хв |
| 7. Налаштування Sanity dashboard (CORS, webhook, members) | 15 хв |
| 8. Тестовий пост + cleanup | 30 хв |
| 9. QA + docs | 30 хв |
| **Total** | **~6 годин** |

---

## Що потрібно від тебе ПЕРЕД стартом

1. **Підтвердити: embed Studio в існуючий Next.js (`/studio`)** замість окремого `studio-alba` як в офіційному гайді?
   → Рекомендую YES (один деплой замість двох).

2. **Sanity API token** — створити в https://www.sanity.io/manage/project/l8ugmljw/api → Tokens:
   - "Editor" token (для server-side fetch + revalidate webhook)
   - Назвати "alba-server"
   - Я попрошу його коли дійду до фази 4

3. **CORS origins** у Sanity Dashboard → API → CORS:
   - `http://localhost:3000` (dev)
   - `https://albaventanas.com` (prod, твій домен)
   - Можу зробити сам після того як підтвердиш точний production-домен

4. **Підтвердити шейп post-документа** — поля в TODO #2 ОК? Чи треба додати/прибрати?

5. **`views`** — залишити як manual number у Sanity, чи інтегрувати з Plausible/Umami пізніше?

6. **Tags / Categories** — чи редагуються в студії, чи лишаються hardcoded довідниками? Зараз `BLOG_TAGS` і `BLOG_CATEGORIES` — статичні константи.
   → Раджу: **tags** редагувати в студії (як документи), **categories** залишити hardcoded (це навігація сайту).

---

## План на потім (після MVP)

- Draft mode preview через `?preview=1`
- Image alt-text validation в схемі
- SEO-плагін у студії (`@sanity/seo`)
- Auto-routes для нових постів через `revalidatePath('/sitemap.xml')`
- Редактор може бачити lighthouse-скор статті
- Аналітика views з Plausible
