import { Dot } from '@/components/Dot';
import { Shine } from '@/components/Shine';
import '@/fonts/petrona-v28-latin/index.css';
import { getRelativeTime, loadArticles } from '@/utils/loadArticles';
import fs from 'fs';

// Return a list of `params` to populate the [slug] dynamic segment
export function generateStaticParams() {
  const articles = loadArticles()

  return articles.map(article => ({
    id: article.slug,
  }))
}

export default function Page({ params }) {
  let { id } = params || {}

  if (!id) {
    throw new Error('No article id provided.')
  }

  id = decodeURIComponent(id)

  let article = null

  try {
    let data = fs.readFileSync(`./public/blog/articles/${id}.json`, 'utf8')
    data = JSON.parse(data)
    article = data.article
    article.relative_date = getRelativeTime(new Date(article.date))
  } catch (error) {
    throw new Error(`Could not load the article: ${error.message}`)
  }

  let images = null
  if (!!article && typeof article.coverphoto === 'string' && article.coverphoto.length > 0) {
    images = [`https://thomasrosen.me/${article.coverphoto}`]
  }

  return <div className={`tab_content article ${!!article && article.font === 'serif' ? 'serif_font' : 'sans_serif_font'}`}>

    {
      !!article
        ? <>
          <h2 itemProp="headline">{article.title}</h2>

          <p><strong>
            <time dateTime={article.date} title={article.date} itemProp="datePublished">{article.relative_date}</time> — <span className="tag_row" itemProp="keywords">{article.tags.map(tag => <button className="small" disabled key={tag}>{tag}</button>)}</span>
          </strong></p>

          {
            !!article.audio && typeof article.audio === 'string' && article.audio.length > 0
            ? <audio
                controls
                preload="metadata"
                style={{ width: '100%', marginBlockEnd: '20px' }}
                src={article.audio}
              >
                <source src={article.audio} type="audio/mpeg" />
                <p>
                  <a href={article.audio}>
                    <button>Download audio of the article.</button>
                  </a>
                </p>
              </audio>
            : null
          }

          <div dangerouslySetInnerHTML={{ __html: article.html }} itemProp="articleBody" />
          <Dot />

          {
            (!!article && typeof article.coverphoto === 'string' && article.coverphoto.length > 0)
              ? <>
                <br />
                <br />
                <meta itemProp="image" content={`https://thomasrosen.me/${article.coverphoto}`} />
                <Shine puffyness="2">
                  <img src={article.coverphoto} alt={article.title} style={{
                    width: '200px',
                    maxWidth: '100%',
                  }} />
                </Shine>
              </>
              : null
          }

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://thomasrosen.me/articles/${article.slug}`
              },
              "headline": article.title,
              "image": images,
              "datePublished": article.date,
              "dateModified": article.date,
              "author": {
                "@type": "Person",
                "name": "Thomas Rosen"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Thomas Rosen",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://thomasrosen.me/images/me_small.jpg",
                  "width": 800,
                  "height": 800,
                }
              },
              // "description": "Brief description of the blog article.",
              "articleBody": article.html,
            }) }}
          />
        </>
        : null
    }
  </div>
}
