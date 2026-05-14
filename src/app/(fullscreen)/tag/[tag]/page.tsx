import { getEntries } from '@/components/Timeline/getEntries'
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

export default async function PageTag({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params

  if (!tag && process.env.NODE_ENV !== 'development') {
    notFound()
  }

  const tags = [tag] // to allow multiple tags in the future
  let entries = await getEntries({ tags })

  // filter out entries, that are from external sources (not from me).
  if (!tags.includes('share')) {
    entries = entries.filter(entry => !(entry.tags || []).includes('share'))
  }

  // filter out images that should not be shown on the photos page
  if (tags.includes('image')) {
    entries = entries.filter(entry => !(entry.tags || []).includes('not_image'))
  }

  return (
    <div className="app_wrapper !pt-24">
      {tags.includes('image') ||
      tags.includes('socialmedia') ||
      tags.includes('design') ||
      tags.includes('politics') ||
      tags.includes('queer')
      ? null
      : (
        <Typo as="h2" className="tab_content" variant="h3">
          <div className="flex flex-wrap gap-3">
            <span>Showing content for tags:</span>
            {tags.map((tag_inner) => (
              <Badge key={tag_inner} size="md" variant="accent">
                {tag_inner}
              </Badge>
            ))}
          </div>
        </Typo>
      )}

      {tags.includes('image') ? (
        <div className="tab_content">
          <Typo as="h2">
            Photos
          </Typo>
          <Typo as="p" className="text-pretty">
            A small collection of photos I took over the years. Taken on an iPhone or my Nikon 5300. Most are colorgraded with the iOS Photos app or tools like Affinity, Lightroom and VSCO.
          </Typo>
        </div>
      ) : null}

      {tags.includes('socialmedia') ? (
        <div className="tab_content">
          <Typo as="h2">
            Social Media
          </Typo>
          <Typo as="p" className="text-pretty">
            Some social-media related designs, videos and websites I created over the years.
          </Typo>
        </div>
      ) : null}

      {tags.includes('design') ? (
        <div className="tab_content">
          <Typo as="h2">
            Design
          </Typo>
          <Typo as="p" className="text-pretty">
            Examples showing designs I made. Many graphics were done with Figma, but also Canva, Affinity, Photoshop, and even Apple Keynote.
          </Typo>
        </div>
      ) : null}

      {tags.includes('politics') ? (
        <div className="tab_content">
          <Typo as="h2">
            Politics
          </Typo>
          <Typo as="p" className="text-pretty">
            Some politicals activites and content from me.
          </Typo>
        </div>
      ) : null}

      {tags.includes('queer') ? (
        <div className="tab_content">
          <Typo as="h2">
            Queer-Rights 🏳️‍🌈
          </Typo>
          <Typo as="p" className="text-pretty">
            Some of my activities and content related to fighting for queer people.
          </Typo>
        </div>
      ) : null}

      <Timeline entries={entries} showTimeHeadlines={true} fullWidth={tags.includes('image') === true} />
      {/* <div className="-m-[40px] w-[calc(100%_+_80px)] bg-black p-[40px]" /> */}
    </div>
  )
}
