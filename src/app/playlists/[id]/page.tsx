import Image from 'next/image'
import Link from 'next/link'
import { Dot } from '@/components/Dot'
import { Emoji } from '@/components/Emoji'
import { LinkOrDiv } from '@/components/Timeline/LinkOrDiv'
import { Typo } from '@/components/Typo'
import { Badge } from '@/components/ui/badge'
import { loadPlaylist, loadPlaylists } from '@/lib/loadPlaylists'
import { cn } from '@/lib/utils'

export const dynamic = 'force-static'
export const dynamicParams = false

function get_genres(playlist: any): string[] {
  if (!playlist?.Songs || Array.isArray(playlist.Songs) === false) {
    return []
  }

  type GenresWithCount = Record<string, number>
  const genres_with_count: GenresWithCount = playlist.Songs
    // sort the genres by count with reduce
    .reduce((acc: GenresWithCount, song: any) => {
      const genre = song.Genre
      if (!Object.hasOwn(acc, genre)) {
        acc[genre] = 0
      }
      acc[genre] += 1
      return acc
    }, {})

  const genres: string[] = Object.entries(genres_with_count)
    .sort((a: any, b: any) => b[1] - a[1])
    .map(([genre]) => genre)
    .slice(0, 3) // only keep the top 3 genres

  return genres
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const playlists = await loadPlaylists()

  return playlists.flatMap((playlist) => [
    {
      id: process.env.NODE_ENV === 'production' ? playlist.name : encodeURIComponent(playlist.name),
    },
  ])
}

function SongCard({
  song,
  className,
  position,
}: {
  song: any
  className?: string
  position: number
}) {
  const album_artwork = song['Album Artwork']
  const title = song.Title
  const genre = song.Genre
  const url = song['Store URL']
  const play_count = song['Play Count']

  const text_content = (
    <div className="flex w-full flex-col gap-2">
      <Typo as="h3" className="scroll-m-0">
        {title}
      </Typo>

      <div className="text-sm leading-thight">
        {song.Artist.length ? <strong className="font-[900]">{song.Artist}</strong> : null}

        {song.Artist.length && song.Album.length ? ': ' : null}

        {song.Album.length ? song.Album : null}
      </div>

      <Typo as="small" className="flex flex-wrap items-center gap-4">
        {[
          typeof genre === 'string' && genre.length > 0 ? (
            <span key={genre} title={`Genre: ${genre}`}>
              <Badge key={genre} variant="accent">
                {genre}
              </Badge>
            </span>
          ) : null,

          <time key={song.Duration} title={`Duration: ${song.Duration} min`}>
            {song.Duration} min
          </time>,
          play_count > 0 ? (
            <Emoji key={play_count} title={`Play Count: ${play_count}`}>
              🔄 {play_count}
            </Emoji>
          ) : null,
          song['Is Explicit'] === '1' ? (
            <Emoji alt="Song is Explicit" key={song['Is Explicit']} title="Song is Explicit">
              🔥
            </Emoji>
          ) : null,
        ].filter(Boolean)}
      </Typo>
    </div>
  )

  return (
    <LinkOrDiv
      className={cn(
        'relative overflow-hidden rounded-lg',
        'h-auto w-full',
        'bg-background text-card-foreground',
        'flex items-start',
        'gap-3 p-6',
        // 'border border-border',
        'cursor-pointer hover:bg-accent',
        'transition-colors duration-150',
        'z-10',
        'flex flex-col gap-4',
        '@container/song',
        className
      )}
      href={url}
    >
      <div className="flex w-full justify-between gap-4">
        {album_artwork ? (
          <>
            <Image
              alt={''}
              className="absolute z-10 h-[64px] w-[64px] shrink-0 rounded-sm object-cover blur-[64px] saturate-150"
              height={64}
              loading="lazy"
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={album_artwork}
              width={64}
            />
            <Image
              alt={title}
              className={cn(
                'relative z-20 h-[64px] w-[64px] rounded-sm object-cover',
                'contrast-110 saturate-110'
              )}
              height={64}
              loading="lazy"
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={album_artwork}
              width={64}
            />
          </>
        ) : (
          <div className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-sm bg-accent">
            <Emoji className="text-3xl">🎵</Emoji>
          </div>
        )}

        <div className="@sm/song:block hidden w-full">{text_content}</div>

        {position ? (
          <Badge
            className="z-30 flex h-7 w-7 shrink-0 items-center justify-center rounded-full p-0 font-bold text-sm"
            variant="accent"
          >
            {position}
          </Badge>
        ) : null}
      </div>
      <div className="block @sm/song:hidden w-full">{text_content}</div>
    </LinkOrDiv>
  )
}

export default async function PagePlaylist({ params }: { params: Promise<{ id: string }> }) {
  const { id: name } = (await params) || {}

  if (!name) {
    throw new Error('No playlist name provided.')
  }

  const playlist = await loadPlaylist(decodeURIComponent(name))

  if (!playlist) {
    throw new Error('No playlist found.')
  }

  if (
    typeof playlist.Songs === 'object' &&
    playlist.Songs !== null &&
    !Array.isArray(playlist.Songs)
  ) {
    playlist.Songs = [playlist.Songs]
  }

  const date_month =
    typeof playlist?.Date === 'string' && playlist?.Date?.length > 0 ? playlist?.Date : ''
  const genres = get_genres(playlist)
  const song_count = playlist?.Songs?.length

  if (!playlist) {
    return (
      <div className="tab_content">
        <Typo as="h2" className="pb-0" itemProp="headline">
          No playlist found.
        </Typo>
      </div>
    )
  }

  return (
    <div className="tab_content">
      <div className="mb-6 space-y-2">
        <Typo as="h2" className="pb-0" itemProp="headline">
          <time dateTime={date_month} itemProp="datePublished" title={date_month}>
            {playlist.Name}
          </time>
        </Typo>

        <div className="flex flex-wrap items-center gap-2">
          <div className="contents" itemProp="keywords">
            {genres.map((genre) => (
              <Link href={`/tag/${genre}`} key={genre}>
                <Badge variant="accent">{genre}</Badge>
              </Link>
            ))}
          </div>
          <Typo as="small">{song_count === 1 ? 'One Song' : `${song_count} Songs`}</Typo>
        </div>
      </div>

      <div className="flex w-full flex-wrap gap-4">
        {song_count > 0 &&
          playlist.Songs.map((song: any, index: number) => (
            <SongCard key={`${song.Title}-${index}`} position={index + 1} song={song} />
          ))}
      </div>

      <center>
        <Dot />
      </center>
    </div>
  )
}
