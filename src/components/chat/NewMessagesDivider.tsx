import { colors } from '../../styles/tokens'

// Discord's inline "New Messages" line, marking where unread content begins in the transcript.
// Gated on view.messages.newMessageBannerShown, the same flag that drives the jump-to-present
// banner, so it disappears once the visitor actually reads down to it.
export function NewMessagesDivider() {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', margin: '10px 0' }}>
      <div style={{ flex: 1, height: 1, background: colors.unreadDot }} />
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 0.4,
          color: colors.unreadDot,
          background: colors.main,
          padding: '1px 6px 1px 8px',
        }}
      >
        새 메시지
      </span>
    </div>
  )
}
