import { SITE_CONFIG } from '../../config/site'
import { AWAY_MEMBERS } from '../../content/channelMeta'
import type { StoryState } from '../state'

export type SidebarStatusTone = 'typing' | 'settled' | 'confirmed' | 'active'

export interface EndingViewModel {
  memberCountLabel: string
  onlineCount: number
  sidebarUserStatus: string
  sidebarStatusTone: SidebarStatusTone
  endingReached: boolean // gates the notice channel's post-hire message and the ex-manager's away entry
  exManagerAway: boolean
  applyPreviewShown: boolean
  newYouPreviewShown: boolean
  newYouPreviewText: string
  vacancyHoverText: string
  unlimitedLeaveHoverText: string // appears on #공지사항's leave line once archive-2024 shows what "0건" means
  awayCountLabel: string
  awayMembers: readonly string[]
}

export function deriveEnding(state: StoryState): EndingViewModel {
  const settled = state.replacementComplete || state.endingPersisted

  let sidebarUserStatus: string
  let sidebarStatusTone: SidebarStatusTone
  if (state.sidebarTyping) {
    sidebarUserStatus = '입력 중…'
    sidebarStatusTone = 'typing'
  } else if (settled) {
    sidebarUserStatus = `${SITE_CONFIG.deskNumber}번 자리`
    sidebarStatusTone = 'settled'
  } else if (state.visitedA2021) {
    sidebarUserStatus = '확인됨'
    sidebarStatusTone = 'confirmed'
  } else {
    sidebarUserStatus = '재직 중'
    sidebarStatusTone = 'active'
  }

  return {
    memberCountLabel: state.memberCountFlash
      ? `멤버 ${SITE_CONFIG.deskNumber + 1}명`
      : `멤버 ${SITE_CONFIG.deskNumber}명`,
    onlineCount: (state.memberCountFlash ? 3 : 2) + (state.a2025MemberFlash ? 1 : 0),
    sidebarUserStatus,
    sidebarStatusTone,
    endingReached: state.endingPersisted,
    exManagerAway: state.endingPersisted,
    applyPreviewShown: state.endingPersisted,
    newYouPreviewShown: state.newApplicantPreviewShown,
    newYouPreviewText: state.newYouPreview2
      ? `${SITE_CONFIG.currentUserName}: 처음엔 다 그래요.`
      : `${SITE_CONFIG.currentUserName}: 여기 좀 이상하지 않아요?`,
    vacancyHoverText: state.endingPersisted
      ? `현재 담당자: ${SITE_CONFIG.currentUserName} · 다음 담당자: 확인 중`
      : '',
    unlimitedLeaveHoverText: state.visitedA2024 ? `승인 ${SITE_CONFIG.deskNumber}건 · 신청 0건` : '',
    awayCountLabel: state.endingPersisted ? String(SITE_CONFIG.deskNumber - 1) : String(SITE_CONFIG.deskNumber - 2),
    awayMembers: AWAY_MEMBERS,
  }
}
