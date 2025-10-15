'use client'

import { ReactMap } from '@/components/ReactMap'
import type { TimelineEntry } from '@/types'
import { Marker } from './Marker'

export function TimelineMapReactMap({ entries = [] }: { entries?: TimelineEntry[] }) {
  return (
    <div className="h-screen w-screen">
      <ReactMap
        entries={entries}
        onEntryMarkerClick={({ entry }) => {
          alert(JSON.stringify(entry, null, 2))
        }}
        renderEntryMarker={({ entry, index, ref, onImageLoaded }) => (
          <Marker entry={entry} index={index} onImageLoaded={onImageLoaded} ref={ref} />
        )}
      />
    </div>
  )
}
