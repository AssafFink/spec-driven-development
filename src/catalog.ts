export const LANGUAGES = ['he', 'en'] as const
export type Language = (typeof LANGUAGES)[number]

export const PROMPTS = [
  { id: 'PRD.md', kind: 'doc', file: 'prd-prompt.md' },
  { id: 'ARCHITECTURE.md', kind: 'doc', file: 'architecture-prompt.md' },
  { id: 'wireframes.png', kind: 'image', file: 'wireframes-prompt.md' },
  { id: 'style-guide.png', kind: 'image', file: 'style-guide-prompt.md' },
  { id: 'mockups.png', kind: 'image', file: 'mockups-prompt.md' },
  { id: 'DESIGN.md', kind: 'doc', file: 'design-prompt.md' },
  { id: 'MILESTONES.md', kind: 'doc', file: 'milestones-prompt.md' },
] as const

// The id doubles as the button label; it is identical in every language.
export type Prompt = (typeof PROMPTS)[number]
export type PromptId = Prompt['id']

// Labels ending in .png still map to Markdown files.
export function promptUrl(language: Language, prompt: Prompt): string {
  return `${import.meta.env.BASE_URL}prompts/${language}/${prompt.file}`
}
