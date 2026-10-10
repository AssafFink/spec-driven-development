import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  // GitHub Pages serves the site under the repository name. The build and its
  // local preview use that path; the dev server stays at "/".
  base: command === 'build' || isPreview ? '/spec-driven-development-prompter/' : '/',
}))
