import { getEntries } from '@/components/Timeline/getEntries'
import { Timeline } from '@/components/Timeline/Timeline'
import { Typo } from '@/components/Typo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function PageArticles() {
  const entries = await getEntries({ tags: ['article'] })
  return (
    <>
      <div className="tab_content space-y-6">
        <Typo as="h2">Blog</Typo>

        <Typo as="p">
          I occasionally write some articles. These can be short and are about any topic that
          currently interests me.
        </Typo>
        <Typo as="p">
          You can read the articles here or listen to them on the various podcast platforms. But
          don't ecpect the to be an hour long lecture, it's just the article in audio form.
        </Typo>

        <br />

        <div className="mb-6 flex flex-wrap gap-2">
          <Button asChild size="lg" variant="secondary">
            <Link className="is-button" href="/blog/feed.rss" target="_blank">
              RSS-Feed
            </Link>
          </Button>

          <Button asChild size="lg" variant="accent">
            <Link
              className="is-button"
              href="https://open.spotify.com/show/4tdSfXGtc96XrdmYR7NlMk"
              rel="noreferrer"
              target="_blank"
            >
              Spotify
            </Link>
          </Button>
          <Button asChild size="lg" variant="accent">
            <Link
              className="is-button"
              href="https://www.youtube.com/playlist?list=PLLImRvwJvhwmueAA0cY4qCScBsjpKP5T2"
              rel="noreferrer"
              target="_blank"
            >
              YouTube Podcasts
            </Link>
          </Button>
          <Button asChild size="lg" variant="accent">
            <Link
              className="is-button"
              href="https://podcasts.apple.com/de/podcast/thomas-rosen-blog/id1678064365"
              rel="noreferrer"
              target="_blank"
            >
              Apple Podcasts
            </Link>
          </Button>
        </div>
      </div>

      <div className="tab_content">
        <Timeline entries={entries} showTimeHeadlines={false} />
      </div>
    </>
  )
}
