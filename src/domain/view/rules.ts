import { SITE_CONFIG } from '../../config/site'
import type { StoryState } from '../state'

export interface RulesViewModel {
  // Gray annotations under rules 1/3/5/7/8, each appearing only once the matching archive is read.
  noteAfterRule1: boolean
  noteAfterRule3: boolean
  noteAfterRule5: boolean
  noteAfterRule7: boolean
  noteAfterRule8: boolean
  readmeUserLines: string
  footer: string
}

// The #규칙 channel's archive-linked annotations and README/footer text: the one channel
// whose content visibly rewrites itself as the visitor reads more of the story.
export function deriveRules(state: StoryState): RulesViewModel {
  const allArchivesRead =
    state.visitedA2025 && state.visitedA2024 && state.visitedA2023 && state.visitedA2022 && state.visitedA2021
  return {
    noteAfterRule1: state.visitedA2023,
    noteAfterRule3: state.visitedA2022,
    noteAfterRule5: state.visitedA2021,
    noteAfterRule7: state.visitedA2025,
    noteAfterRule8: state.visitedA2024,
    readmeUserLines: state.endingPersisted
      ? `현재 사용자: ${SITE_CONFIG.nextApplicantName}\n이전 사용자: ${SITE_CONFIG.currentUserName}\n`
      : `현재 사용자: ${SITE_CONFIG.currentUserName}\n`,
    footer: allArchivesRead
      ? `마지막 수정: 방금 · 수정한 사람: ${SITE_CONFIG.currentUserName} · 조회 ${SITE_CONFIG.deskNumber}회`
      : `마지막 수정: 어제 오전 4시 44분 · 수정한 사람: 없음 · 조회 ${SITE_CONFIG.deskNumber}회`,
  }
}
