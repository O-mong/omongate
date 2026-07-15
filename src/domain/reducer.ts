import type { ChannelId } from './channels'
import type { StoryAction } from './actions'
import type { StoryState } from './state'

// Marks a channel visited; unlocks archive-당신 once all 5 archives have been seen.
// Re-visiting an already-visited channel is a no-op.
function applyVisit(state: StoryState, channel: string): Partial<StoryState> {
  const patch: Partial<StoryState> = {}
  if (channel === 'rules' && !state.visitedRules) patch.visitedRules = true
  if (channel === 'a2025' && !state.visitedA2025) patch.visitedA2025 = true
  if (channel === 'a2024' && !state.visitedA2024) patch.visitedA2024 = true
  if (channel === 'a2023' && !state.visitedA2023) patch.visitedA2023 = true
  if (channel === 'a2022' && !state.visitedA2022) patch.visitedA2022 = true
  if (channel === 'a2021' && !state.visitedA2021) patch.visitedA2021 = true
  if (channel === 'you' && !state.visitedYou) patch.visitedYou = true

  const v2025 = patch.visitedA2025 ?? state.visitedA2025
  const v2024 = patch.visitedA2024 ?? state.visitedA2024
  const v2023 = patch.visitedA2023 ?? state.visitedA2023
  const v2022 = patch.visitedA2022 ?? state.visitedA2022
  const v2021 = patch.visitedA2021 ?? state.visitedA2021
  if (v2025 && v2024 && v2023 && v2022 && v2021 && !state.archiveYouUnlocked) {
    patch.archiveYouUnlocked = true
  }
  return patch
}

// Bumps the counter the new-message banner watches. Someone already at the bottom counts as
// having seen it immediately. archive-당신 always counts itself as caught up too: it's a
// scripted cinematic meant to be followed line by line, not scrolled away from (see the
// matching force-scroll in useStoryEngine.ts).
function postMessage(state: StoryState, channel: ChannelId): Partial<StoryState> {
  const messageSeq = state.messageSeq + 1
  const alwaysFollowed = channel === 'you'
  return {
    messageSeq,
    lastMessageChannel: channel,
    seenMessageSeq: state.atBottom || alwaysFollowed ? messageSeq : state.seenMessageSeq,
  }
}

// Opening a channel counts as caught up with whatever it already contains.
function catchUpOnEntry(state: StoryState): Partial<StoryState> {
  return { atBottom: true, seenMessageSeq: state.messageSeq }
}

export function storyReducer(state: StoryState, action: StoryAction): StoryState {
  switch (action.type) {
    case 'NAVIGATE_DIRECT':
      return { ...state, channel: action.channel, ...catchUpOnEntry(state) }

    case 'NAVIGATE_RULES':
      return { ...state, channel: 'rules', ...applyVisit(state, 'rules'), ...catchUpOnEntry(state) }

    case 'REQUEST_ARCHIVE_ENTRY':
      if (state.intro) return state // a transition already in flight swallows re-entrant clicks
      return { ...state, intro: true, pending: action.channel }

    case 'COMMIT_ARCHIVE_ENTRY':
      return {
        ...state,
        ...applyVisit(state, action.channel),
        ...catchUpOnEntry(state),
        intro: false,
        pending: null,
        channel: action.channel,
      }

    case 'SET_A2025_DELAYED':
      return { ...state, a2025DelayedShown: true, ...postMessage(state, 'a2025') }
    case 'A2025_MEMBER_FLASH':
      return { ...state, a2025MemberFlash: action.on }
    case 'SET_A2024_DELAYED':
      return { ...state, a2024DelayedShown: true, ...postMessage(state, 'a2024') }
    case 'SET_A2024_DELAYED_2':
      return { ...state, a2024DelayedShown2: true, ...postMessage(state, 'a2024') }
    case 'TOGGLE_A2024_NOTE':
      return { ...state, a2024NoteToggled: !state.a2024NoteToggled }
    case 'SET_A2023_DELAYED':
      return { ...state, a2023DelayedShown: true, ...postMessage(state, 'a2023') }
    case 'TOGGLE_A23_REACTION_DETAIL':
      return { ...state, a23ReactionDetailShown: !state.a23ReactionDetailShown }
    case 'SET_A2022_DELAYED':
      return { ...state, a2022DelayedShown: true, ...postMessage(state, 'a2022') }
    case 'SET_A2021_DELAYED':
      return { ...state, a2021DelayedShown: true, ...postMessage(state, 'a2021') }
    case 'SET_A2021_DELAYED_2':
      return { ...state, a2021DelayedShown2: true, ...postMessage(state, 'a2021') }

    case 'SET_YOU_SEQUENCE':
      return { ...state, youSeq: action.value, ...postMessage(state, 'you') }
    case 'SET_REPLACEMENT_COMPLETE':
      return { ...state, replacementComplete: true }

    case 'ENDING_MEMBER_FLASH':
      return { ...state, memberCountFlash: action.on }
    case 'ENDING_PERSISTED':
      return { ...state, endingPersisted: true, ...postMessage(state, 'notice') }
    case 'ENDING_NEW_APPLICANT_FLASH':
      return {
        ...state,
        newApplicantFlash: action.on,
        newApplicantPreviewShown: action.on ? state.newApplicantPreviewShown : true,
      }
    case 'ENDING_NEW_YOU_PREVIEW_2':
      return { ...state, newYouPreview2: true }
    case 'ENDING_SIDEBAR_TYPING':
      return { ...state, sidebarTyping: action.on }

    case 'SHOW_LOCK':
      return { ...state, lockMsg: true, lockText: action.text }
    case 'HIDE_LOCK':
      return { ...state, lockMsg: false }

    case 'HOVER':
      return { ...state, hovered: action.key }
    case 'UNHOVER':
      return { ...state, hovered: null }

    case 'TOGGLE_FEAR':
      return { ...state, fearMine: !state.fearMine }
    case 'TOGGLE_UMBRELLA':
      return { ...state, umbMine: !state.umbMine }
    case 'TOGGLE_EYES':
      if (state.endingPersisted) return { ...state, eyesCancelTried: true }
      if (state.eyesMine) return { ...state, eyesTried: true }
      return { ...state, eyesMine: true }

    case 'CLICK_A2022_REACTION':
      if (state.a2022React0) return { ...state, a2022ReactNote: true }
      return { ...state, a2022React0: true, a2022ReactNote: true }
    case 'RESET_A2022_REACTION_HIGHLIGHT':
      return { ...state, a2022React0: false }

    case 'SET_SCROLL_BOTTOM': {
      if (state.atBottom === action.atBottom) return state
      // Reaching the bottom doesn't immediately clear the "새 메시지" divider; it holds for a
      // beat first (see the ack-new-messages timer in useStoryEngine.ts's onScrollMessages).
      return { ...state, atBottom: action.atBottom }
    }
    case 'ACKNOWLEDGE_NEW_MESSAGES':
      return { ...state, seenMessageSeq: state.messageSeq }

    default:
      return state
  }
}
