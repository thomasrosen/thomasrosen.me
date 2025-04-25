import { Dot } from '@/components/Dot'
import { Typo } from '@/components/Typo'
import Link from 'next/link'

export default function PageContact() {
  return (
    <div className='tab_content'>
      <Typo as='h2' className='mb-6'>
        Contact
      </Typo>

      <div className='links_grid !gap-y-6'>
        <Typo as='h3' className='text-md'>
          <Dot color='var(--primary)' />
          Email
        </Typo>
        <Link
          href='mailto:hello@thomasrosen.me'
          target='_blank'
          rel='noreferrer'
          data-umami-event='Email'
        >
          hello@thomasrosen.me
        </Link>

        <Typo as='h3' className='text-md'>
          <Dot color='#502379' />
          Volt Email
        </Typo>
        <Link
          href='mailto:thomas.rosen@volteuropa.org'
          target='_blank'
          rel='noreferrer'
          data-umami-event='Volt Email'
        >
          thomas.rosen@volteuropa.org
        </Link>
      </div>
    </div>
  )
}

/*
  <li>
    <a href="mailto:thomas.rosen@qiekub.org" target="_blank" rel="nofollow" data-umami-event="Email">
      <span className="icon" data-icon="Old Email" style="color: #00695c;"></span>
      <span className="text">thomas.rosen@qiekub.org</span>
    </a>
  </li>
*/
