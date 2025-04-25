import { Typo } from '@/components/Typo'
import '@/fonts/petrona-v28-latin/index.css'
import { cn } from '@/lib/utils'
import React from 'react'
import { Entry } from './Entry'
import { getGroupedEntries } from './getGroupedEntries'
import { getMonthName } from './getMonthName'

export async function Timeline({
  tags = [],
  showTimeHeadlines = false,
}: {
  tags?: string[]
  showTimeHeadlines?: boolean
}) {
  const groupedEntries = await getGroupedEntries({
    tags,
  })

  let entriesToCombineWith: React.ReactNode[] = []

  const groupedEntriesAsArray = Object.entries(groupedEntries)

  let yearBefore: string | null = null
  let monthBefore: string | null = null
  let dayBefore: string | null = null

  return (
    <div className='w-full space-y-4'>
      {groupedEntriesAsArray.map(([key, entries], index) => {
        const isLastGroup = index === groupedEntriesAsArray.length - 1

        const date = new Date(key)
        const year = date.getFullYear().toString()
        const month = date.getMonth().toString()
        const day = date.getDate().toString()

        const isNewYear = year !== yearBefore
        const isNewMonth = month !== monthBefore

        const innerGroupEverything = false // !isNewYear && !isNewMonth &&

        yearBefore = year
        monthBefore = month
        dayBefore = day

        const isOnlyOneEntry = entries.length === 1

        const entriesContent = entries.map((entry, index_entry) => {
          const before = entries[index_entry - 1]
          const after = entries[index_entry + 1]

          const displayAs = entry.displayAs || 'text'

          const isSurroundedByImages =
            before?.displayAs === 'image' || after?.displayAs === 'image'

          const entryClone = { ...entry }
          if (displayAs === 'image') {
            entryClone.imageAspectRatio = entryClone.imageAspectRatio || 1
          }
          if (displayAs !== 'image') {
            entryClone.imageAspectRatio = entryClone.imageAspectRatio || 4
          }

          const possibleImageAspectRatios: Record<string, string> = {
            '0.25': 'aspect-[0.25]',
            '0.5': 'aspect-[0.5]',
            '0.75': 'aspect-[0.75]',
            '1': 'aspect-[1]',
            '1.5': 'aspect-[1.5]',
            '2': 'aspect-[2]',
            '4': 'aspect-[4]',
          }

          function findNearestRatio(target: number): string {
            const availableRatios = Object.keys(possibleImageAspectRatios).map(
              Number
            )
            return String(
              availableRatios.reduce((prev, curr) =>
                Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev
              )
            )
          }

          const targetRatio = entryClone.imageAspectRatio || 1
          const nearestRatio = findNearestRatio(targetRatio)
          const aspectRatioClass = possibleImageAspectRatios[nearestRatio]

          return (
            <Entry
              key={`${entryClone.date}-${index_entry}`}
              className={cn(
                'h-full w-full',
                'col-span-1 row-span-1',

                aspectRatioClass,

                targetRatio === 2 && 'xs:col-span-2',
                targetRatio === 0.5 && 'row-span-2',

                displayAs !== 'image'
                  ? '!aspect-[unset] xs:max-w-[var(--content-box-width)] xs:col-span-full h-auto'
                  : null,

                displayAs === 'image' && targetRatio > 1
                  ? 'h-auto xs:col-span-2' // xs:max-w-[var(--content-box-width)]
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
              isFirstImage={
                false
                // index_entry === 0 && entryClone.displayAs === 'image'
              }
              entryBefore={before}
              entryAfter={after}
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
          <div
            key={key}
            className='mygrid gap-4 place-content-center place-items-center'
          >
            {showTimeHeadlines ? (
              <Typo
                as='h2'
                className={cn(
                  'col-span-1 xs:col-span-full row-span-1 w-full max-w-[var(--content-box-width)] h-auto',
                  'font-bold',
                  'flex gap-x-4 flex-wrap',
                  isNewMonth && index !== 0 && 'mt-8',
                  isNewYear && index !== 0 && 'mt-32'
                )}
              >
                {isNewYear ? <span className='opacity-60'>{year}</span> : null}
                {isNewMonth ? (
                  <span>{getMonthName(parseInt(month))}</span>
                ) : null}
              </Typo>
            ) : null}

            {entriesForRender.length > 0 ? entriesForRender : null}
          </div>
        )
      })}
    </div>
  )
}
