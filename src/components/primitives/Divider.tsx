import type { ReactNode } from 'react'
import { colors, monoFontFamily } from '../../styles/tokens'

export function Divider({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'danger' }) {
  const lineColor = tone === 'danger' ? colors.deleted.line : colors.sectionDivider
  const textColor = tone === 'danger' ? colors.deleted.label : colors.text.muted
  return (
    <div style={{ padding: '14px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ flex: 1, height: 1, background: lineColor }} />
      <span style={{ fontSize: 12, color: textColor }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: lineColor }} />
    </div>
  )
}

export function SystemLine({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontSize: 12.5, color: colors.text.muted, fontFamily: monoFontFamily, padding: '3px 0 3px 56px' }}>
      {children}
    </div>
  )
}

export function RedDot({ speed = 1.3 }: { speed?: number }) {
  return (
    <span
      style={{
        marginLeft: 'auto',
        width: 8,
        height: 8,
        borderRadius: 4,
        background: colors.unreadDot,
        animation: `omong-blink ${speed}s infinite`,
      }}
    />
  )
}
