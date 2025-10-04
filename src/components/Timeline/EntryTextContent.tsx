import { Typo } from '@/components/Typo'
import { cn } from '@/lib/utils'
import type { TimelineEntry } from '@/types'
import { Emoji } from '../Emoji'
import { Badge } from '../ui/badge'

export function EntryTextContent({
  // entryBefore,
  entry,
  // entryAfter,
  showTags = false,
  hiddenTags = [],
}: {
  entryBefore?: TimelineEntry
  entry: TimelineEntry
  entryAfter?: TimelineEntry
  showTags?: boolean
  hiddenTags?: string[]
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

  const tagsToFilterOut = ['article', 'project', 'press', 'playlist', ...hiddenTags]
  const tags: string[] = entry.tags?.filter((tag) => !tagsToFilterOut.includes(tag)) || []

  const showTagsInner = showTags && tags?.length
  const hasAudio = !!entry.audio
  const showMetadataHeader = entry.date || showTagsInner || hasAudio

  return (
    <div className="flex w-full flex-col gap-y-3 text-[0px] leading-none">
      {showMetadataHeader ? (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {entry.date ? (
            <Typo as="time" className="shrink-0" variant="muted">
              {noTimeDefined ? dateString : fullDateTimeString}
            </Typo>
          ) : null}

          <div className="smooth-rounded-full h-[1px] w-auto min-w-[16px] shrink-1 grow-1 bg-foreground opacity-10" />

          {hasAudio || showTagsInner ? (
            <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
              {hasAudio ? <Emoji className="inline-block text-base">🔊</Emoji> : null}

              {showTagsInner
                ? tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="accent">
                      {tag}
                    </Badge>
                  ))
                : null}
            </div>
          ) : null}
        </div>
      ) : null}

      {entry.title ? (
        <Typo as="h3" className="mb-0">
          {entry.title}
        </Typo>
      ) : null}

      {entry.author && (
        <Typo as="small" className="-mt-2 mb-2 font-bold" variant="muted">
          by {entry.author}
        </Typo>
      )}

      {entry.text && (
        <Typo
          className={cn('!mb-0', entry.displayAs === 'image' && 'line-clamp-3')}
          variant="small"
        >
          {entry.text}
        </Typo>
      )}

      {entry.url && !entry.url.startsWith('/') ? (
        <Typo as="div" className="!text-sm break-all" variant="muted">
          {entry.url}
        </Typo>
      ) : null}
    </div>
  )
}
