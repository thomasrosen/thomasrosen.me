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

export function TimelineMapReactMap({ entries = [] }: { entries?: TimelineEntry[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const entryRef = useRef<TimelineEntry | null>(null)

  return (
    <div className="h-screen w-screen">
      <ReactMap
        entries={entries}
        key={JSON.stringify(entries)}
        onEntryMarkerClick={({ entry }) => {
          entryRef.current = entry
          setIsOpen(true)
        }}
        renderEntryMarker={({ entry, index, ref, onImageLoaded }) => (
          <Marker entry={entry} index={index} onImageLoaded={onImageLoaded} ref={ref} />
        )}
      />

      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogContent className="z-100">
          <DialogHeader>
            <DialogTitle>Entry JSON</DialogTitle>
            <DialogDescription>For now only the JSON.</DialogDescription>
          </DialogHeader>

          {entryRef.current && <pre>{JSON.stringify(entryRef.current, null, 2)}</pre>}

          <DialogFooter className="sm:justify-start">
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
