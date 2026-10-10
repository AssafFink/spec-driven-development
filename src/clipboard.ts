// Resolves to true only when the browser confirms the text was written.
// writeText is called synchronously so the click's user activation still applies.
export function copyText(text: string): Promise<boolean> {
  try {
    return navigator.clipboard.writeText(text).then(
      () => true,
      () => false,
    )
  } catch {
    // navigator.clipboard is missing (e.g. insecure context) or threw synchronously.
    return Promise.resolve(false)
  }
}
