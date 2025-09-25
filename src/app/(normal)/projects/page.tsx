import { Timeline } from '@/components/Timeline/Timeline'
import { Typo } from '@/components/Typo'

export default function PageProjects() {
  return (
    <>
      <div className="tab_content space-y-6">
        <Typo as="h2">Projects</Typo>
        <Typo as="p">A small collection of some projects, I've worked on.</Typo>
      </div>

      <Timeline tags={['project']} />
    </>
  )
}
