import { useStory } from '../../context/StoryContext'
import { colors } from '../../styles/tokens'

export function MessageComposer() {
  const { view } = useStory()
  return (
    <div style={{ flexShrink: 0, padding: '0 16px 20px' }}>
      <div style={{ fontSize: 12, color: colors.text.muted, padding: '4px 2px 6px', height: 22, boxSizing: 'border-box' }}>
        {view.header.typingLine}
      </div>
      <div style={{ background: colors.input.bg, borderRadius: 8, padding: '11px 14px', fontSize: 14, color: colors.input.placeholder }}>
        {view.header.inputText}
      </div>
    </div>
  )
}
