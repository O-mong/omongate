import type { ReactNode } from 'react'
import { SITE_CONFIG } from '../../config/site'
import type { ChannelNavItem, NavAction } from '../../domain/view'
import { useStory } from '../../context/StoryContext'
import type { StoryCommands } from '../../hooks/useStoryEngine'
import { colors } from '../../styles/tokens'
import { Avatar } from '../primitives/Avatar'
import { RedDot } from '../primitives/Divider'
import { SectionLabel } from './SectionLabel'

// Maps a nav item's declared intent (domain/view/nav.ts) to the actual command call,
// the one place that has to know both vocabularies.
function runNavAction(action: NavAction, commands: StoryCommands): void {
  switch (action.kind) {
    case 'navigate':
      if (action.target === 'notice') commands.goNotice()
      else if (action.target === 'apply') commands.goApply()
      else commands.goCompletedArchive()
      return
    case 'rules':
      commands.goRules()
      return
    case 'archive':
      if (action.target === 'a2025') commands.goA2025()
      else if (action.target === 'a2024') commands.goA2024()
      else if (action.target === 'a2023') commands.goA2023()
      else if (action.target === 'a2022') commands.goA2022()
      else if (action.target === 'a2021') commands.goA2021()
      else commands.goYou()
      return
    case 'locked':
      commands.goYou()
      return
  }
}

function NavRow({
  item,
  active,
  commands,
  onSelect,
}: {
  item: ChannelNavItem
  active: boolean
  commands: StoryCommands
  /** Mobile only: collapse the full-screen channel list back to the chat
   *  view once a row is tapped. */
  onSelect?: () => void
}) {
  const color = active ? colors.tabActiveText : item.faded ? colors.text.faintest : colors.tabInactiveText
  const isArchiveStyle = item.action.kind === 'archive' || item.action.kind === 'locked'
  return (
    <div
      title={item.hoverText || undefined}
      onClick={() => {
        runNavAction(item.action, commands)
        onSelect?.()
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 8px',
        borderRadius: 4,
        background: active ? colors.tabActiveBg : 'transparent',
        color,
        fontSize: 14,
        fontWeight: active ? 500 : 400,
        cursor: 'pointer',
      }}
    >
      <span style={{ opacity: isArchiveStyle ? 0.4 : 0.6 }}>#</span> {item.label}
      {item.dotVisible && <RedDot speed={item.dotSpeed} />}
    </div>
  )
}

function PreviewLine({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        padding: '0 8px 4px 30px',
        fontSize: 11,
        color: colors.text.muted,
        lineHeight: 1.4,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </div>
  )
}

export interface ChannelSidebarProps {
  fullScreen?: boolean // mobile only: fills its container instead of the fixed desktop rail width
  onNavigate?: () => void
}

export function ChannelSidebar({ fullScreen = false, onNavigate }: ChannelSidebarProps) {
  const { view, commands } = useStory()
  const { nav, ending } = view

  return (
    <div
      style={{
        width: fullScreen ? '100%' : 232,
        height: fullScreen ? '100%' : undefined,
        flexShrink: 0,
        background: colors.sidebar,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: 16, borderBottom: `1px solid ${colors.divider}` }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: colors.text.name }}>{SITE_CONFIG.serverName}</div>
        <div style={{ fontSize: 11, color: colors.text.muted, marginTop: 3 }}>
          {ending.memberCountLabel} · 빈자리 {SITE_CONFIG.vacancyCount}개
        </div>
      </div>

      <SectionLabel>채용 안내</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '0 8px', gap: 1 }}>
        {nav.recruiting.map((item) => (
          <div key={item.key}>
            <NavRow item={item} active={nav.activeChannel === item.activeWhen} commands={commands} onSelect={onNavigate} />
            {item.key === 'apply' && ending.applyPreviewShown && (
              <PreviewLine>{SITE_CONFIG.nextApplicantName}: 안녕하세요, 이력서 첨부합니다!</PreviewLine>
            )}
          </div>
        ))}
      </div>

      <SectionLabel>보관됨</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '0 8px', gap: 1 }}>
        {nav.archived.map((item) => (
          <div key={item.key}>
            <NavRow item={item} active={nav.activeChannel === item.activeWhen} commands={commands} onSelect={onNavigate} />
            {item.key === 'you' && nav.youPreviewKind === 'prev' && (
              <PreviewLine>{SITE_CONFIG.unknownUserName}: 미안해요.</PreviewLine>
            )}
            {item.key === 'you' && nav.youPreviewKind === 'new' && (
              <PreviewLine>{ending.newYouPreviewText}</PreviewLine>
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 'auto',
          padding: '10px 12px',
          background: colors.rail,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Avatar bg={colors.avatar.currentUser} size={32} statusColor={colors.status.online} ringColor={colors.rail} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: colors.text.name }}>{SITE_CONFIG.currentUserName}</span>
          <span style={{ fontSize: 11, color: colors.tone[ending.sidebarStatusTone] }}>
            {ending.sidebarUserStatus}
          </span>
        </div>
      </div>
    </div>
  )
}
