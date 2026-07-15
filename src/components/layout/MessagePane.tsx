import { useStory } from '../../context/StoryContext'
import { ChannelOutlet } from '../channels/ChannelRegistry'
import { NewMessageBanner } from './NewMessageBanner'

/** The scrollable message area + its "jump to present" banner. Shared by
 *  the desktop and mobile shells so the scroll-metrics wiring only exists
 *  in one place. */
export function MessagePane({ padding = '20px 16px 10px' }: { padding?: string }) {
  const { scrollRef, commands } = useStory()

  return (
    <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
      <div
        ref={scrollRef}
        onScroll={(e) => {
          const el = e.currentTarget
          commands.onScrollMessages({
            scrollTop: el.scrollTop,
            scrollHeight: el.scrollHeight,
            clientHeight: el.clientHeight,
          })
        }}
        style={{ position: 'absolute', inset: 0, overflowY: 'auto', padding }}
      >
        <ChannelOutlet />
      </div>
      <NewMessageBanner />
    </div>
  )
}
