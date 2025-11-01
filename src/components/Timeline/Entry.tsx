import { EntryImage } from '@/components/Timeline//EntryImage'
import { EntryText } from '@/components/Timeline//EntryText'
import { EntryArticle } from '@/components/Timeline/EntryArticle'
import type { TimelineEntry } from '@/types'

export function Entry({
  entry,
  isFirstImage = false,
  className = '',
  entryBefore,
  entryAfter,
  hiddenTags = [],
}: {
  entry: TimelineEntry
  isFirstImage?: boolean
  className?: string
  entryBefore?: TimelineEntry
  entryAfter?: TimelineEntry
  hiddenTags?: string[]
}) {
  const parsedEntry = {
    ...entry,
    displayAs: entry.displayAs || 'text',
  }

  switch (parsedEntry.displayAs) {
    case 'text':
      return (
        <EntryText
          className={className}
          entry={parsedEntry}
          entryAfter={entryAfter}
          entryBefore={entryBefore}
          hiddenTags={hiddenTags}
        />
      )
    case 'place':
    case 'playlist':
    case 'link':
    case 'article':
      return (
        <EntryArticle
          className={className}
          entry={parsedEntry}
          entryAfter={entryAfter}
          entryBefore={entryBefore}
          hiddenTags={hiddenTags}
        />
      )
    case 'image':
      return (
        <EntryImage
          className={className}
          entry={parsedEntry}
          entryAfter={entryAfter}
          entryBefore={entryBefore}
          hiddenTags={hiddenTags}
          isFirstImage={isFirstImage}
        />
      )
    default:
      return null
  }
}
