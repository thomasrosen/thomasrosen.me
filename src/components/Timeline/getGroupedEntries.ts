import { loadTimeline } from '@/lib/loadTimeline'
import type { TimelineEntry } from '@/types'

type GroupedEntries = Record<string, TimelineEntry[]>

export async function getGroupedEntries({
  tags = [],
}: {
  tags?: string[]
} = {}): Promise<GroupedEntries> {
  let entries: TimelineEntry[] = (await loadTimeline()) || []

  if (tags.length > 0) {
    entries = entries.filter((entry) => tags.some((tag) => (entry.tags || []).includes(tag)))
  }

  // Sort entries by date in descending order
  entries = entries.sort((a, b) => {
    const dateA = new Date(a.date || '1970-01-01').getTime()
    const dateB = new Date(b.date || '1970-01-01').getTime()
    return dateB - dateA
  })

  // Group entries by year and month
  const groupedEntries = entries.reduce((acc: GroupedEntries, entry) => {
    let asIsoString = '1970-01-01'
    try {
      const date = new Date(entry.date)
      asIsoString = date.toISOString().split('T')[0]
    } catch (error) {
      // gooble up the error
    }

    // reduce to YYYY-MM
    asIsoString = asIsoString.split('-').slice(0, 2).join('-')

    if (!acc[asIsoString]) {
      acc[asIsoString] = []
    }

    acc[asIsoString].push(entry)

    return acc
  }, {})

  return groupedEntries
}
