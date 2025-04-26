import { Timeline } from '@/components/Timeline/Timeline'
import { Typo } from '@/components/Typo'
import { Badge } from '@/components/ui/badge'
import { loadTimeline } from '@/lib/loadTimeline'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  const timeline = await loadTimeline()

  const allowedTags = timeline.flatMap((entry) => entry.tags ?? [])
  const allowedData = allowedTags.map((tag) => ({ tag }))
  return allowedData
}

export default async function PageTag({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params

  if (!tag && process.env.NODE_ENV !== 'development') {
    notFound()
  }

  return (
    <>
      <Typo as='h2' className='tab_content'>
        <div className='flex flex-wrap gap-2'>
          {[tag].map((tag) => (
            <Badge variant='accent' key={tag} size='lg'>
              {tag}
            </Badge>
          ))}
        </div>
      </Typo>

      <Timeline tags={[tag]} showTimeHeadlines={true} />
    </>
  )
}
