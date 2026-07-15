import type { StoryAction } from '../../domain/actions'
import type { StoryState } from '../../domain/state'
import type { Timeline } from '../timeline'

export type Dispatch = (action: StoryAction) => void

// Shared plumbing every controller needs: dispatch, a timer scheduler, and a ref to read
// the current state inside a timer callback (a closed-over value would be stale by the
// time the timer fires).
export interface EngineContext {
  dispatch: Dispatch
  timeline: Timeline
  stateRef: { readonly current: StoryState }
}
