import { DotLinkRow } from '@/components/DotLinkRow'
import { Typo } from '@/components/Typo'

export default function PageContact({ className }: { className?: string }) {
  return (
    <section className={className}>
      <Typo as="h2" className="mb-6">
        Contact
      </Typo>

      <div className="links_grid">
        <DotLinkRow
          color="var(--primary)"
          data-umami-event="Email"
          href="mailto:hello@thomasrosen.me"
          label="Email"
          value="hello@thomasrosen.me"
        />

        <DotLinkRow
          color="#502379"
          data-umami-event="Volt Email"
          href="mailto:thomas.rosen@volteuropa.org"
          label="Volt Email"
          value="thomas.rosen@volteuropa.org"
        />
      </div>
    </section>
  )
}

/*
  <li>
    <a href="mailto:thomas.rosen@qiekub.org" target="_blank" rel="nofollow" data-umami-event="Email">
      <span className="icon" data-icon="Old Email" style="color: #00695c;"></span>
      <span className="text">thomas.rosen@qiekub.org</span>
    </a>
  </li>
*/
