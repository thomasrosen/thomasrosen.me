import type { TimelineEntry } from '@/types'
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
      return (
        <EntryText
          className={className}
          entry={parsedEntry}
          entryAfter={entryAfter}
          entryBefore={entryBefore}
        />
      )
    case 'playlist':
    case 'link':
    case 'article':
      return (
        <EntryArticle
          className={className}
          entry={parsedEntry}
          entryAfter={entryAfter}
          entryBefore={entryBefore}
        />
      )
    case 'image':
      return (
        <EntryImage
          className={className}
          entry={parsedEntry}
          entryAfter={entryAfter}
          entryBefore={entryBefore}
          isFirstImage={isFirstImage}
        />
      )
    default:
      return null
  }
}
