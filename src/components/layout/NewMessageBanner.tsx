import { useStory } from '../../context/StoryContext'
import { colors } from '../../styles/tokens'

// Discord's "jump to present" pill: appears when a message lands in the channel the
// visitor is reading but has scrolled away from.
export function NewMessageBanner() {
  const { view, commands } = useStory()
  if (!view.messages.newMessageBannerShown) return null

  return (
    <div
      onClick={commands.jumpToLatestMessages}
      style={{
        position: 'absolute',
        bottom: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: colors.reaction.mineBg,
        border: `1px solid ${colors.reaction.mineBorder}`,
        borderRadius: 20,
        padding: '8px 16px',
        fontSize: 13,
        fontWeight: 600,
        color: colors.text.name,
        cursor: 'pointer',
        userSelect: 'none',
        boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
      }}
    >
      <span aria-hidden>⬇</span> 새 메시지가 도착했습니다
    </div>
  )
}
