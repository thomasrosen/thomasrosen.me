import { cn } from '@/lib/utils'
import type { TimelineEntry } from '@/types'
import Image from 'next/image'
import { Emoji } from '../Emoji'
import { EntryTextContent } from './EntryTextContent'
import { LinkOrDiv } from './LinkOrDiv'

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

  const displayAs = entry.displayAs

  return (
    <LinkOrDiv
      href={entry.url}
      className={cn(
        'relative rounded-lg overflow-hidden',
        'w-full h-full',
        'bg-background text-card-foreground',
        'flex items-start xs:flex-nowrap flex-wrap content-start',
        'p-6 gap-6',
        'border border-border',
        'hover:bg-accent cursor-pointer',
        'transition-colors duration-150',
        'z-10',
        className
      )}
    >
      {hasImage ? (
        <>
          {displayAs === 'playlist' ? (
            <div
              className='image_backdrop_glow'
              style={{
                // @ts-ignore
                '--background-image': `url(${entry.image})`,
              }}
            />
          ) : null}
          <Image
            src={entry.image || ''}
            blurDataURL={entry.image_blurDataURL || undefined}
            alt={''}
            width={128}
            height={128}
            className='shrink-0 z-10 absolute object-cover w-[128px] h-[128px] blur-[64px] saturate-150 opacity-60 rounded-sm'
            priority={isFirstImage}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            quality={75}
            loading={isFirstImage ? 'eager' : 'lazy'}
            unoptimized={isExternalImage}
          />
          <Image
            src={entry.image || ''}
            blurDataURL={entry.image_blurDataURL || undefined}
            alt={''}
            width={128}
            height={128}
            className={cn(
              'z-20 relative object-cover w-[128px] h-[128px] rounded-sm',
              displayAs === 'playlist' && 'contrast-110 saturate-110'
            )}
            priority={isFirstImage}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            quality={75}
            loading={isFirstImage ? 'eager' : 'lazy'}
            unoptimized={isExternalImage}
          />
        </>
      ) : displayAs === 'link' ? (
        <div className='shrink-0 w-[32px] h-[32px] bg-accent rounded-sm flex items-center justify-center'>
          <Emoji className='text-lg'>🔗</Emoji>
        </div>
      ) : (
        <div className='shrink-0 w-[128px] h-[128px] bg-accent rounded-sm flex items-center justify-center'>
          <Emoji className='text-5xl'>📄</Emoji>
        </div>
      )}

      <EntryTextContent
        entry={entry}
        entryBefore={entryBefore}
        entryAfter={entryAfter}
        showTags={true}
      />
    </LinkOrDiv>
  )
}
