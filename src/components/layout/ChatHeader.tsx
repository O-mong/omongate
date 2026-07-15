import { useStory } from '../../context/StoryContext'
import { colors } from '../../styles/tokens'

const iconButtonStyle = {
  flexShrink: 0,
  background: 'transparent',
  border: 'none',
  color: colors.text.muted,
  fontSize: 20,
  lineHeight: 1,
  padding: 4,
  cursor: 'pointer',
} as const

export interface ChatHeaderProps {
  onBack?: () => void // mobile shell only, collapses the chat view back to the channel list
  onToggleMembers?: () => void // mobile shell only, opens the member list as a drawer
}

export function ChatHeader({ onBack, onToggleMembers }: ChatHeaderProps) {
  const { view } = useStory()
  const { header } = view
  return (
    <div
      style={{
        height: 48,
        flexShrink: 0,
        borderBottom: `1px solid ${colors.divider}`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: 8,
        boxShadow: '0 1px 0 rgba(0,0,0,0.15)',
      }}
    >
      {onBack && (
        <button onClick={onBack} aria-label="채널 목록으로" style={iconButtonStyle}>
          ‹
        </button>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, flex: 1, fontWeight: 600, fontSize: 15 }}>
        <span style={{ opacity: 0.5, flexShrink: 0 }}>#</span>
        <span style={{ flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {header.headerLabel}
        </span>
        <span
          style={{
            fontWeight: 400,
            fontSize: 13,
            color: colors.text.muted,
            borderLeft: `1px solid ${colors.subtleDivider}`,
            paddingLeft: 12,
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {header.headerTopic}
        </span>
      </div>
      {onToggleMembers && (
        <button onClick={onToggleMembers} aria-label="멤버 목록" style={iconButtonStyle}>
          ☰
        </button>
      )}
    </div>
  )
}
