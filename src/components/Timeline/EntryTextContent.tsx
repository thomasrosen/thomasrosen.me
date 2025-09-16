import { Typo } from '@/components/Typo'
import type { TimelineEntry } from '@/types'
import { Emoji } from '../Emoji'
import { Badge } from '../ui/badge'

export function EntryTextContent({
  // entryBefore,
  entry,
  // entryAfter,
  showTags = false,
}: {
  // entryBefore?: TimelineEntry
  entry: TimelineEntry
  // entryAfter?: TimelineEntry
  showTags?: boolean
}) {
  // const sameDayAsBefore = entryBefore && new Date(entryBefore.date).toDateString() === new Date(entry.date).toDateString()

  const fullDateTimeString = new Date(entry.date).toLocaleDateString('de-DE', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  const dateString = new Date(entry.date).toLocaleDateString('de-DE', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const timeString = new Date(entry.date).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const noTimeDefined = timeString === '00:00'

  const tagsToFilterOut = ['article', 'project', 'press', 'playlist']
  const tags: string[] = entry.tags?.filter((tag) => !tagsToFilterOut.includes(tag)) || []

  const hasAudio = !!entry.audio

  return (
    <div className="w-full space-y-2 text-[0px] leading-none">
      {entry.date && (
        <Typo as="time" className="flex items-center gap-2 font-normal text-xs" variant="small">
          <span className="shrink-0 opacity-60">
            {noTimeDefined ? dateString : fullDateTimeString}
          </span>

          <div className="h-[1px] w-full rounded-full bg-foreground opacity-10" />
        </Typo>
      )}
      {entry.author || (showTags && tags?.length) || hasAudio ? (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {entry.author && <Typo as="small">by {entry.author}</Typo>}
          {showTags && tags?.length
            ? tags.map((tag) => (
                <Badge key={tag} variant="accent">
                  {tag}
                </Badge>
              ))
            : null}
          {hasAudio ? <Emoji className="inline-block text-base">🔊</Emoji> : null}
        </div>
      ) : null}
      {entry.title ? <Typo as="h3">{entry.title}</Typo> : null}
      {entry.text && (
        <Typo as="p" className="body2">
          {entry.text || ''}
        </Typo>
      )}
    </div>
  )
}
