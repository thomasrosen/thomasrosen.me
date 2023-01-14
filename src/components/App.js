import './App.css'

import '../fonts/ubuntu-v15-latin/index.css'
import '../fonts/ubuntu-mono-v10-latin/index.css'

import { NavLink, Outlet } from 'react-router-dom'

export default function App() {
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '20px',
    minHeight: '100vh',
    height: 'auto',
    padding: '80px 40px',
  }}>

    <div alt="Thomas Rosen eating a slice watermelon." className="headerImageOfMe"></div>
    <h1 style={{ textAlign: 'center' }}>Thomas Rosen</h1>

    <br />
    
    <nav>
      <NavLink to="/">Hi!</NavLink>
      <NavLink to="contact">Contact</NavLink>
      <NavLink to="follow">Follow</NavLink>
      <NavLink to="projects">Projects</NavLink>
      <NavLink to="articles">In the Press</NavLink>
      <NavLink to="sponsor">Sponsor</NavLink>
    </nav>

    <br />
    <br />

    <Outlet />

    <a href="https://mailchi.mp/59f35b198abe/thomasrosen" target="_blank" rel="noreferrer" className="newsletter_box umami--click--Newsletter">
      <h2>💌 Newsletter</h2>
      <p>Signup to get occasional mails from me…</p>
    </a>
  </div>
}
