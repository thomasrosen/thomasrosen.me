import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { router } from './components/router.js';
import {
  RouterProvider,
} from 'react-router-dom'

// import reportWebVitals from './reportWebVitals';

// send pageviews to Umami when the url changes
window.addEventListener('popstate', () => {
  if (window.umami) {
    // window.umami.track()
    const url = window.location.pathname + window.location.search + window.location.hash
    window.umami.track(props => ({ ...props, url }))
  }
});

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider
      router={router}
      fallbackElement="Loading…"
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
