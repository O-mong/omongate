import type { StoryState } from '../state'

export interface MessagesViewModel {
  /** Discord-style "jump to present" pill: a message landed in the channel
   *  the visitor is currently viewing, but they've scrolled away from it. */
  newMessageBannerShown: boolean
}

/** Whether to show the new-message banner (see NewMessageBanner). */
export function deriveMessages(state: StoryState): MessagesViewModel {
  return {
    newMessageBannerShown: state.lastMessageChannel === state.channel && state.messageSeq > state.seenMessageSeq,
  }
}
