import type { ReactNode } from 'react'
import { colors } from '../../styles/tokens'

export function BotBadge() {
  return (
    <span
      style={{
        fontSize: 10,
        background: colors.badge.bot,
        color: 'white',
        padding: '1px 5px',
        borderRadius: 3,
        fontWeight: 700,
      }}
    >
      BOT
    </span>
  )
}

export function PinnedBadge({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        fontSize: 11,
        background: colors.badge.pinned,
        color: 'white',
        padding: '1px 5px',
        borderRadius: 3,
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  )
}

/** The small italic "(편집됨)" / "(복구됨)" marker after an edited or
 *  restored message. Used both by `Message`'s own `edited` prop and by the
 *  one-off messages that need it inside a custom hover target instead. */
export function EditedTag({ children = '(편집됨)' }: { children?: ReactNode }) {
  return (
    <span style={{ fontSize: 11, color: colors.text.faintest, fontStyle: 'italic' }}>{children}</span>
  )
}
