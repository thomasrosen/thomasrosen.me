const express = require('express')
const rateLimit = require('express-rate-limit')

function checkOrigin(origin) {
  let isAllowed = false

  if (
    typeof origin === 'string' &&
    // allow from main domain
    (origin === 'thomasrosen.me' ||
      origin.endsWith('://thomasrosen.me') ||
      // allow from subdomains
      origin.endsWith('.thomasrosen.me') ||
      // allow for localhost
      origin.endsWith('localhost:3000') ||
      origin.endsWith('localhost:19814') ||
      origin.endsWith('0.0.0.0:3000') ||
      origin.endsWith('0.0.0.0:19814'))
  ) {
    isAllowed = true
  }

  return isAllowed
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

// Apply rate limiting: e.g. 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // adjust as needed for your use case
  standardHeaders: true, 
  legacyHeaders: false,
})

app.get('*', limiter, (_req, res) => {
  res.sendFile('index.html', { root: '../build/' })
})

const port = 19_814 // thomas = 19 8 14 12 18
const host = '0.0.0.0' // Uberspace wants 0.0.0.0
app.listen(port, host, () => {
  console.info(`Server listening \n at http://${host}:${port} \n and http://localhost:${port}`)
})
