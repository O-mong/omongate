import { TIMING } from '../../config/timing'
import type { ChannelId } from '../../domain/channels'
import type { EngineContext } from './types'

// Channel switches into an archive don't land instantly: the intro overlay holds for
// TIMING.archiveTransitionMs first (see REQUEST_ARCHIVE_ENTRY/COMMIT_ARCHIVE_ENTRY in the
// reducer). After it commits, each archive gets one or two follow-up messages a couple
// seconds later (once, on first visit), and archive-당신 kicks off the replacement
// cinematic via onEnterYou.
export function enterArchive({ dispatch, timeline, stateRef }: EngineContext, onEnterYou: () => void, target: ChannelId): void {
  if (stateRef.current.intro) return
  dispatch({ type: 'REQUEST_ARCHIVE_ENTRY', channel: target })
  timeline.after('archive-entry', TIMING.archiveTransitionMs, () => {
    dispatch({ type: 'COMMIT_ARCHIVE_ENTRY', channel: target })

    if (target === 'a2025' && !stateRef.current.a2025DelayedShown) {
      timeline.after('a2025-delayed', TIMING.delayedMessageMs, () => {
        if (stateRef.current.channel === 'a2025') {
          dispatch({ type: 'SET_A2025_DELAYED' })
          dispatch({ type: 'A2025_MEMBER_FLASH', on: true })
          timeline.after('a2025-member-flash-off', TIMING.a2025MemberFlashMs, () =>
            dispatch({ type: 'A2025_MEMBER_FLASH', on: false }),
          )
        }
      })
    }
    if (target === 'a2024' && !stateRef.current.a2024DelayedShown) {
      timeline.after('a2024-delayed', TIMING.delayedMessageMs, () => {
        if (stateRef.current.channel === 'a2024') {
          dispatch({ type: 'SET_A2024_DELAYED' })
          timeline.after('a2024-delayed-2', TIMING.delayedMessageMs, () => {
            if (stateRef.current.channel === 'a2024') dispatch({ type: 'SET_A2024_DELAYED_2' })
          })
        }
      })
    }
    if (target === 'a2023' && !stateRef.current.a2023DelayedShown) {
      timeline.after('a2023-delayed', TIMING.delayedMessageMs, () => {
        if (stateRef.current.channel === 'a2023') dispatch({ type: 'SET_A2023_DELAYED' })
      })
    }
    if (target === 'a2022' && !stateRef.current.a2022DelayedShown) {
      timeline.after('a2022-delayed', TIMING.delayedMessageMs, () => {
        if (stateRef.current.channel === 'a2022') dispatch({ type: 'SET_A2022_DELAYED' })
      })
    }
    if (target === 'a2021' && !stateRef.current.a2021DelayedShown) {
      timeline.after('a2021-delayed', TIMING.delayedMessageMs, () => {
        if (stateRef.current.channel === 'a2021') {
          dispatch({ type: 'SET_A2021_DELAYED' })
          timeline.after('a2021-delayed-2', TIMING.a2021SecondDelayMs, () => {
            if (stateRef.current.channel === 'a2021') dispatch({ type: 'SET_A2021_DELAYED_2' })
          })
        }
      })
    }
    if (target === 'you') onEnterYou()
  })
}
