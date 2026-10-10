import { useEffect, useState } from 'react'
import { PROMPTS, promptUrl, type Language, type PromptId } from './catalog'
import { STRINGS } from './i18n'
import { loadPrompt } from './promptLoader'
import { LanguageToggle } from './components/LanguageToggle'
import { PromptList } from './components/PromptList'
import { PromptViewer, type PromptSource } from './components/PromptViewer'

type Sources = Partial<Record<PromptId, PromptSource>>

const language: Language = 'he'

export default function App() {
  const [selectedId, setSelectedId] = useState<PromptId | null>(null)
  const [sources, setSources] = useState<Sources>({})
  const strings = STRINGS[language]

  // Preload every prompt into memory so a click can use the text right away.
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

  function handleSelect(id: PromptId) {
    setSelectedId(id)
    window.scrollTo(0, 0)
  }

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
    </div>
  )
}
