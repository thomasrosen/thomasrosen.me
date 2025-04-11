import { Dot } from '@/components/Dot'
import '@/fonts/petrona-v28-latin/index.css'
import { getRelativeTime, loadArticles } from '@/lib/loadArticles'

// Return a list of `params` to populate the [slug] dynamic segment
export function generateStaticParams() {
  const articles = loadArticles()

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

  id = decodeURIComponent(id)

  let article = null

  try {
    const articleData = await import(`@/data/blog/articles/${id}.json`)
    article = articleData.article
    article.relative_date = getRelativeTime(new Date(article.date))
  } catch (error) {
    throw new Error(`Could not load the article: ${error.message}`)
  }

  let coverphoto = null
  if (
    !!article &&
    typeof article.coverphoto === 'string' &&
    article.coverphoto.length > 0
  ) {
    const imagePath = await import(`@/data${article.coverphoto}`)
    coverphoto = imagePath.default.src
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
                {article.relative_date}
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

          <div
            dangerouslySetInnerHTML={{ __html: article.html }}
            itemProp='articleBody'
          />
          <Dot />

          {!!article &&
          typeof coverphoto === 'string' &&
          coverphoto.length > 0 ? (
            <>
              <br />
              <br />
              <meta itemProp='image' content={coverphoto} />
              <img
                src={coverphoto}
                alt={article.title}
                style={{
                  width: '200px',
                  maxWidth: '100%',
                }}
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
                image: coverphoto,
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
