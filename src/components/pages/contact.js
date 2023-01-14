import Dot from '../dot.js'

export default function Contact() {
  return <div className="tab_content">

    <h2>Contact</h2>

    <div className="links_grid">

      <h3>
        <Dot />
        Email
      </h3>
      <a href="mailto:hello@thomasrosen.me" target="_blank" rel="noreferrer" className="umami--click--Email">
        hello@thomasrosen.me
      </a>

      <h3>
        <Dot color="#502379" />
        Volt Email
      </h3>
      <a href="mailto:thomas.rosen@volteuropa.org" target="_blank" rel="noreferrer" className="umami--click--Volt Email">
        thomas.rosen@volteuropa.org
      </a>

    </div>

  </div>    
}

/*
  <li>
    <a href="mailto:thomas.rosen@qiekub.org" target="_blank" rel="nofollow" className="umami--click--Email">
      <span className="icon" data-icon="Old Email" style="color: #00695c;"></span>
      <span className="text">thomas.rosen@qiekub.org</span>
    </a>
  </li>
*/
