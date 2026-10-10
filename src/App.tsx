import { useEffect, useRef, useState } from 'react'
import { PROMPTS, promptUrl, type Language, type PromptId } from './catalog'
import { copyText } from './clipboard'
import { STRINGS } from './i18n'
import { loadPrompt } from './promptLoader'
import { LanguageToggle } from './components/LanguageToggle'
import { PromptList } from './components/PromptList'
import { CopyToast, type CopyStatus } from './components/CopyToast'
import { PromptViewer, type PromptSource } from './components/PromptViewer'

type Sources = Partial<Record<PromptId, PromptSource>>

const language: Language = 'he'
// Keep in sync with --toast-duration in styles.css.
// The failure message is longer and explains what to do, so it stays longer.
const TOAST_DURATION_MS = { success: 2000, failure: 5000 }

export default function App() {
  const [selectedId, setSelectedId] = useState<PromptId | null>(null)
  const [sources, setSources] = useState<Sources>({})
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle')
  // Incremented on every selection so a late result of an older copy attempt is ignored.
  const attemptRef = useRef(0)
  // Prompt that was clicked before its file finished loading.
  const pendingCopyRef = useRef<PromptId | null>(null)
  const strings = STRINGS[language]

  // Preload every prompt into memory so a click can copy the text right away.
  useEffect(() => {
    let cancelled = false
    for (const prompt of PROMPTS) {
      loadPrompt(promptUrl(language, prompt))
        .then((text): PromptSource => ({ status: 'ready', text }))
        .catch((): PromptSource => ({ status: 'error' }))
        .then((source) => {
          if (!cancelled) setSources((prev) => ({ ...prev, [prompt.id]: source }))
        })
    }
    return () => {
      cancelled = true
    }
  }, [])

  function startCopy(text: string, attempt: number) {
    copyText(text).then((ok) => {
      if (attempt === attemptRef.current) setCopyStatus(ok ? 'success' : 'failure')
    })
  }

  function handleSelect(id: PromptId) {
    setSelectedId(id)
    window.scrollTo(0, 0)
    setCopyStatus('idle')
    const attempt = ++attemptRef.current
    const source = sources[id]
    if (source?.status === 'ready') {
      pendingCopyRef.current = null
      // No await before this call: the copy must start inside the click handler.
      startCopy(source.text, attempt)
    } else {
      pendingCopyRef.current = source?.status === 'error' ? null : id
    }
  }

  // Copy a prompt that was selected while its file was still loading.
  // The browser may block this attempt because it no longer runs inside the click.
  useEffect(() => {
    const pendingId = pendingCopyRef.current
    if (pendingId === null || pendingId !== selectedId) return
    const source = sources[pendingId]
    if (source === undefined || source.status === 'loading') return
    pendingCopyRef.current = null
    if (source.status === 'ready') startCopy(source.text, attemptRef.current)
  }, [selectedId, sources])

  // The toast disappears on its own after a short while.
  useEffect(() => {
    if (copyStatus === 'idle') return
    const timer = window.setTimeout(() => setCopyStatus('idle'), TOAST_DURATION_MS[copyStatus])
    return () => window.clearTimeout(timer)
  }, [copyStatus])

  const source = selectedId === null ? null : (sources[selectedId] ?? { status: 'loading' })

  return (
    <div className="page">
      <header className="page-header">
        <h1>{strings.title}</h1>
        <LanguageToggle label={strings.languageLabel} />
      </header>
      <main className="columns">
        <PromptList label={strings.promptListLabel} selectedId={selectedId} onSelect={handleSelect} />
        <PromptViewer strings={strings} source={source} />
      </main>
      <CopyToast strings={strings} status={copyStatus} />
    </div>
  )
}
