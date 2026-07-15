import type { ReactNode } from 'react'
import { MY_LINKS } from '../../config/mylinks'
import { colors } from '../../styles/tokens'

// One 48px rail slot: the server logo, or a placeholder icon below it. Plain block by
// default; pass href to make this one slot a link without every other slot caring about links.
function RailIcon({ bg, circle = false, href, children }: { bg: string; circle?: boolean; href?: string; children?: ReactNode }) {
  const style = {
    width: 48,
    height: 48,
    borderRadius: circle ? 24 : 16,
    background: bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 26,
    color: colors.serverRail.logoText,
    overflow: 'hidden',
  } as const

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={style}>
        {children}
      </a>
    )
  }
  return <div style={style}>{children}</div>
}

// The leftmost server icon rail. Purely decorative chrome, no state, zero props.
export function ServerRail() {
  return (
    <div
      style={{
        width: 72,
        flexShrink: 0,
        background: colors.rail,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '12px 0',
        gap: 8
      }}
    >
      <RailIcon bg={colors.serverRail.logoBg}>Om</RailIcon>
      <div style={{ width: 32, height: 2, background: colors.subtleDivider, borderRadius: 2, margin: '2px 0' }} />
      <RailIcon bg={colors.serverRail.logoOut} circle href={MY_LINKS.githubUrl}>
        <img src="/github/GitHub_Invertocat_White.svg" width='48'/>
      </RailIcon>
      <RailIcon bg={colors.serverRail.placeholderIcon} circle />
      <RailIcon bg={colors.serverRail.placeholderIcon} circle />
    </div>
  )
}
