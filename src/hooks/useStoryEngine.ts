import { useEffect, useReducer, useRef } from 'react'
import { TIMING } from '../config/timing'
import { storyReducer } from '../domain/reducer'
import { initialStoryState, type HoverKey, type StoryState } from '../domain/state'
import { buildViewModel, type StoryViewModel } from '../domain/view'
import { extractProgress, loadProgress, saveProgress } from '../services/progress'
import { enterArchive } from './controllers/archiveEntry'
import { createEndingSequenceController } from './controllers/endingSequence'
import { showLock } from './controllers/lockToast'
import type { EngineContext } from './controllers/types'
import { Timeline } from './timeline'

export interface ScrollMetrics {
  scrollTop: number
  scrollHeight: number
  clientHeight: number
}

export interface StoryCommands {
  goNotice(): void
  goApply(): void
  goRules(): void
  goCompletedArchive(): void
  goA2025(): void
  goA2024(): void
  goA2023(): void
  goA2022(): void
  goA2021(): void
  goYou(): void
  onScrollMessages(metrics: ScrollMetrics): void
  jumpToLatestMessages(): void
  hover(key: HoverKey): void
  unhover(): void
  toggleFear(): void
  toggleEyes(): void
  toggleUmbrella(): void
  clickA2022Reaction(): void
  toggleA2024Note(): void // "오늘은 굶어도 괜찮아요" card, click flips its text back and forth
  toggleA23ReactionDetail(): void // 👋 퇴근 인사 reaction's detail panel, click to open/close
}

export interface StoryEngine {
  state: StoryState
  view: StoryViewModel
  scrollRef: React.RefObject<HTMLDivElement | null>
  commands: StoryCommands
}

// Composition root: wires the reducer to the controllers (hooks/controllers/*) and exposes
// StoryCommands. Doesn't decide anything about the story itself, just plumbs dispatch/timeline/
// state to whichever controller owns that decision.
export function useStoryEngine(): StoryEngine {
  const [state, dispatch] = useReducer(storyReducer, initialStoryState, (init) => {
    const saved = loadProgress()
    return saved ? { ...init, ...saved } : init
  })

  const stateRef = useRef(state)
  stateRef.current = state

  const timelineRef = useRef<Timeline | null>(null)
  if (!timelineRef.current) timelineRef.current = new Timeline()
  const timeline = timelineRef.current

  const scrollRef = useRef<HTMLDivElement>(null)

  const ctx: EngineContext = { dispatch, timeline, stateRef }

  // endingSequence is the one controller with real private state (two guard flags shared
  // between startYouSequence and markAlreadySettled), so it stays a factory built once.
  const endingRef = useRef<ReturnType<typeof createEndingSequenceController> | null>(null)
  if (!endingRef.current) {
    const ending = createEndingSequenceController(ctx)
    // Restored state already reflects a previously-reached ending; just tell the controller
    // not to replay the cinematic this load.
    if (state.endingPersisted) ending.markAlreadySettled()
    endingRef.current = ending
  }
  const ending = endingRef.current

  useEffect(() => () => timeline.dispose(), [timeline])

  // Keeps the persisted snapshot in sync with narrative progress. SavedProgress excludes
  // transient UI state, so most renders don't actually change anything worth writing.
  useEffect(() => {
    saveProgress(extractProgress(state))
  }, [state])

  // Sticks the visitor to the new bottom if they were already there when a message landed.
  // Whether it counts as "seen" is the reducer's call (postMessage); this effect only does
  // the DOM scroll, after the DOM has the new content's height. archive-당신 always
  // force-scrolls regardless of atBottom: it's a scripted cinematic, not a channel to wander
  // away from mid-scene.
  useEffect(() => {
    if (state.lastMessageChannel !== state.channel) return
    if (!state.atBottom && state.channel !== 'you') return
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.messageSeq])

  // Every channel opens scrolled to the top, not jumped to the latest message. The reducer's
  // catchUpOnEntry optimistically marks atBottom:true (fine for a short archive), but a tall
  // one actually starts at the top; measure it for real once the content is on screen. This
  // keeps a later delayed message from yanking the view down while still reading from the top.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTop = 0
    const nearBottom = el.scrollHeight - el.clientHeight <= TIMING.nearBottomThresholdPx
    dispatch({ type: 'SET_SCROLL_BOTTOM', atBottom: nearBottom })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.channel])

  function goYou() {
    if (stateRef.current.endingPersisted) {
      showLock(ctx, '후임자를 기다리고 있습니다.')
      return
    }
    if (!stateRef.current.archiveYouUnlocked) {
      showLock(ctx, '보관할 기록이 아직 충분하지 않습니다.')
      return
    }
    enterArchive(ctx, ending.startYouSequence, 'you')
  }

  function clickA2022Reaction() {
    const wasIdle = !stateRef.current.a2022React0
    dispatch({ type: 'CLICK_A2022_REACTION' })
    if (wasIdle) {
      timeline.after('a2022-reaction-reset', TIMING.a2022ReactionResetMs, () =>
        dispatch({ type: 'RESET_A2022_REACTION_HIGHLIGHT' }),
      )
    }
  }

  const commands: StoryCommands = {
    goNotice: () => dispatch({ type: 'NAVIGATE_DIRECT', channel: 'notice' }),
    goApply: () => dispatch({ type: 'NAVIGATE_DIRECT', channel: 'apply' }),
    goRules: () => dispatch({ type: 'NAVIGATE_RULES' }),
    goCompletedArchive: () => dispatch({ type: 'NAVIGATE_DIRECT', channel: 'you' }),
    goA2025: () => enterArchive(ctx, ending.startYouSequence, 'a2025'),
    goA2024: () => enterArchive(ctx, ending.startYouSequence, 'a2024'),
    goA2023: () => enterArchive(ctx, ending.startYouSequence, 'a2023'),
    goA2022: () => enterArchive(ctx, ending.startYouSequence, 'a2022'),
    goA2021: () => enterArchive(ctx, ending.startYouSequence, 'a2021'),
    goYou,
    onScrollMessages: ({ scrollTop, scrollHeight, clientHeight }) => {
      const nearBottom = scrollHeight - (scrollTop + clientHeight) <= TIMING.nearBottomThresholdPx
      if (nearBottom === state.atBottom) return
      dispatch({ type: 'SET_SCROLL_BOTTOM', atBottom: nearBottom })
      if (nearBottom) {
        timeline.after('ack-new-messages', TIMING.ackNewMessagesDelayMs, () =>
          dispatch({ type: 'ACKNOWLEDGE_NEW_MESSAGES' }),
        )
      } else {
        timeline.stop('ack-new-messages')
      }
    },
    jumpToLatestMessages: () => {
      dispatch({ type: 'ACKNOWLEDGE_NEW_MESSAGES' })
      const el = scrollRef.current
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
    },
    hover: (key) => dispatch({ type: 'HOVER', key }),
    unhover: () => dispatch({ type: 'UNHOVER' }),
    toggleFear: () => dispatch({ type: 'TOGGLE_FEAR' }),
    toggleEyes: () => dispatch({ type: 'TOGGLE_EYES' }),
    toggleUmbrella: () => dispatch({ type: 'TOGGLE_UMBRELLA' }),
    clickA2022Reaction,
    toggleA2024Note: () => dispatch({ type: 'TOGGLE_A2024_NOTE' }),
    toggleA23ReactionDetail: () => dispatch({ type: 'TOGGLE_A23_REACTION_DETAIL' }),
  }

  return { state, view: buildViewModel(state), scrollRef, commands }
}
