import { processImageFiles } from '@@/scripts/processImageFiles.mjs'
import timeline from '@/data/timeline/entries.yml'
import { loadArticles } from '@/lib/loadArticles'
import { loadPlaylists } from '@/lib/loadPlaylists'
import type { TimelineEntry } from '@/types'

let loadTimelineCache: TimelineEntry[] | undefined

export async function loadTimeline(): Promise<TimelineEntry[]> {
  if (loadTimelineCache) {
    return loadTimelineCache
  }

  const images = processImageFiles()
  const imagesAsEntries = await Promise.all(
    images.map(async (data: any) => {
      const loc =
        data.latitude && data.longitude
          ? {
              lat: Number.parseFloat(data.latitude),
              lng: Number.parseFloat(data.longitude),
            }
          : undefined

      if (!!data && typeof data.image === 'string' && data.image?.length > 0) {
        try {
          // Remove any URL encoding from the path
          const cleanPath = decodeURIComponent(data.image)
          // const currentDir = process.cwd()
          const imagePath = await import(`@/data/timeline/images/${cleanPath}`)
          const image_src = imagePath.default

          const width = image_src.width
          const height = image_src.height
          const aspectRatio = width / height

          data.image = image_src
          data.imageAspectRatio = aspectRatio
        } catch (error) {
          console.error('Error loading image:', error)
          // Continue without the image rather than failing the build
        }
      }

      return {
        ...data,
        tags: [...new Set(['image', ...(data.tags || [])])],
        loc,
      }
    })
  )

  const timelineEntries: TimelineEntry[] = await Promise.all(
    timeline.entries.map(async (data: any) => {
      if (!!data && typeof data.image === 'string' && data.image?.length > 0) {
        try {
          // Remove any URL encoding from the path
          const cleanPath = decodeURIComponent(data.image)
          // const currentDir = process.cwd()
          const imagePath = await import(`@/data/timeline/images/${cleanPath}`)
          const image_src = imagePath.default

          const width = image_src.width
          const height = image_src.height
          const aspectRatio = width / height

          data.image = image_src
          data.imageAspectRatio = aspectRatio
        } catch (error) {
          console.error('ERROR_KYb9FC2c Error loading image:', error)
          // Continue without the image rather than failing the build
        }
      }

      return data
    })
  )

  const articles = await loadArticles()
  const articlesAsEntries = articles.map((article) => ({
    title: article.data.title,
    text: article.data.summary,
    author: 'Thomas Rosen',
    url: `/articles/${article.data.slug}`,
    image: article.data.coverphoto_src,
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
    url: `/playlists/${playlist.name}`,
    tags: [...new Set(['playlist', ...(playlist.genres || [])])],
    date: playlist.date_month,
    title: playlist.name,
    text: playlist.count === 1 ? 'One Song' : `${playlist.count} Songs`,
  }))

  loadTimelineCache = [
    ...timelineEntries,
    ...articlesAsEntries,
    ...imagesAsEntries,
    ...playlistsAsEntries,
  ]

  return loadTimelineCache
}
