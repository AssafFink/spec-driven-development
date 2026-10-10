import type { UiStrings } from '../i18n'
import { AlertIcon, CheckIcon } from './icons'

export type CopyStatus = 'idle' | 'success' | 'failure'

interface Props {
  strings: UiStrings
  status: CopyStatus
}

// Pop-up message at the bottom of the page, under the prompt buttons column.
export function CopyToast({ strings, status }: Props) {
  return (
    // The live region stays mounted so screen readers announce the copy result.
    <div className="toast-area" role="status" aria-live="polite">
      {status !== 'idle' && (
        <div className={`toast is-${status}`}>
          {status === 'success' ? <CheckIcon /> : <AlertIcon />}
          <span>{status === 'success' ? strings.copySuccess : strings.copyFailure}</span>
        </div>
      )}
    </div>
  )
}
