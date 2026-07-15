import type { StoryState } from '../state'
import { YOU_SEQUENCE_LENGTH } from '../state'

// Fields that are just state.X renamed to the same name (a2025DelayedShown, a2023DelayedShown,
// etc.) live on StoryState only; components read those straight from useStory().state instead
// of duplicating them here. Only fields that actually combine or interpret state are derived.
export interface ArchivesViewModel {
  a23VoiceTooltipShown: boolean
  a22PayTooltipShown: boolean

  /** youSequence[i] is true once the (i+1)-th line of the outgoing manager's
   *  farewell has played (or the ending has already been reached). */
  youSequence: boolean[]
  youProfileTooltipShown: boolean
}

export function deriveArchives(state: StoryState): ArchivesViewModel {
  const youSequence = Array.from(
    { length: YOU_SEQUENCE_LENGTH },
    (_, i) => state.youSeq >= i + 1 || state.endingPersisted,
  )

  return {
    a23VoiceTooltipShown: state.hovered === 'a23voice',
    a22PayTooltipShown: state.hovered === 'a22pay',
    youSequence,
    youProfileTooltipShown: state.hovered === 'youprof',
  }
}
