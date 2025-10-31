import { getEmbeddings, rank_documents } from '@/lib/embedding/embedding'
import type { TimelineEntry } from '@/types'
import { loadTimeline } from '../loadTimeline'

export async function getSimliarTimelineEntries({
  query,
  allowedDisplayAs,
}: {
  query: string
  allowedDisplayAs: string[]
}): Promise<TimelineEntry[]> {
  const partial_timeline = (await loadTimeline()).filter((entry) =>
    allowedDisplayAs.includes(entry.displayAs)
  )

  const entriesWithSearchText = partial_timeline
    .map((entry) => ({
      ...entry,
      searchtext: [entry.title, entry.text].filter(Boolean).join(' '),
    }))
    .filter(({ searchtext }) => !!searchtext && searchtext !== query)

  const source_embeddings = await getEmbeddings([query])
  const document_embeddings = await getEmbeddings(
    entriesWithSearchText.map(({ searchtext }) => searchtext)
  )

  let simliarTexts = await rank_documents(source_embeddings[0], document_embeddings)
  simliarTexts = simliarTexts.slice(0, 3)

  const entries: TimelineEntry[] = []
  for (const { text, similarity } of simliarTexts) {
    const foundEntry = entriesWithSearchText.find((entry) => entry.searchtext === text)
    if (foundEntry) {
      const entryAlreadyAdded = entries.find(
        (entry) => JSON.stringify(entry) === JSON.stringify(foundEntry)
      )
      if (!entryAlreadyAdded) {
        entries.push({
          ...foundEntry,
          rank: similarity,
        })
      }
    }

    if (entries.length >= 3) {
      break
    }
  }

  return entries.sort((a, b) => (b.rank || 0) - (a.rank || 0))
}
