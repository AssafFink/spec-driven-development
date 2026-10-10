import type { Language } from './catalog'

export interface UiStrings {
  title: string
  hint: string
  loading: string
  loadError: string
  promptListLabel: string
  languageLabel: string
}

export const STRINGS: Record<Language, UiStrings> = {
  he: {
    title: 'פרומפטים עבור פיתוח מונחה מפרט',
    hint: 'בחר פרומפט מהרשימה כדי להציג ולהעתיק אותו.',
    loading: 'טוען…',
    loadError: 'לא ניתן לטעון את קובץ הפרומפט.',
    promptListLabel: 'רשימת הפרומפטים',
    languageLabel: 'בחירת שפה',
  },
}
