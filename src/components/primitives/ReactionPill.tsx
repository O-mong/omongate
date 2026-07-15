import type { ReactNode } from 'react'
import { colors } from '../../styles/tokens'
import { Tooltip } from './Tooltip'

export interface ReactionPillProps {
  emoji: string
  count: number
  active: boolean
  tooltipShown: boolean
  tooltipText: ReactNode
  onClick: () => void
  onHoverStart: () => void
  onHoverEnd: () => void
}

export function ReactionPill({
  emoji,
  count,
  active,
  tooltipShown,
  tooltipText,
  onClick,
  onHoverStart,
  onHoverEnd,
}: ReactionPillProps) {
  return (
    <div style={{ position: 'relative', width: 'fit-content' }}>
      <Tooltip visible={tooltipShown} icon={emoji}>
        {tooltipText}
      </Tooltip>
      <div
        onClick={onClick}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        style={{
          background: active ? colors.reaction.mineBg : colors.reaction.bg,
          border: `1px solid ${active ? colors.reaction.mineBorder : colors.reaction.border}`,
          borderRadius: 12,
          padding: '2px 8px 2px 6px',
          fontSize: 12.5,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        {emoji} <span>{count}</span>
      </div>
    </div>
  )
}
