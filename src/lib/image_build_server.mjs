import express from 'express'

function checkOrigin(origin) {
  let isAllowed = false

  if (typeof origin === 'string') {
    if (
      // allow for localhost
      origin.endsWith('localhost:3000')
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

app.get('/', async (req, res) => {
  const query = req.query
  console.log(query)

  const src = query.src
  const width = query.w
  const quality = query.q
  const format = query.f
  const outputPath = query.p

  // const result = await optimizeImage({
  //   src,
  //   width,
  //   quality,
  //   format,
  //   outputPath,
  // })

  const data_result = {
    src,
    width,
    quality,
    format,
    result,
    outputPath,
  }

  res.send(data_result)
})

const port = 20814 // 20 8 14 12 18
const host = '0.0.0.0' // Uberspace wants 0.0.0.0
app.listen(port, host, () => {
  console.info(`Server listening \n at http://${host}:${port} \n and http://localhost:${port}`)
})
