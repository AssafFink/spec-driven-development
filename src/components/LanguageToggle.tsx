import type { ReactNode } from 'react'
import type { Language } from '../catalog'
import { IsraelFlag, UsFlag } from './icons'

interface Props {
  label: string
  language: Language
  onChange: (language: Language) => void
}

const BUTTONS: Record<Language, ReactNode> = {
  he: (
    <>
      <IsraelFlag /> עברית
    </>
  ),
  en: (
    <>
      <UsFlag /> English
    </>
  ),
}

// The captions never change. The Hebrew button always sits to the right of the
// English one, so the render order follows the reading direction of the page;
// this keeps the Tab order identical to the visual order.
export function LanguageToggle({ label, language, onChange }: Props) {
  const order: Language[] = language === 'he' ? ['he', 'en'] : ['en', 'he']
  return (
    <div className="language-toggle" role="group" aria-label={label}>
      {order.map((lang) => (
        <button
          key={lang}
          type="button"
          className={lang === language ? 'language-button is-active' : 'language-button'}
          aria-pressed={lang === language}
          lang={lang}
          onClick={() => onChange(lang)}
        >
          {BUTTONS[lang]}
        </button>
      ))}
    </div>
  )
}
