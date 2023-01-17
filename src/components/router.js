import {
  createBrowserRouter,
} from 'react-router-dom'

import App from './App.js'
import Welcome from './pages/welcome.js'
import Contact from './pages/contact.js'
import Follow from './pages/follow.js'
import Projects from './pages/projects.js'
import Press from './pages/press.js'
import Sponsor from './pages/sponsor.js'
import { Articles, Article } from './pages/articles.js'

export const router = createBrowserRouter([
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
        path: 'articles',
        element: <Articles />,
      },
      {
        path: 'articles/:slug',
        element: <Article />,
      },
      {
        path: '*',
        element: <Welcome />,
      },
    ]
  },
]);
