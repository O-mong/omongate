import type { ReactNode } from 'react'
import type { Persona } from '../../content/personas'
import { Avatar } from '../primitives/Avatar'
import { BotBadge, EditedTag, PinnedBadge } from '../primitives/Badge'
import { colors } from '../../styles/tokens'

export interface MessageProps {
  persona: Persona
  time?: string
  pinned?: ReactNode
  edited?: boolean
  /** Archive transcripts pack messages tighter than the live channels. */
  dense?: boolean
  bodyColor?: string
  children: ReactNode
}

export function Message({ persona, time, pinned, edited, dense = false, bodyColor, children }: MessageProps) {
  return (
    <div style={{ display: 'flex', gap: 16, padding: dense ? '8px 0' : '10px 0' }}>
      <Avatar
        bg={persona.avatarBg}
        initials={persona.initials}
        image={persona.avatarImage}
        textColor={persona.avatarTextColor}
        fontSize={persona.avatarFontSize}
        ringColor={colors.main}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontWeight: 600, fontSize: 15, color: persona.nameColor ?? colors.text.name }}>
            {persona.name}
          </span>
          {persona.badge === 'BOT' && <BotBadge />}
          {pinned && <PinnedBadge>{pinned}</PinnedBadge>}
          {time && <span style={{ fontSize: 12, color: colors.text.muted }}>{time}</span>}
          {edited && <EditedTag />}
        </div>
        <div style={{ marginTop: dense ? 4 : 6, fontSize: 14.5, lineHeight: 1.65, color: bodyColor ?? colors.text.body }}>
          {children}
        </div>
      </div>
    </div>
  )
}
