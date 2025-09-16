/** biome-ignore-all lint/style/noNestedTernary: it works perfectly fine. i dont care. */
/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: it works perfectly fine. i dont care. */
import Image from 'next/image'
import { findNearestRatio, possibleImageAspectRatios } from '@/lib/findNearestRatio'
import { cn } from '@/lib/utils'
import type { TimelineEntry } from '@/types'
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
  const isExternalImage = typeof entry.image === 'string' && entry.image?.startsWith('http')
  const imageUrl = (typeof entry.image === 'string' ? entry.image : entry.image?.src) || ''
  const hasImage = imageUrl && typeof imageUrl === 'string'

  const displayAs = entry.displayAs

  const targetRatio = entry.imageAspectRatio || 1
  const nearestRatio = findNearestRatio(targetRatio)
  const aspectRatioClass = possibleImageAspectRatios[nearestRatio]

  return (
    <LinkOrDiv
      className={cn(
        'relative overflow-hidden rounded-lg',
        'h-full w-full',
        'bg-background text-card-foreground',
        'flex flex-wrap xs:flex-nowrap content-start items-start',
        'gap-6 p-6',
        'border border-border',
        'cursor-pointer hover:bg-accent',
        'transition-colors duration-150',
        'z-10',
        className
      )}
      href={entry.url}
    >
      {hasImage ? (
        <>
          {displayAs === 'playlist' ? (
            <div
              className="image_backdrop_glow"
              style={{
                // @ts-expect-error
                '--background-image': `url(${entry.image})`,
              }}
            />
          ) : null}
          <Image
            alt={''}
            className={cn(
              'absolute z-10 h-auto w-[128px] shrink-0 rounded-sm object-cover opacity-60 blur-[64px] saturate-150'
            )}
            height={128}
            loading={isFirstImage ? 'eager' : 'lazy'}
            priority={isFirstImage}
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={imageUrl}
            unoptimized={isExternalImage}
            width={128}
          />
          <Image
            alt={''}
            className={cn(
              'relative z-20 h-auto w-[128px] rounded-sm object-cover',
              displayAs === 'playlist' && 'contrast-110 saturate-110'
            )}
            height={128}
            loading={isFirstImage ? 'eager' : 'lazy'}
            priority={isFirstImage}
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={imageUrl}
            unoptimized={isExternalImage}
            width={128}
          />
        </>
      ) : displayAs === 'playlist' ? (
        <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-sm bg-accent">
          <Emoji className="text-5xl">🎵</Emoji>
        </div>
      ) : displayAs === 'link' ? (
        <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-sm bg-accent">
          <Emoji className="text-lg">🔗</Emoji>
        </div>
      ) : (
        <div className="flex h-[128px] w-[128px] shrink-0 items-center justify-center rounded-sm bg-accent">
          <Emoji className="text-5xl">📄</Emoji>
        </div>
      )}

      <EntryTextContent
        entry={entry}
        entryAfter={entryAfter}
        entryBefore={entryBefore}
        showTags={true}
      />
    </LinkOrDiv>
  )
}
