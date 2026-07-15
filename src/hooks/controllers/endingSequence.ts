import { TIMING } from '../../config/timing'
import { YOU_SEQUENCE_LENGTH } from '../../domain/state'
import type { EngineContext } from './types'

export interface EndingSequenceController {
  // Replays the outgoing manager's last lines in archive-당신. No-op if already running or played.
  startYouSequence(): void
  // Called on mount when restored state shows the ending was already reached, so the replay
  // guards below don't fire again this load. The ending state itself is restored separately.
  markAlreadySettled(): void
}

// Drives the two cinematics that close the story: startYouSequence, then (once that finishes)
// runEnding's member-count flash / new-applicant reveal / sidebar typing beats. Each runs at
// most once per session, hence the two guard flags instead of deriving "has it happened" from state.
export function createEndingSequenceController({ dispatch, timeline, stateRef }: EngineContext): EndingSequenceController {
  let youSequenceStarted = false
  let endingRan = false

  function runEnding() {
    if (endingRan) return
    endingRan = true
    dispatch({ type: 'ENDING_MEMBER_FLASH', on: true })
    timeline.after('ending-flash-off', TIMING.endingFlashOffMs, () => dispatch({ type: 'ENDING_MEMBER_FLASH', on: false }))
    timeline.after('ending-persist', TIMING.endingPersistMs, () => dispatch({ type: 'ENDING_PERSISTED' }))
    timeline.after('ending-applicant-flash-on', TIMING.endingApplicantFlashOnMs, () =>
      dispatch({ type: 'ENDING_NEW_APPLICANT_FLASH', on: true }),
    )
    timeline.after('ending-applicant-flash-off', TIMING.endingApplicantFlashOffMs, () =>
      dispatch({ type: 'ENDING_NEW_APPLICANT_FLASH', on: false }),
    )
    timeline.after('ending-you-preview-2', TIMING.endingYouPreview2Ms, () => dispatch({ type: 'ENDING_NEW_YOU_PREVIEW_2' }))
    timeline.after('ending-sidebar-typing-on', TIMING.endingSidebarTypingOnMs, () =>
      dispatch({ type: 'ENDING_SIDEBAR_TYPING', on: true }),
    )
    timeline.after('ending-sidebar-typing-off', TIMING.endingSidebarTypingOffMs, () =>
      dispatch({ type: 'ENDING_SIDEBAR_TYPING', on: false }),
    )
  }

  function startYouSequence() {
    if (youSequenceStarted) return
    youSequenceStarted = true
    let seq = 0
    timeline.every('you-sequence', TIMING.youSequenceTickMs, () => {
      if (stateRef.current.channel !== 'you') {
        timeline.stop('you-sequence')
        return
      }
      seq += 1
      dispatch({ type: 'SET_YOU_SEQUENCE', value: seq })
      if (seq >= YOU_SEQUENCE_LENGTH) {
        timeline.stop('you-sequence')
        dispatch({ type: 'SET_REPLACEMENT_COMPLETE' })
        runEnding()
      }
    })
  }

  function markAlreadySettled() {
    youSequenceStarted = true
    endingRan = true
  }

  return { startYouSequence, markAlreadySettled }
}
