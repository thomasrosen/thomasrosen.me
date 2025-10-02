import '@/app/globals.css'
import { VerticalFadeStyles } from '@/components/VerticalFade'
import '@/fonts/ubuntu-mono-v15-latin/index.css'
import '@/fonts/ubuntu-v20-latin/index.css'
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link href="/logo64.jpg" rel="icon" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="#00150f" name="theme-color" />
        <meta content="About Thomas Rosen." name="description" />
        <link href="/logo192.jpg" rel="apple-touch-icon" />
        <link href="/manifest.json" rel="manifest" />
        <title>Thomas Rosen</title>

        <link
          href="/blog/feed.rss"
          rel="alternate"
          title="Thomas Rosen - Blog (RSS 2.0)"
          type="application/rss+xml"
        />

        <Script
          data-domains="www.thomasrosen.me,thomasrosen.me"
          data-website-id="fe447956-68a8-4bd6-a139-c218621354de"
          defer
          src="https://umami.thomasrosen.me/script.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `// send pageviews to Umami when the url changes
          window.addEventListener('popstate', () => {
            if (window.umami) {
              // window.umami.track()
              const url = window.location.pathname + window.location.search + window.location.hash
              window.umami.track(props => ({ ...props, url }))
            }
          });`,
          }}
        />

        <script>
          {/* avoid FOUC by checking and setting the theme on page load */}
          document.documentElement.classList.toggle("dark", localStorage.theme === "dark" ||
          (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
          );
        </script>

        <VerticalFadeStyles />
      </head>

      {children}
    </html>
  )
}
