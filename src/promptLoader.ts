// Fetches one prompt file and returns its text exactly as stored.
export async function loadPrompt(url: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status}`)
  }
  // The Vite dev server answers a missing file with index.html and status 200.
  const contentType = response.headers.get('content-type') ?? ''
  if (contentType.includes('text/html')) {
    throw new Error(`Prompt file not found: ${url}`)
  }
  return response.text()
}
