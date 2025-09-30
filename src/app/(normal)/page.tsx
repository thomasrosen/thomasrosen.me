import PageContact from '@/components/pages/PageContact'
import PageFollow from '@/components/pages/PageFollow'
import PageHello from '@/components/pages/PageHello'
import PageSponsor from '@/components/pages/PageSponsor'
import { Typo } from '@/components/Typo'
import { Badge } from '@/components/ui/badge'

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
              🤖 Programming
            </Badge>
            <Badge size="lg" variant="accent">
              📸 Photography
            </Badge>
            <Badge size="lg" variant="accent">
              🎨 Design
            </Badge>
            <Badge size="lg" variant="accent">
              🇪🇺 Politics
            </Badge>
            <Badge size="lg" variant="accent">
              🏳️‍🌈 Queer-Rights
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
