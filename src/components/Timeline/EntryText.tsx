import { EntryTextContent } from '@/components/Timeline/EntryTextContent'
import { cn } from '@/lib/utils'
import type { TimelineEntry } from '@/types'

export function EntryText({
  entry,
  className,
  entryBefore,
  entryAfter,
  hiddenTags = [],
}: {
  entry: TimelineEntry
  className?: string
  entryBefore?: TimelineEntry
  entryAfter?: TimelineEntry
  hiddenTags?: string[]
}) {
  return (
    <div className={cn('mb-4 flex flex-col gap-2', className)}>
      <EntryTextContent
        entry={entry}
        entryAfter={entryAfter}
        entryBefore={entryBefore}
        hiddenTags={hiddenTags}
      />
    </div>
  )
}
