import { Emoji } from '@/components/Emoji'
import { Typo } from '@/components/Typo'
import PageContact from '@/components/pages/PageContact'
import PageFollow from '@/components/pages/PageFollow'
import PageHello from '@/components/pages/PageHello'
import PageSponsor from '@/components/pages/PageSponsor'
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
            <Badge size="lg" variant="accent">
              <Emoji aria-hidden="true">🤖</Emoji> Programming
            </Badge>
            <Link href="/tag/image/">
              <Badge size="lg" variant="accent">
                <Emoji aria-hidden="true">📸</Emoji> Photography
              </Badge>
            </Link>
            <Badge size="lg" variant="accent">
              <Emoji aria-hidden="true">🎨</Emoji> Design
            </Badge>
            <Badge size="lg" variant="accent">
              <Emoji aria-hidden="true">🇪🇺</Emoji> Politics
            </Badge>
            <Badge size="lg" variant="accent">
              <Emoji aria-hidden="true">🏳️‍🌈</Emoji> Queer-Rights
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
