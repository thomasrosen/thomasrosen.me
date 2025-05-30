import { Emoji } from '@/components/Emoji'
import { Shine } from '@/components/Shine'
import { ThemeProvider } from '@/components/theme-provider'
import { Typo } from '@/components/Typo'
import { Button } from '@/components/ui/button'
import '@/fonts/ubuntu-mono-v15-latin/index.css'
import '@/fonts/ubuntu-v20-latin/index.css'
import '@/styles/App.css'
import '@/styles/index.css'
import Link from 'next/link'
import Script from 'next/script'

export const experimental_ppr = true

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta charSet='utf-8' />
        <link rel='icon' href='/logo64.jpg' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#00150f' />
        <meta name='description' content='About Thomas Rosen.' />
        <link rel='apple-touch-icon' href='/logo192.jpg' />
        <link rel='manifest' href='/manifest.json' />
        <title>Thomas Rosen</title>

        <link
          rel='alternate'
          type='application/rss+xml'
          title='Thomas Rosen - Blog (RSS 2.0)'
          href='/blog/feed.rss'
        />

        <Script
          defer
          data-website-id='fe447956-68a8-4bd6-a139-c218621354de'
          src='https://umami.thomasrosen.me/script.js'
          data-domains='www.thomasrosen.me,thomasrosen.me'
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          // send pageviews to Umami when the url changes
          window.addEventListener('popstate', () => {
            if (window.umami) {
              // window.umami.track()
              const url = window.location.pathname + window.location.search + window.location.hash
              window.umami.track(props => ({ ...props, url }))
            }
          });
        `,
          }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='app_wrapper'>
            <header>
              <Shine puffyness='3'>
                <div
                  aria-hidden='true'
                  alt='Thomas Rosen eating a slice of watermelon.'
                  className='headerImageOfMe'
                />
              </Shine>
              <Typo as='h1'>Thomas Rosen</Typo>
            </header>

            <br />

            <nav>
              <div className='my-4 flex flex-row gap-4 flex-wrap justify-center'>
                <Link href='/'>
                  <Button variant='accent' size='lg'>
                    Hi!
                  </Button>
                </Link>
                <Link href='/articles'>
                  <Button variant='secondary' size='lg'>
                    <Emoji aria-hidden='true'>📝</Emoji> Blog
                  </Button>
                </Link>
                <Link href='/playlists'>
                  <Button variant='secondary' size='lg'>
                    <Emoji aria-hidden='true'>🎸</Emoji> Playlists
                  </Button>
                </Link>
                <Link href='/press'>
                  <Button variant='secondary' size='lg'>
                    <Emoji aria-hidden='true'>📰</Emoji> In the Press
                  </Button>
                </Link>

                <Link href='/follow'>
                  <Button variant='accent' size='lg'>
                    Follow
                  </Button>
                </Link>
                <Link href='/contact'>
                  <Button variant='accent' size='lg'>
                    Contact
                  </Button>
                </Link>
                <Link href='/sponsor'>
                  <Button variant='accent' size='lg'>
                    Sponsor
                  </Button>
                </Link>
              </div>
            </nav>

            <div className='mb-8' />

            {children}

            <div className='mb-8' />

            <Link
              href='https://mailchi.mp/59f35b198abe/thomasrosen'
              target='_blank'
              rel='noreferrer'
              className='link_box rounded-xl'
              data-umami-event='Newsletter'
            >
              <Typo as='h2'>
                <Emoji>💌</Emoji> Newsletter
              </Typo>
              <Typo as='p'>Signup to get occasional emails from me…</Typo>
            </Link>

            <svg
              viewBox='0 0 2526 600'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              style={{
                maxWidth: '100%',
                marginInline: '5px',
                marginBlockStart: '0px',
                marginBlockEnd: 'calc(-25vh - 40px)',
                aspectRatio: 'calc(2526 / 600)',
              }}
            >
              <g clipPath='url(#clip0_13_2)'>
                <rect
                  x='339.635'
                  y='122.106'
                  width='250'
                  height='250'
                  rx='50'
                  transform='rotate(6.04311 339.635 122.106)'
                  fill='var(--primary)'
                />
                <rect
                  x='1015.12'
                  y='349.9'
                  width='250'
                  height='250'
                  rx='50'
                  transform='rotate(0.929009 1015.12 349.9)'
                  fill='var(--primary)'
                />
                <rect
                  x='2148.68'
                  y='259.571'
                  width='250'
                  height='250'
                  rx='50'
                  transform='rotate(33.9493 2148.68 259.571)'
                  fill='var(--primary)'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M2525.66 399.868C2525.66 372.253 2503.05 349.346 2475.98 354.804C2377.76 374.606 2300.4 451.972 2280.59 550.187C2275.13 577.256 2298.04 599.868 2325.66 599.868H2475.66C2503.27 599.868 2525.66 577.482 2525.66 549.868V399.868Z'
                  fill='var(--primary)'
                  fillOpacity='0.33'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M1279.5 482.12C1258.79 500.385 1256.56 532.496 1278.56 549.188C1358.38 609.75 1467.57 616.601 1554.33 566.49C1578.24 552.678 1580.05 520.542 1561.79 499.831L1462.57 387.332C1444.3 366.621 1412.71 364.639 1392 382.904L1279.5 482.12Z'
                  fill='var(--primary)'
                  fillOpacity='0.33'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M1831.91 279.199C1815.7 301.557 1820.57 333.375 1845.69 344.843C1936.83 386.452 2044.87 369.218 2118.55 301.32C2138.86 282.606 2133.58 250.854 2111.22 234.647L1989.77 146.612C1967.41 130.406 1936.15 135.392 1919.94 157.75L1831.91 279.199Z'
                  fill='var(--primary)'
                  fillOpacity='0.33'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M1711.58 347.942C1730.79 328.107 1730.49 295.922 1707.25 281.008C1622.92 226.898 1513.53 228.641 1430.97 285.408C1408.21 301.054 1408.94 333.233 1428.77 352.446L1536.51 456.81C1556.35 476.022 1588 475.518 1607.21 455.684L1711.58 347.942Z'
                  fill='var(--primary)'
                  fillOpacity='0.33'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M855.943 155.518C875.156 135.684 874.853 103.498 851.612 88.5845C767.289 34.4748 657.891 36.2171 575.334 92.9846C552.58 108.631 553.302 140.81 573.137 160.023L680.878 264.386C700.713 283.599 732.367 283.095 751.58 263.26L855.943 155.518Z'
                  fill='var(--primary)'
                  fillOpacity='0.33'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M245.87 349.867C124.81 349.867 23.8467 435.916 0.806697 550.187C-4.65122 577.256 18.2561 599.867 45.8704 599.867L445.87 599.867C473.485 599.867 496.392 577.256 490.934 550.187C467.894 435.916 366.931 349.867 245.87 349.867Z'
                  fill='var(--primary)'
                  fillOpacity='0.66'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M1027.74 364.19C1087.98 259.179 1063.58 128.786 975.92 51.9421C955.155 33.7385 924.143 42.3578 910.403 66.3109L711.371 413.278C697.631 437.231 705.846 468.352 732.042 477.087C842.627 513.961 967.504 469.2 1027.74 364.19Z'
                  fill='var(--primary)'
                  fillOpacity='0.66'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M1329.26 327.432C1448.44 306.137 1532.69 203.671 1535.27 87.1285C1535.88 59.521 1509.35 41.2918 1482.17 46.1493L1088.41 116.512C1061.22 121.369 1042.65 147.658 1052.78 173.345C1095.57 281.781 1210.09 348.728 1329.26 327.432Z'
                  fill='var(--primary)'
                  fillOpacity='0.66'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M1816.3 349.867C1695.24 349.867 1594.27 435.916 1571.23 550.187C1565.78 577.256 1588.68 599.867 1616.3 599.867L2016.3 599.867C2043.91 599.867 2066.82 577.256 2061.36 550.187C2038.32 435.916 1937.36 349.867 1816.3 349.867Z'
                  fill='var(--primary)'
                  fillOpacity='0.66'
                />
                <rect
                  x='1728.9'
                  y='-9.89569'
                  width='250'
                  height='250'
                  rx='50'
                  transform='rotate(35.0812 1728.9 -9.89569)'
                  fill='var(--primary)'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M485.831 402.486C459.205 409.809 443.114 437.685 455.555 462.338C500.693 551.785 595.805 605.866 695.754 598.915C723.302 596.999 739.029 568.916 731.706 542.29L691.929 397.66C684.607 371.035 657.086 355.387 630.461 362.709L485.831 402.486Z'
                  fill='var(--primary)'
                  fillOpacity='0.33'
                />
              </g>
              <defs>
                <clipPath id='clip0_13_2'>
                  <rect width='2525.66' height='600' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
