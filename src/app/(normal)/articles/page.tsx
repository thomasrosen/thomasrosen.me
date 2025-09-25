import Link from 'next/link'
import { Timeline } from '@/components/Timeline/Timeline'
import { Typo } from '@/components/Typo'
import { Button } from '@/components/ui/button'

export default function PageArticles() {
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
          <Link href="/blog/feed.rss" target="_blank">
            <Button size="lg" variant="secondary">
              RSS-Feed
            </Button>
          </Link>

          <Link
            href="https://open.spotify.com/show/4tdSfXGtc96XrdmYR7NlMk"
            rel="noreferrer"
            target="_blank"
          >
            <Button size="lg" variant="accent">
              Spotify
            </Button>
          </Link>
          <Link
            href="https://www.youtube.com/playlist?list=PLLImRvwJvhwmueAA0cY4qCScBsjpKP5T2"
            rel="noreferrer"
            target="_blank"
          >
            <Button size="lg" variant="accent">
              YouTube Podcasts
            </Button>
          </Link>
          <Link
            href="https://podcasts.apple.com/de/podcast/thomas-rosen-blog/id1678064365"
            rel="noreferrer"
            target="_blank"
          >
            <Button size="lg" variant="accent">
              Apple Podcasts
            </Button>
          </Link>
        </div>
      </div>

      <Timeline showTimeHeadlines={false} tags={['article', 'project']} />
    </>
  )
}
