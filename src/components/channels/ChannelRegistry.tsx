import type { ComponentType } from 'react'
import type { ChannelId } from '../../domain/channels'
import { useStory } from '../../context/StoryContext'
import { ApplyChannel } from './ApplyChannel'
import { Archive2021Channel } from './Archive2021Channel'
import { Archive2022Channel } from './Archive2022Channel'
import { Archive2023Channel } from './Archive2023Channel'
import { Archive2024Channel } from './Archive2024Channel'
import { Archive2025Channel } from './Archive2025Channel'
import { ArchiveYouChannel } from './ArchiveYouChannel'
import { NoticeChannel } from './NoticeChannel'
import { RulesChannel } from './RulesChannel'

// One entry per channel. Adding a channel means adding a component and a line here, nothing else.
const CHANNEL_COMPONENTS: Record<ChannelId, ComponentType> = {
  notice: NoticeChannel,
  apply: ApplyChannel,
  rules: RulesChannel,
  a2025: Archive2025Channel,
  a2024: Archive2024Channel,
  a2023: Archive2023Channel,
  a2022: Archive2022Channel,
  a2021: Archive2021Channel,
  you: ArchiveYouChannel,
}

export function ChannelOutlet() {
  const { state } = useStory()
  const ActiveChannel = CHANNEL_COMPONENTS[state.channel]
  return <ActiveChannel />
}
