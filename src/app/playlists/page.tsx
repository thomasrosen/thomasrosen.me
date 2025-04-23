import { Timeline } from '@/components/Timeline/Timeline'
import { Typo } from '@/components/Typo'
import { Button } from '@/components/ui/button'
import '@/fonts/petrona-v28-latin/index.css'
import Link from 'next/link'

export default async function Page() {
  return (
    <>
      <div className='tab_content space-y-6 mb-6'>
        <Typo as='h2'>Playlists</Typo>

        <Typo as='p'>
          You ever wanted to know what I'm listening to? Well, you can! I've
          been keeping track of what I listen to since 2018.
        </Typo>
        <Typo as='p'>
          The following playlists are songs I liked or discovered in the month
          of that playlist.
        </Typo>

        <Link
          target='_blank'
          rel='noreferrer'
          href='https://music.apple.com/profile/thomasrosen'
        >
          <Button variant='secondary' size='lg'>
            follow what I listen to on Apple Music
          </Button>
        </Link>
      </div>

      <Timeline tags={['playlist']} />
    </>
  )
}
