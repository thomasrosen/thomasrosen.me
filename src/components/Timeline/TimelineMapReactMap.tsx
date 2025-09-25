'use client'

import Image from 'next/image'
import { ReactMap } from '@/components/ReactMap'
import type { TimelineEntry } from '@/types'
import { Emoji } from '../Emoji'

export function TimelineMapReactMap({ entries = [] }: { entries?: TimelineEntry[] }) {
  return (
    <div className="green-tint h-screen w-screen">
      <ReactMap
        entries={entries}
        onEntryMarkerClick={({ entry }) => {
          alert(JSON.stringify(entry, null, 2))
        }}
        renderEntryMarker={({ entry, index }) => {
          const imageSrc = typeof entry.image === 'string' ? entry.image : entry.image?.src

          return (
            <div className="flex h-auto w-auto max-w-[64px] cursor-pointer flex-col overflow-hidden rounded-md bg-background p-1 shadow-md transition-transform hover:scale-125">
              {imageSrc ? (
                <Image
                  alt=""
                  className="h-auto w-auto overflow-hidden rounded-sm"
                  height={64}
                  src={imageSrc || `https://picsum.photos/id/${index}/64/`}
                  title={`Marker: ${entry.id} !!!`}
                  width={64}
                />
              ) : (
                <Emoji aria-hidden="true">🎸</Emoji>
              )}
            </div>
          )
        }}
      />
    </div>
  )
}
