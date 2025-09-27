'use client'

import Image from 'next/image'
import { Emoji } from '@/components/Emoji'
import { cn } from '@/lib/utils'
import type { TimelineEntry } from '@/types'
import { LinkOrDiv } from './LinkOrDiv'

function pickFakeRandom(options: string[], fakeRandomness: number) {
  // biome-ignore lint/nursery/noBitwiseOperators: seems to be more complicated with Math functions.
  const hash = (fakeRandomness * 2_654_435_761) >>> 0 // Knuth multiplicative hash
  const randomOption = options[hash % options.length]
  return randomOption
}

function BigEmoij(props: React.ComponentProps<typeof Emoji>) {
  return (
    <div className="h-[48px] w-[48px] text-center font-black text-[48px] leading-[48px]">
      <Emoji {...props} />
    </div>
  )
}

export function Marker({ entry, index }: { entry: TimelineEntry; index: number }) {
  const isVertical = entry.imageOrientation === 'v'
  const imageSrc = typeof entry.image === 'string' ? entry.image : entry.image?.src

  let marker_icon: React.ReactNode = null
  let custom_classes = ''
  if (imageSrc) {
    marker_icon = (
      <Image
        alt=""
        className={cn(
          // 'rounded-sm',
          // 'overflow-hidden',
          'rounded-md border-2 border-background bg-background',
          isVertical ? '!h-auto w-[64px]' : '!w-auto h-[64px]'
        )}
        height={64}
        src={imageSrc || `https://picsum.photos/id/${index}/64/`}
        title={`Marker: ${entry.id} !!!`}
        width={64}
      />
    )
    custom_classes = isVertical ? 'max-h-[128px] max-w-[128px]' : 'max-h-[128px] max-w-[128px]'
  } else if (entry.displayAs === 'image') {
    marker_icon = <BigEmoij aria-hidden="true">📸</BigEmoij>
    custom_classes = 'max-h-[48px] max-w-[48px]'
  } else if (entry.displayAs === 'article') {
    marker_icon = <BigEmoij aria-hidden="true">📄</BigEmoij>
    custom_classes = 'max-h-[48px] max-w-[48px]'
  } else if (entry.displayAs === 'audio') {
    marker_icon = <BigEmoij aria-hidden="true">🔊</BigEmoij>
    custom_classes = 'max-h-[48px] max-w-[48px]'
  } else {
    marker_icon = <BigEmoij aria-hidden="true">📍</BigEmoij>
    custom_classes = 'max-h-[48px] max-w-[48px]'
  }

  return (
    <LinkOrDiv
      className={cn(
        'group/marker',
        'grid grid-cols-[auto_auto] items-start gap-0',
        'h-auto w-auto',
        'cursor-pointer drop-shadow-md/10',
        'transition-transform hover:rotate-0 hover:scale-125',
        'bg-transparent',
        pickFakeRandom(
          ['-rotate-12', '-rotate-6', '-rotate-3', 'rotate-3', 'rotate-6', 'rotate-12'],
          index
        ),
        pickFakeRandom(['scale-90', 'scale-100', 'scale-110'], index),
        custom_classes
      )}
      href={entry.url}
    >
      {marker_icon}

      {entry.title?.length ? (
        <div className="h-full w-[0px]">
          <div className="pointer-events-none ml-3 flex h-full min-w-[200px] items-center text-balance font-[Ubuntu] font-bold text-lg leading-[1.1] opacity-0 transition-opacity group-hover/marker:opacity-100">
            {entry.title}
          </div>
        </div>
      ) : null}
    </LinkOrDiv>
  )
}
