import React, { useState, useEffect } from 'react'

import '../../fonts/petrona-v28-latin/index.css'

import { Link } from 'react-router-dom'
// import Dot from '../dot.js'

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

export default function Articles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/blog/articles.json')
      .then(response => response.json())
      .then(data => {
        data.articles = data.articles
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map(article => {
            article.date = getRelativeTime(new Date(article.date))
            return article
          })
        setArticles(data.articles)
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }, [])

  return <div className="tab_content">
    <h2>Blog</h2>

    {loading && <p>Loading articles...</p>}
    {error && <p>Error loading articles: {error.message}</p>}

    <div className="links_grid">
      {articles.length > 0 && articles.map(article => <div
        key={article.slug}
        className={!!article && article.font === 'serif' ? 'serif_font' : 'sans_serif_font'}
      >
        <h3 className="big">
          <Link to={'/articles/' + article.slug}>
            {article.title}
          </Link>
        </h3>
        <p><strong>
          {article.date} — <span className="tag_row">{article.tags.map(tag => <button className="small" disabled key={tag}>{tag}</button>)}</span>
        </strong></p>
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
