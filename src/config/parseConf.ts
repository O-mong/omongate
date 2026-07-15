// Shared by src/config/mylinks.ts (browser bundle) and vite.config.ts (Node, at build time) —
// both need to read the same key=value pairs out of omongate.conf, so the parsing rule lives
// in exactly one place. Blank lines and lines starting with # are ignored. A malformed line
// (no "=") is skipped rather than crashing, since the .conf file is meant to be hand-edited.
export function parseConf(text: string): Record<string, string> {
  const entries: Record<string, string> = {}
  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    entries[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim()
  }
  return entries
}
