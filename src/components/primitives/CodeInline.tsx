import type { ReactNode } from 'react'
import { colors, monoFontFamily } from '../../styles/tokens'

export function CodeInline({ children, fontSize = 12.5 }: { children: ReactNode; fontSize?: number }) {
  return (
    <code
      style={{
        background: colors.code,
        padding: '1px 5px',
        borderRadius: 3,
        fontFamily: monoFontFamily,
        fontSize,
      }}
    >
      {children}
    </code>
  )
}
