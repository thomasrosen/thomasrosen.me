'use client'

import { ReactMap } from '@/components/ReactMap'
import { Marker } from '@/components/Timeline/Marker'
import { Timeline } from '@/components/Timeline/Timeline'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { TimelineEntry } from '@/types'
import { useRef, useState } from 'react'

export function TimelineMapReactMap({ entries = [] }: { entries?: TimelineEntry[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedEntriesRef = useRef<TimelineEntry[]>([])

  return (
    <div className="h-screen w-screen">
      <ReactMap
        entries={entries}
        key={JSON.stringify(entries)}
        onEntryMarkerClick={({ entry }) => {

          // const okayDistance = 100

          const entriesNearby = entries.filter((e) => {
            if (e.latitude === undefined || e.longitude === undefined || entry.longitude === undefined || entry.latitude === undefined) {
              return false
            }
            const distance = Math.sqrt(
              Math.pow(e.latitude - entry.latitude, 2) +
                Math.pow(e.longitude - entry.longitude, 2)
            )
            return distance < 0.01 // Adjust the threshold as needed
          })

          selectedEntriesRef.current = entriesNearby // [entry]
          setIsOpen(true)
        }}
        renderEntryMarker={({ entry, index, ref, onImageLoaded }) => (
          <Marker entry={entry} index={index} onImageLoaded={onImageLoaded} ref={ref} />
        )}
      />

      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogContent
          className="z-100 max-h-full w-max max-w-full rounded-4xl sm:w-max sm:max-w-full"
          showCloseButton={false}
        >
          <DialogHeader className="hidden">
            <DialogTitle>Details</DialogTitle>
            <DialogDescription>This is not finished.</DialogDescription>
          </DialogHeader>

          <Timeline entries={selectedEntriesRef.current} showTimeHeadlines={true} />

          <DialogFooter className="justify-start sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
