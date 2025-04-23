// type Article = {
//   default: any
//   filepath: string
//   getStaticProps: () => Promise<any>
//   data: {
//     slug: string
//     title: string
//     summary: string
//     date: string
//     audio: string
//     tags: string[]
//     audio_src?: string
//     coverphoto_src?: string
//     coverphoto_blurDataURL?: string
//   }
// }

import { loadArticles } from '@/lib/loadArticles'
import { loadPlaylists } from '@/lib/loadPlaylists'
import { processImageFiles } from '../../scripts/build_timeline.mjs'

export type TimelineEntry = {
  date: string
  displayAs: string
  title?: string
  text?: string
  author?: string
  url?: string
  image?: string
  imageAspectRatio?: number
  audio?: string
  audio_length?: string
  loc?: {
    name: string
    lat: number
    lng: number
  }
  tags?: string[]
}

export async function loadTimeline(): Promise<TimelineEntry[]> {
  const images = processImageFiles()

  const { default: timeline } = await import('./src/data/timeline/entries.yml')
  const timelineEntries: TimelineEntry[] = timeline.entries

  const articles = await loadArticles()
  const articlesAsEntries = articles.map((article, index) => ({
    title: article.data.title,
    text: article.data.summary,
    author: 'Thomas Rosen',
    url: `/articles/${article.data.slug}`,
    image: article.data.coverphoto_src,
    displayAs: 'article',
    // imageAspectRatio: article.data.coverphoto_src ? 2 : 4,
    date: article.data.date,
    tags: [...new Set(['article', ...article.data.tags])],
    audio: article.data.audio_src,
  }))

  const playlists = await loadPlaylists()
  const playlistsAsEntries = playlists.map((playlist) => ({
    displayAs: 'playlist',
    image: playlist.coverphoto,
    url: '/playlists/' + playlist.name,
    tags: [...new Set(['playlist', ...playlist.genres])],
    date: playlist.date_month,
    title: playlist.name,
    text: playlist.count === 1 ? 'One Song' : playlist.count + ' Songs',
  }))

  return [
    ...timelineEntries,
    ...articlesAsEntries,
    ...images,
    ...playlistsAsEntries,
  ]
}
