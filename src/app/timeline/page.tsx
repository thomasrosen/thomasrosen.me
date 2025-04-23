import { Timeline } from '@/components/Timeline/Timeline'
import { Typo } from '@/components/Typo'

export default function PageTimeline() {
  return (
    <>
      <Typo as='h2' className='tab_content'>
        Timeline
      </Typo>

      <Timeline />
    </>
  )
}
