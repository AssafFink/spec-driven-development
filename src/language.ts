import type { Language } from './catalog'
import { STRINGS } from './i18n'

const STORAGE_KEY = 'sdd-prompts-language'

// Falls back to Hebrew when nothing valid is stored or storage is blocked.
export function readStoredLanguage(): Language {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'he'
  } catch {
    return 'he'
  }
}

export function storeLanguage(language: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, language)
  } catch {
    // Storage is blocked; the site keeps working without remembering the choice.
  }
}

export function applyLanguage(language: Language): void {
  document.documentElement.lang = language
  document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr'
  document.title = STRINGS[language].title
}
