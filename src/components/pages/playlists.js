import React, { useState, useEffect } from 'react'

import '../../fonts/petrona-v28-latin/index.css'

import { Link } from 'react-router-dom'
// import Dot from '../dot.js'

export default function Playlists() {
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/static/music/playlists.json')
      .then(response => response.json())
      .then(data => {
        setPlaylists(data.playlists.reverse())
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }, [])

  return <div className="tab_content">
    <h2>Playlists</h2>

    <p>
      You ever wanted to knwo what I'm listening to? Well, you can! I've been keeping track of what I listen to since 2018.
    </p>
    <p>
      The following playlists are songs I liked or discovered in the month they were created.
    </p>

    <br />

    <div style={{
      display: 'inline-flex',
      flexWrap: 'wrap',
      gap: '10px',
    }}>

      <a target="_blank" rel="noreferrer" href="https://music.apple.com/profile/thomasrosen">
        <button>follow what I listen to on Apple Music</button>
      </a>
    </div>

    <br />
    <br />
    <br />

    {loading && <p>Loading playlists...</p>}
    {error && <p>Error loading playlists: {error.message}</p>}

    <div className="links_grid" style={{
      gridTemplateColumns: 'auto'
    }}>
      {playlists.length > 0 && playlists.map(playlist => <div
        key={playlist.name}
        className="links_grid_item"
      >
        {
          typeof playlist.coverphoto === 'string' && playlist.coverphoto.length > 0
            ? <div className="image_container" style={{
              maxWidth: '128px',
              maxHeight: '128px',
            }}>
              <Link to={'/playlists/' + playlist.name}>
                <img src={playlist.coverphoto} alt={playlist.name} style={{
                  filter: 'contrast(1.1) saturate(1.2)',
                }} />
              </Link>
            </div>
            : null
        }

        <div>
          <h3 className="big">
            <Link to={'/playlists/' + playlist.name}>
              <time datetime={playlist.date_month} title={playlist.date_month}>
                {playlist.name}
              </time>
            </Link>
          </h3>
          <p>
            <strong>{
              playlist.count === 1
                ? 'One Song'
                : playlist.count + ' Songs' 
            }</strong>
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
                  Array.isArray(playlist.genres) && playlist.genres.length > 0
                    ? <span className="tag_row">
                      {playlist.genres.map(genre => <button className="small" disabled key={genre}>{genre}</button>)}
                    </span>
                    : null
                ),
              ]
                .filter(Boolean)
                .map((item, index) => <React.Fragment key={index}>{item}</React.Fragment>)
            }
          </strong></p>
        </div>
      </div>)}
    </div>

  </div>
}
