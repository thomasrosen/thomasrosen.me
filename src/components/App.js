import './App.css'

import '../fonts/ubuntu-v20-latin/index.css'
import '../fonts/ubuntu-mono-v15-latin/index.css'

import { NavLink, Outlet } from 'react-router-dom'

export default function App() {
  return <div className="app_wrapper">

    <header>
      <div alt="Thomas Rosen eating a slice watermelon." className="headerImageOfMe"></div>
      <h1 style={{ textAlign: 'center' }}>Thomas Rosen</h1>
    </header>

    <br />
    
    <nav>
      <NavLink to="/"><button>Hi!</button></NavLink>
      <NavLink to="contact"><button>Contact</button></NavLink>
      <NavLink to="follow"><button>Follow</button></NavLink>
      <NavLink to="projects"><button>Projects</button></NavLink>
      <NavLink to="press"><button>In the Press</button></NavLink>
      <NavLink to="articles"><button>Blog</button></NavLink>
      <NavLink to="sponsor"><button>Sponsor</button></NavLink>
    </nav>

    <br />
    <br />

    <Outlet />

    <a href="https://mailchi.mp/59f35b198abe/thomasrosen" target="_blank" rel="noreferrer" className="link_box umami--click--Newsletter">
      <h2>💌 Newsletter</h2>
      <p>Signup to get occasional emails from me…</p>
    </a>

  </div>
}
