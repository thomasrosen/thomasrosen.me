import { Typo } from '@/components/Typo'
import { type TimelineEntry } from '@/lib/loadTimeline'
import Link from 'next/link'

export function EntryTextContent({
  entryBefore,
  entry,
  entryAfter,
}: {
  entryBefore?: TimelineEntry
  entry: TimelineEntry
  entryAfter?: TimelineEntry
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

  const linkUrl = entry.url
  const isExternalLink = Boolean(linkUrl?.startsWith('http'))

  return (
    <div className='text-[0px] leading-none space-y-1'>
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
            <div className='h-[1px] bg-foreground w-full opacity-50' />
          )}
        </Typo>
      )}
      {entry.author && (
        <div className='flex flex-wrap gap-2 items-center'>
          {entry.author && <Typo as='small'>by {entry.author}</Typo>}
          {/* {entry.tags && entry.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)} */}
        </div>
      )}
      {entry.title ? (
        linkUrl ? (
          <Link
            href={linkUrl}
            target={isExternalLink ? '_blank' : '_self'}
            rel={isExternalLink ? 'noreferrer' : undefined}
            className='!text-inherit'
          >
            <Typo as='h3'>{entry.title}</Typo>
          </Link>
        ) : (
          <Typo as='h3'>{entry.title}</Typo>
        )
      ) : null}
      {entry.text && (
        <Typo as='p' className='body2'>
          {entry.text || ''}
        </Typo>
      )}
    </div>
  )
}
