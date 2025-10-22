import { GenreChart } from '@/components/GenreChart'
import { getEntries } from '@/components/Timeline/getEntries'
import { groupEntries } from '@/components/Timeline/groupEntries'
import { Timeline } from '@/components/Timeline/Timeline'
import { Typo } from '@/components/Typo'
import { Button } from '@/components/ui/button'
import '@/fonts/petrona-v28-latin/index.css'
import Link from 'next/link'

const MAX_TAGS = 12

export default async function Page() {
  const entries = await getEntries({ tags: ['playlist'] })
  const groupedEntries = groupEntries({ entries })

  const tags = Object.values(groupedEntries)
    .flat()
    .flatMap((entry) =>
      entry.tags?.flatMap((tag) => {
        if (
          [
            'Worldwide',
            'Compilation',
            'Vocal',
            'Christian',
            'Easy Listening',
            'TV Soundtrack',
            'Religious',
            'Comedy',
            'Holiday',
            'Instrumental',
            'Soundtrack',
            'Singer/Songwriter',
          ].includes(tag)
        ) {
          // remove these tags
          return []
        }

        if (tag === 'Electronica') {
          return ['Electronic']
        }
        if (tag === 'Alternative Rap') {
          return ['Alternative', 'Rap']
        }
        if (['Hip Hop/Rap', 'Hip-Hop/Rap'].includes(tag)) {
          return ['Hip-Hop', 'Rap']
        }
        if (tag === 'Hip Hop') {
          return ['Hip-Hop']
        }
        if (tag === 'Pop/Rock') {
          return ['Pop', 'Rock']
        }
        if (tag === 'Alternative Folk') {
          return ['Alternative', 'Folk']
        }
        if (tag === 'Country & Folk') {
          return ['Country', 'Folk']
        }
        if (tag === 'Classical Crossover') {
          return ['Classical']
        }
        if (tag === 'R&B/Soul') {
          return ['R&B', 'Soul']
        }
        if (tag === 'Afro House') {
          return ['House']
        }
        if (['Indie Rock', 'Hard Rock', 'Prog-Rock/Art Rock', 'Soft Rock'].includes(tag)) {
          return ['Rock']
        }
        if (
          ['German Pop', 'French Pop', 'Indie Pop', 'K-Pop', 'Pop Latino', 'Teen Pop'].includes(tag)
        ) {
          return ['Pop']
        }

        return [tag]
      })
    )
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
