import { Timeline } from '@/components/Timeline/Timeline'
import { Typo } from '@/components/Typo'
import { Button } from '@/components/ui/button'
import '@/fonts/petrona-v28-latin/index.css'
import Link from 'next/link'

export default function Page() {
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

        <Link href="https://music.apple.com/profile/thomasrosen" rel="noreferrer" target="_blank">
          <Button size="lg" variant="secondary">
            follow what I listen to on Apple Music
          </Button>
        </Link>
      </div>

      <Timeline tags={['playlist']} />
    </>
  )
}
