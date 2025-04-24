import { Typo } from '@/components/Typo'
import '@/fonts/petrona-v28-latin/index.css'
import { cn } from '@/lib/utils'
import React from 'react'
import { Entry } from './Entry'
import { getGroupedEntries } from './getGroupedEntries'
import { getMonthName } from './getMonthName'

export async function Timeline({ tags = [] }: { tags?: string[] }) {
  const groupedEntries = await getGroupedEntries({
    tags,
  })

  let yearBefore: string | null = null
  let monthBefore: string | null = null
  let dayBefore: string | null = null

  const showTimeHeadlines = false
  const groupEverything = false

  let entriesToCombineWith: React.ReactNode[] = []

  const groupedEntriesAsArray = Object.entries(groupedEntries)

  return (
    <div className='w-full space-y-4'>
      {groupedEntriesAsArray.map(([key, entries], index_year) => {
        const isLastGroup = index_year === groupedEntriesAsArray.length - 1

        const date = new Date(key)
        const year = date.getFullYear().toString()
        const month = date.getMonth().toString()
        const day = date.getDate().toString()

        const isNewYear = year !== yearBefore
        const isNewMonth = month !== monthBefore

        yearBefore = year
        monthBefore = month
        dayBefore = day

        const isOnlyOneEntry = entries.length === 1

        const entriesContent = entries.map((entry, index_entry) => {
          const before = entries[index_entry - 1]
          const after = entries[index_entry + 1]

          const isSurroundedByImages =
            before?.displayAs === 'image' || after?.displayAs === 'image'

          const entryClone = { ...entry }
          if (entryClone.displayAs === 'image') {
            entryClone.imageAspectRatio = entryClone.imageAspectRatio || 1
          }
          if (entryClone.displayAs !== 'image') {
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
                'col-span-1 row-span-1 md:col-span-1 md:row-span-1',

                aspectRatioClass,

                entryClone.imageAspectRatio === 2 &&
                  'col-span-2 md:col-span-2 aspect-[2] md:aspect-[2] min-h-[50vw] md:min-h-full h-auto w-full md:h-full',
                entryClone.imageAspectRatio === 0.5 &&
                  'col-span-1 row-span-2 md:col-span-1 md:row-span-2 aspect-[0.5]',
                entryClone.displayAs !== 'image' &&
                  'col-span-2 row-span-1 max-w-[var(--content-box-width)] w-full aspect-[unset] md:w-[var(--content-box-width)] md:col-span-full h-auto md:h-auto',

                ...(entryClone.displayAs === 'image'
                  ? [
                      isOnlyOneEntry || groupEverything
                        ? null
                        : entryClone.displayAs === 'image' &&
                          !isSurroundedByImages
                        ? 'md:w-[var(--content-box-width)] md:col-span-full md:h-auto'
                        : null,
                    ]
                  : [])
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
        if (
          (groupEverything && !isLastGroup) ||
          (isOnlyOneEntry && !isLastGroup && !showTimeHeadlines)
        ) {
          return null
        }
        const entriesForRender = [...entriesToCombineWith]
        entriesToCombineWith = []

        return (
          <React.Fragment key={key}>
            {showTimeHeadlines ? (
              <Typo
                as='h2'
                className='!mb-0 pb-4 tab_content mx-auto font-bold space-x-2'
              >
                {isNewYear ? <span className='opacity-60'>{year}</span> : null}
                {isNewMonth ? (
                  <span>{getMonthName(parseInt(month))}</span>
                ) : null}
              </Typo>
            ) : null}

            {entriesForRender.length > 0 ? (
              <div
                key={`${year}-${month}-${day}`}
                className='mygrid gap-4 place-content-center place-items-start'
              >
                {entriesForRender}
              </div>
            ) : null}
          </React.Fragment>
        )
      })}
    </div>
  )
}
