import Dot from '../dot.js'

export default function Contact() {
  return <div class="tab_content">

    <h2>Contact</h2>

    <div class="links_grid">

      <h3>
        <Dot />
        Email
      </h3>
      <a href="mailto:hello@thomasrosen.me" target="_blank" rel="noreferrer" class="umami--click--Email">
        hello@thomasrosen.me
      </a>

      <h3>
        <Dot color="#502379" />
        Volt Email
      </h3>
      <a href="mailto:thomas.rosen@volteuropa.org" target="_blank" rel="noreferrer" class="umami--click--Volt Email">
        thomas.rosen@volteuropa.org
      </a>

    </div>

  </div>    
}

/*
  <li>
    <a href="mailto:thomas.rosen@qiekub.org" target="_blank" rel="nofollow" class="umami--click--Email">
      <span class="icon" data-icon="Old Email" style="color: #00695c;"></span>
      <span class="text">thomas.rosen@qiekub.org</span>
    </a>
  </li>
*/
