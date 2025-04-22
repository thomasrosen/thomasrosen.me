import { Emoji } from '@/components/Emoji'
import '@/fonts/petrona-v28-latin/index.css'
import { loadArticles } from '@/lib/loadArticles'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function ArticleCard({ article }) {
  let coverphoto_src = article.coverphoto_src
  let coverphoto_blurDataURL = article.coverphoto_blurDataURL

  return (
    <div
      className={`
          links_grid_item
          ${
            !!article && article.font === 'serif'
              ? 'serif_font'
              : 'sans_serif_font'
          }
        `}
    >
      {typeof coverphoto_src === 'string' && coverphoto_src.length > 0 ? (
        <div className='image_container'>
          <Link href={'/articles/' + article.slug}>
            <Image
              src={coverphoto_src}
              blurDataURL={coverphoto_blurDataURL}
              alt={article.title}
              width={200}
              height={200}
              style={{
                objectFit: 'cover',
                height: 'auto',
              }}
            />
          </Link>
        </div>
      ) : null}

      <div>
        <h3 className='big'>
          <Link href={'/articles/' + article.slug}>{article.title}</Link>
        </h3>
        <p>
          <strong
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px 15px',
              flexWrap: 'wrap',
            }}
          >
            {[
              <time dateTime={article.date} title={article.date}>
                {article.relative_date}
              </time>,
              article.has_tags ? (
                <span className='tag_row'>
                  {article.tags.map((tag) => (
                    <button className='small' disabled key={tag}>
                      {tag}
                    </button>
                  ))}
                </span>
              ) : null,
              article.has_audio ? <Emoji>🔊</Emoji> : null,
            ]
              .filter(Boolean)
              .map((item, index) => (
                <React.Fragment key={index}>{item}</React.Fragment>
              ))}
          </strong>
        </p>
        <p>{article.summary}</p>
      </div>
    </div>
  )
}

function ArticlesPageContent({ articles }) {
  return (
    <div className='tab_content'>
      <h2>Blog</h2>

      <div>
        <p>
          I occasionally write some articles. These can be short and are about
          any topic that currently interests me.
        </p>
        <p>
          You can read the articles here or listen to them on the various
          podcast platforms. But don't ecpect the to be an hour long lecture,
          it's just the article in audio form.
        </p>
      </div>

      <br />

      <div
        style={{
          display: 'inline-flex',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <a target='_blank' href='/blog/feed.rss'>
          <button>RSS-Feed</button>
        </a>

        <a
          target='_blank'
          rel='noreferrer'
          href='https://open.spotify.com/show/4tdSfXGtc96XrdmYR7NlMk'
        >
          <button>Spotify</button>
        </a>
        <a
          target='_blank'
          rel='noreferrer'
          href='https://www.youtube.com/playlist?list=PLLImRvwJvhwmueAA0cY4qCScBsjpKP5T2'
        >
          <button>YouTube Podcasts</button>
        </a>
        <a
          target='_blank'
          rel='noreferrer'
          href='https://podcasts.apple.com/de/podcast/thomas-rosen-blog/id1678064365'
        >
          <button>Apple Podcasts</button>
        </a>
      </div>

      <br />
      <br />
      <br />

      <div
        className='links_grid'
        style={{
          gridTemplateColumns: 'auto',
        }}
      >
        {(articles.length ? articles : []).map((article) => (
          <ArticleCard key={article.data.slug} article={article.data} />
        ))}
      </div>
    </div>
  )
}

export default async function PageArticles() {
  const articles = await loadArticles()
  return <ArticlesPageContent articles={articles} />
}
