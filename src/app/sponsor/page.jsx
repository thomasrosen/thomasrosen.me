import { Dot } from '@/components/Dot'

export default function Page() {
  return <div className="tab_content">

    <h2>Sponsor</h2>

    <div className="links_grid">

      <h3><Dot color="#0d57aa" />PayPal</h3>
      <a href="https://paypal.me/ThomasRosen" target="_blank" rel="noreferrer" data-umami-event="paypal">
        ThomasRosen
      </a>

      <h3><Dot color="#000000" />GitHub</h3>
      <a href="https://github.com/sponsors/thomasrosen" target="_blank" rel="noreferrer" data-umami-event="github">
        thomasrosen
      </a>

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

  </div>
}
