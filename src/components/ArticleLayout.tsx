import { Dot } from '@/components/Dot'
import { Typo } from '@/components/Typo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getRelativeTime } from '@/lib/getRelativeTime'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface ArticleLayoutProps {
  children: React.ReactNode
  data: {
    title: string
    date: string
    tags: string[]
    coverphoto_src?: string
    audio_src?: string
    font?: string
    slug: string
    html: string
  }
}

export async function ArticleLayout({
  children,
  data: article,
}: ArticleLayoutProps) {
  const coverphoto_src = article.coverphoto_src
  const audio_src = article.audio_src

  return (
    <div
      className={cn(
        'tab_content article',
        !!article && article.font === 'serif'
          ? 'serif_font'
          : 'sans_serif_font',
        'wrap-normal hyphens-auto'
      )}
    >
      {!!article ? (
        <>
          <Typo as='h2' itemProp='headline'>
            {article.title}
          </Typo>

          <Typo as='small' className='flex items-center gap-2 mb-8 flex-wrap'>
            <time
              dateTime={article.date}
              title={article.date}
              itemProp='datePublished'
            >
              {getRelativeTime(new Date(article.date))}
            </time>
            <span>—</span>
            <span className='contents' itemProp='keywords'>
              {article.tags.map((tag: string) => (
                <Link href={`/tag/${tag}`} key={tag}>
                  <Badge variant='accent'>{tag}</Badge>
                </Link>
              ))}
            </span>

            {!!article &&
            typeof coverphoto_src === 'string' &&
            coverphoto_src.length > 0 ? (
              <>
                <meta itemProp='image' content={coverphoto_src} />
                <Image
                  src={coverphoto_src}
                  alt={article.title}
                  className={cn(
                    'rounded-sm h-[20px] w-auto max-w-full',
                    'hover:scale-1000 transition-all duration-150 z-10 hover:rounded-[1px]'
                  )}
                  width={40}
                  height={40}
                />
              </>
            ) : null}
          </Typo>

          {audio_src ? (
            <audio
              controls
              preload='metadata'
              className='w-full mb-4'
              src={audio_src}
            >
              <source src={audio_src} type='audio/mpeg' />
              <Link href={audio_src}>
                <Button>Download audio of the article.</Button>
              </Link>
            </audio>
          ) : null}

          {children}

          <center>
            <Dot />
          </center>

          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                mainEntityOfPage: {
                  '@type': 'WebPage',
                  '@id': `https://thomasrosen.me/articles/${article.slug}`,
                },
                headline: article.title,
                image: coverphoto_src,
                datePublished: article.date,
                dateModified: article.date,
                author: {
                  '@type': 'Person',
                  name: 'Thomas Rosen',
                },
                publisher: {
                  '@type': 'Organization',
                  name: 'Thomas Rosen',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://thomasrosen.me/images/me_small.jpg',
                    width: 800,
                    height: 800,
                  },
                },
                articleBody: article.html,
              }),
            }}
          />
        </>
      ) : null}
    </div>
  )
}
