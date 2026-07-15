import confText from '../../omongate.conf?raw'
import { parseConf } from './parseConf'

const conf = parseConf(confText)

// User-editable links, read from the project root's omongate.conf at build time (?raw
// import, so this stays a plain synchronous value like SITE_CONFIG/TIMING — no loading
// state anywhere). Editing the .conf file requires a rebuild to take effect.
export const MY_LINKS = {
  githubUrl: conf.github_url ?? '',
  // The deployed site's own URL (no trailing slash) — used for robots.txt/sitemap.xml,
  // see vite.config.ts. Also handy for building absolute links to yourself.
  siteUrl: (conf.site_url ?? '').replace(/\/$/, ''),
} as const
