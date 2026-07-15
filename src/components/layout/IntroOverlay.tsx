import { useStory } from '../../context/StoryContext'
import { colors } from '../../styles/tokens'

export function IntroOverlay() {
  const { view } = useStory()
  if (!view.header.introShown) return null
  return (
    <div
      style={{
        position: 'absolute',
        inset: '48px 0 0 0',
        zIndex: 40,
        background: colors.overlay.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 13, letterSpacing: '0.04em', color: colors.text.muted }}>
        #{view.header.introLabel}
      </div>
      <div style={{ fontSize: 16, color: colors.text.bodyDim, lineHeight: 1.7 }}>
        보관된 채널입니다.
        <br />
        새 메시지를 확인하지 않는 것을 권장합니다.
      </div>
      <div style={{ marginTop: 6, fontSize: 12, color: colors.text.faintest }}>잠시 후 자동으로 입장됩니다…</div>
    </div>
  )
}

export function LockToast() {
  const { view } = useStory()
  if (!view.header.lockShown) return null
  return (
    <div
      style={{
        position: 'absolute',
        top: 60,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 40,
        background: colors.overlay.bg,
        border: `1px solid ${colors.lock.border}`,
        borderRadius: 8,
        padding: '12px 18px',
        fontSize: 14,
        color: colors.lock.text,
        boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
      }}
    >
      {view.header.lockText}
    </div>
  )
}
