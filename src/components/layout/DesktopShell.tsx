import { colors, fontFamily } from '../../styles/tokens'
import { ChannelSidebar } from './ChannelSidebar'
import { ChatHeader } from './ChatHeader'
import { IntroOverlay, LockToast } from './IntroOverlay'
import { MemberList } from './MemberList'
import { MessageComposer } from './MessageComposer'
import { MessagePane } from './MessagePane'
import { ServerRail } from './ServerRail'

// The three/four-column layout: server rail, channel sidebar, chat, member list, all
// visible at once, Discord/Slack's desktop web client shape.
export function DesktopShell() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        fontFamily,
        color: colors.text.base,
        background: colors.main,
        overflow: 'hidden',
      }}
    >
      <ServerRail />
      <ChannelSidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: colors.main, minWidth: 0, position: 'relative' }}>
        <ChatHeader />
        <IntroOverlay />
        <LockToast />
        <MessagePane />
        <MessageComposer />
      </div>

      <MemberList />
    </div>
  )
}
