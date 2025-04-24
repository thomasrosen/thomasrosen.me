import { Dot } from '@/components/Dot'
import { Emoji } from '@/components/Emoji'
import { LinkOrDiv } from '@/components/Timeline/LinkOrDiv'
import { Typo } from '@/components/Typo'
import { Badge } from '@/components/ui/badge'
import { loadPlaylist, loadPlaylists } from '@/lib/loadPlaylists'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function get_genres(playlist: any): string[] {
  if (!playlist || !playlist.Songs || Array.isArray(playlist.Songs) === false) {
    return []
  }

  type GenresWithCount = Record<string, number>
  const genres_with_count: GenresWithCount = playlist.Songs
    // sort the genres by count with reduce
    .reduce((acc: GenresWithCount, song: any) => {
      const genre = song.Genre
      if (!acc.hasOwnProperty(genre)) {
        acc[genre] = 0
      }
      acc[genre] += 1
      return acc
    }, {})

  const genres: string[] = Object.entries(genres_with_count)
    .sort((a: any, b: any) => b[1] - a[1])
    .map(([genre, count]) => genre)
    .slice(0, 3) // only keep the top 3 genres

  return genres
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const playlists = await loadPlaylists()

  return playlists.flatMap((playlist) => [
    {
      id:
        process.env.NODE_ENV === 'production'
          ? playlist.name
          : encodeURIComponent(playlist.name),
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
    <div className='flex flex-col gap-2 w-full'>
      <Typo as='h3' className='scroll-m-0'>
        {title}
      </Typo>

      <div className='leading-thight text-sm'>
        {song.Artist.length ? (
          <strong className='font-[900]'>{song.Artist}</strong>
        ) : null}

        {song.Artist.length && song.Album.length ? ': ' : null}

        {song.Album.length ? song.Album : null}
      </div>

      <Typo as='small' className='flex flex-wrap items-center gap-4'>
        {[
          typeof genre === 'string' && genre.length > 0 ? (
            <span title={`Genre: ${genre}`}>
              <Badge variant='accent' key={genre}>
                {genre}
              </Badge>
            </span>
          ) : null,

          <time title={`Duration: ${song.Duration} min`}>
            {song.Duration} min
          </time>,
          play_count > 0 ? (
            <Emoji title={`Play Count: ${play_count}`}>🔄 {play_count}</Emoji>
          ) : null,
          song['Is Explicit'] === '1' ? (
            <Emoji title='Song is Explicit' alt='Song is Explicit'>
              🔥
            </Emoji>
          ) : null,
        ]
          .filter(Boolean)
          .map((item, index) => (
            <React.Fragment key={index}>{item}</React.Fragment>
          ))}
      </Typo>
    </div>
  )

  return (
    <LinkOrDiv
      href={url}
      className={cn(
        'relative rounded-lg overflow-hidden',
        'w-full h-auto',
        'bg-background text-card-foreground',
        'flex items-start',
        'p-6 gap-3',
        // 'border border-border',
        'hover:bg-accent cursor-pointer',
        'transition-colors duration-150',
        'z-10',
        'flex flex-col gap-4',
        '@container/song',
        className
      )}
    >
      <div className='flex gap-4 w-full justify-between'>
        {album_artwork ? (
          <>
            <Image
              src={album_artwork}
              alt={''}
              width={64}
              height={64}
              className='shrink-0 z-10 absolute object-cover w-[64px] h-[64px] blur-[64px] saturate-150 rounded-sm'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              quality={100}
              loading='lazy'
            />
            <Image
              src={album_artwork}
              alt={title}
              width={64}
              height={64}
              className={cn(
                'z-20 relative object-cover w-[64px] h-[64px] rounded-sm',
                'contrast-110 saturate-110'
              )}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              quality={100}
              loading='lazy'
            />
          </>
        ) : (
          <div className='shrink-0 w-[64px] h-[64px] bg-accent rounded-sm flex items-center justify-center'>
            <Emoji className='text-3xl'>🎵</Emoji>
          </div>
        )}

        <div className='hidden @sm/song:block w-full'>{text_content}</div>

        {position ? (
          <Badge
            variant='accent'
            className='rounded-full p-0 h-7 w-7 flex items-center justify-center shrink-0 z-30 text-sm font-bold'
          >
            {position}
          </Badge>
        ) : null}
      </div>
      <div className='block @sm/song:hidden w-full'>{text_content}</div>
    </LinkOrDiv>
  )
}

export default async function PagePlaylist({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  let { id: name } = (await params) || {}

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
    typeof playlist?.Date === 'string' && playlist?.Date?.length > 0
      ? playlist?.Date
      : ''
  const genres = get_genres(playlist)
  const song_count = playlist?.Songs?.length

  if (!playlist) {
    return (
      <div className='tab_content'>
        <Typo as='h2' itemProp='headline' className='pb-0'>
          No playlist found.
        </Typo>
      </div>
    )
  }

  return (
    <div className='tab_content'>
      <div className='space-y-2 mb-6'>
        <Typo as='h2' itemProp='headline' className='pb-0'>
          <time
            dateTime={date_month}
            title={date_month}
            itemProp='datePublished'
          >
            {playlist.Name}
          </time>
        </Typo>

        <div className='flex flex-wrap gap-2 items-center'>
          <div itemProp='keywords' className='contents'>
            {genres.map((genre) => (
              <Link href={`/timeline?tags=${genre}`} key={genre}>
                <Badge variant='accent'>{genre}</Badge>
              </Link>
            ))}
          </div>
          <Typo as='small'>
            {song_count === 1 ? 'One Song' : `${song_count} Songs`}
          </Typo>
        </div>
      </div>

      <div className='flex flex-wrap gap-4 w-full'>
        {song_count > 0 &&
          playlist.Songs.map((song: any, index: number) => (
            <SongCard key={index} position={index + 1} song={song} />
          ))}
      </div>

      <center>
        <Dot />
      </center>
    </div>
  )
}
