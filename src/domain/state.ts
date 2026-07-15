import type { ChannelId } from './channels'

// One shared field (not a boolean per tooltip) so only one tooltip is open at a time.
export type HoverKey =
  | 'fear'
  | 'eyes'
  | 'umb'
  | 'a22react'
  | 'a22pay'
  | 'a23wave'
  | 'a23voice'
  | 'youprof'

export interface StoryState {
  channel: ChannelId
  hovered: HoverKey | null

  intro: boolean // channel-switch transition overlay, see enterArchive
  pending: ChannelId | null

  lockMsg: boolean // toast shown when clicking a locked/read-only surface
  lockText: string

  // progression flags
  visitedRules: boolean
  visitedA2025: boolean
  visitedA2024: boolean
  visitedA2023: boolean
  visitedA2022: boolean
  visitedA2021: boolean
  visitedYou: boolean // clears the unread dot on first open, independent of whether the farewell cinematic finished
  archiveYouUnlocked: boolean
  replacementComplete: boolean
  endingPersisted: boolean

  // clerical/HR presentation of the replacement
  memberCountFlash: boolean
  newApplicantPreviewShown: boolean

  // archive-2025/2024/2023/2022 delayed follow-ups (fire once, a beat after entry)
  a2025DelayedShown: boolean
  a2025MemberFlash: boolean // briefly shows 김도윤 in the online member list
  a2024DelayedShown: boolean
  a2024DelayedShown2: boolean // second follow-up line
  a2024NoteToggled: boolean // "오늘은 굶어도 괜찮아요" card flips text on each click, unlike the one-way reveals elsewhere
  a2023DelayedShown: boolean
  a23ReactionDetailShown: boolean // 👋 퇴근 인사 reaction's detail panel, click to open/close
  a2022DelayedShown: boolean
  a2022React0: boolean
  a2022ReactNote: boolean

  a2021DelayedShown: boolean
  a2021DelayedShown2: boolean

  // new-message banner: content the visitor may have scrolled away from (Discord's "jump to present")
  messageSeq: number // incremented per appended message
  lastMessageChannel: ChannelId | null
  seenMessageSeq: number // messageSeq the visitor has caught up to (at bottom on arrival, or dismissed the banner)
  atBottom: boolean

  // archive-당신: replaying the outgoing manager's last conversation
  youSeq: number // 0..7
  newApplicantFlash: boolean
  newYouPreview2: boolean
  sidebarTyping: boolean

  // #공지사항 reactions
  fearMine: boolean
  eyesMine: boolean
  eyesTried: boolean
  eyesCancelTried: boolean
  umbMine: boolean
}

export const YOU_SEQUENCE_LENGTH = 7

export const initialStoryState: StoryState = {
  channel: 'notice',
  hovered: null,

  intro: false,
  pending: null,

  lockMsg: false,
  lockText: '',

  visitedRules: false,
  visitedA2025: false,
  visitedA2024: false,
  visitedA2023: false,
  visitedA2022: false,
  visitedA2021: false,
  visitedYou: false,
  archiveYouUnlocked: false,
  replacementComplete: false,
  endingPersisted: false,

  memberCountFlash: false,
  newApplicantPreviewShown: false,

  a2025DelayedShown: false,
  a2025MemberFlash: false,
  a2024DelayedShown: false,
  a2024DelayedShown2: false,
  a2024NoteToggled: false,
  a2023DelayedShown: false,
  a23ReactionDetailShown: false,
  a2022DelayedShown: false,
  a2022React0: false,
  a2022ReactNote: false,

  a2021DelayedShown: false,
  a2021DelayedShown2: false,

  messageSeq: 0,
  lastMessageChannel: null,
  seenMessageSeq: 0,
  atBottom: true,

  youSeq: 0,
  newApplicantFlash: false,
  newYouPreview2: false,
  sidebarTyping: false,

  fearMine: false,
  eyesMine: false,
  eyesTried: false,
  eyesCancelTried: false,
  umbMine: false,
}
