import type { Language } from './catalog'

export interface UiStrings {
  title: string
  hint: string
  loading: string
  loadErrorTitle: string
  loadError: string
  copySuccess: string
  copyFailure: string
  sourceLabel: string
  promptListLabel: string
  viewerLabel: string
  languageLabel: string
}

export const STRINGS: Record<Language, UiStrings> = {
  he: {
    title: 'פרומפטר לפיתוח מונחה מפרט',
    hint: 'בחר פרומפט מהרשימה כדי להציג ולהעתיק אותו.',
    loading: 'טוען…',
    loadErrorTitle: 'שגיאה',
    loadError: 'לא ניתן לטעון את קובץ הפרומפט.',
    copySuccess: 'הפרומפט הועתק בהצלחה ל-Clipboard',
    copyFailure:
      'ההעתקה האוטומטית נכשלה. לחץ על „מקור Markdown להעתקה ידנית” בתחתית האזור, סמן את הטקסט והעתק ידנית (Ctrl+C).',
    sourceLabel: 'מקור Markdown להעתקה ידנית',
    promptListLabel: 'רשימת הפרומפטים',
    viewerLabel: 'תצוגת הפרומפט',
    languageLabel: 'בחירת שפה',
  },
  en: {
    title: 'Spec-Driven Development Prompter',
    hint: 'Select a prompt from the list to view and copy it.',
    loading: 'Loading…',
    loadErrorTitle: 'Error',
    loadError: 'Prompt file could not be loaded.',
    copySuccess: 'Prompt copied to Clipboard successfully',
    copyFailure:
      'Automatic copy failed. Click “Markdown source for manual copy” at the bottom of the panel, select the text and copy it manually (Ctrl+C).',
    sourceLabel: 'Markdown source for manual copy',
    promptListLabel: 'Prompt list',
    viewerLabel: 'Prompt view',
    languageLabel: 'Language',
  },
}
