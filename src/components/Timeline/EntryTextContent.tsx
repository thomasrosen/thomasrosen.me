import { Typo } from '@/components/Typo'
import { type TimelineEntry } from '@/lib/loadTimeline'
import { Emoji } from '../Emoji'
import { Badge } from '../ui/badge'

export function EntryTextContent({
  entryBefore,
  entry,
  entryAfter,
  showTags = false,
}: {
  entryBefore?: TimelineEntry
  entry: TimelineEntry
  entryAfter?: TimelineEntry
  showTags?: boolean
}) {
  const sameDayAsBefore =
    entryBefore &&
    new Date(entryBefore.date).toDateString() ===
      new Date(entry.date).toDateString()

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
  const tags: string[] =
    entry.tags?.filter((tag) => !tagsToFilterOut.includes(tag)) || []

  const hasAudio = !!entry.audio

  return (
    <div className='text-[0px] leading-none space-y-1 w-full'>
      {entry.date && (
        <Typo
          as='time'
          variant='small'
          className='flex items-center gap-2 font-normal text-xs'
        >
          <span className='opacity-60 shrink-0'>
            {sameDayAsBefore
              ? noTimeDefined
                ? dateString
                : timeString
              : noTimeDefined
              ? dateString
              : fullDateTimeString}
          </span>
          {sameDayAsBefore ? null : (
            <div className='h-[1px] bg-foreground w-full opacity-10' />
          )}
        </Typo>
      )}
      {entry.author || (showTags && tags?.length) || hasAudio ? (
        <div className='flex flex-wrap gap-x-2 gap-y-1 items-center'>
          {entry.author && <Typo as='small'>by {entry.author}</Typo>}
          {showTags && tags?.length
            ? tags.map((tag) => (
                <Badge key={tag} variant='accent'>
                  {tag}
                </Badge>
              ))
            : null}
          {hasAudio ? (
            <Emoji className='inline-block text-base'>🔊</Emoji>
          ) : null}
        </div>
      ) : null}
      {entry.title ? <Typo as='h3'>{entry.title}</Typo> : null}
      {entry.text && (
        <Typo as='p' className='body2'>
          {entry.text || ''}
        </Typo>
      )}
    </div>
  )
}
