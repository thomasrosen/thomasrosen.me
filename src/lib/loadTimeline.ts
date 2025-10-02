// biome-ignore assist/source/organizeImports: auto sort does conflict
import all_google_collection_entries from '@/data/google_collections/all_google_collection_entries.yml'
import timeline from '@/data/timeline/entries.yml'
import { loadArticles } from '@/lib/loadArticles'
import { loadPlaylists } from '@/lib/loadPlaylists'
import type { TimelineEntry } from '@/types'
import { processImageFiles } from '@@/scripts/processImageFiles.mjs'

let loadTimelineCache: TimelineEntry[] | undefined

export async function loadTimeline(): Promise<TimelineEntry[]> {
  if (loadTimelineCache) {
    return loadTimelineCache
  }

  const images = processImageFiles()
  const imagesAsEntries = await Promise.all(
    images.map((entry: any) => {
      return {
        ...entry,
        latitude: Number.parseFloat(entry.latitude),
        longitude: Number.parseFloat(entry.longitude),
        tags: [...new Set(['image', ...(entry.tags || [])])],
      }
    })
  )

  const done_entry_ids = new Set<string>()

  const timelineEntries: TimelineEntry[] = await Promise.all(
    [...imagesAsEntries, ...all_google_collection_entries.entries, ...timeline.entries].map(
      async (entry: any) => {
        if (entry.id) {
          if (done_entry_ids.has(entry.id)) {
            return null
          }
          done_entry_ids.add(entry.id)
        }

        // load image
        if (!!entry && typeof entry.image === 'string' && entry.image?.length > 0) {
          try {
            // Remove any URL encoding from the path
            const cleanPath = decodeURIComponent(entry.image)
            // const currentDir = process.cwd()
            const imagePath = await import(`@/data/timeline/images/${cleanPath}`)
            const image_src = imagePath.default

            const width = image_src.width
            const height = image_src.height
            const aspectRatio = width / height

            entry.image = image_src
            entry.imageAspectRatio = aspectRatio
          } catch (error) {
            console.error('ERROR_KYb9FC2c Error loading image:', error)
            // Continue without the image rather than failing the build
          }
        }

        // get same timeline entries
        const timelineEntriesWithSameId = timeline.entries.filter(
          (e: any) => !!e.id && !!entry.id && e.id === entry.id
        )

        return {
          ...entry,
          ...timelineEntriesWithSameId.reduce((acc: any, curr: any) => {
            // biome-ignore lint/performance/noAccumulatingSpread: this good is anymay not perfect
            return { ...acc, ...curr }
          }, {}),
          tags: [
            ...new Set([
              ...(entry.tags || []),
              ...timelineEntriesWithSameId.flatMap((e: any) => e.tags || []),
            ]),
          ],
        }
      }
    )
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
    latitude: article.data.latitude,
    longitude: article.data.longitude,
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

  loadTimelineCache = [...timelineEntries, ...articlesAsEntries, ...playlistsAsEntries]
    .filter(Boolean)
    .filter(
      (entry: any) =>
        // places must have a public tag to be shown
        entry.displayAs !== 'place' ||
        (entry.displayAs === 'place' && entry.tags.includes('public'))
    )
    .filter((entry: any) => {
      const dateA = new Date(entry.date || '1970-01-01').getTime()
      return entry.displayAs !== 'image' || (entry.displayAs === 'image' && dateA > 31_000_000)
    })
  // .sort((a, b) => {
  //   const dateA = new Date(a.date || '1970-01-01')
  //   const dateB = new Date(b.date || '1970-01-01')
  //   return dateB.getTime() - dateA.getTime()
  // })

  return loadTimelineCache
}
