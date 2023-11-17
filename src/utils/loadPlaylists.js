import fs from 'fs'

export function loadPlaylists() {
  let data = fs.readFileSync('./public/music/playlists.json', 'utf8')
  data = JSON.parse(data)

  const playlists = data.playlists.reverse()

  return playlists
}
