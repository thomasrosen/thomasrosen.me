import { Typo } from '@/components/Typo'
import '@/fonts/petrona-v28-latin/index.css'
import type React from 'react'
import { findNearestRatio, possibleImageAspectRatios } from '@/lib/findNearestRatio'
import { cn } from '@/lib/utils'
import { Entry } from './Entry'
import { getGroupedEntries } from './getGroupedEntries'
import { getMonthName } from './getMonthName'

export async function Timeline({
  tags = [],
  showTimeHeadlines = false,
  hiddenTags = [],
}: {
  tags?: string[]
  showTimeHeadlines?: boolean
  hiddenTags?: string[]
}) {
  const groupedEntries = await getGroupedEntries({
    tags,
  })

  let entriesToCombineWith: React.ReactNode[] = []

  const groupedEntriesAsArray = Object.entries(groupedEntries)

  let yearBefore: string | null = null
  let monthBefore: string | null = null
  // let dayBefore: string | null = null

  return (
    <div className="w-full space-y-4">
      {groupedEntriesAsArray.map(([key, entries], index) => {
        const isLastGroup = index === groupedEntriesAsArray.length - 1

        const date = new Date(key)
        const year = date.getFullYear().toString()
        const month = date.getMonth().toString()
        // const day = date.getDate().toString()

        const isNewYear = year !== yearBefore
        const isNewMonth = month !== monthBefore

        const innerGroupEverything = false // !isNewYear && !isNewMonth &&

        yearBefore = year
        monthBefore = month
        // dayBefore = day

        const isOnlyOneEntry = entries.length === 1

        const entriesContent = entries.map((entry, index_entry) => {
          const before = entries[index_entry - 1]
          const after = entries[index_entry + 1]

          const displayAs = entry.displayAs || 'text'

          // const isSurroundedByImages = before?.displayAs === 'image' || after?.displayAs === 'image'

          const entryClone = { ...entry }
          if (displayAs === 'image') {
            entryClone.imageAspectRatio = entryClone.imageAspectRatio || 1
          }
          if (displayAs !== 'image') {
            entryClone.imageAspectRatio = entryClone.imageAspectRatio || 4
          }

          const targetRatio = entryClone.imageAspectRatio || 1
          const nearestRatio = findNearestRatio(targetRatio)
          const aspectRatioClass = possibleImageAspectRatios[nearestRatio]

          return (
            <Entry
              className={cn(
                'h-full w-full',
                'col-span-1 row-span-1',

                aspectRatioClass,

                targetRatio === 2 && 'xs:col-span-2',
                targetRatio === 0.5 && 'row-span-2',

                displayAs !== 'image'
                  ? '!aspect-[unset] xs:col-span-full h-auto xs:max-w-[var(--content-box-width)]'
                  : null,

                displayAs === 'image' && targetRatio > 1
                  ? 'xs:col-span-2 h-auto' // xs:max-w-[var(--content-box-width)]
                  : null

                // ...(!innerGroupEverything &&
                // displayAs === 'image' &&
                // !isSurroundedByImages
                //   ? [
                //       'xs:max-w-[var(--content-box-width)] col-span-1 xs:col-span-full xs:h-auto',
                //     ]
                //   : []),

                // displayAs === 'playlist' &&
                //   'xs:col-span-2 xs:w-full xs:h-auto aspect-[unset]'
              )}
              entry={entryClone}
              entryAfter={after}
              entryBefore={before}
              hiddenTags={hiddenTags}
              isFirstImage={
                false
                // index_entry === 0 && entryClone.displayAs === 'image'
              }
              key={`${entryClone.date}-${index_entry}`}
            />
          )
        })

        entriesToCombineWith.push(...entriesContent)
        let entriesForRender: React.ReactNode[] = []
        if (
          (innerGroupEverything && !isLastGroup) ||
          (isOnlyOneEntry && !isLastGroup && !showTimeHeadlines)
        ) {
          entriesForRender = []
        } else {
          entriesForRender = [...entriesToCombineWith]
          entriesToCombineWith = []
        }

        if (!showTimeHeadlines && entriesForRender.length === 0) {
          return null
        }

        return (
          <div className="mygrid place-content-center place-items-center gap-4" key={key}>
            {showTimeHeadlines ? (
              <Typo
                as="h2"
                className={cn(
                  'col-span-1 xs:col-span-full row-span-1 h-auto w-full max-w-[var(--content-box-width)]',
                  'font-bold',
                  'flex flex-wrap gap-x-4',
                  isNewMonth && index !== 0 && 'mt-8',
                  isNewYear && index !== 0 && 'mt-32'
                )}
              >
                {isNewYear ? <span className="opacity-60">{year}</span> : null}
                {isNewMonth ? <span>{getMonthName(Number.parseInt(month, 10))}</span> : null}
              </Typo>
            ) : null}

            {entriesForRender.length > 0 ? entriesForRender : null}
          </div>
        )
      })}
    </div>
  )
}
