import { loadTimeline } from '@/lib/loadTimeline'
import type { TimelineEntry } from '@/types'

export async function getEntries({
  tags = [],
}: {
  tags?: string[]
} = {}): Promise<TimelineEntry[]> {
  let entries: TimelineEntry[] = (await loadTimeline()) || []

  if (tags.length > 0) {
    entries = entries.filter((entry) => tags.some((tag) => (entry.tags || []).includes(tag)))
  }

  return entries
}
