import type { Language } from './catalog'

export interface UiStrings {
  title: string
  hint: string
  loading: string
  loadError: string
  copySuccess: string
  copyFailure: string
  sourceLabel: string
  promptListLabel: string
  languageLabel: string
}

export const STRINGS: Record<Language, UiStrings> = {
  he: {
    title: 'פרומפטים עבור פיתוח מונחה מפרט',
    hint: 'בחר פרומפט מהרשימה כדי להציג ולהעתיק אותו.',
    loading: 'טוען…',
    loadError: 'לא ניתן לטעון את קובץ הפרומפט.',
    copySuccess: 'הפרומפט הועתק בהצלחה ל-Clipboard',
    copyFailure:
      'ההעתקה האוטומטית נכשלה. אפשר לסמן את הטקסט בתיבת המקור שבתחתית האזור ולהעתיק ידנית (Ctrl+C).',
    sourceLabel: 'מקור Markdown להעתקה ידנית',
    promptListLabel: 'רשימת הפרומפטים',
    languageLabel: 'בחירת שפה',
  },
}
