import { SITE_CONFIG } from '../../config/site'
import { CHANNEL_LABELS, CHANNEL_TOPICS, CHANNEL_TYPING } from '../../content/channelMeta'
import { HAN_YURA, KIM_DOYUN } from '../../content/personas'
import { isArchiveChannel } from '../channels'
import type { StoryState } from '../state'

// archive-2025/2024 don't have a permanent typing line like #지원서제출. It only appears
// once their delayed follow-up lands, and never resolves (the "conversation" is left hanging).
function typingLineFor(state: StoryState): string {
  if (state.channel === 'a2025' && state.a2025DelayedShown) return `${KIM_DOYUN.name} 님이 입력 중…`
  if (state.channel === 'a2024' && state.a2024DelayedShown2) return `${HAN_YURA.name} 님이 입력 중…`
  return CHANNEL_TYPING[state.channel]
}

export interface HeaderViewModel {
  headerLabel: string
  headerTopic: string
  typingLine: string
  inputText: string
  introShown: boolean
  introLabel: string
  lockShown: boolean
  lockText: string
}

// The chat header row, intro/lock overlays, and composer footer, keyed off "which channel
// and what state" rather than the channel's actual message content.
export function deriveHeader(state: StoryState): HeaderViewModel {
  const ch = state.channel
  const viewingFrozenYou = ch === 'you' && state.endingPersisted

  return {
    headerLabel: viewingFrozenYou ? 'archive-2026' : CHANNEL_LABELS[ch],
    headerTopic: viewingFrozenYou ? `보관 완료 · 담당자: ${SITE_CONFIG.unknownUserName}` : CHANNEL_TOPICS[ch],
    typingLine: typingLineFor(state),
    inputText: isArchiveChannel(ch)
      ? '회의 중에는 메시지를 보낼 수 없습니다. 이미 발언하셨습니다.'
      : `#${CHANNEL_LABELS[ch]}에 메시지 보내기`,
    introShown: state.intro,
    introLabel: state.pending ? CHANNEL_LABELS[state.pending] : '',
    lockShown: state.lockMsg,
    lockText: state.lockText || '보관할 기록이 아직 충분하지 않습니다.',
  }
}
