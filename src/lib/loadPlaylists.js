import playlistData from '@/data/music/playlists.json'

export function loadPlaylists() {
  try {
    return playlistData.playlists.sort(
      (a, b) => new Date(b.date_month) - new Date(a.date_month)
    )
  } catch (error) {
    console.error('ERROR_re4P6nv6', error)
  }

  return []
}
