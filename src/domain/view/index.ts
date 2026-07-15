import type { StoryState } from '../state'
import { deriveArchives, type ArchivesViewModel } from './archives'
import { deriveEnding, type EndingViewModel } from './ending'
import { deriveHeader, type HeaderViewModel } from './header'
import { deriveMessages, type MessagesViewModel } from './messages'
import { deriveNav, type NavViewModel } from './nav'
import { deriveReactions, type ReactionsViewModel } from './reactions'
import { deriveRules, type RulesViewModel } from './rules'

export interface StoryViewModel {
  nav: NavViewModel
  header: HeaderViewModel
  rules: RulesViewModel
  reactions: ReactionsViewModel
  archives: ArchivesViewModel
  ending: EndingViewModel
  messages: MessagesViewModel
}

// Single entry point translating raw StoryState into everything the presentation layer
// reads. Components never inspect StoryState directly.
export function buildViewModel(state: StoryState): StoryViewModel {
  return {
    nav: deriveNav(state),
    header: deriveHeader(state),
    rules: deriveRules(state),
    reactions: deriveReactions(state),
    archives: deriveArchives(state),
    ending: deriveEnding(state),
    messages: deriveMessages(state),
  }
}

export type { ArchivesViewModel } from './archives'
export type { ChannelNavItem, NavAction, NavViewModel } from './nav'
export type { EndingViewModel, SidebarStatusTone } from './ending'
export type { HeaderViewModel } from './header'
export type { MessagesViewModel } from './messages'
export type { ReactionViewModel, ReactionsViewModel } from './reactions'
export type { RulesViewModel } from './rules'
