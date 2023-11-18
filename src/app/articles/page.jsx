import { Shine } from '@/components/Shine';
import '@/fonts/petrona-v28-latin/index.css';
import { loadArticles } from '@/utils/loadArticles';
import Link from 'next/link';
import React from 'react';

export default function Page() {
  let articles = null

  try {
    articles = loadArticles()
  } catch (error) {
    throw new Error(`Could not load the articles: ${error.message}`)
  }

  return <div className="tab_content">
    <h2>Blog</h2>

    <div>
    <p>
      I occasionally write some articles. These can be short and are about any topic that currently interests me.
    </p>
    <p>
      You can read the articles here or listen to them on the various podcast platforms. But don't ecpect the to be an hour long lecture, it's just the article in audio form.
    </p>
    </div>

    <br />

    <div style={{
      display: 'inline-flex',
      flexWrap: 'wrap',
      gap: '10px',
    }}>
      <a target="_blank" href="/blog/feed.rss">
        <button>RSS-Feed</button>
      </a>

      <a target="_blank" rel="noreferrer" href="https://open.spotify.com/show/4tdSfXGtc96XrdmYR7NlMk">
        <button>Spotify</button>
      </a>
      <a target="_blank" rel="noreferrer" href="https://podcasts.google.com/feed/aHR0cHM6Ly90aG9tYXNyb3Nlbi5tZS9ibG9nL2ZlZWQucnNz">
        <button>Google Podcasts</button>
      </a>
      <a target="_blank" rel="noreferrer" href="https://podcasts.apple.com/de/podcast/thomas-rosen-blog/id1678064365">
        <button>Apple Podcasts</button>
      </a>
    </div>

    <br />
    <br />
    <br />

    <div className="links_grid" style={{
      gridTemplateColumns: 'auto'
    }}>
      {articles.length > 0 && articles.map(article => <div
        key={article.slug}
        className={`
          links_grid_item
          ${!!article && article.font === 'serif' ? 'serif_font' : 'sans_serif_font'}
        `}
      >
        {
          typeof article.coverphoto === 'string' && article.coverphoto.length > 0
            ? <div className="image_container">
                <Link href={'/articles/' + article.slug}>
                  <Shine puffyness="2">
                    <img src={article.coverphoto} alt={article.title} />
                  </Shine>
                </Link>
              </div>
            : null
        }

        <div>
        <h3 className="big">
            <Link href={'/articles/' + article.slug}>
            {article.title}
          </Link>
        </h3>
        <p><strong style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px 15px',
          flexWrap: 'wrap',
        }}>
          {
            [
              <time dateTime={article.date} title={article.date}>{article.relative_date}</time>,
              (article.has_tags ? <span className="tag_row">{article.tags.map(tag => <button className="small" disabled key={tag}>{tag}</button>)}</span> : null),
              (article.has_audio ? <span>🔊</span> : null)
            ]
            .filter(Boolean)
            .map((item, index) => <React.Fragment key={index}>{item}</React.Fragment>)
          }
        </strong></p>
        <p>{article.summary}</p>
        </div>
      </div>)}
    </div>

  </div>
}
