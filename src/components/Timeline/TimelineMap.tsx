import { getEntries } from '@/components/Timeline/getEntries'
import { TimelineMapReactMap } from '@/components/Timeline/TimelineMapReactMap'

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
  // .slice(0, 5) // limit to 5 entries for testing

  return <TimelineMapReactMap entries={onlyEntriesWithLocation} />
}
