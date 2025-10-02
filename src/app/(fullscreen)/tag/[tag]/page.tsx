import { Timeline } from '@/components/Timeline/Timeline'
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

export default async function PageTag({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params

  if (!tag && process.env.NODE_ENV !== 'development') {
    notFound()
  }

  const tags = [tag] // to allow multiple tags in the future

  return (
    <div className="app_wrapper !pt-24 theme_black">
      <Timeline showTimeHeadlines={true} tags={tags} />
      {/* <div className="-m-[40px] w-[calc(100%_+_80px)] bg-black p-[40px]" /> */}
    </div>
  )
}
