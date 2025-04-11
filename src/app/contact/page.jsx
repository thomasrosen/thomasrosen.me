import { Dot } from '@/components/Dot'

export default function PageContact() {
  return (
    <div className='tab_content'>
      <h2>Contact</h2>

      <div className='links_grid'>
        <h3>
          <Dot color='var(--primary-color)' />
          Email
        </h3>
        <a
          href='mailto:hello@thomasrosen.me'
          target='_blank'
          rel='noreferrer'
          data-umami-event='Email'
        >
          hello@thomasrosen.me
        </a>

        <h3>
          <Dot color='#502379' />
          Volt Email
        </h3>
        <a
          href='mailto:thomas.rosen@volteuropa.org'
          target='_blank'
          rel='noreferrer'
          data-umami-event='Volt Email'
        >
          thomas.rosen@volteuropa.org
        </a>
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
