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

    <div alt="Thomas Rosen eating a slice watermelon." class="headerImageOfMe"></div>
    <h1 style={{ textAlign: 'center' }}>Thomas Rosen</h1>

    <br />
    
    <nav>
      <NavLink to="/">Hi!</NavLink>
      <NavLink to="contact">Contact</NavLink>
      <NavLink to="follow">Follow</NavLink>
      <NavLink to="projects">Projects</NavLink>
      <NavLink to="sponsor">Sponsor</NavLink>
      <NavLink to="articles">In the Press</NavLink>
    </nav>

    <br />
    <br />
    <Outlet />

  </div>
}
