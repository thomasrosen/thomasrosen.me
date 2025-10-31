import { getEmbeddings, rank_documents } from '@/lib/embedding/embedding'
import type { TimelineEntry } from '@/types'
import { loadTimeline } from '../loadTimeline'
import { entryToSearchString } from './entryToSearchString'

export async function getSimliarTimelineEntries({
  query,
  allowedDisplayAs,
}: {
  query: string
  allowedDisplayAs: string[]
}): Promise<TimelineEntry[]> {
  const entriesWithSearchText: TimelineEntry[] = (await loadTimeline())
    .filter(
      (entry) =>
        allowedDisplayAs.includes(entry.displayAs) &&
        (!!entry.title || !!entry.text || !!entry.tags)
    )
    .map((entry) => ({
      ...entry,
      searchtext: entryToSearchString(entry),
    }))

  const source_embeddings = await getEmbeddings([query])
  const document_embeddings = await getEmbeddings(
    entriesWithSearchText
      .map(({ searchtext }) => searchtext || '')
      .filter((searchtext) => !!searchtext)
  )

  const simliarTexts = await rank_documents(source_embeddings[0], document_embeddings)
  const simliarTextsWithoutFirst = simliarTexts.slice(1) // rmeove the most similar item (itself)

  const entries: TimelineEntry[] = []
  for (const { text, similarity } of simliarTextsWithoutFirst) {
    const foundEntry = entriesWithSearchText.find((entry) => entry.searchtext === text)
    if (foundEntry) {
      foundEntry.searchtext = undefined

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

  return entries // .sort((a, b) => (b.rank || 0) - (a.rank || 0))
}
