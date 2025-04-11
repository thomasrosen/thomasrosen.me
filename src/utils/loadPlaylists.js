import fs from 'fs'

export function loadPlaylists() {
  try {
    let data = fs.readFileSync('./public/music/playlists.json', 'utf8')
    data = JSON.parse(data)

    const playlists = data.playlists.reverse()

    return playlists
  } catch (error) {
    console.error('ERROR_re4P6nv6', error)
  }

  return []
}
