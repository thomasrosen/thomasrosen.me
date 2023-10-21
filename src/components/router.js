import React, { Suspense } from 'react'

import {
  createBrowserRouter,
  Navigate,
} from 'react-router-dom'

import App from './App.js'
import Welcome from './pages/welcome.js'
import Contact from './pages/contact.js'
import Follow from './pages/follow.js'
import Projects from './pages/projects.js'
import Press from './pages/press.js'
import Sponsor from './pages/sponsor.js'
// const Contact = React.lazy(() => import('./pages/contact.js'));
// const Follow = React.lazy(() => import('./pages/follow.js'));
// const Projects = React.lazy(() => import('./pages/projects.js'));
// const Press = React.lazy(() => import('./pages/press.js'));
// const Sponsor = React.lazy(() => import('./pages/sponsor.js'));
const Articles = React.lazy(() => import('./pages/articles.js'));
const Article = React.lazy(() => import('./pages/article.js'));
const Playlists = React.lazy(() => import('./pages/playlists.js'));
const Playlist = React.lazy(() => import('./pages/playlist.js'));

function Loading() {
  return null
  // return <div>Loading...</div>
}

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
        element: <Suspense fallback={<Loading />}><Contact /></Suspense>,
      },
      {
        path: 'follow',
        element: <Suspense fallback={<Loading />}><Follow /></Suspense>,
      },
      {
        path: 'projects',
        element: <Suspense fallback={<Loading />}><Projects /></Suspense>,
      },
      {
        path: 'press',
        element: <Suspense fallback={<Loading />}><Press /></Suspense>,
      },
      {
        path: 'sponsor',
        element: <Suspense fallback={<Loading />}><Sponsor /></Suspense>,
      },

      {
        path: 'articles',
        element: <Suspense fallback={<Loading />}><Articles /></Suspense>,
      },
      {
        path: 'articles/:slug',
        element: <Suspense fallback={<Loading />}><Article /></Suspense>,
      },

      {
        path: 'playlists',
        element: <Suspense fallback={<Loading />}><Playlists /></Suspense>,
      },
      {
        path: 'playlists/:slug',
        element: <Suspense fallback={<Loading />}><Playlist /></Suspense>,
      },

      // redirects for when ppl think the blog is under /blog
      {
        path: 'blog',
        element: <Navigate to="/articles" replace />,
      },
      // end of blog redirects

      {
        path: '*',
        element: <Welcome />,
      },
    ]
  },
]);
