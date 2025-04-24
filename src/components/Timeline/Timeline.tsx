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
      <div className='mygrid gap-4 place-content-center place-items-center'>
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
              const availableRatios = Object.keys(
                possibleImageAspectRatios
              ).map(Number)
              return String(
                availableRatios.reduce((prev, curr) =>
                  Math.abs(curr - target) < Math.abs(prev - target)
                    ? curr
                    : prev
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
                  'col-span-1 row-span-1 xs:col-span-1 xs:row-span-1',

                  aspectRatioClass,

                  targetRatio === 2 &&
                    'col-span-1 xs:col-span-2 aspect-[2] xs:aspect-[2] min-h-[50vw] xs:min-h-full h-auto w-full xs:h-full',
                  targetRatio === 0.5 &&
                    'col-span-1 row-span-2 xs:col-span-1 xs:row-span-2 aspect-[0.5]',
                  entryClone.displayAs !== 'image' &&
                    'col-span-1 row-span-1 xs:w-full w-full !aspect-[unset] xs:max-w-[var(--content-box-width)] xs:col-span-full h-auto xs:h-auto',

                  entryClone.displayAs === 'image' && targetRatio > 1
                    ? 'xs:max-w-[var(--content-box-width)] col-span-1 h-auto xs:col-span-full xs:h-auto'
                    : null,

                  ...(!innerGroupEverything &&
                  entryClone.displayAs === 'image' &&
                  !isSurroundedByImages
                    ? [
                        'xs:max-w-[var(--content-box-width)] col-span-1 xs:col-span-full xs:h-auto',
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

          return (
            <React.Fragment key={key}>
              {showTimeHeadlines ? (
                <Typo
                  as='h2'
                  className={cn(
                    'col-span-1 xs:col-span-full row-span-1 w-full max-w-[var(--content-box-width)] h-auto',
                    'font-bold',
                    'bg-red-500 xs:bg-pink-500 lg:bg-orange-500 sm:bg-blue-500 md:bg-green-500',
                    'flex gap-4',
                    isNewMonth && index !== 0 && 'mt-8',
                    isNewYear && index !== 0 && 'mt-32'
                  )}
                >
                  {isNewYear ? (
                    <span className='opacity-60'>{year}</span>
                  ) : null}
                  {isNewMonth ? (
                    <span>{getMonthName(parseInt(month))}</span>
                  ) : null}
                </Typo>
              ) : null}

              {entriesForRender.length > 0 ? entriesForRender : null}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
