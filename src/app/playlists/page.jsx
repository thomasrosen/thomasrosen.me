import '@/fonts/petrona-v28-latin/index.css'
import { loadPlaylists } from '@/utils/loadPlaylists'
import PlaylistPageContent from './PlaylistPageContent'

export default function Page() {
  let playlists = null

  try {
    playlists = loadPlaylists()
  } catch (error) {
    throw new Error(`Could not load the playlists: ${error.message}`)
  }

  return <PlaylistPageContent playlists={playlists} />
}
