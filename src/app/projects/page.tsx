import { Emoji } from '@/components/Emoji'
import { Typo } from '@/components/Typo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
export default function PageProjects() {
  return (
    <div className='tab_content space-y-6'>
      <Typo as='h2'>Projects</Typo>
      <Typo as='p'>A small collection of some projects, I've worked on.</Typo>

      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-2'>
          <Typo as='h3' className='space-x-2'>
            <Emoji>🏳️‍🌈</Emoji>
            <a
              href='https://queer.thomasrosen.me/'
              target='_blank'
              rel='noreferrer'
              data-umami-event='project-queer-thomasrosen'
            >
              queer.thomasrosen.me
            </a>
          </Typo>
          <Typo as='p' className='body2 !mb-0'>
            A list of websites with information about queer places and living as
            a queer person. You can filter by some tags and your location.
          </Typo>
          <Link href='/articles/queer-resources'>
            <Button size='sm' variant='accent'>
              more infos
            </Button>
          </Link>
        </div>

        <div className='flex flex-col gap-2'>
          <Typo as='h3' className='space-x-2'>
            <Emoji>🏙️ 🔊</Emoji>
            <Link
              href='https://berlinnoise.thomasrosen.me/'
              target='_blank'
              rel='noreferrer'
              data-umami-event='project-berlinnoise'
            >
              Berlin Noise Dataset
            </Link>
          </Typo>
          <Typo as='p' className='body2 !mb-0'>
            A collection of city-noise recordings of Berlin and other places.
          </Typo>
        </div>

        <div className='flex flex-col gap-2'>
          <Typo as='h3' className='space-x-2'>
            <Emoji>🏳️‍🌈 🗺 ❤️</Emoji>
            <Link
              href='https://map.qiekub.org/'
              target='_blank'
              rel='noreferrer'
              data-umami-event='project-queermap'
            >
              map.qiekub.org
            </Link>
          </Typo>
          <Typo as='p' className='body2 !mb-0'>
            Find LGBTIAQ+ safe-spaces on the global QueerMap.
          </Typo>
          <Link href='/articles/aws-queermap'>
            <Button size='sm' variant='accent'>
              more infos
            </Button>
          </Link>
        </div>

        <div className='flex flex-col gap-2'>
          <Typo as='h3' className='space-x-2'>
            <Emoji>🔗 💜 🇪🇺</Emoji>
            <Link
              href='https://github.com/voltbonn/volt.link'
              target='_blank'
              rel='noreferrer'
              data-umami-event='project-volt-link'
            >
              volt.link
            </Link>
          </Typo>
          <Typo as='p' className='body2 !mb-0'>
            Linktr.ee and bit.ly alternatives for Volt Europa.
          </Typo>
        </div>

        <div className='flex flex-col gap-2'>
          <Typo as='h3' className='space-x-2'>
            <Emoji>🖼 💜 🇪🇺</Emoji>
            <Link
              href='https://www.profile-volt.org/'
              target='_blank'
              rel='noreferrer'
              data-umami-event='project-volt-profile-picture'
            >
              profile-volt.org
            </Link>
          </Typo>
          <Typo as='p' className='body2 !mb-0'>
            Create your own Volt Europa Profile Picture Frame.
          </Typo>
        </div>

        <div className='flex flex-col gap-2'>
          <Typo as='h3' className='space-x-2'>
            <Emoji>🖼 🤳 🔗</Emoji>
            <Link
              href='https://qrcode.volt.link/'
              target='_blank'
              rel='noreferrer'
              data-umami-event='project-volt-qr-code'
            >
              qrcode.volt.link
            </Link>
          </Typo>
          <Typo as='p' className='body2 !mb-0'>
            QR-Code generator with some default colors for Volt Europa.
          </Typo>
        </div>

        <hr />

        <div className='flex flex-col gap-2'>
          <Typo as='h3' className='space-x-2'>
            <Emoji>🤖</Emoji>
            <Link
              href='https://github.com/thomasrosen/thomasrosen.me'
              target='_blank'
              rel='noreferrer'
              data-umami-event='sourcecode'
            >
              Source Code of this Website
            </Link>
          </Typo>
          <Typo as='p' className='body2 !mb-0'>
            Click here to view the sourcecode of thomasrosen.me
          </Typo>
        </div>
      </div>
    </div>
  )
}
