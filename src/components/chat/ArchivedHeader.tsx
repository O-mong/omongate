import { colors } from '../../styles/tokens'

// The centered "— 이 채널은 …에 보관되었습니다 —" caption every archive channel opens with.
export function ArchivedHeader({ children }: { children: string }) {
  return (
    <div style={{ textAlign: 'center', fontSize: 12, color: colors.text.faintest, padding: '6px 0 14px' }}>
      {children}
    </div>
  )
}
