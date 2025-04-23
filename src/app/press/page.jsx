import { Timeline } from '@/components/Timeline/Timeline'
import { Typo } from '@/components/Typo'

export default function PagePress() {
  return (
    <>
      <Typo as='h2' className='tab_content'>
        Articles about me and my projects
      </Typo>

      <Timeline tags={['press']} />
    </>
  )
}
