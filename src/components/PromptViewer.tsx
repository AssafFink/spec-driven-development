import { useState, type RefObject } from 'react'
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
  // The scrollable panel, so the caller can jump back to the start of the prompt.
  scrollRef: RefObject<HTMLElement | null>
}

export function PromptViewer({ strings, source, scrollRef }: Props) {
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
    <section ref={scrollRef} className="viewer" aria-label={strings.viewerLabel}>
      <div className="markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{source.text}</ReactMarkdown>
      </div>
      <SourceToggle label={strings.sourceLabel} text={source.text} />
    </section>
  )
}

// Raw Markdown for manual copy. Hidden until the user clicks the link-style toggle.
function SourceToggle({ label, text }: { label: string; text: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="source">
      <button
        type="button"
        className="source-toggle"
        aria-expanded={open}
        aria-controls="prompt-source"
        onClick={() => setOpen(!open)}
      >
        {label}
      </button>
      {open && (
        <textarea id="prompt-source" aria-label={label} readOnly spellCheck={false} value={text} />
      )}
    </div>
  )
}
