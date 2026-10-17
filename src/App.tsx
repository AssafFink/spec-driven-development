import { useEffect, useRef, useState } from 'react'
import { LANGUAGES, PROMPTS, promptUrl, type Language, type PromptId } from './catalog'
import { copyText } from './clipboard'
import { STRINGS } from './i18n'
import { applyLanguage, readStoredLanguage, storeLanguage } from './language'
import { loadPrompt } from './promptLoader'
import { LanguageToggle } from './components/LanguageToggle'
import { PromptList } from './components/PromptList'
import { CopyToast, type CopyStatus } from './components/CopyToast'
import { PromptViewer, type PromptSource } from './components/PromptViewer'

type Sources = Record<Language, Partial<Record<PromptId, PromptSource>>>

// Keep in sync with --toast-duration in styles.css.
// The failure message is longer and explains what to do, so it stays longer.
const TOAST_DURATION_MS = { success: 3000, failure: 5000 }

export default function App() {
  const [language, setLanguage] = useState<Language>(readStoredLanguage)
  const [selectedId, setSelectedId] = useState<PromptId | null>(null)
  const [sources, setSources] = useState<Sources>({ he: {}, en: {} })
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle')
  // Incremented on every selection so a late result of an older copy attempt is ignored.
  const attemptRef = useRef(0)
  // Prompt that was clicked before its file finished loading.
  const pendingCopyRef = useRef<PromptId | null>(null)
  const viewerRef = useRef<HTMLElement | null>(null)
  const strings = STRINGS[language]

  // Preload every prompt in both languages so a click can copy the text right away.
  useEffect(() => {
    let cancelled = false
    for (const lang of LANGUAGES) {
      for (const prompt of PROMPTS) {
        loadPrompt(promptUrl(lang, prompt))
          .then((text): PromptSource => ({ status: 'ready', text }))
          .catch((): PromptSource => ({ status: 'error' }))
          .then((source) => {
            if (cancelled) return
            setSources((prev) => ({ ...prev, [lang]: { ...prev[lang], [prompt.id]: source } }))
          })
      }
    }
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    applyLanguage(language)
  }, [language])

  function startCopy(text: string, attempt: number) {
    copyText(text).then((ok) => {
      if (attempt === attemptRef.current) setCopyStatus(ok ? 'success' : 'failure')
    })
  }

  function handleSelect(id: PromptId) {
    setSelectedId(id)
    // Back to the start of the prompt, also when the same prompt is clicked again.
    viewerRef.current?.scrollTo(0, 0)
    window.scrollTo(0, 0)
    setCopyStatus('idle')
    const attempt = ++attemptRef.current
    const source = sources[language][id]
    if (source?.status === 'ready') {
      pendingCopyRef.current = null
      // No await before this call: the copy must start inside the click handler.
      startCopy(source.text, attempt)
    } else {
      pendingCopyRef.current = source?.status === 'error' ? null : id
    }
  }

  // Switching language clears the selection and never copies anything.
  function handleLanguageChange(next: Language) {
    if (next === language) return
    // Drop the result of any copy attempt that is still running.
    attemptRef.current++
    pendingCopyRef.current = null
    setLanguage(next)
    setSelectedId(null)
    setCopyStatus('idle')
    storeLanguage(next)
    window.scrollTo(0, 0)
  }

  // Copy a prompt that was selected while its file was still loading.
  // The browser may block this attempt because it no longer runs inside the click.
  useEffect(() => {
    const pendingId = pendingCopyRef.current
    if (pendingId === null || pendingId !== selectedId) return
    const source = sources[language][pendingId]
    if (source === undefined || source.status === 'loading') return
    pendingCopyRef.current = null
    if (source.status === 'ready') startCopy(source.text, attemptRef.current)
  }, [language, selectedId, sources])

  // The toast disappears on its own after a short while.
  useEffect(() => {
    if (copyStatus === 'idle') return
    const timer = window.setTimeout(() => setCopyStatus('idle'), TOAST_DURATION_MS[copyStatus])
    return () => window.clearTimeout(timer)
  }, [copyStatus])

  const source =
    selectedId === null ? null : (sources[language][selectedId] ?? { status: 'loading' })

  return (
    <div className="page">
      <header className="page-header">
        <h1>{strings.title}</h1>
        <LanguageToggle
          label={strings.languageLabel}
          language={language}
          onChange={handleLanguageChange}
        />
      </header>
      <main className="columns">
        <PromptList
          label={strings.promptListLabel}
          downloadLabel={strings.downloadSkill}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
        {/* The key resets the viewer, hiding the Markdown source again for every new prompt. */}
        <PromptViewer
          key={`${language}:${selectedId}`}
          strings={strings}
          source={source}
          scrollRef={viewerRef}
        />
      </main>
      <CopyToast strings={strings} status={copyStatus} />
    </div>
  )
}
