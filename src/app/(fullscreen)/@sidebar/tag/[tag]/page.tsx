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

export default async function PageTag({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params

  if (!tag && process.env.NODE_ENV !== 'development') {
    notFound()
  }

  const tags = [tag] // to allow multiple tags in the future

  return (
    <Typo as="h2" className="tab_content" variant="h3">
      <div className="flex flex-wrap gap-3">
        <span>Showing content for tags:</span>
        {tags.map((tag_inner) => (
          <Badge key={tag_inner} size="lg" variant="accent">
            {tag_inner}
          </Badge>
        ))}
      </div>
    </Typo>
  )
}
