import { PROMPTS, type PromptId } from '../catalog'
import { DownloadIcon, FileIcon, ImageIcon } from './icons'

const SKILL_ZIP = 'spec-driven-development.zip'

interface Props {
  label: string
  downloadLabel: string
  selectedId: PromptId | null
  onSelect: (id: PromptId) => void
}

export function PromptList({ label, downloadLabel, selectedId, onSelect }: Props) {
  return (
    <nav className="prompt-list" aria-label={label}>
      {PROMPTS.map((prompt) => {
        const selected = prompt.id === selectedId
        return (
          <button
            key={prompt.id}
            type="button"
            className={selected ? 'prompt-button is-selected' : 'prompt-button'}
            aria-current={selected ? 'true' : undefined}
            onClick={() => onSelect(prompt.id)}
          >
            {prompt.kind === 'image' ? <ImageIcon /> : <FileIcon />}
            <span dir="ltr">{prompt.id}</span>
          </button>
        )
      })}
      {/* Plain file download from public/downloads; it does not select a prompt or copy anything. */}
      <a
        className="prompt-button download-button"
        href={`${import.meta.env.BASE_URL}downloads/${SKILL_ZIP}`}
        download={SKILL_ZIP}
      >
        <DownloadIcon />
        <span>{downloadLabel}</span>
      </a>
    </nav>
  )
}
