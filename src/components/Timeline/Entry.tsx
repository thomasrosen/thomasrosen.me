import { type TimelineEntry } from '@/lib/loadTimeline'
import { EntryArticle } from './EntryArticle'
import { EntryImage } from './EntryImage'
import { EntryText } from './EntryText'

export function Entry({
  entry,
  isFirstImage = false,
  className = '',
  entryBefore,
  entryAfter,
}: {
  entry: TimelineEntry
  isFirstImage?: boolean
  className?: string
  entryBefore?: TimelineEntry
  entryAfter?: TimelineEntry
}) {
  const parsedEntry = {
    ...entry,
    displayAs: entry.displayAs || 'text',
  }

  switch (parsedEntry.displayAs) {
    case 'text':
    case 'link':
      return (
        <EntryText
          entry={parsedEntry}
          className={className}
          entryBefore={entryBefore}
          entryAfter={entryAfter}
        />
      )
    case 'image':
      return (
        <EntryImage
          entry={parsedEntry}
          isFirstImage={isFirstImage}
          className={className}
          entryBefore={entryBefore}
          entryAfter={entryAfter}
        />
      )
    case 'article':
      return (
        <EntryArticle
          entry={parsedEntry}
          isFirstImage={isFirstImage}
          className={className}
          entryBefore={entryBefore}
          entryAfter={entryAfter}
        />
      )
    default:
      return null
  }
}
