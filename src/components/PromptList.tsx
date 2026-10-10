import { PROMPTS, type PromptId } from '../catalog'
import { FileIcon, ImageIcon } from './icons'

interface Props {
  label: string
  selectedId: PromptId | null
  onSelect: (id: PromptId) => void
}

export function PromptList({ label, selectedId, onSelect }: Props) {
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
    </nav>
  )
}
