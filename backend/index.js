const express = require('express')

function checkOrigin(origin) {
  let isAllowed = false

  if (typeof origin === 'string') {
    if (
      // allow from main domain
      origin === 'thomasrosen.me'
      || origin.endsWith('://thomasrosen.me')

      // allow from subdomains
      || origin.endsWith('.thomasrosen.me')

      // allow for localhost
      || origin.endsWith('localhost:3000')
      || origin.endsWith('localhost:19814')
      || origin.endsWith('0.0.0.0:3000')
      || origin.endsWith('0.0.0.0:19814')
    ) {
      isAllowed = true
    }
  }

  return isAllowed
}

const app = express()
app.use(function (req, res, next) {
  // console.log('app.use - request url:', req.url)

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

app.use('/', express.static('../build/', { fallthrough: true }))

app.get('*', (req, res) => {
  // console.log('index.html fallcack - request url:', req.url)
  res.sendFile('index.html', { root: '../build/' })
})

const port = 19814 // thomas = 19 8 14 12 18
const host = '0.0.0.0' // Uberspace wants 0.0.0.0
app.listen(port, host, () => {
  console.info(`Server listening \n at http://${host}:${port} \n and http://localhost:${port}`)
})
