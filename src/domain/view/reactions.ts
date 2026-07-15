import { SITE_CONFIG } from '../../config/site'
import { OH_SEJIN, PARK_SEOYEON, YOON_TAEHO } from '../../content/personas'
import type { HoverKey, StoryState } from '../state'

export interface ReactionViewModel {
  active: boolean
  count: number
  tooltipShown: boolean
  tooltipText: string
}

export interface ReactionsViewModel {
  fear: ReactionViewModel
  eyes: ReactionViewModel
  umbrella: ReactionViewModel
  a2023: ReactionViewModel
  a2022: ReactionViewModel
}

const isHovered = (state: StoryState, key: HoverKey) => state.hovered === key

// Emoji reactions across #공지사항 (fear, eyes), #지원서제출 (umbrella), archive-2023
// (👋 퇴근 인사), and archive-2022 (👀 reply). Each just a count, active flag, and tooltip copy.
export function deriveReactions(state: StoryState): ReactionsViewModel {
  const eyesActive = state.eyesMine || state.endingPersisted

  return {
    fear: {
      active: state.fearMine,
      count: 1 + (state.fearMine ? 1 : 0),
      tooltipShown: isHovered(state, 'fear'),
      tooltipText: state.fearMine
        ? `당신, 그리고 ${SITE_CONFIG.unknownUserName}님이 반응했습니다. 이제 둘이네요.`
        : `${SITE_CONFIG.unknownUserName}님이 반응했습니다`,
    },
    eyes: {
      active: eyesActive,
      count: SITE_CONFIG.deskNumber - 1 + (eyesActive ? 1 : 0),
      tooltipShown: isHovered(state, 'eyes'),
      tooltipText: state.endingPersisted
        ? state.eyesCancelTried
          ? '재직 중인 사용자는 확인을 취소할 수 없습니다.'
          : `외 ${SITE_CONFIG.deskNumber - 2}명… 그리고 ${SITE_CONFIG.currentUserName}님이 확인했습니다.`
        : state.eyesMine
          ? state.eyesTried
            ? '취소는 접수되지 않습니다.'
            : '이미 반응하셨잖아요. 어제.'
          : `${SITE_CONFIG.currentUserName}_001님, ${SITE_CONFIG.currentUserName}_002님, 외 ${SITE_CONFIG.deskNumber - 4}명… 그리고 당신이 반응했습니다`,
    },
    umbrella: {
      active: state.umbMine,
      count: 1 + (state.umbMine ? 1 : 0),
      tooltipShown: isHovered(state, 'umb'),
      tooltipText: state.umbMine
        ? `당신과 ${PARK_SEOYEON.name}님이 반응했습니다. 우산은 하나뿐이에요.`
        : `${PARK_SEOYEON.name}님이 반응했습니다`,
    },
    a2023: {
      active: true,
      count: 1,
      tooltipShown: isHovered(state, 'a23wave'),
      tooltipText: `${OH_SEJIN.name} 님이 반응했습니다.`,
    },
    a2022: {
      active: !state.a2022React0,
      count: state.a2022React0 ? SITE_CONFIG.deskNumber - 1 : SITE_CONFIG.deskNumber,
      tooltipShown: isHovered(state, 'a22react'),
      tooltipText: state.a2022ReactNote
        ? '재직 상태가 확인되지 않는 반응은 취소할 수 없습니다.'
        : `${YOON_TAEHO.name}님, 정민수님, 외 ${SITE_CONFIG.deskNumber - 3}명… 그리고 ${SITE_CONFIG.currentUserName}님이 확인했습니다.`,
    },
  }
}
