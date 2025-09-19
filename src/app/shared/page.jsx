import { Timeline } from '@/components/Timeline/Timeline'
import { Typo } from '@/components/Typo'

export const dynamic = 'force-static'
export const dynamicParams = false

export default function Page() {
  return (
    <>
      <Typo as="h2" className="tab_content">
        Interesting stuff
      </Typo>
      <Typo as="p" className="tab_content">
        Some articles that I think are worth reading, and generally stuff that i think might be cool
        :)
      </Typo>

      <Timeline hiddenTags={['share']} tags={['share']} />
    </>
  )
}
