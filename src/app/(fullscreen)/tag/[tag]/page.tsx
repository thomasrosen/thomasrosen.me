import { DotLinkRow } from '@/components/DotLinkRow'
import { LinksGridDivider } from '@/components/LinksGridDivider'
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
      tags.includes('queer') ||
      tags.includes('programming') ||
      tags.includes('volt')
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

      {tags.includes('programming') ? (
        <div className="tab_content">
          <Typo as="h2">
            Programming
          </Typo>
          <div className="links_grid">
            <DotLinkRow
              color="#000000"
              data-umami-event="github"
              href="https://github.com/thomasrosen"
              label="GitHub"
              value="thomasrosen"
            />
            <DotLinkRow
              color="#e24329"
              data-umami-event="gitlab"
              href="https://gitlab.com/thomasrosen"
              label="GitLab"
              value="thomasrosen"
            />
            <DotLinkRow
              color="#e24329"
              data-umami-event="gitlab-volt"
              href="https://gitlab.com/thomas.rosen.volt"
              label="GitLab (Volt DE)"
              value="thomas.rosen.volt"
            />
            <DotLinkRow
              color="#000000"
              data-umami-event="dev-to"
              href="https://dev.to/thomasrosen"
              label="dev.to"
              value="thomasrosen"
            />
            <DotLinkRow
              color="#7ebc6f"
              data-umami-event="openstreetmap"
              href="https://www.openstreetmap.org/user/thomasrosen"
              label="OpenStreetMap"
              value="thomasrosen"
            />
          </div>
        </div>
      ) : null}

      {tags.includes('image') ? (
        <div className="tab_content">
          <Typo as="h2">
            Photos
          </Typo>
          <Typo as="p" className="text-pretty">
            A small collection of photos I took over the years. Taken on an iPhone or my Nikon 5300. Most are colorgraded with the iOS Photos app or tools like Affinity, Lightroom and VSCO.
          </Typo>
          <div className="links_grid">
            <DotLinkRow
              color="var(--primary)"
              data-umami-event="Email"
              href="mailto:hello@thomasrosen.me"
              label="Contact"
              value="hello@thomasrosen.me"
            />
            <DotLinkRow
              color="#ed4956"
              data-umami-event="instagram"
              href="https://www.instagram.com/thomasrosen/"
              label="Instagram"
              value="thomasrosen"
            />
            <DotLinkRow
              color="#1067d9"
              data-umami-event="flickr"
              href="https://www.flickr.com/people/116207237@N03/"
              label="Flickr"
              value="Thomas Rosen (thomasroses / 116207237@N03)"
            />
          </div>
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
          <div className="links_grid">
            <DotLinkRow
              color="var(--primary)"
              data-umami-event="Email"
              href="mailto:hello@thomasrosen.me"
              label="Contact"
              value="hello@thomasrosen.me"
            />

            <LinksGridDivider />

            <DotLinkRow
              color="#ed4956"
              data-umami-event="instagram"
              href="https://www.instagram.com/thomasrosen/"
              label="Instagram"
              value="thomasrosen"
            />
            <DotLinkRow
              color="#000"
              data-umami-event="threads"
              href="https://www.threads.com/@thomasrosen"
              label="Threads"
              value="thomasrosen"
            />
            <DotLinkRow
              color="#00f2ea" // #ff0050 #00f2ea
              data-umami-event="tiktok"
              href="https://www.tiktok.com/@thomasroses"
              label="TikTok"
              value="thomasroses"
            />
            <DotLinkRow
              color="#ff0000"
              data-umami-event="youtube"
              href="https://youtube.com/@thomas_rosen"
              label="YouTube"
              value="thomas_rosen"
            />
            <DotLinkRow
              color="#0a66c1"
              data-umami-event="linkedin"
              href="https://www.linkedin.com/in/thomasroses/"
              label="LinkedIn"
              value="thomasroses"
            />

            <LinksGridDivider />

            <DotLinkRow
              color="#00f"
              data-umami-event="bluesky"
              href="https://bsky.app/profile/thomasrosen.me"
              label="Bluesky"
              value="@thomasrosen.me"
            />
            <DotLinkRow
              color="#2f93d7"
              data-umami-event="mastodon"
              href="https://mastodon.social/@thomasrosen"
              label="Mastodon"
              value="thomasrosen"
            />
            <DotLinkRow
              color="#1da1f2"
              data-umami-event="twitter"
              href="https://twitter.com/thomas_roses"
              label="Twitter"
              value="thomas_roses"
            />
          </div>
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
          <div className="links_grid">
            <DotLinkRow
              color="var(--primary)"
              data-umami-event="Email"
              href="mailto:hello@thomasrosen.me"
              label="Contact"
              value="hello@thomasrosen.me"
            />
            <DotLinkRow
              color="#ed4956"
              data-umami-event="instagram"
              href="https://www.instagram.com/thomasrosen/"
              label="Instagram"
              value="thomasrosen"
            />
            <DotLinkRow
              color="#ea4c89"
              data-umami-event="dribbble"
              href="https://dribbble.com/thomasrosen/likes"
              label="Dribbble"
              value="thomasrosen/likes"
            />
          </div>
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
          <div className="links_grid">
            <DotLinkRow
              color="#502379"
              data-umami-event="Volt Email"
              href="mailto:thomas.rosen@volteuropa.org"
              label="Volt Email"
              value="thomas.rosen@volteuropa.org"
            />
          </div>
        </div>
      ) : null}


      {tags.includes('volt') ? (
        <div className="tab_content">
          <Typo as="h2">
            Volt Europa
          </Typo>
          <Typo as="p" className="text-pretty">
            Some examples of content I created for Volt Europa.
          </Typo>
          <div className="links_grid">
            <DotLinkRow
              color="#502379"
              data-umami-event="Volt Email"
              href="mailto:thomas.rosen@volteuropa.org"
              label="Volt Email"
              value="thomas.rosen@volteuropa.org"
            />
            <DotLinkRow
              color="#e24329"
              data-umami-event="gitlab-volt"
              href="https://gitlab.com/thomas.rosen.volt"
              label="GitLab (Volt DE)"
              value="thomas.rosen.volt"
            />
          </div>
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

      <Timeline entries={entries} showTimeHeadlines={true} hiddenTags={tags} fullWidth={tags.includes('image') === true} />
      {/* <div className="-m-[40px] w-[calc(100%_+_80px)] bg-black p-[40px]" /> */}
    </div>
  )
}
