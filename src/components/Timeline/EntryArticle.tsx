import { type TimelineEntry } from '@/lib/loadTimeline'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { EntryTextContent } from './EntryTextContent'

export function EntryArticle({
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
  const hasImage = entry.image && typeof entry.image === 'string'
  const isExternalImage = entry.image?.startsWith('http')

  return (
    <div
      className={cn(
        'relative rounded-lg overflow-hidden',
        'w-auto h-auto',
        'bg-background text-card-foreground',
        'flex items-start',
        'p-6 gap-3',
        className
      )}
    >
      {hasImage ? (
        <>
          <Image
            src={entry.image || ''}
            alt={''}
            width={128}
            height={128}
            className='z-10 absolute object-cover w-[128px] h-[128px] blur-[64px] saturate-150 opacity-60 rounded-sm'
            priority={isFirstImage}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            quality={75}
            loading={isFirstImage ? 'eager' : 'lazy'}
            unoptimized={isExternalImage}
          />
          <Image
            src={entry.image || ''}
            alt={''}
            width={128}
            height={128}
            className='z-20 relative object-cover w-[128px] h-[128px] rounded-sm'
            priority={isFirstImage}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            quality={75}
            loading={isFirstImage ? 'eager' : 'lazy'}
            unoptimized={isExternalImage}
          />
        </>
      ) : null}

      <EntryTextContent
        entry={entry}
        entryBefore={entryBefore}
        entryAfter={entryAfter}
      />
    </div>
  )
}
