import playlistData from '@/data/music/playlists.json'

export function loadPlaylists() {
  try {
    const playlists = playlistData.playlists.reverse()

    return playlists
  } catch (error) {
    console.error('ERROR_re4P6nv6', error)
  }

  return []
}
