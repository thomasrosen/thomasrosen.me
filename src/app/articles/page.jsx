import { Shine } from '@/components/Shine';
import '@/fonts/petrona-v28-latin/index.css';
import { loadArticles } from '@/utils/loadArticles';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
};

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

const getRelativeTime = (d1, d2 = new Date()) => {
    const elapsed = d1.getTime() - d2.getTime();

    // "Math.abs" accounts for both "past" & "future" scenarios
    for (const u in units) {
        if (Math.abs(elapsed) > units[u] || u === 'second') {
            return rtf.format(Math.round(elapsed / units[u]), u);
        }
    }
};

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
                  <Image placeholder="blur" width={200} height={200} src={article.coverphoto} alt={article.title} />
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

/*
export function Article() {
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // fetch the article from /blog/articles/{slug}.json
    fetch('/blog/articles/' + window.location.pathname.split('/').pop() + '.json')
      .then(response => response.json())
      .then(data => {
        data.article.date = getRelativeTime(new Date(data.article.date))

        setArticle(data.article)
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }, [])

  return <div className={`tab_content article ${!!article && article.font === 'serif' ? 'serif_font' : 'sans_serif_font' }`}>
    {loading && <p>Loading article...</p>}
    {error && <p>Error loading article: {error.message}</p>}

    {
      !!article
        ? <>
          <h2>{article.title}</h2>
          <p><strong>
            {article.date} — <span className="tag_row">{article.tags.map(tag => <button className="small" disabled key={tag}>{tag}</button>)}</span>
          </strong></p>
          <div dangerouslySetInnerHTML={{ __html: article.html }} />
          <Dot />
        </>
        : null
    }
  </div>
}
*/