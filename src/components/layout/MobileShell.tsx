import { useState } from 'react'
import { colors, fontFamily } from '../../styles/tokens'
import { ChannelSidebar } from './ChannelSidebar'
import { ChatHeader } from './ChatHeader'
import { IntroOverlay, LockToast } from './IntroOverlay'
import { MemberList } from './MemberList'
import { MessageComposer } from './MessageComposer'
import { MessagePane } from './MessagePane'

type MobilePanel = 'sidebar' | 'chat'

// Single-pane Discord/Slack-style mobile layout: channel list and chat each take the full
// screen, tapping a channel slides from one to the other. No room for a third column, so
// the member list opens as an overlay drawer instead.
//
// panel/membersOpen are plain UI state, not narrative state: they don't affect the story,
// don't need to persist, and reset naturally whenever this shell (re)mounts.
export function MobileShell() {
  const [panel, setPanel] = useState<MobilePanel>('sidebar')
  const [membersOpen, setMembersOpen] = useState(false)

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        fontFamily,
        color: colors.text.base,
        background: colors.main,
      }}
    >
      {panel === 'sidebar' ? (
        <ChannelSidebar fullScreen onNavigate={() => setPanel('chat')} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
          <ChatHeader
            onBack={() => {
              setPanel('sidebar')
              setMembersOpen(false)
            }}
            onToggleMembers={() => setMembersOpen(true)}
          />
          <IntroOverlay />
          <LockToast />
          <MessagePane padding="16px 12px 10px" />
          <MessageComposer />
        </div>
      )}

      {membersOpen && (
        <>
          <div
            onClick={() => setMembersOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50 }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '78vw',
              maxWidth: 300,
              zIndex: 51,
              boxShadow: '-8px 0 24px rgba(0,0,0,0.45)',
            }}
          >
            <MemberList width="100%" bordered={false} />
          </div>
        </>
      )}
    </div>
  )
}
