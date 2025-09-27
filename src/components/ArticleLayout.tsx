import Image from 'next/image'
import Link from 'next/link'
import { Dot } from '@/components/Dot'
import { Typo } from '@/components/Typo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getRelativeTime } from '@/lib/getRelativeTime'
import { cn } from '@/lib/utils'

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
}

export function ArticleLayout({ children, data: article }: ArticleLayoutProps) {
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
                    'h-[20px] w-auto max-w-full rounded-sm',
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

          <center>
            <Dot />
          </center>

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
