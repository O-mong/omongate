// Story pacing constants. All ms unless noted. Grouped by which file owns the timer.
export const TIMING = {
  archiveTransitionMs: 1150, // archiveEntry.ts: intro overlay before an archive commits
  delayedMessageMs: 4000, // archiveEntry.ts: gap before a follow-up message lands
  a2021SecondDelayMs: 2500, // archiveEntry.ts: archive-2021's second line after its first
  a2025MemberFlashMs: 4000, // archiveEntry.ts: how long 김도윤 stays in the online list

  youSequenceTickMs: 3200, // endingSequence.ts: archive-당신 farewell line interval
  endingFlashOffMs: 1000, // endingSequence.ts
  endingPersistMs: 1300, // endingSequence.ts
  endingApplicantFlashOnMs: 2200, // endingSequence.ts
  endingApplicantFlashOffMs: 3000, // endingSequence.ts
  endingYouPreview2Ms: 6800, // endingSequence.ts
  endingSidebarTypingOnMs: 7200, // endingSequence.ts
  endingSidebarTypingOffMs: 9800, // endingSequence.ts

  lockVisibleMs: 2400, // lockToast.ts

  nearBottomThresholdPx: 40, // useStoryEngine.ts: px
  ackNewMessagesDelayMs: 2000, // useStoryEngine.ts
  a2022ReactionResetMs: 1300, // useStoryEngine.ts
} as const
