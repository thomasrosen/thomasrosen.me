'use client'

import { pickFakeRandom } from '@/lib/pickFakeRandom'
import Image from 'next/image'
import { useCallback, useRef } from 'react'
// import { Emoji } from '@/components/Emoji'
import { cn } from '@/lib/utils'
import type { TimelineEntry } from '@/types'
import { LinkOrDiv } from './LinkOrDiv'

// function BigEmoij(props: React.ComponentProps<typeof Emoji>) {
//   return (
//     <div className="h-[48px] w-[48px] text-center font-black text-[48px] leading-[48px]">
//       <Emoji {...props} />
//     </div>
//   )
// }

export function Marker({
  entry,
  index,
  ref,
  onImageLoaded,
}: {
  entry: TimelineEntry
  index: number
  ref?: (element: HTMLDivElement | null) => void
  onImageLoaded?: ({ element }: { element: HTMLDivElement | null }) => void
}) {
  const isVertical = entry.imageOrientation === 'v'
  const imageSrc = typeof entry.image === 'string' ? entry.image : entry.image?.src
  const elementRef = useRef<HTMLDivElement>(null)

  // } else if (entry.displayAs === 'image') {
  //   marker_icon = <BigEmoij aria-hidden="true">📸</BigEmoij>
  //   custom_classes = 'max-h-[48px] max-w-[48px]'
  // } else if (entry.displayAs === 'article') {
  //   marker_icon = <BigEmoij aria-hidden="true">📄</BigEmoij>
  //   custom_classes = 'max-h-[48px] max-w-[48px]'
  // } else if (entry.displayAs === 'audio') {
  //   marker_icon = <BigEmoij aria-hidden="true">🔊</BigEmoij>
  //   custom_classes = 'max-h-[48px] max-w-[48px]'
  // } else {
  //   marker_icon = <BigEmoij aria-hidden="true">📍</BigEmoij>
  //   custom_classes = 'max-h-[48px] max-w-[48px]'

  // group-hover/marker:classname
  // [.hover_&]:classname

  const onImageLoadedInternal = useCallback(() => {
    if (onImageLoaded) {
      onImageLoaded({ element: elementRef.current })
    }
  }, [onImageLoaded])

  return (
    <div
      className="group/marker relative z-10 flex h-[128px] w-[128px] items-center justify-center"
      ref={ref || elementRef}
    >
      <div className="relative flex h-[128px] w-[128px] items-center justify-center overflow-hidden [.hover_&]:overflow-visible">
        <LinkOrDiv
          className={cn(
            'relative',
            'grid grid-cols-[auto_auto] items-start gap-0',
            'h-auto w-auto',
            'cursor-pointer drop-shadow-md/10',
            'transition-transform ease-in-out',
            '[.hover_&]:rotate-0 [.hover_&]:scale-135',
            'bg-transparent',
            pickFakeRandom(
              ['-rotate-12', '-rotate-6', '-rotate-3', 'rotate-3', 'rotate-6', 'rotate-12'],
              index
            ),
            pickFakeRandom(
              entry.displayAs === 'place' ? ['scale-30'] : ['scale-90', 'scale-100', 'scale-110'],
              index
            ),
            imageSrc && (isVertical ? 'max-h-[128px] max-w-[128px]' : 'max-h-[128px] max-w-[128px]')
          )}
          // href={entry.url}
        >
          {
            imageSrc ? (
              <Image
                alt={entry.title || 'Photo'}
                // blurDataURL={typeof entry.image === 'string' ? undefined : entry.image?.blurDataURL}
                className={cn(
                  // 'rounded-sm',
                  // 'overflow-hidden',
                  'rounded-md border-2 border-background bg-background',
                  isVertical ? '!h-auto w-[64px]' : '!w-auto h-[64px]'
                )}
                height={32}
                loading="eager"
                onError={onImageLoadedInternal}
                onLoad={onImageLoadedInternal}
                // placeholder="blur"
                priority={true}
                // quality={100}
                src={imageSrc}
                width={32}
              />
            ) : null
            // (
            // (() => {
            //   if (onImageLonImageLoadedInternaloaded) {
            //     onImageLoadedInternal()
            //   }
            //   return null
            // })()
            // )
          }

          {entry.title?.length ? (
            <>
              <svg aria-hidden="true" height="0" width="0">
                {/* source for svg-filter: https://codepen.io/thormeier/pen/JjXmppX */}
                <defs>
                  <clipPath clipPathUnits="objectBoundingBox" id="stickyClip">
                    <path
                      d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                    />
                  </clipPath>
                </defs>
              </svg>
              <div
                className={cn(
                  'absolute right-0 bottom-0 flex h-[64px] w-[64px] flex-col gap-1 overflow-hidden text-ellipsis text-pretty p-1 font-[Ubuntu] text-[8px] leading-[1.1]',
                  'transition-transform duration-300 ease-in-out [.hover_&]:rotate-0 [.hover_&]:scale-90',
                  imageSrc
                    ? 'translate-x-1/4 translate-y-1/4 [.hover_&]:translate-x-1/8 [.hover_&]:translate-y-1/8'
                    : 'translate-x-1/2 translate-y-1/2',
                  pickFakeRandom(
                    ['-rotate-12', '-rotate-6', '-rotate-3', 'rotate-3', 'rotate-6', 'rotate-12'],
                    index * 1.5
                  ),
                  pickFakeRandom(['scale-70', 'scale-80'], index * 1.5),
                  'text-black',
                  pickFakeRandom(['bg-[#ff65a3]', 'bg-[#fff740]', 'bg-[#7afcff]'], index * 1.5)
                )}
                style={{
                  clipPath: 'url(#stickyClip)',
                  // clipPath: 'polygon(100% 0, 100% 70%, 70% 100%, 0 100%, 0 0)',
                  // backgroundImage: `linear-gradient(
                  //   180deg,
                  //   rgba(187, 235, 255, 1) rgb(255 255 255 / 0.2) 0%,
                  //   rgba(187, 235, 255, 1) rgb(255 255 255 / 0.2) 12%,
                  //   rgba(170, 220, 241, 1) rgb(255 255 255 / 0.1) 75%,
                  //   rgba(195, 229, 244, 1) rgb(255 255 255 / 0.3) 100%
                  // )`,
                  backgroundImage: `linear-gradient(
                180deg,
                rgb(255 255 255 / 0.1) 0%,
                rgb(255 255 255 / 0.075) 12%,
                rgb(255 255 255 / 0.05) 75%,
                rgb(255 255 255 / 0.4) 100%
              )`,
                }}
              >
                <strong>{entry.title}</strong>
                <span className="text-[6px] opacity-50">{entry.text}</span>
              </div>
            </>
          ) : null}

          {/* {entry.title?.length ? (
        <div className="h-full w-[0px]">
          <div className="pointer-events-none ml-3 flex h-full min-w-[200px] items-center text-balance font-[Ubuntu] font-bold text-lg leading-[1.1] opacity-0 transition-opacity [.hover_&]:opacity-100">
            {entry.title}
          </div>
        </div>
      ) : null} */}
        </LinkOrDiv>
      </div>
    </div>
  )
}
