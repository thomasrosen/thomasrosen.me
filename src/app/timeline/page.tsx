import { Typo } from '@/components/Typo'
import { Badge } from '@/components/ui/badge'
import timelineData from '@/data/timeline/entries.json'
import '@/fonts/petrona-v28-latin/index.css'
import { markdownToReact } from '@/lib/markdownToReact'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Entry = {
  date: string
  displayAs: string
  title?: string
  text?: string
  author?: string
  url?: string
  image?: string
  imageAspectRatio?: number
  loc?: {
    name: string
    lat: number
    lng: number
  }
  tags?: string[]
}

function getMonthName(monthIndex: number) {
  // Use a fixed locale and options to ensure consistent rendering
  const options = { month: 'long' } as const
  return new Date(2000, monthIndex, 1).toLocaleString('en-US', options)
}

function EntryTextContent({
  entryBefore,
  entry,
  entryAfter,
  children,
}: {
  entryBefore?: Entry
  entry: Entry
  entryAfter?: Entry
  children?: React.ReactNode
}) {
  const sameDayAsBefore =
    entryBefore &&
    new Date(entryBefore.date).toDateString() ===
      new Date(entry.date).toDateString()

  const fullDateTimeString = new Date(entry.date).toLocaleDateString('de-DE', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  const dateString = new Date(entry.date).toLocaleDateString('de-DE', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const timeString = new Date(entry.date).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const noTimeDefined = timeString === '00:00'

  return (
    <div className='space-y-2'>
      {entry.date && (
        <Typo
          as='time'
          variant='small'
          className='flex items-center gap-2 font-normal text-xs'
        >
          <span className='opacity-60 shrink-0'>
            {sameDayAsBefore
              ? noTimeDefined
                ? dateString
                : timeString
              : noTimeDefined
              ? dateString
              : fullDateTimeString}
          </span>
          {sameDayAsBefore ? null : (
            <div className='h-[1px] bg-foreground w-full opacity-50' />
          )}
        </Typo>
      )}
      {entry.title && <Typo as='h3'>{entry.title}</Typo>}{' '}
      {entry.text && markdownToReact(entry.text || '')}
      {entry.author && <Typo as='small'>by {entry.author}</Typo>}
      {children}
      {entry.tags && (
        <div className='flex flex-wrap gap-2'>
          {entry.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )}
    </div>
  )
}

function EntryText({
  entry,
  className,
  entryBefore,
  entryAfter,
}: {
  entry: Entry
  className?: string
  entryBefore?: Entry
  entryAfter?: Entry
}) {
  return (
    <div className={cn('mb-4 flex flex-col gap-2', className)}>
      <EntryTextContent
        entry={entry}
        entryBefore={entryBefore}
        entryAfter={entryAfter}
      />
    </div>
  )
}

function EntryImage({
  entry,
  isFirstImage = false,
  className = '',
  entryBefore,
  entryAfter,
}: {
  entry: Entry
  isFirstImage?: boolean
  className?: string
  entryBefore?: Entry
  entryAfter?: Entry
}) {
  if (!entry.image || typeof entry.image !== 'string') {
    return null
  }

  // Handle both local and external images
  const isExternalImage = entry.image.startsWith('http')
  const imagePath = isExternalImage
    ? entry.image
    : entry.image.startsWith('/')
    ? entry.image
    : `/${entry.image}`

  return (
    <div
      className={cn(
        'relative rounded-xl bg-background overflow-hidden',
        'w-auto h-[400px]',
        className
      )}
    >
      <Image
        src={imagePath}
        alt={''}
        fill
        className='z-20 relative object-cover'
        priority={isFirstImage}
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        quality={75}
        loading={isFirstImage ? 'eager' : 'lazy'}
        unoptimized={isExternalImage}
      />
      <div className='z-30 absolute -bottom-2 -left-2 -right-2 p-2 w-[calc(100%+(var(--spacing)*2))] pt-[64px]'>
        <div className='z-10 absolute bottom-0 left-0 right-0 h-[calc(100%-0px)] backdrop-blur-[2px] mask-t-from-[calc(100%-64px)]' />
        <div className='z-20 absolute bottom-0 left-0 right-0 h-[calc(100%-32px)] backdrop-blur-[4px] mask-t-from-[calc(100%-64px)]' />
        <div className='z-30 absolute bottom-0 left-0 right-0 h-[calc(100%-48px)] backdrop-blur-[8px] mask-t-from-[calc(100%-64px)]' />
        <div className='z-40 absolute bottom-0 left-0 right-0 h-[calc(100%-64px)] backdrop-blur-[16px] mask-t-from-[calc(100%-64px)]' />
        <div className='z-50 absolute bottom-0 left-0 right-0 h-[calc(100%-96px)] backdrop-blur-[32px] mask-t-from-[calc(100%-64px)]' />
        <div className='z-50 absolute bottom-0 left-0 right-0 h-[calc(100%-32px)] mask-t-to-[100%] bg-background opacity-30' />
        <div className='relative z-60 text-foreground flex flex-col gap-2 p-4'>
          <EntryTextContent
            entry={entry}
            entryBefore={entryBefore}
            entryAfter={entryAfter}
          />
        </div>
      </div>
    </div>
  )
}

function EntryLink({
  entry,
  className,
  entryBefore,
  entryAfter,
}: {
  entry: Entry
  className?: string
  entryBefore?: Entry
  entryAfter?: Entry
}) {
  if (!entry.url) {
    return null
  }

  return (
    <div className={cn('mb-4 flex flex-col gap-2', className)}>
      <EntryTextContent
        entry={entry}
        entryBefore={entryBefore}
        entryAfter={entryAfter}
      >
        <a
          href={entry.url}
          target='_blank'
          rel='noreferrer'
          className='text-sm'
        >
          {entry.title || entry.url}
        </a>
      </EntryTextContent>
    </div>
  )
}

function Entry({
  entry,
  isFirstImage = false,
  className = '',
  entryBefore,
  entryAfter,
}: {
  entry: Entry
  isFirstImage?: boolean
  className?: string
  entryBefore?: Entry
  entryAfter?: Entry
}) {
  const parsedEntry = {
    ...entry,
    displayAs: entry.displayAs || 'text',
  }

  switch (parsedEntry.displayAs) {
    case 'text':
      return (
        <EntryText
          entry={parsedEntry}
          className={className}
          entryBefore={entryBefore}
          entryAfter={entryAfter}
        />
      )
    case 'link':
      return (
        <EntryLink
          entry={parsedEntry}
          className={className}
          entryBefore={entryBefore}
          entryAfter={entryAfter}
        />
      )
    case 'image':
      return (
        <EntryImage
          entry={parsedEntry}
          isFirstImage={isFirstImage}
          className={className}
          entryBefore={entryBefore}
          entryAfter={entryAfter}
        />
      )
    default:
      return null
  }
}

type GroupedEntries = Record<string, Entry[]>

function getGroupedEntries({
  tags = [],
}: { tags?: string[] } = {}): GroupedEntries {
  let entries: Entry[] = timelineData.entries || []

  if (tags.length > 0) {
    entries = entries.filter((entry) =>
      tags.some((tag) => entry.tags?.includes(tag))
    )
  }

  // Sort entries by date in descending order
  entries = entries.sort((a, b) => {
    const dateA = new Date(a.date || '1970-01-01').getTime()
    const dateB = new Date(b.date || '1970-01-01').getTime()
    return dateB - dateA
  })

  // Group entries by year and month
  const groupedEntries = entries.reduce((acc: GroupedEntries, entry) => {
    const date = new Date(entry.date || '1970-01-01')
    const asIsoString = date.toISOString().split('T')[0]

    if (!acc[asIsoString]) {
      acc[asIsoString] = []
    }

    acc[asIsoString].push(entry)

    return acc
  }, {})

  return groupedEntries
}

export default function PageTimeline() {
  const groupedEntries = getGroupedEntries({ tags: ['press'] })

  let yearBefore: string | null = null
  let monthBefore: string | null = null
  let dayBefore: string | null = null

  return (
    <>
      <div className='tab_content'>
        <h2>Timeline</h2>
      </div>

      <div className='w-full'>
        {Object.entries(groupedEntries).map(([key, entries], index_year) => {
          const date = new Date(key)
          const year = date.getFullYear().toString()
          const month = date.getMonth().toString()
          const day = date.getDate().toString()

          const isNewYear = year !== yearBefore
          const isNewMonth = month !== monthBefore

          yearBefore = year
          monthBefore = month
          dayBefore = day

          return (
            <React.Fragment key={key}>
              <Typo
                as='h2'
                className='!mb-0 pb-4 tab_content mx-auto font-bold space-x-2'
              >
                {isNewYear ? <span className='opacity-60'>{year}</span> : null}
                {isNewMonth ? (
                  <span>{getMonthName(parseInt(month))}</span>
                ) : null}
              </Typo>

              {entries.length > 0 && (
                <div
                  key={`${year}-${month}-${day}`}
                  className='mygrid gap-4 place-content-center place-items-center mb-4'
                >
                  {entries.map((entry, index_entry) => {
                    const before = entries[index_entry - 1]
                    const after = entries[index_entry + 1]

                    const isSurroundedByImages =
                      before?.displayAs === 'image' ||
                      after?.displayAs === 'image'

                    const entryClone = { ...entry }
                    if (entryClone.displayAs === 'image') {
                      entryClone.imageAspectRatio =
                        entryClone.imageAspectRatio || 1
                    }
                    if (entryClone.displayAs !== 'image') {
                      entryClone.imageAspectRatio =
                        entryClone.imageAspectRatio || 4
                    }

                    return (
                      <Entry
                        className={cn(
                          'h-full w-full',
                          'col-span-1 row-span-1 md:col-span-1 md:row-span-1 aspect-[1]',

                          entryClone.imageAspectRatio === 2 &&
                            'col-span-2 md:col-span-2 aspect-[unset] md:aspect-[2] min-h-[50vw] md:min-h-full h-auto w-full md:h-full',
                          entryClone.imageAspectRatio === 0.5 &&
                            'col-span-1 row-span-2 md:col-span-1 md:row-span-2 aspect-[0.5]',
                          entryClone.displayAs !== 'image' &&
                            'col-span-2 row-span-1 max-w-[var(--content-box-width)] w-full aspect-[unset] md:w-[var(--content-box-width)] md:col-span-full h-auto md:h-auto',

                          entryClone.displayAs === 'image' &&
                            !isSurroundedByImages &&
                            'md:h-[var(--content-box-width)] md:col-span-full md:w-auto'
                        )}
                        key={entryClone.date}
                        entry={entryClone}
                        isFirstImage={
                          false
                          // index_entry === 0 && entryClone.displayAs === 'image'
                        }
                        entryBefore={before}
                        entryAfter={after}
                      />
                    )
                  })}
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </>
  )
}
