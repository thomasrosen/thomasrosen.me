import { TimelineMap } from '@/components/Timeline/TimelineMap'

export const dynamic = 'force-static'
export const dynamicParams = false

export default function Page() {
  return (
    <>
      {/* <div className="fixed inset-0 bg-black" /> */}
      <TimelineMap tags={[]} />
    </>
  )
}
