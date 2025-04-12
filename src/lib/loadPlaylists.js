export async function loadPlaylists() {
  try {
    const playlistData = await import('@/data/music/playlists.json');
    const playlists = playlistData.default.playlists
      .sort(
        (a, b) => new Date(b.date_month) - new Date(a.date_month)
      )

    return playlists
  } catch (error) {
    console.error('ERROR_re4P6nv6', error)
  }

  return []
}

export async function loadPlaylist(id) {
  try {
    id = decodeURIComponent(id)
    const playlistAsModule = await import(`@/data/music/playlists/${id}.json`)
    return { ...playlistAsModule }
  } catch (error) {
    console.error(`ERROR_re4P6nv6 Could not load the playlist: ${error.message}`)
  }

  return null
}
