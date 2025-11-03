import { GenreChart } from '@/components/GenreChart'
import { getEntries } from '@/components/Timeline/getEntries'
import { groupEntries } from '@/components/Timeline/groupEntries'
import { Timeline } from '@/components/Timeline/Timeline'
import { Typo } from '@/components/Typo'
import { Button } from '@/components/ui/button'
import '@/fonts/petrona-v28-latin/index.css'
import { simpify_music_tags } from '@/lib/simpify_music_tags.mjs'
import Link from 'next/link'

const MAX_TAGS = 12

export default async function Page() {
  const entries = await getEntries({ tags: ['playlist'] })
  const groupedEntries = groupEntries({ entries })

  const tags = Object.values(groupedEntries)
    .flat()
    .flatMap((entry) => entry.tags?.flatMap(simpify_music_tags))
    .reduce(
      (acc, tag) => {
        if (!tag || tag.includes('playlist')) {
          return acc
        }
        if (!acc[tag]) {
          acc[tag] = 0
        }
        acc[tag] += 1
        return acc
      },
      {} as Record<string, number>
    )

  const topTags = Object.keys(tags)
    .sort((a, b) => tags[b] - tags[a])
    .slice(0, MAX_TAGS)

  const chartData = Object.values(groupedEntries)
    .flat()
    .map((entry) => ({
      date: entry.date,

      // ...(topTags.reduce(
      //   (acc, tag) => {
      //     acc[tag] = MAX_TAGS
      //     return acc
      //   },
      //   {} as Record<string, number>
      // ) || {}),

      ...(entry.tags
        ?.filter((tag) => !tag.includes('playlist') && topTags.includes(tag))
        .reduce(
          (acc, tag, index) => {
            acc[tag] = index + 1
            return acc
          },
          {} as Record<string, number>
        ) || {}),
    }))

  return (
    <>
      <div className="tab_content mb-6 space-y-6">
        <Typo as="h2">Playlists</Typo>

        <Typo as="p">
          You ever wanted to know what I'm listening to? Well, you can! I've been keeping track of
          what I listen to since 2018.
        </Typo>
        <Typo as="p">
          The following playlists are songs I liked or discovered in the month of that playlist.
        </Typo>

        <Button asChild size="lg" variant="secondary">
          <Link
            className="is-button"
            href="https://music.apple.com/profile/thomasrosen"
            rel="noreferrer"
            target="_blank"
          >
            follow what I listen to on Apple Music
          </Link>
        </Button>
      </div>

      <GenreChart chartData={chartData} />

      <div className="tab_content">
        <Timeline entries={entries} />
      </div>
    </>
  )
}
