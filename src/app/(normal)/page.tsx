import { Emoji } from '@/components/Emoji'
import PageContact from '@/components/pages/PageContact'
import PageFollow from '@/components/pages/PageFollow'
import PageHello from '@/components/pages/PageHello'
import PageSponsor from '@/components/pages/PageSponsor'
import { Typo } from '@/components/Typo'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function PageStart() {
  return (
    <div className="tab_content flex max-w-full flex-col gap-20">
      <PageHello />
      <section>
        <div className="flex flex-col gap-6">
          <Typo as="h2" className="mb-0">
            Interests
          </Typo>
          <div className="flex flex-wrap gap-3">
            <Badge asChild size="lg" variant="accent">
              <Link className="is-button" href="/tag/politics/">
                <Emoji aria-hidden="true">🇪🇺</Emoji> Politics
              </Link>
            </Badge>

            <Badge asChild size="lg" variant="accent">
              <Link className="is-button" href="/tag/queer/">
                <Emoji aria-hidden="true">🏳️‍🌈</Emoji> Queer-Rights
              </Link>
            </Badge>

            <Badge asChild size="lg" variant="accent">
              <Link className="is-button" href="/tag/design/">
                <Emoji aria-hidden="true">🎨</Emoji> Design
              </Link>
            </Badge>

            <Badge asChild size="lg" variant="accent">
              <Link className="is-button" href="/tag/image/">
                <Emoji aria-hidden="true">📸</Emoji> Photography
              </Link>
            </Badge>

            <Badge asChild size="lg" variant="accent">
              <Link className="is-button" href="/projects/">
                <Emoji aria-hidden="true">🤖</Emoji> Programming
              </Link>
            </Badge>


            <Badge asChild size="lg" variant="accent">
              <Link className="is-button" href="/tag/socialmedia/">
                <Emoji aria-hidden="true">🏞️</Emoji> Social-Media
              </Link>
            </Badge>
          </div>
        </div>
      </section>
      <PageContact />
      <PageFollow />
      <PageSponsor />
    </div>
  )
}
