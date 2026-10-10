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
      <section className="viewer is-message">
        <p>{strings.hint}</p>
      </section>
    )
  }
  if (source.status === 'loading') {
    return (
      <section className="viewer is-message" aria-live="polite">
        <p>{strings.loading}</p>
      </section>
    )
  }
  if (source.status === 'error') {
    return (
      <section className="viewer is-message is-error" role="alert">
        <AlertIcon />
        <p>{strings.loadError}</p>
      </section>
    )
  }
  return (
    <section className="viewer markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{source.text}</ReactMarkdown>
    </section>
  )
}
