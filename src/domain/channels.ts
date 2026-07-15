// The nine channels that make up the guild. Adding one means a case here plus an entry
// in the channel registry, nowhere else.
export type ChannelId =
  | 'notice'
  | 'apply'
  | 'rules'
  | 'a2025'
  | 'a2024'
  | 'a2023'
  | 'a2022'
  | 'a2021'
  | 'you'

export const ARCHIVE_CHANNELS: ReadonlySet<ChannelId> = new Set([
  'a2025',
  'a2024',
  'a2023',
  'a2022',
  'a2021',
  'you',
])

export function isArchiveChannel(channel: ChannelId): boolean {
  return ARCHIVE_CHANNELS.has(channel)
}
