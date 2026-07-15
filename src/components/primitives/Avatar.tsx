import type { CSSProperties } from 'react'
import { colors } from '../../styles/tokens'

export interface AvatarProps {
  bg: string
  initials?: string
  image?: string // photo URL; when set, renders instead of the initials-on-color-background look
  textColor?: string
  size?: number
  fontSize?: number
  statusColor?: string // presence dot color; omitted means no dot
  ringColor?: string // status dot's border color, must match the surface the avatar sits on
}

export function Avatar({
  bg,
  initials,
  image,
  textColor = 'inherit',
  size = 40,
  fontSize,
  statusColor,
  ringColor = colors.sidebar,
}: AvatarProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
    borderRadius: size / 2,
    background: bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: fontSize ?? (size >= 40 ? 15 : 12),
    color: textColor,
    overflow: 'hidden',
  }

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <div style={style}>
        {image ? (
          <img src={image} alt="" width={size} height={size} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          initials
        )}
      </div>
      {statusColor && (
        <div
          style={{
            position: 'absolute',
            right: -2,
            bottom: -2,
            width: 12,
            height: 12,
            borderRadius: 6,
            background: statusColor,
            border: `3px solid ${ringColor}`,
          }}
        />
      )}
    </div>
  )
}
