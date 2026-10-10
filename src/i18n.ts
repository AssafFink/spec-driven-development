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
  en: {
    title: 'Spec-Driven Development Prompts',
    hint: 'Select a prompt from the list to view and copy it.',
    loading: 'Loading…',
    loadError: 'Prompt file could not be loaded.',
    copySuccess: 'Prompt copied to Clipboard successfully',
    copyFailure:
      'Automatic copy failed. Select the text in the source box at the bottom of the panel and copy it manually (Ctrl+C).',
    sourceLabel: 'Markdown source for manual copy',
    promptListLabel: 'Prompt list',
    languageLabel: 'Language',
  },
}
