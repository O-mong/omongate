import type { CSSProperties, ReactNode } from 'react'
import { colors } from '../../styles/tokens'

export function SectionLabel({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        padding: '16px 8px 4px 16px',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.03em',
        color: colors.text.muted,
        textTransform: 'uppercase',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
