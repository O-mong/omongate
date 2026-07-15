import type { ChannelId } from '../channels'
import { CHANNEL_LABELS } from '../../content/channelMeta'
import type { StoryState } from '../state'

// What clicking a nav item does, independent of how the item is styled.
export type NavAction =
  | { kind: 'navigate'; target: ChannelId }
  | { kind: 'rules' }
  | { kind: 'archive'; target: ChannelId }
  | { kind: 'locked'; message: string }

export interface ChannelNavItem {
  key: string
  label: string
  faded: boolean
  dotVisible: boolean
  dotSpeed: number // unread-dot blink period, seconds
  hoverText: string
  action: NavAction
  // Which channel makes this row render "selected". null for archive-2026: it reuses the
  // archive-당신 channel under the hood, and that highlight belongs to the real row instead.
  activeWhen: ChannelId | null
}

export interface NavViewModel {
  activeChannel: ChannelId
  recruiting: ChannelNavItem[]
  archived: ChannelNavItem[]
  // Preview line under archive-당신 before it's opened: outgoing manager pre-ending,
  // next applicant post-ending, or nothing yet.
  youPreviewKind: 'none' | 'prev' | 'new'
}

export function deriveNav(state: StoryState): NavViewModel {
  const unlockedYou = state.archiveYouUnlocked || state.endingPersisted

  const recruiting: ChannelNavItem[] = [
    {
      key: 'notice',
      label: CHANNEL_LABELS.notice,
      faded: false,
      dotVisible: false,
      dotSpeed: 1.3,
      hoverText: '',
      action: { kind: 'navigate', target: 'notice' },
      activeWhen: 'notice',
    },
    {
      key: 'apply',
      label: CHANNEL_LABELS.apply,
      faded: false,
      dotVisible: state.endingPersisted,
      dotSpeed: 1.3,
      hoverText: '',
      action: { kind: 'navigate', target: 'apply' },
      activeWhen: 'apply',
    },
    {
      key: 'rules',
      label: CHANNEL_LABELS.rules,
      faded: false,
      dotVisible: false,
      dotSpeed: 1.3,
      hoverText: '',
      action: { kind: 'rules' },
      activeWhen: 'rules',
    },
  ]

  const archived: ChannelNavItem[] = [
    {
      key: 'a2025',
      label: CHANNEL_LABELS.a2025,
      faded: false,
      dotVisible: !state.visitedA2025,
      dotSpeed: 2.8,
      hoverText: '',
      action: { kind: 'archive', target: 'a2025' },
      activeWhen: 'a2025',
    },
    {
      key: 'a2024',
      label: CHANNEL_LABELS.a2024,
      faded: false,
      dotVisible: state.visitedA2025 && !state.visitedA2024,
      dotSpeed: 2.4,
      hoverText: '',
      action: { kind: 'archive', target: 'a2024' },
      activeWhen: 'a2024',
    },
    {
      key: 'a2023',
      label: CHANNEL_LABELS.a2023,
      faded: false,
      dotVisible: state.visitedA2024 && !state.visitedA2023,
      dotSpeed: 2.0,
      hoverText: '',
      action: { kind: 'archive', target: 'a2023' },
      activeWhen: 'a2023',
    },
    {
      key: 'a2022',
      label: CHANNEL_LABELS.a2022,
      faded: false,
      dotVisible: state.visitedA2023 && !state.visitedA2022,
      dotSpeed: 1.6,
      hoverText: '',
      action: { kind: 'archive', target: 'a2022' },
      activeWhen: 'a2022',
    },
    {
      key: 'a2021',
      label: CHANNEL_LABELS.a2021,
      faded: false,
      dotVisible: state.visitedA2022 && !state.visitedA2021,
      dotSpeed: 1.3,
      hoverText: '',
      action: { kind: 'archive', target: 'a2021' },
      activeWhen: 'a2021',
    },
  ]

  if (state.endingPersisted) {
    archived.push({
      key: 'a2026',
      label: 'archive-2026',
      faded: false,
      dotVisible: false,
      dotSpeed: 1.3,
      hoverText: '',
      action: { kind: 'navigate', target: 'you' },
      activeWhen: null,
    })
  }

  const youHoverText = state.endingPersisted
    ? '후임자를 기다리고 있습니다.'
    : unlockedYou
      ? '마지막 담당자를 확인하고 있습니다.'
      : '보관할 기록이 아직 충분하지 않습니다.'

  archived.push({
    key: 'you',
    label: CHANNEL_LABELS.you,
    faded: !unlockedYou || state.endingPersisted,
    dotVisible: state.endingPersisted ? state.newApplicantPreviewShown : state.archiveYouUnlocked && !state.visitedYou,
    dotSpeed: 1.1,
    hoverText: youHoverText,
    action:
      !state.endingPersisted && unlockedYou
        ? { kind: 'archive', target: 'you' }
        : { kind: 'locked', message: youHoverText },
    activeWhen: 'you',
  })

  const youPreviewKind: NavViewModel['youPreviewKind'] =
    state.archiveYouUnlocked && !state.endingPersisted
      ? 'prev'
      : state.endingPersisted && state.newApplicantPreviewShown
        ? 'new'
        : 'none'

  return {
    activeChannel: state.channel,
    recruiting,
    archived,
    youPreviewKind,
  }
}
