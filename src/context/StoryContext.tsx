import { createContext, useContext, type ReactNode } from 'react'
import { useStoryEngine, type StoryEngine } from '../hooks/useStoryEngine'

// Exported (not just useStory()) so a hand-built StoryEngine can be rendered against the
// real component tree without real timers or cookies. See ARCHITECTURE.md's
// "Testing without a browser".
export const StoryContext = createContext<StoryEngine | null>(null)
const StoryReactContext = StoryContext

export function StoryProvider({ children }: { children: ReactNode }) {
  const engine = useStoryEngine()
  return <StoryReactContext.Provider value={engine}>{children}</StoryReactContext.Provider>
}

// Facade the presentation layer talks to instead of the reducer, view-model builders, or timeline.
export function useStory(): StoryEngine {
  const engine = useContext(StoryReactContext)
  if (!engine) throw new Error('useStory() must be used within <StoryProvider>')
  return engine
}
