'use client'

import { ReactMap } from '@/components/ReactMap'
import { Marker } from '@/components/Timeline/Marker'
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
import { Timeline } from './Timeline'

export function TimelineMapReactMap({ entries = [] }: { entries?: TimelineEntry[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedEntriesRef = useRef<TimelineEntry[]>([])

  return (
    <div className="h-screen w-screen">
      <ReactMap
        entries={entries}
        key={JSON.stringify(entries)}
        onEntryMarkerClick={({ entry }) => {
          selectedEntriesRef.current = [entry]
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
