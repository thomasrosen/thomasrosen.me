import { Timeline } from '@/components/Timeline/Timeline'
import { Typo } from '@/components/Typo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function PageArticles() {
  return (
    <>
      <div className='tab_content space-y-6'>
        <Typo as='h2'>Blog</Typo>

        <Typo as='p'>
          I occasionally write some articles. These can be short and are about
          any topic that currently interests me.
        </Typo>
        <Typo as='p'>
          You can read the articles here or listen to them on the various
          podcast platforms. But don't ecpect the to be an hour long lecture,
          it's just the article in audio form.
        </Typo>

        <br />

        <div className='flex flex-wrap gap-2 mb-6'>
          <Link target='_blank' href='/blog/feed.rss'>
            <Button variant='secondary' size='lg'>
              RSS-Feed
            </Button>
          </Link>

          <Link
            target='_blank'
            rel='noreferrer'
            href='https://open.spotify.com/show/4tdSfXGtc96XrdmYR7NlMk'
          >
            <Button variant='accent' size='lg'>
              Spotify
            </Button>
          </Link>
          <Link
            target='_blank'
            rel='noreferrer'
            href='https://www.youtube.com/playlist?list=PLLImRvwJvhwmueAA0cY4qCScBsjpKP5T2'
          >
            <Button variant='accent' size='lg'>
              YouTube Podcasts
            </Button>
          </Link>
          <Link
            target='_blank'
            rel='noreferrer'
            href='https://podcasts.apple.com/de/podcast/thomas-rosen-blog/id1678064365'
          >
            <Button variant='accent' size='lg'>
              Apple Podcasts
            </Button>
          </Link>
        </div>
      </div>

      <Timeline tags={['article', 'project']} showTimeHeadlines={false} />
    </>
  )
}
