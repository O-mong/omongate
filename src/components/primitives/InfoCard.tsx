import type { CSSProperties, ReactNode } from 'react'
import { colors, monoFontFamily } from '../../styles/tokens'

export interface InfoCardProps {
  icon?: ReactNode
  children: ReactNode
  fontSize?: number
  style?: CSSProperties
}

// A bordered monospace card, the recurring "system attachment" look for README previews,
// resumes, badges, payroll files, PR statuses, etc.
export function InfoCard({ icon, children, fontSize = 12.5, style }: InfoCardProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        background: colors.card.bg,
        border: `1px solid ${colors.card.border}`,
        borderRadius: 6,
        padding: '14px 16px',
        width: 'fit-content',
        ...style,
      }}
    >
      {icon && <span style={{ fontSize: 20 }}>{icon}</span>}
      <div style={{ fontFamily: monoFontFamily, fontSize, lineHeight: 1.75, color: colors.card.text, whiteSpace: 'pre' }}>
        {children}
      </div>
    </div>
  )
}

// The wider, frameless variant for the rules manual and system logs: full-width monospace
// text, no icon, allows nested annotations.
export function CodeBlock({ children, fontSize = 13 }: { children: ReactNode; fontSize?: number }) {
  return (
    <div
      style={{
        background: colors.card.bg,
        border: `1px solid ${colors.card.border}`,
        borderRadius: 6,
        padding: '16px 18px',
        fontFamily: monoFontFamily,
        fontSize,
        lineHeight: 1.9,
        color: colors.card.text,
        whiteSpace: 'pre-wrap',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  )
}

export function AttachmentChip({ name, size }: { name: string; size: string }) {
  return (
    <div
      style={{
        marginTop: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: colors.card.bg,
        border: `1px solid ${colors.card.border}`,
        borderRadius: 6,
        padding: '10px 14px',
        width: 'fit-content',
      }}
    >
      <span style={{ fontSize: 13, color: colors.text.faint, fontFamily: monoFontFamily }}>{name}</span>
      <span style={{ fontSize: 11, color: colors.text.faintest }}>{size}</span>
    </div>
  )
}

export function RuleAnnotation({ author, children }: { author: string; children: ReactNode }) {
  return (
    <div
      style={{
        margin: '6px 0 6px 18px',
        padding: '6px 10px',
        borderLeft: `2px solid ${colors.annotation.border}`,
        background: colors.annotation.bg,
        color: colors.annotation.text,
        fontStyle: 'italic',
        whiteSpace: 'pre-wrap',
      }}
    >
      <span style={{ fontStyle: 'normal', color: colors.text.muted, fontSize: 11 }}>{author}</span>
      {'\n'}
      {children}
    </div>
  )
}
