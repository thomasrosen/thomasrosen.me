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
        Some articles that I think are worth reading. And other stuff that I think might be
        interesting for some ppl :)
        <br />
        <br />
        This is all from other people. The links could change after i put them here. So maybe check
        them on archive.org if something is weird.
        <br />
        <br />
        <strong>These are sorted by date not by importance.</strong>
      </Typo>
    </>
  )
}
