import { DotLinkRow } from '@/components/DotLinkRow'
import { Typo } from '@/components/Typo'

export default function PageSponsor({ className }: { className?: string }) {
  return (
    <section className={className}>
      <Typo as="h2" className="mb-6">
        Sponsor
      </Typo>

      <div className="links_grid">
        <DotLinkRow
          color="#0d57aa"
          data-umami-event="paypal"
          href="https://paypal.me/ThomasRosen"
          label="PayPal"
          value="ThomasRosen"
        />
        <DotLinkRow
          color="#000000"
          data-umami-event="github-sponsors"
          href="https://github.com/sponsors/thomasrosen"
          label="GitHub"
          value="thomasrosen"
        />

        {/*

      <li>
        <a href="https://liberapay.com/thomasrosen/" target="_blank" rel="nofollow" data-umami-event="liberapay">
          <span className="icon" data-icon="liberapay" style="color: #f6c915;"></span>
          <span className="text">thomasrosen</span>
        </a>
      </li>

      <li>
        <span className="icon" data-icon="bitcoin" style="color: #f7931a;"></span>
        <span className="text">3CLe3y7mMFTc7pxhqqwoapeL1p3zZw3NH9</span>
      </li>

      <li>
        <span className="icon" data-icon="ethereum" style="color: #6481e7;"></span>
        <span className="text">0x4ffe2084EfA93148f0B26EdE9261064780DFB43D</span>
      </li>

    */}
      </div>
    </section>
  )
}
