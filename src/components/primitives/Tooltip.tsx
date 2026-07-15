import type { ReactNode } from 'react'
import { colors, monoFontFamily } from '../../styles/tokens'

export interface TooltipProps {
  visible: boolean
  placement?: 'above' | 'below'
  /** An emoji/icon tooltip (reactions) renders larger, sans-serif; a plain
   *  info tooltip (profile card, edit history) renders as monospace. */
  icon?: ReactNode
  align?: 'left' | 'right'
  children: ReactNode
}

export function Tooltip({ visible, placement = 'above', icon, align = 'left', children }: TooltipProps) {
  if (!visible) return null
  const position =
    placement === 'above' ? { bottom: 'calc(100% + 8px)' } : { top: 'calc(100% + 6px)' }
  const horizontal = align === 'left' ? { left: -4 } : { right: -4 }

  return (
    <div
      style={{
        position: 'absolute',
        ...position,
        ...horizontal,
        background: colors.tooltip.bg,
        border: `1px solid ${colors.tooltip.border}`,
        borderRadius: 8,
        padding: '10px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: icon ? 10 : 0,
        width: 'max-content',
        maxWidth: 300,
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        zIndex: 10,
        fontFamily: icon ? undefined : monoFontFamily,
      }}
    >
      {icon && <span style={{ fontSize: 26 }}>{icon}</span>}
      <span
        style={{
          fontSize: icon ? 13 : 12,
          color: colors.text.body,
          lineHeight: icon ? 1.5 : 1.7,
        }}
      >
        {children}
      </span>
    </div>
  )
}
