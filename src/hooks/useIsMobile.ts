import { useMediaQuery } from './useMediaQuery'

// Matches the width Discord/Slack's own web clients switch to a single-pane layout at.
export const MOBILE_BREAKPOINT_PX = 768

export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`)
}
