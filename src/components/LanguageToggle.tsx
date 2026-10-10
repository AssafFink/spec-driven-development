import type { Language } from '../catalog'
import { IsraelFlag, UsFlag } from './icons'

interface Props {
  label: string
  language: Language
  onChange: (language: Language) => void
}

// The two captions and their order never change; only the highlight moves.
export function LanguageToggle({ label, language, onChange }: Props) {
  return (
    <div className="language-toggle" role="group" aria-label={label}>
      <button
        type="button"
        className={language === 'he' ? 'language-button is-active' : 'language-button'}
        aria-pressed={language === 'he'}
        lang="he"
        onClick={() => onChange('he')}
      >
        <IsraelFlag /> עברית
      </button>
      <button
        type="button"
        className={language === 'en' ? 'language-button is-active' : 'language-button'}
        aria-pressed={language === 'en'}
        lang="en"
        onClick={() => onChange('en')}
      >
        <UsFlag /> English
      </button>
    </div>
  )
}
