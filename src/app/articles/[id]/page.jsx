import { Dot } from '@/components/Dot'
import '@/fonts/petrona-v28-latin/index.css'
import { getRelativeTime } from '@/lib/getRelativeTime'
import { loadArticles } from '@/lib/loadArticles'
import { markdownToReact } from '@/lib/markdownToReact'
import Image from 'next/image'
// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const articles = await loadArticles()

  return articles.flatMap((article) => [
    {
      id:
        process.env.NODE_ENV === 'production'
          ? article.slug
          : encodeURIComponent(article.slug),
    },
  ])
}

export default async function PageArticle({ params }) {
  let { id } = (await params) || {}

  if (!id) {
    throw new Error('No article id provided.')
  }

  const article = await loadArticle(id)

  let coverphoto_src = null
  let coverphoto_blurDataURL = null
  if (
    !!article &&
    typeof article.coverphoto === 'string' &&
    article.coverphoto.length > 0
  ) {
    try {
      // Remove any URL encoding from the path
      const cleanPath = decodeURIComponent(article.coverphoto)
      const imagePath = await import(`@/data${cleanPath}`)
      coverphoto_src = imagePath.default.src
      coverphoto_blurDataURL = imagePath.default.blurDataURL
    } catch (error) {
      console.error('Error loading cover photo:', error)
      // Continue without the cover photo rather than failing the build
    }
  }

  return (
    <div
      className={`tab_content article ${
        !!article && article.font === 'serif' ? 'serif_font' : 'sans_serif_font'
      }`}
    >
      {!!article ? (
        <>
          <h2 itemProp='headline'>{article.title}</h2>

          <p>
            <strong>
              <time
                dateTime={article.date}
                title={article.date}
                itemProp='datePublished'
              >
                {getRelativeTime(new Date(article.date))}
              </time>{' '}
              — 
              <span className='tag_row' itemProp='keywords'>
                {article.tags.map((tag) => (
                  <button className='small' disabled key={tag}>
                    {tag}
                  </button>
                ))}
              </span>
            </strong>
          </p>

          {!!article.audio &&
          typeof article.audio === 'string' &&
          article.audio.length > 0 ? (
            <audio
              controls
              preload='metadata'
              style={{ width: '100%', marginBlockEnd: '20px' }}
              src={article.audio}
            >
              <source src={article.audio} type='audio/mpeg' />
              <p>
                <a href={article.audio}>
                  <button>Download audio of the article.</button>
                </a>
              </p>
            </audio>
          ) : null}

          {article.md ? (
            <div itemProp='articleBody'>{markdownToReact(article.md)}</div>
          ) : null}

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
