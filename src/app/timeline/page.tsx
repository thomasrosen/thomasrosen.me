import { Typo } from '@/components/Typo'
import timelineData from '@/data/timeline/entries.json'
import '@/fonts/petrona-v28-latin/index.css'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type Entry = {
  date: string
  displayAs: string
  title?: string
  text?: string
  url?: string
  image?: string
  imageAspectRatio?: number
  loc?: {
    name: string
    lat: number
    lng: number
  }
}

function EntryTextContent({ entry }: { entry: Entry }) {
  return (
    <>
      {entry.date && (
        <Typo as='time' variant='small' className='opacity-60'>
          {new Date(entry.date).toLocaleDateString('de-DE', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typo>
      )}
      {entry.title && <Typo as='h3'>{entry.title}</Typo>}
      {entry.text && (
        <Typo as='div' className='text-sm'>
          {entry.text}
        </Typo>
      )}
    </>
  )
}

function EntryText({ entry, className }: { entry: Entry; className?: string }) {
  return (
    <div
      className={cn(
        'bg-background text-foreground p-4 rounded-lg flex flex-col gap-2',
        className
      )}
    >
      <EntryTextContent entry={entry} />
    </div>
  )
}

function EntryImage({
  entry,
  isFirstImage = false,
  className = '',
}: {
  entry: Entry
  isFirstImage?: boolean
  className?: string
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
          <EntryTextContent entry={entry} />
        </div>
      </div>
    </div>
  )
}

function EntryLink({ entry, className }: { entry: Entry; className?: string }) {
  if (!entry.url) {
    return null
  }

  return (
    <div
      className={cn(
        'bg-background text-foreground p-4 rounded-lg flex flex-col gap-2',
        className
      )}
    >
      <EntryTextContent entry={entry} />

      <a href={entry.url} target='_blank' rel='noreferrer' className='text-sm'>
        {entry.title || entry.url}
      </a>
    </div>
  )
}

function getMonthName(monthIndex: number) {
  // Use a fixed locale and options to ensure consistent rendering
  const options = { month: 'long' } as const
  return new Date(2000, monthIndex, 1).toLocaleString('en-US', options)
}

function Entry({
  entry,
  isFirstImage = false,
  className = '',
}: {
  entry: Entry
  isFirstImage?: boolean
  className?: string
}) {
  const parsedEntry = {
    ...entry,
    displayAs: entry.displayAs || 'text',
  }

  switch (parsedEntry.displayAs) {
    case 'text':
      return <EntryText entry={parsedEntry} className={className} />
    case 'link':
      return <EntryLink entry={parsedEntry} className={className} />
    case 'image':
      return (
        <EntryImage
          entry={parsedEntry}
          isFirstImage={isFirstImage}
          className={className}
        />
      )
    default:
      return null
  }
}

export default function PageTimeline() {
  // Sort entries by date in descending order
  const entries: Entry[] = (timelineData.entries || []).sort((a, b) => {
    const dateA = new Date(a.date || '1970-01-01').getTime()
    const dateB = new Date(b.date || '1970-01-01').getTime()
    return dateB - dateA
  })

  // Group entries by year and month
  const groupedEntries = entries.reduce(
    (acc: Record<string, Record<string, Entry[]>>, entry) => {
      const date = new Date(entry.date || '1970-01-01')
      const year = date.getFullYear().toString()
      const month = date.getMonth().toString()

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
    <>
      <div className='tab_content'>
        <h2>Timeline</h2>
      </div>

      <div className='w-full'>
        {Object.entries(groupedEntries).map(([year, months], index_year) => (
          <div key={year}>
            <Typo as='h2' className='mb-8 tab_content mx-auto'>
              {year}
            </Typo>
            {Object.entries(months).map(([month, entries], index_month) => (
              <div key={month} className='mb-8'>
                <Typo as='h3' className='mb-4 tab_content mx-auto'>
                  {getMonthName(parseInt(month))}
                </Typo>
                <div
                  key={month}
                  className='mygrid gap-4 place-content-center place-items-center'
                >
                  {entries.map((entry, index_entry) => {
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
                          'col-span-2 row-span-2 md:col-span-1 md:row-span-1 aspect-[1]',

                          entryClone.imageAspectRatio === 2 &&
                            'col-span-2 md:col-span-2 aspect-[unset] md:aspect-[2] min-h-[50vw] md:min-h-full h-auto w-full md:h-full',
                          entryClone.imageAspectRatio === 0.5 &&
                            'col-span-1 row-span-2 md:col-span-1 md:row-span-2 aspect-[0.5]',
                          entryClone.displayAs !== 'image' &&
                            'col-span-2 row-span-1 w-full aspect-[unset] md:w-[var(--content-box-width)] md:col-span-full h-auto md:h-auto'
                        )}
                        key={entryClone.date}
                        entry={entryClone}
                        isFirstImage={
                          index_entry === 0 &&
                          index_month === 0 &&
                          index_year === 0 &&
                          entryClone.displayAs === 'image'
                        }
                      />
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
