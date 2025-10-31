import { getEntries } from '@/components/Timeline/getEntries'
import { Timeline } from '@/components/Timeline/Timeline'
import { Typo } from '@/components/Typo'

export default async function PageProjects() {
  const entries = await getEntries({ tags: ['project'] })
  return (
    <>
      <div className="tab_content space-y-6">
        <Typo as="h2">Projects</Typo>
        <Typo as="p">
          A small collection of some projects, I've worked on. Most were fully done by myself. And
          of course only with the amount of generative AI that is senseable (less ai is better).
        </Typo>
        <Typo as="p">
          FYI Some projects are not public (but the sourcecode probably is) and some are not
          functioning anymore. But most should work fine :)
        </Typo>
        <Typo as="p">I wrote more details about some projects in the blog section.</Typo>
      </div>

      <div className="tab_content">
        <Timeline entries={entries} />
      </div>
    </>
  )
}
