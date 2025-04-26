import timeline from '@/data/timeline/entries.yml'
import { loadArticles } from '@/lib/loadArticles'
import { loadPlaylists } from '@/lib/loadPlaylists'
import type { TimelineEntry } from '@/types'
import { processImageFiles } from '@@/scripts/processImageFiles.mjs'

let loadTimelineCache: TimelineEntry[] | undefined = undefined

export async function loadTimeline(): Promise<TimelineEntry[]> {
  if (loadTimelineCache) {
    return loadTimelineCache
  }

  const images = processImageFiles()
  const imagesAsEntries = await Promise.all(
    images.map(async (data) => {
      const loc =
        data.latitude && data.longitude
          ? {
              lat: parseFloat(data.latitude),
              lng: parseFloat(data.longitude),
            }
          : undefined

      let image_src = null
      let image_blurDataURL = null
      if (!!data && typeof data.image === 'string' && data.image?.length > 0) {
        try {
          // Remove any URL encoding from the path
          const cleanPath = decodeURIComponent(data.image)
          // const currentDir = process.cwd()
          const imagePath = await import(`@/data/timeline/images/${cleanPath}`)
          image_src = imagePath.default.src
          image_blurDataURL = imagePath.default.blurDataURL
        } catch (error) {
          console.error('Error loading image:', error)
          // Continue without the image rather than failing the build
        }
      }

      return {
        ...data,
        image: image_src,
        image_blurDataURL: image_blurDataURL,
        tags: [...new Set(['image', ...(data.tags || [])])],
        loc,
      }
    })
  )

  const timelineEntries: TimelineEntry[] = timeline.entries

  const articles = await loadArticles()
  const articlesAsEntries = articles.map((article, index) => ({
    title: article.data.title,
    text: article.data.summary,
    author: 'Thomas Rosen',
    url: `/articles/${article.data.slug}`,
    image: article.data.coverphoto_src,
    image_blurDataURL: article.data.coverphoto_blurDataURL,
    displayAs: 'article',
    imageAspectRatio: 4,
    date: article.data.date,
    tags: [...new Set(['article', ...(article.data.tags || [])])],
    audio: article.data.audio_src,
  }))

  const playlists = await loadPlaylists()
  const playlistsAsEntries = playlists.map((playlist) => ({
    displayAs: 'playlist',
    image: playlist.coverphoto,
    image_blurDataURL: playlist.coverphoto_blurDataURL,
    url: '/playlists/' + playlist.name,
    tags: [...new Set(['playlist', ...(playlist.genres || [])])],
    date: playlist.date_month,
    title: playlist.name,
    text: playlist.count === 1 ? 'One Song' : playlist.count + ' Songs',
  }))

  loadTimelineCache = [
    ...timelineEntries,
    ...articlesAsEntries,
    ...imagesAsEntries,
    ...playlistsAsEntries,
  ]

  return loadTimelineCache
}
