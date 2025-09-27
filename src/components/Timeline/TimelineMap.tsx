import { getEntries } from './getEntries'
import { TimelineMapReactMap } from './TimelineMapReactMap'

export async function TimelineMap({
  tags = [],
  // hiddenTags = [],
}: {
  tags?: string[]
  hiddenTags?: string[]
}) {
  const entries = await getEntries({ tags })

  const onlyEntriesWithLocation = entries
    .filter(
      (entry) =>
        Object.hasOwn(entry, 'latitude') &&
        Object.hasOwn(entry, 'longitude') &&
        !!entry.latitude &&
        !!entry.longitude
    )
    .map((entry, index) => {
      if (!entry.id) {
        entry.id = `id${index}`
      }
      return entry
    })

  return <TimelineMapReactMap entries={onlyEntriesWithLocation} />
}
