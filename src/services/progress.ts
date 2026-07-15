import type { StoryState } from '../domain/state'

// Narrative progress worth surviving a reload. Excludes transient UI state (hover, scroll, in-flight flashes).
export interface SavedProgress {
  visitedRules: boolean
  visitedA2025: boolean
  visitedA2024: boolean
  visitedA2023: boolean
  visitedA2022: boolean
  visitedA2021: boolean
  visitedYou: boolean
  archiveYouUnlocked: boolean
  replacementComplete: boolean
  endingPersisted: boolean
  newApplicantPreviewShown: boolean
  newYouPreview2: boolean
  youSeq: number
  a2025DelayedShown: boolean
  a2024DelayedShown: boolean
  a2024DelayedShown2: boolean
  a2024NoteToggled: boolean
  a2023DelayedShown: boolean
  a2022DelayedShown: boolean
  a2021DelayedShown: boolean
  a2021DelayedShown2: boolean
}

export function extractProgress(state: StoryState): SavedProgress {
  return {
    visitedRules: state.visitedRules,
    visitedA2025: state.visitedA2025,
    visitedA2024: state.visitedA2024,
    visitedA2023: state.visitedA2023,
    visitedA2022: state.visitedA2022,
    visitedA2021: state.visitedA2021,
    visitedYou: state.visitedYou,
    archiveYouUnlocked: state.archiveYouUnlocked,
    replacementComplete: state.replacementComplete,
    endingPersisted: state.endingPersisted,
    newApplicantPreviewShown: state.newApplicantPreviewShown,
    newYouPreview2: state.newYouPreview2,
    youSeq: state.youSeq,
    a2025DelayedShown: state.a2025DelayedShown,
    a2024DelayedShown: state.a2024DelayedShown,
    a2024DelayedShown2: state.a2024DelayedShown2,
    a2024NoteToggled: state.a2024NoteToggled,
    a2023DelayedShown: state.a2023DelayedShown,
    a2022DelayedShown: state.a2022DelayedShown,
    a2021DelayedShown: state.a2021DelayedShown,
    a2021DelayedShown2: state.a2021DelayedShown2,
  }
}

const COOKIE_NAME = 'omong.progress'
const COOKIE_MAX_AGE_SECONDS = 400 * 24 * 60 * 60 // ~400 days, the max-age ceiling most browsers allow

// Partial: an older saved cookie may predate a field added to SavedProgress later. Caller
// merges this over initialStoryState, so missing keys just fall back to defaults.
export function loadProgress(): Partial<SavedProgress> | null {
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`))
    if (!match) return null
    return JSON.parse(decodeURIComponent(match[1]))
  } catch {
    return null
  }
}

// Progress survives a refresh and future visits until the visitor clears cookies.
export function saveProgress(progress: SavedProgress): void {
  try {
    const value = encodeURIComponent(JSON.stringify(progress))
    document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`
  } catch {
    // Cookies unavailable (private mode, disabled, storage full). Progress won't survive
    // a refresh, which is an acceptable degradation rather than a crash.
  }
}
