import { cn } from '@/lib/utils'
import type { TimelineEntry } from '@/types'
import Image from 'next/image'
import { EntryTextContent } from './EntryTextContent'

export function EntryImage({
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
        'relative rounded-xl bg-background overflow-hidden',
        'w-auto h-auto',
        'group/image',
        className
      )}
    >
      {hasImage ? (
        <Image
          src={entry.image || ''}
          blurDataURL={entry.image_blurDataURL || undefined}
          alt={''}
          fill
          className='z-20 relative object-cover'
          priority={isFirstImage}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          quality={75}
          loading={isFirstImage ? 'eager' : 'lazy'}
          unoptimized={isExternalImage}
        />
      ) : null}
      <div
        className={cn(
          'z-30 absolute -bottom-2 -left-2 -right-2 p-2 w-[calc(100%+(var(--spacing)*2))] pt-[64px]',
          'transition-transform duration-150 will-change-[transform] group-hover/image:translate-y-[100%]'
        )}
      >
        <div className='z-20 absolute bottom-0 left-0 right-0 h-[calc(100%-32px)] backdrop-blur-[4px] mask-t-from-[calc(100%-64px)]' />
        <div className='z-30 absolute bottom-0 left-0 right-0 h-[calc(100%-48px)] backdrop-blur-[8px] mask-t-from-[calc(100%-64px)]' />
        <div className='z-40 absolute bottom-0 left-0 right-0 h-[calc(100%-64px)] backdrop-blur-[16px] mask-t-from-[calc(100%-64px)]' />
        <div className='z-50 absolute bottom-0 left-0 right-0 h-[calc(100%-32px)] mask-t-to-[100%] bg-background opacity-30' />
        <div className='relative z-60 text-foreground flex flex-col gap-2 p-4'>
          <EntryTextContent
            entry={entry}
            entryBefore={entryBefore}
            entryAfter={entryAfter}
          />
        </div>
      </div>
    </div>
  )
}
