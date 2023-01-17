import {
  createHashRouter,
} from 'react-router-dom'

import App from './App.js'
import Welcome from './pages/welcome.js'
import Contact from './pages/contact.js'
import Follow from './pages/follow.js'
import Projects from './pages/projects.js'
import Press from './pages/press.js'
import Sponsor from './pages/sponsor.js'

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Welcome />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'follow',
        element: <Follow />,
      },
      {
        path: 'projects',
        element: <Projects />,
      },
      {
        path: 'press',
        element: <Press />,
      },
      {
        path: 'sponsor',
        element: <Sponsor />,
      },
      {
        path: '*',
        element: <Welcome />,
      },
    ]
  },
]);
