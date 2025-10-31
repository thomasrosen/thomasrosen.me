import { Dot } from '@/components/Dot'
import { Typo } from '@/components/Typo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getRelativeTime } from '@/lib/getRelativeTime'
import { cn } from '@/lib/utils'
import type { TimelineEntry } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { Timeline } from './Timeline/Timeline'

interface ArticleLayoutProps {
  children: React.ReactNode
  data: {
    audio: string // orginal path
    title: string
    date: string
    tags: string[]
    coverphoto_src?: string
    audio_src?: string
    font?: string
    slug: string
    html: string
  }
  simlilarEntries: TimelineEntry[]
}

export function ArticleLayout({ children, data: article, simlilarEntries }: ArticleLayoutProps) {
  const coverphoto_src = article.coverphoto_src
  const audio_src = article.audio_src

  return (
    <div
      className={cn(
        'tab_content article',
        !!article && article.font === 'serif' ? 'serif_font' : 'sans_serif_font',
        'wrap-normal hyphens-auto'
      )}
    >
      {article ? (
        <>
          {coverphoto_src ? (
            <>
              {typeof coverphoto_src === 'string' && coverphoto_src.length > 0 ? (
                <meta content={coverphoto_src} itemProp="image" />
              ) : null}
              <div className="smooth-rounded-lg relative mb-8 h-[300px] w-full overflow-hidden">
                <Image
                  alt={''}
                  className="relative object-cover"
                  fill
                  loading={'eager'}
                  priority={true}
                  quality={75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src={coverphoto_src}
                  unoptimized={false}
                />
              </div>
            </>
          ) : null}

          <Typo as="h1" itemProp="headline">
            {article.title}
          </Typo>

          <Typo as="small" className="mb-8 flex flex-wrap items-center gap-2">
            <time dateTime={article.date} itemProp="datePublished" title={article.date}>
              {getRelativeTime(new Date(article.date))}
            </time>
            <span>—</span>
            <span className="contents" itemProp="keywords">
              {article.tags.map((tag: string) => (
                <Link href={`/tag/${tag}`} key={tag}>
                  <Badge variant="accent">{tag}</Badge>
                </Link>
              ))}
            </span>

            {!!article && typeof coverphoto_src === 'string' && coverphoto_src.length > 0 ? (
              <>
                <meta content={coverphoto_src} itemProp="image" />
                <Image
                  alt={article.title}
                  className={cn(
                    'smooth-rounded-sm h-[20px] w-auto max-w-full',
                    'z-10 transition-all duration-150 hover:scale-1000 hover:rounded-[1px]'
                  )}
                  height={40}
                  src={coverphoto_src}
                  width={40}
                />
              </>
            ) : null}
          </Typo>

          {audio_src ? (
            // biome-ignore lint/a11y/useMediaCaption: the article is the caption
            <audio className="mb-4 w-full" controls preload="metadata" src={audio_src}>
              <source src={audio_src} type="audio/mpeg" />
              <Link href={audio_src}>
                <Button>Download audio of the article.</Button>
              </Link>
            </audio>
          ) : null}

          {children}

          <Dot />

          {simlilarEntries?.length ? (
            <section className="flex flex-col gap-6 pt-24">
              <Typo as="h2" itemProp="headline" variant="h1">
                Similar Articles
              </Typo>
              <Timeline entries={simlilarEntries} showTimeHeadlines={false} />
            </section>
          ) : null}

          <script
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
            type="application/ld+json"
          />
        </>
      ) : null}
    </div>
  )
}
