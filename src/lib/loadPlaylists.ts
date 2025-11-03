import { simpify_music_tags } from './simpify_music_tags.mjs'

export async function loadPlaylists() {
  try {
    const playlistData = await import('@/data/music/playlists.json')
    const playlists = await Promise.all(
      playlistData.default.playlists
        .sort((a, b) => new Date(b.date_month).getTime() - new Date(a.date_month).getTime())
        .map(async (playlist) => {
          let coverphoto_src: any = null

          try {
            const playlist_coverphoto = playlist.coverphoto

            if (!!playlist_coverphoto && playlist_coverphoto.length > 0) {
              const imagePath = await import(`@/data/music/playlist_covers/${playlist_coverphoto}`)
              coverphoto_src = imagePath.default
            }
          } catch (_error) {
            // gooble up the error
          }

          return {
            ...playlist,
            coverphoto: coverphoto_src,
            genres: playlist.genres.flatMap(simpify_music_tags),
          }
        })
    )

    return playlists
  } catch (error) {
    console.error('ERROR_re4P6nv6', error)
  }

  return []
}

export async function loadPlaylist(name: string) {
  try {
    const playlistsData = await import('@/data/music/playlists.json')
    const playlists = playlistsData.default.playlists

    const foundPlaylist = playlists.find((playlist_a) => playlist_a.name === name)
    if (!foundPlaylist) {
      throw new Error(`Playlist ${name} not found`)
    }

    const { default: playlist } = await import(`@/data/music/playlists/${foundPlaylist.filename}`)

    playlist.Songs = await Promise.all(
      playlist.Songs.map(async (song: any) => {
        try {
          const albumArtwork = song['Album Artwork']
          if (albumArtwork) {
            const albumArtworkPath = await import(`@/data/music/album_artworks/${albumArtwork}`)
            song['Album Artwork'] = albumArtworkPath.default
          }
        } catch (_error) {
          // gooble up the error
        }
        return song
      })
    )

    return playlist
  } catch (error: any) {
    console.error(`ERROR_re4P6nv6 Could not load the playlist: ${error?.message}`)
  }

  return null
}
