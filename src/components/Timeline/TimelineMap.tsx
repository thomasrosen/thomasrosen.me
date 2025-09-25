import { ReactMap } from '../ReactMap'
import { getEntries } from './getEntries'

export async function TimelineMap({
  tags = [],
  // hiddenTags = [],
}: {
  tags?: string[]
  hiddenTags?: string[]
}) {
  const entries = await getEntries({ tags })

  const onlyEntriesWithLocation = entries.filter(
    (entry) =>
      Object.hasOwn(entry, 'latitude') &&
      Object.hasOwn(entry, 'longitude') &&
      !!entry.latitude &&
      !!entry.longitude
  )

  return (
    <div className="green-tint h-screen w-screen">
      <ReactMap markers={onlyEntriesWithLocation} />
    </div>
  )
}
