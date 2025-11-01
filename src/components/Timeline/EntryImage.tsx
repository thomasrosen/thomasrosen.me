import { EntryTextContent } from '@/components/Timeline/EntryTextContent'
import { cn } from '@/lib/utils'
import type { TimelineEntry } from '@/types'
import Image from 'next/image'

export function EntryImage({
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
  const isExternalImage = typeof entry.image === 'string' && entry.image?.startsWith('http')
  const imageUrl = (typeof entry.image === 'string' ? entry.image : entry.image?.src) || ''
  const hasImage = imageUrl && typeof imageUrl === 'string'

  return (
    <div
      className={cn(
        'group/image relative h-auto w-auto overflow-hidden rounded-[0.48rem]',
        className
      )}
    >
      {hasImage ? (
        <div className="smooth-rounded-lg relative z-20 h-full w-full overflow-hidden">
          <Image
            alt={''}
            className="relative object-cover"
            fill
            loading={isFirstImage ? 'eager' : 'lazy'}
            priority={isFirstImage}
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={imageUrl}
            unoptimized={isExternalImage}
          />
        </div>
      ) : null}
      <div
        className={cn(
          '-bottom-2 -left-2 -right-2 absolute z-30 w-[calc(100%+(var(--spacing)*2))] overflow-hidden rounded-[0.52rem] p-2 pt-[64px]',
          'transition-transform duration-150 group-hover/image:translate-y-[100%]'
        )}
      >
        <div className="mask-t-from-[calc(100%-64px)] absolute right-0 bottom-0 left-0 z-20 h-[calc(100%-32px)] opacity-70 backdrop-blur-[4px]" />
        <div className="mask-t-from-[calc(100%-64px)] absolute right-0 bottom-0 left-0 z-30 h-[calc(100%-48px)] opacity-80 backdrop-blur-[8px]" />
        <div className="mask-t-from-[calc(100%-64px)] absolute right-0 bottom-0 left-0 z-40 h-[calc(100%-64px)] opacity-90 backdrop-blur-[16px]" />
        <div className="mask-t-to-[100%] absolute right-0 bottom-0 left-0 z-50 h-[calc(100%-32px)] bg-background opacity-30" />

        <div className="relative z-60 flex flex-col gap-2 p-4 text-foreground">
          <EntryTextContent
            entry={entry}
            entryAfter={entryAfter}
            entryBefore={entryBefore}
            hiddenTags={hiddenTags}
          />
        </div>
      </div>
    </div>
  )
}
