import type { ChannelId } from './channels'
import type { HoverKey } from './state'

export type StoryAction =
  | { type: 'NAVIGATE_DIRECT'; channel: ChannelId }
  | { type: 'NAVIGATE_RULES' }
  | { type: 'REQUEST_ARCHIVE_ENTRY'; channel: ChannelId }
  | { type: 'COMMIT_ARCHIVE_ENTRY'; channel: ChannelId }
  | { type: 'SET_A2025_DELAYED' }
  | { type: 'A2025_MEMBER_FLASH'; on: boolean }
  | { type: 'SET_A2024_DELAYED' }
  | { type: 'SET_A2024_DELAYED_2' }
  | { type: 'TOGGLE_A2024_NOTE' }
  | { type: 'SET_A2023_DELAYED' }
  | { type: 'TOGGLE_A23_REACTION_DETAIL' }
  | { type: 'SET_A2022_DELAYED' }
  | { type: 'SET_A2021_DELAYED' }
  | { type: 'SET_A2021_DELAYED_2' }
  | { type: 'SET_YOU_SEQUENCE'; value: number }
  | { type: 'SET_REPLACEMENT_COMPLETE' }
  | { type: 'ENDING_MEMBER_FLASH'; on: boolean }
  | { type: 'ENDING_PERSISTED' }
  | { type: 'ENDING_NEW_APPLICANT_FLASH'; on: boolean }
  | { type: 'ENDING_NEW_YOU_PREVIEW_2' }
  | { type: 'ENDING_SIDEBAR_TYPING'; on: boolean }
  | { type: 'SHOW_LOCK'; text: string }
  | { type: 'HIDE_LOCK' }
  | { type: 'HOVER'; key: HoverKey }
  | { type: 'UNHOVER' }
  | { type: 'TOGGLE_FEAR' }
  | { type: 'TOGGLE_EYES' }
  | { type: 'TOGGLE_UMBRELLA' }
  | { type: 'CLICK_A2022_REACTION' }
  | { type: 'RESET_A2022_REACTION_HIGHLIGHT' }
  | { type: 'SET_SCROLL_BOTTOM'; atBottom: boolean }
  | { type: 'ACKNOWLEDGE_NEW_MESSAGES' }
