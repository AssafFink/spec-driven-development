import { IsraelFlag, UsFlag } from './icons'

interface Props {
  label: string
}

// Language switching is implemented in Milestone 3; until then English is shown but disabled.
export function LanguageToggle({ label }: Props) {
  return (
    <div className="language-toggle" role="group" aria-label={label}>
      <button type="button" className="language-button is-active" aria-pressed="true" lang="he">
        <IsraelFlag /> עברית
      </button>
      <button type="button" className="language-button" aria-pressed="false" lang="en" disabled>
        <UsFlag /> English
      </button>
    </div>
  )
}
