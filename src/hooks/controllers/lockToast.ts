import { TIMING } from '../../config/timing'
import type { EngineContext } from './types'

// Toast shown when clicking a locked/read-only surface. Always auto-dismisses after
// TIMING.lockVisibleMs; there's no explicit close affordance.
export function showLock({ dispatch, timeline }: EngineContext, text: string): void {
  dispatch({ type: 'SHOW_LOCK', text })
  timeline.after('lock-hide', TIMING.lockVisibleMs, () => dispatch({ type: 'HIDE_LOCK' }))
}
