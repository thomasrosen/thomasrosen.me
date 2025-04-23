import { Dot } from '@/components/Dot'
import { Typo } from '@/components/Typo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import '@/fonts/petrona-v28-latin/index.css'
import { getRelativeTime } from '@/lib/getRelativeTime'
import { loadArticles } from '@/lib/loadArticles'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const articles = await loadArticles()

export async function generateStaticParams() {
  return articles.flatMap((article) =>
    article.data.slug
      ? [
          {
            slug:
              process.env.NODE_ENV === 'production'
                ? article.data.slug
                : encodeURIComponent(article.data.slug),
          },
        ]
      : []
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { slug } = await params

  const article = articles.find((article) => article.data.slug === slug)
  return {
    title: article?.data.title,
    description: article?.data.summary,
  }
}

export default async function PageArticle({ params }: Props) {
  let { slug } = (await params) || {}
  if (!slug) {
    throw new Error('No article slug provided.')
  }

  const article = articles.find((article) => article.data.slug === slug)
  if (!article) {
    notFound()
  }

  const { content, data, getStaticProps } = article
  const { props } = await getStaticProps()

  return (
    <ArticleLayout {...props} data={data}>
      {content}
    </ArticleLayout>
  )
}

export async function ArticleLayout({
  children,
  data: article,
}: {
  children: React.ReactNode
  data: any
}) {
  const coverphoto_src = article.coverphoto_src
  const coverphoto_blurDataURL = article.coverphoto_blurDataURL
  const audio_src = article.audio_src

  return (
    <div
      className={`tab_content article ${
        !!article && article.font === 'serif' ? 'serif_font' : 'sans_serif_font'
      }`}
    >
      {!!article ? (
        <>
          <Typo as='h2' itemProp='headline'>
            {article.title}
          </Typo>

          <Typo as='p' className='flex items-center gap-2'>
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
                <Badge variant='accent' key={tag}>
                  {tag}
                </Badge>
              ))}
            </span>
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

          <Dot />

          {!!article &&
          typeof coverphoto_src === 'string' &&
          coverphoto_src.length > 0 ? (
            <>
              <br />
              <br />
              <meta itemProp='image' content={coverphoto_src} />
              <Image
                src={coverphoto_src}
                blurDataURL={coverphoto_blurDataURL}
                alt={article.title}
                className='rounded-xl w-[200px] h-auto max-w-full'
                width={200}
                height={200}
              />
            </>
          ) : null}

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
                // "description": "Brief description of the blog article.",
                articleBody: article.html,
              }),
            }}
          />
        </>
      ) : null}
    </div>
  )
}
