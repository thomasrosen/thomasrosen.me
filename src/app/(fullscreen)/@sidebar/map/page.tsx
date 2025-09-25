import { Typo } from '@/components/Typo'

export const dynamic = 'force-static'
export const dynamicParams = false

export default function Page() {
  return (
    <>
      <Typo as="h2" className="tab_content">
        Places
      </Typo>
      <Typo as="p" className="tab_content">
        The map shows places I recommend and some images I took.
        <br />
        <br />
        Click on the markers/pins to see more details.
      </Typo>
    </>
  )
}
