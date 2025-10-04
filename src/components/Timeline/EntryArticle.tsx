/** biome-ignore-all lint/style/noNestedTernary: it works perfectly fine. i dont care. */
/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: it works perfectly fine. i dont care. */
import Image from 'next/image'
// import { findNearestRatio, possibleImageAspectRatios } from '@/lib/findNearestRatio'
import { cn } from '@/lib/utils'
import type { TimelineEntry } from '@/types'
import { Emoji } from '../Emoji'
import { EntryTextContent } from './EntryTextContent'
import { LinkOrDiv } from './LinkOrDiv'

export function EntryArticle({
  entry,
  isFirstImage = false,
  className = '',
  // entryBefore,
  // entryAfter,
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

  const displayAs = entry.displayAs

  // const targetRatio = entry.imageAspectRatio || 1
  // const nearestRatio = findNearestRatio(targetRatio)
  // const aspectRatioClass = possibleImageAspectRatios[nearestRatio]

  return (
    <LinkOrDiv
      className={cn(
        '@container/card',
        'smooth-rounded-4xl relative overflow-hidden',
        'h-full w-full',
        'bg-background text-card-foreground',
        'p-6',
        'smooth-border smooth-border-border/30 hover:smooth-border-border',
        'cursor-pointer hover:bg-accent',
        'transition-colors duration-150',
        'z-10',
        className
      )}
      href={entry.url}
    >
      <div className={cn('flex flex-wrap @sm/card:flex-nowrap content-start items-start gap-6')}>
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
                'smooth-rounded-lg absolute z-10 h-auto @lg/card:w-[calc(32px*6)] @md/card:w-[calc(32px*5)] @sm/card:w-[calc(32px*4)] w-full shrink-0 object-cover opacity-60 blur-[64px] saturate-150 transition-all'
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
                'smooth-rounded-lg relative z-20 h-auto @lg/card:w-[calc(32px*6)] @md/card:w-[calc(32px*5)] @sm/card:w-[calc(32px*4)] w-full object-cover transition-all',
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
          <div className="smooth-rounded-lg flex h-[32px] @sm/card:w-[32px] w-full shrink-0 items-center justify-center bg-accent">
            <Emoji className="text-5xl">🎵</Emoji>
          </div>
        ) : displayAs === 'link' ? null : (
          // <div className="flex h-[32px] @sm/card:w-[32px] w-[32px] shrink-0 items-center justify-center smooth-rounded-lg bg-accent">
          //   <Emoji className="text-lg">🔗</Emoji>
          // </div>
          <div className="smooth-rounded-lg flex @lg/card:h-[calc(32px*6)] @md/card:h-[calc(32px*5)] h-[calc(32px*4)] @lg/card:w-[calc(32px*6)] @md/card:w-[calc(32px*5)] @sm/card:w-[calc(32px*4)] w-full shrink-0 items-center justify-center bg-accent">
            <Emoji className="text-5xl">📄</Emoji>
          </div>
        )}

        <EntryTextContent
          entry={entry}
          hiddenTags={hiddenTags}
          // entryAfter={entryAfter}
          // entryBefore={entryBefore}
          showTags={true}
        />
      </div>
    </LinkOrDiv>
  )
}
