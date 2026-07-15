import confText from '../../omongate.conf?raw'

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

export const MY_LINKS = {
  githubUrl: conf.github_url ?? '',
} as const
