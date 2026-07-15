import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { parseConf } from './src/config/parseConf'

const rootDir = fileURLToPath(new URL('.', import.meta.url))
const PLACEHOLDER_SITE_URL = 'https://example.com'

// Generates robots.txt/sitemap.xml from omongate.conf's site_url at build time, so the
// domain lives in the one place (omongate.conf) instead of being hand-copied into two
// more static files that could silently drift out of sync with it.
function seoFiles(): Plugin {
  return {
    name: 'omongate-seo-files',
    apply: 'build',
    closeBundle() {
      const confText = readFileSync(resolve(rootDir, 'omongate.conf'), 'utf-8')
      const siteUrl = parseConf(confText).site_url?.replace(/\/$/, '') || PLACEHOLDER_SITE_URL

      writeFileSync(
        resolve(rootDir, 'dist/robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      )
      writeFileSync(
        resolve(rootDir, 'dist/sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          `  <url><loc>${siteUrl}/</loc></url>\n` +
          `</urlset>\n`,
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), seoFiles()],
})
