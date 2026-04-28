export const locales = ['es', 'en', 'uk', 'ru'] as const
export const defaultLocale = 'es' satisfies (typeof locales)[number]

export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  uk: 'Українська',
  ru: 'Русский',
}

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value)
