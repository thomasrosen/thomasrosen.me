import { Timeline } from '@/components/Timeline/Timeline'
import { Typo } from '@/components/Typo'
import { Badge } from '@/components/ui/badge'
import { notFound } from 'next/navigation'

export default async function PageTimeline({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { tags } = await searchParams
  const tagsArray = Array.isArray(tags) ? tags : tags ? [tags] : undefined

  if (!tagsArray && process.env.NODE_ENV !== 'development') {
    notFound()
  }

  return (
    <>
      <Typo as='h2' className='tab_content'>
        <div className='flex flex-wrap gap-2'>
          {tagsArray?.map((tag) => (
            <Badge variant='accent' key={tag} size='lg'>
              {tag}
            </Badge>
          ))}
        </div>
      </Typo>

      <Timeline tags={tagsArray} showTimeHeadlines={true} />
    </>
  )
}
