'use client'

import Image from 'next/image'
import { ReactMap } from '@/components/ReactMap'
import { cn } from '@/lib/utils'
import type { TimelineEntry } from '@/types'
import { Emoji } from '../Emoji'

function pickFakeRandom(options: string[], fakeRandomness: number) {
  // biome-ignore lint/nursery/noBitwiseOperators: seems to be more complicated with Math functions.
  const hash = (fakeRandomness * 2_654_435_761) >>> 0 // Knuth multiplicative hash
  const randomOption = options[hash % options.length]
  return randomOption
}

export function TimelineMapReactMap({ entries = [] }: { entries?: TimelineEntry[] }) {
  return (
    <div className="green-tint h-screen w-screen">
      <ReactMap
        entries={entries}
        onEntryMarkerClick={({ entry }) => {
          alert(JSON.stringify(entry, null, 2))
        }}
        renderEntryMarker={({ entry, index }) => {
          const isVertical = entry.imageOrientation === 'v'
          const imageSrc = typeof entry.image === 'string' ? entry.image : entry.image?.src

          return (
            <div
              className={cn(
                'flex h-auto w-auto cursor-pointer flex-col overflow-hidden rounded-md bg-background p-0 shadow-md transition-transform hover:rotate-0 hover:scale-125',
                'border-2 border-background',
                pickFakeRandom(
                  ['-rotate-12', '-rotate-6', '-rotate-3', 'rotate-3', 'rotate-6', 'rotate-12'],
                  index
                ),
                pickFakeRandom(['scale-90', 'scale-100', 'scale-110'], index)
              )}
            >
              {imageSrc ? (
                <Image
                  alt=""
                  className={cn(
                    // 'rounded-sm',
                    // 'overflow-hidden',
                    isVertical ? '!h-auto w-[64px]' : '!w-auto h-[64px]'
                  )}
                  height={64}
                  src={imageSrc || `https://picsum.photos/id/${index}/64/`}
                  title={`Marker: ${entry.id} !!!`}
                  width={64}
                />
              ) : (
                <Emoji aria-hidden="true">📍</Emoji>
              )}
            </div>
          )
        }}
      />
    </div>
  )
}
