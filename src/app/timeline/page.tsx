'use client'

import { Typo } from '@/components/Typo'
import timelineData from '@/data/timeline/entries.json'
import '@/fonts/petrona-v28-latin/index.css'
import Image from 'next/image'

type Entry = {
  date: string
  displayAs: string
  title?: string
  text?: string
  url?: string
  image?: string
  loc?: {
    name: string
    lat: number
    lng: number
  }
}

function EntryText({ entry }: { entry: Entry }) {
  return (
    <div className='bg-background text-foreground p-4 rounded-lg'>
      {entry.date && (
        <Typo as='time' variant='small' className='text-muted-foreground/60'>
          {entry.date}
        </Typo>
      )}
      {entry.title && <Typo as='h3'>{entry.title}</Typo>}
      {entry.text && (
        <Typo as='p' className='mb-0'>
          {entry.text}
        </Typo>
      )}
    </div>
  )
}

function EntryImage({ entry }: { entry: Entry }) {
  if (!entry.image || typeof entry.image !== 'string') {
    return null
  }

  return (
    <div className='w-full relative rounded-xl bg-background overflow-hidden'>
      <Image
        className='z-10'
        src={entry.image}
        alt={entry.title || ''}
        fill
        objectFit='cover'
      />
      <Image
        src={entry.image}
        alt={entry.title || ''}
        width={600}
        height={600}
        className='w-full h-auto z-20 relative'
        // priority={false}
        // sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />
      <div className='z-30 relative bottom-0 left-0 right-0 p-4 -mt-8'>
        <div className='z-10 absolute bottom-0 left-0 right-0 h-full backdrop-blur-[2px] mask-t-from-[calc(100%-32px)]' />
        <div className='z-20 absolute bottom-0 left-0 right-0 h-[calc(100%-16px)] backdrop-blur-[8px] mask-t-from-[calc(100%-64px)]' />
        <div className='z-30 absolute bottom-0 left-0 right-0 h-[calc(100%-32px)] backdrop-blur-[16px] mask-t-from-[calc(100%-128px)]' />
        <div className='relative z-40 text-background'>
          {entry.date && (
            <Typo
              as='time'
              variant='small'
              className='text-muted-foreground/60'
            >
              {entry.date}
            </Typo>
          )}
          {entry.title && <Typo as='h3'>{entry.title}</Typo>}
          {entry.text && (
            <Typo as='p' className='mb-0'>
              {entry.text}
            </Typo>
          )}
        </div>
      </div>
    </div>
  )
}

function EntryLink({ entry }: { entry: Entry }) {
  if (!entry.url) {
    return null
  }

  return (
    <div className='bg-background text-foreground p-4 rounded-lg'>
      {entry.date && (
        <Typo as='time' variant='small' className='text-muted-foreground/60'>
          {entry.date}
        </Typo>
      )}
      {entry.title && <Typo as='h3'>{entry.title}</Typo>}
      {entry.text && (
        <Typo as='p' className='mb-0'>
          {entry.text}
        </Typo>
      )}

      <a href={entry.url} target='_blank' rel='noreferrer'>
        {entry.title || entry.url}
      </a>
    </div>
  )
}

function getMonthName(monthIndex: number) {
  return new Date(2000, monthIndex, 1).toLocaleString(undefined, {
    month: 'long',
  })
}

function Entry({ entry }: { entry: Entry }) {
  const parsedEntry = {
    ...entry,
    displayAs: entry.displayAs || 'text',
  }

  switch (parsedEntry.displayAs) {
    case 'text':
      return <EntryText entry={parsedEntry} />
    case 'link':
      return <EntryLink entry={parsedEntry} />
    case 'image':
      return <EntryImage entry={parsedEntry} />
    default:
      return null
  }
}

export default function PageTimeline() {
  const entries: Entry[] = (timelineData.entries || []).sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })

  // group by years, month and days
  const groupedEntries = entries.reduce(
    (acc: Record<string, Record<string, Entry[]>>, entry) => {
      const date = new Date(entry.date)
      const year = date.getFullYear()
      const month = date.getMonth()

      if (!acc[year]) {
        acc[year] = {}
      }

      if (!acc[year][month]) {
        acc[year][month] = []
      }

      acc[year][month].push(entry)

      return acc
    },
    {}
  )

  return (
    <div className='tab_content'>
      <h2>Timeline</h2>

      <div className='w-full'>
        {Object.entries(groupedEntries).map(([year, months]) => (
          <div key={year}>
            {year}
            {Object.entries(months).map(([month, entries]) => (
              <div key={month}>
                <Typo as='h3' className='mb-4'>
                  {getMonthName(parseInt(month))}
                </Typo>
                <div
                  key={month}
                  className='w-full flex flex-row flex-wrap gap-4'
                >
                  {entries.map((entry) => (
                    <Entry key={entry.date} entry={entry} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
