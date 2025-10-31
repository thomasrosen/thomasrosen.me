const express = require('express')

function checkOrigin(origin) {
  if (typeof origin !== 'string') return false;
  // Disallow null origin explicitly
  if (origin === 'null') return false;
  // List of allowed origins (with scheme and port)
  const allowedOrigins = new Set([
    'https://thomasrosen.me',
    'https://www.thomasrosen.me',
    'https://blog.thomasrosen.me',
    'http://localhost:3000',
    'http://localhost:19814',
    'http://0.0.0.0:3000',
    'http://0.0.0.0:19814'
  ]);
  // also allow all https subdomains of thomasrosen.me
  try {
    const url = new URL(origin);
    // main domain or subdomain with https
    if (url.protocol === 'https:' && (url.hostname === 'thomasrosen.me' || url.hostname.endsWith('.thomasrosen.me'))) {
      return true;
    }
    // allow localhost and 0.0.0.0 with matching allowedOrigins
    if (allowedOrigins.has(origin)) {
      return true;
    }
  } catch (e) {
    // If origin is not a valid URL, do not allow
    return false;
  }
  return false;
}

const app = express()
app.use((req, res, next) => {
  // const origin = req.get('origin')
  const origin = req.header('Origin')
  if (checkOrigin(origin)) {
    req.is_subdomain = true
    req.origin = origin
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', true)
  } else {
    req.is_subdomain = false
  }

  next()
})

app.get('/blog', (_req, res) => {
  res.redirect(302, '/articles')
})
app.get('/zenris', (_req, res) => {
  res.redirect(302, '/articles/zenris')
})

app.use('/', express.static('../build/', { fallthrough: true }))

app.get('*', (_req, res) => {
  res.sendFile('index.html', { root: '../build/' })
})

const port = 19_814 // thomas = 19 8 14 12 18
const host = '0.0.0.0' // Uberspace wants 0.0.0.0
app.listen(port, host, () => {
  console.info(`Server listening \n at http://${host}:${port} \n and http://localhost:${port}`)
})
