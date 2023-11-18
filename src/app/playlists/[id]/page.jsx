import { Dot } from '@/components/Dot';
import { Shine } from '@/components/Shine';
import { loadPlaylists } from '@/utils/loadPlaylists';
import fs from 'fs';
import Image from 'next/image';
import React from 'react';

function get_genres(playlist) {
  if (!playlist || !playlist.Songs || Array.isArray(playlist.Songs) === false) {
    return []
  }

  let genres = playlist.Songs
    // sort the genres by count with reduce
    .reduce((acc, song) => {
      const genre = song.Genre
      if (!acc.hasOwnProperty(genre)) {
        acc[genre] = 0
      }
      acc[genre] += 1
      return acc
    }, {})

  genres = Object.entries(genres)
    .sort((a, b) => b[1] - a[1])
    .map(([genre, count]) => genre)
    .slice(0, 3) // only keep the top 3 genres

  return genres
}

// Return a list of `params` to populate the [slug] dynamic segment
export function generateStaticParams() {
  const playlists = loadPlaylists()

  return playlists.map(playlist => ({
    id: playlist.name,
  }))
}

export default function Page({ params }) {
  let { id } = params || {}

  if (!id) {
    throw new Error('No playlist id provided.')
  }

  id = decodeURIComponent(id)

  let playlist = null

  try {
    playlist = fs.readFileSync(`./public/music/playlists/${id}.json`, 'utf8')
    playlist = JSON.parse(playlist)
  } catch (error) {
    throw new Error(`Could not load the playlist: ${error.message}`)
  }

  const date_month = (
    typeof playlist?.Date === 'string' && playlist?.Date?.length > 0
      ? playlist?.Date
      : ''
  )
  const genres = get_genres(playlist)
  const song_count = playlist?.Songs?.length

  return <div className={`tab_content article ${!!playlist && playlist.font === 'serif' ? 'serif_font' : 'sans_serif_font'}`}>

    {
      !!playlist
        ? <>

          <h2 itemProp="headline">
            <time dateTime={date_month} title={date_month} itemProp="datePublished">{playlist.Name}</time>
          </h2>

          <p><strong>
            <span className="tag_row" itemProp="keywords">
              {genres.map(genre => <button className="small" disabled key={genre}>{genre}</button>)}
              <br />
              <span>{song_count === 1 ? 'One Song' : `${song_count} Songs`}</span>
            </span>
          </strong></p>

          <hr />

          <div className="links_grid" style={{
            gridTemplateColumns: 'auto'
          }}>
            {song_count > 0 && playlist.Songs.map((song, index) => {

              const album_artwork = song['Album Artwork']
              const title = song.Title
              const genre = song.Genre
              const url = song['Store URL']
              const play_count = song['Play Count']

              return <div
                key={index}
                className="links_grid_item color_inherit"
              >

                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inherit_color"
                >
                  <div className="image_container" style={{
                    width: '64px',
                    height: '64px',
                  }}>
                    {
                      typeof album_artwork === 'string' && album_artwork.length > 0
                        ? <Shine puffyness="2">
                            <Image width={64} height={64} src={album_artwork} alt={title} style={{
                              filter: 'contrast(1.1) saturate(1.2)',
                            }} />
                          </Shine>
                        : <div></div>
                    }
                  </div>
                </a>

                <div>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inherit_color"
                  >
                    <h3 className="big" style={{ marginBlockStart: '0' }}>
                      {title}
                    </h3>
                  </a>

                  <p>
                    {
                      typeof song.Artist === 'string' && song.Artist.length > 0
                        ? <strong>{song.Artist}</strong>
                        : null
                    }
                    {
                      typeof song.Album === 'string' && song.Album.length > 0
                        ? (
                          typeof song.Artist === 'string' && song.Artist.length > 0
                            ? `: ${song.Album}`
                            : song.Album
                        )
                        : null
                    }
                  </p>

                  <p><strong style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px 15px',
                    flexWrap: 'wrap',
                  }}>
                    {
                      [
                        (
                          typeof genre === 'string' && genre.length > 0
                            ? <span className="tag_row" title={`Genre: ${genre}`}>
                              <button className="small" disabled key={genre}>{genre}</button>
                            </span>
                            : null
                        ),
                        <time title={`Duration: ${song.Duration} min`}>{song.Duration} min</time>,
                        (
                          play_count > 0
                            ? <span title={`Play Count: ${play_count}`}>🔄 {play_count}</span>
                            : null
                        ),
                        song['Is Explicit'] === '1' ? <span title="Song is Explicit" alt="Song is Explicit">🔥</span> : null,
                      ]
                        .filter(Boolean)
                        .map((item, index) => <React.Fragment key={index}>{item}</React.Fragment>)
                    }
                  </strong></p>
                </div>
              </div>
            })}
          </div>

          <br />
          <br />
          <center>
            <Dot />
          </center>

        </>
        : null
    }
  </div>
}
