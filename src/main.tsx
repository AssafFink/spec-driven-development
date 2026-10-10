import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/heebo/400.css'
import '@fontsource/heebo/500.css'
import '@fontsource/heebo/600.css'
import '@fontsource/heebo/700.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import './styles.css'
import App from './App'
import { applyLanguage, readStoredLanguage } from './language'

// Apply the saved language before the first paint to avoid a layout flip.
applyLanguage(readStoredLanguage())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
