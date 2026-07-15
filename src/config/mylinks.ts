import confText from '../../omongate.conf?raw'

// key=value lines only. Blank lines and lines starting with # are ignored. A malformed
// line (no "=") is skipped rather than crashing, since this file is meant to be hand-edited.
function parseConf(text: string): Record<string, string> {
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

const conf = parseConf(confText)

// User-editable links, read from the project root's omongate.conf at build time (?raw
// import, so this stays a plain synchronous value like SITE_CONFIG/TIMING — no loading
// state anywhere). Editing the .conf file requires a rebuild to take effect.
export const MY_LINKS = {
  githubUrl: conf.github_url ?? '',
} as const
