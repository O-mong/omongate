import type { ReactNode } from 'react'
import { SITE_CONFIG } from '../../config/site'
import { HR_BOT, KIM_DOYUN } from '../../content/personas'
import { useStory } from '../../context/StoryContext'
import { colors } from '../../styles/tokens'
import { Avatar } from '../primitives/Avatar'
import { SectionLabel } from './SectionLabel'

function MemberRow({
  name,
  sub,
  avatarBg,
  initials,
  image,
  avatarTextColor,
  statusColor,
  dim,
  nameColor,
  subColor,
  fontSize,
}: {
  name: ReactNode
  sub?: string
  avatarBg: string
  initials?: string
  image?: string
  avatarTextColor?: string
  statusColor: string
  dim?: boolean
  nameColor?: string
  subColor?: string
  fontSize?: number
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 8px', borderRadius: 4, opacity: dim ? 0.45 : 1 }}>
      <Avatar
        bg={avatarBg}
        initials={initials}
        image={image}
        textColor={avatarTextColor}
        size={32}
        fontSize={fontSize ?? 12}
        statusColor={statusColor}
        ringColor={colors.sidebar}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: 14, color: nameColor ?? colors.text.body }}>{name}</span>
        {sub && <span style={{ fontSize: 11, color: subColor ?? colors.text.muted }}>{sub}</span>}
      </div>
    </div>
  )
}

export interface MemberListProps {
  width?: number | string // mobile drawer fills its own width instead of the fixed desktop rail's
  bordered?: boolean // mobile drawer usage has nothing to its right to border against
}

export function MemberList({ width = 216, bordered = true }: MemberListProps) {
  const { state, view } = useStory()
  const { ending } = view

  return (
    <div
      style={{
        width,
        height: '100%',
        flexShrink: 0,
        background: colors.sidebar,
        borderLeft: bordered ? `1px solid ${colors.divider}` : undefined,
        padding: '16px 8px',
        overflowY: 'auto',
        boxSizing: 'border-box',
      }}
    >
      <SectionLabel style={{ padding: '0 8px 6px' }}>온라인 — {ending.onlineCount}</SectionLabel>
      <MemberRow
        name={HR_BOT.name}
        avatarBg={HR_BOT.avatarBg}
        initials={HR_BOT.initials}
        image={HR_BOT.avatarImage}
        statusColor={colors.status.online}
      />
      <MemberRow
        name={
          <>
            {SITE_CONFIG.currentUserName} <span style={{ fontSize: 11, color: colors.text.muted }}>(당신)</span>
          </>
        }
        avatarBg={colors.avatar.currentUser}
        statusColor={colors.status.online}
      />
      {state.a2025MemberFlash && (
        <MemberRow
          name={
            <>
              {KIM_DOYUN.name} <span style={{ fontSize: 11, color: colors.text.muted }}>· 8층</span>
            </>
          }
          avatarBg={KIM_DOYUN.avatarBg}
          initials={KIM_DOYUN.initials}
          image={KIM_DOYUN.avatarImage}
          fontSize={KIM_DOYUN.avatarFontSize}
          statusColor={colors.status.online}
        />
      )}
      {state.newApplicantFlash && (
        <MemberRow
          name={SITE_CONFIG.nextApplicantName}
          sub="다음 주 월요일 출근"
          avatarBg={colors.avatar.newApplicant}
          statusColor={colors.status.online}
        />
      )}

      <SectionLabel style={{ padding: '16px 8px 6px' }}>자리 비움 — {ending.awayCountLabel}</SectionLabel>
      {ending.exManagerAway && (
        <MemberRow
          name={SITE_CONFIG.unknownUserName}
          sub="퇴사함 · 회의 중"
          avatarBg={colors.avatar.unknownArchive}
          initials="?"
          avatarTextColor={colors.text.unknown}
          nameColor={colors.text.unknownName}
          subColor={colors.text.unknownDim}
          statusColor={colors.status.awayEx}
          fontSize={13}
        />
      )}
      {ending.awayMembers.map((m) => (
        <MemberRow
          key={m}
          name={m}
          avatarBg={colors.avatar.idlePlaceholder}
          statusColor={colors.status.awayIdle}
          nameColor={colors.text.awayIdleName}
          dim
        />
      ))}
      <div style={{ padding: '8px 8px 0', fontSize: 12, color: colors.text.faintest }}>
        + 239명 · 2019년 3월부터 자리 비움
      </div>
    </div>
  )
}
