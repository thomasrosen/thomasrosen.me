import { cn } from '@/lib/utils'
import type { TimelineEntry } from '@/types'
import { EntryTextContent } from './EntryTextContent'

export function EntryText({
  entry,
  className,
  entryBefore,
  entryAfter,
}: {
  entry: TimelineEntry
  className?: string
  entryBefore?: TimelineEntry
  entryAfter?: TimelineEntry
}) {
  return (
    <div className={cn('mb-4 flex flex-col gap-2', className)}>
      <EntryTextContent
        entry={entry}
        entryBefore={entryBefore}
        entryAfter={entryAfter}
      />
    </div>
  )
}
