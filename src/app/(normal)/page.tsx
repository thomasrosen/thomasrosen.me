import PageContact from '@/components/pages/PageContact'
import PageFollow from '@/components/pages/PageFollow'
import PageHello from '@/components/pages/PageHello'
import PageSponsor from '@/components/pages/PageSponsor'

export default function PageStart() {
  return (
    <div className="flex max-w-full flex-col gap-20">
      <PageHello />
      <PageContact />
      <PageFollow />
      <PageSponsor />
    </div>
  )
}
