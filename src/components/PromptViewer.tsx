import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { UiStrings } from '../i18n'
import { AlertIcon } from './icons'

export type PromptSource =
  | { status: 'loading' }
  | { status: 'ready'; text: string }
  | { status: 'error' }

interface Props {
  strings: UiStrings
  // null means no prompt is selected yet.
  source: PromptSource | null
}

export function PromptViewer({ strings, source }: Props) {
  if (source === null) {
    return (
      <section className="viewer is-message" aria-label={strings.viewerLabel}>
        <p>{strings.hint}</p>
      </section>
    )
  }
  if (source.status === 'loading') {
    return (
      <section className="viewer is-message" aria-label={strings.viewerLabel} aria-live="polite">
        <p>{strings.loading}</p>
      </section>
    )
  }
  if (source.status === 'error') {
    return (
      <section className="viewer is-message is-error" aria-label={strings.viewerLabel} role="alert">
        <AlertIcon size={40} />
        <h2>{strings.loadErrorTitle}</h2>
        <p>{strings.loadError}</p>
      </section>
    )
  }
  return (
    <section className="viewer" aria-label={strings.viewerLabel}>
      <div className="markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{source.text}</ReactMarkdown>
      </div>
      <div className="source">
        <label htmlFor="prompt-source">{strings.sourceLabel}</label>
        <textarea id="prompt-source" readOnly spellCheck={false} value={source.text} />
      </div>
    </section>
  )
}
