import { Timeline } from '@/components/Timeline/Timeline'
import { Typo } from '@/components/Typo'

export const dynamic = 'force-static'
export const dynamicParams = false

export default function PagePress() {
  return (
    <>
      <Typo as="h2" className="tab_content">
        Articles about me and my projects
      </Typo>

      <div className="tab_content">
        <Timeline tags={['press']} />
      </div>
    </>
  )
}
