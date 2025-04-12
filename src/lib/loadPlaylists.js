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
