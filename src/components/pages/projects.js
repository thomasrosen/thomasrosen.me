import { Link } from 'react-router-dom'

export default function Projects() {
  return <div className="tab_content">

    <h2>Projects</h2>

    <div className="links_grid">

      <div>🏳️‍🌈</div>
      <div>
        <h3>
          <a href="https://queer.thomasrosen.me/" target="_blank" rel="noreferrer" data-umami-event="project-queer-thomasrosen">
            queer.thomasrosen.me
          </a>
        </h3>
        <p>A list of websites with information about queer places and living as a queer person. You can filter by some tags and your location.</p>
        <Link to="/articles/queer-resources">
          <button className="small">more infos</button>
        </Link>
      </div>

      <div>🏳️‍🌈🗺❤️</div>
      <div>
        <h3>
          <a href="https://map.qiekub.org/" target="_blank" rel="noreferrer" data-umami-event="project-queermap">
            map.qiekub.org
          </a>
        </h3>
        <p>Find LGBTIAQ+ safe-spaces on the global QueerMap.</p>
        <Link to="/articles/aws-queermap">
          <button className="small">more infos</button>
        </Link>
      </div>

      <div>🔗💜🇪🇺</div>
      <div>
        <h3>
          <a href="https://github.com/voltbonn/volt.link" target="_blank" rel="noreferrer" data-umami-event="project-volt-link">
            volt.link
          </a>
        </h3>
        <p>Linktr.ee and bit.ly alternatives for Volt Europa.</p>
      </div>

      <div>🖼💜🇪🇺</div>
      <div>
        <h3>
          <a href="https://www.profile-volt.org/" target="_blank" rel="noreferrer" data-umami-event="project-volt-profile-picture">
            profile-volt.org
          </a>
        </h3>
        <p>Create your own Volt Europa Profile Picture Frame.</p>
      </div>

      <div>🖼🤳🔗</div>
      <div>
        <h3>
          <a href="https://qrcode.volt.link/" target="_blank" rel="noreferrer" data-umami-event="project-volt-qr-code">
            qrcode.volt.link
          </a>
        </h3>
        <p>QR-Code generator with some default colors for Volt Europa.</p>
      </div>

      <div></div><hr class="small" />

      <div>🤖</div>
      <div>
        <h3>
          <a href="https://github.com/thomasrosen/thomasrosen.me" target="_blank" rel="noreferrer" data-umami-event="sourcecode">
            Source Code of this Website
          </a>
        </h3>
        <p>Click here to view the sourcecode of thomasrosen.me</p>
      </div>

    </div>

  </div>
}
