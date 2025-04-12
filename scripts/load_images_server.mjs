// this server is only used in dev or during build

import express from 'express'
import fs from 'fs'
import fetch from 'node-fetch'
import path from 'path'
import sharp from 'sharp'

const app = express()
app.use(function (req, res, next) {
  // allow all origins as this server is only run during dev or build
  const origin = req.header('Origin')
  if (origin && origin !== 'undefined') {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', true)
  }

  next()
})

app.get('/load_image', async function (req, res) {
  try {
    console.log('req.query', req.query)
    let { src, w: width, h: height, q: quality, f: format, p: savepath } = req.query
    console.log('1-src', src)
    console.log('width', width)
    console.log('height', height)
    console.log('quality', quality)
    console.log('format', format)
    console.log('savepath', savepath)

    if (!src) {
      return res.status(400).json({ error: 'Source image URL is required' })
    }

    // Validate and parse parameters
    const parsedWidth = width ? parseInt(width) : 400
    const parsedHeight = height ? parseInt(height) : parsedWidth
    const parsedQuality = quality ? parseInt(quality) : 80
    const validFormats = ['jpeg', 'png', 'webp', 'avif']
    const targetFormat = format && validFormats.includes(format.toLowerCase())
      ? format.toLowerCase()
      : 'webp'

    src = src.replace('/_next/', '../build/')

    // Fetch the image
    let imageBuffer = null
    console.log('3-src', src)
    if (src.startsWith('http')) {
      console.log('IF')
      // load from url
      const response = await fetch(src)
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`)
      }
      // Get the image buffer
      imageBuffer = await response.buffer()
    } else {
      console.log('ELSE')
      console.log('4-src', src)
      // load from file
      imageBuffer = fs.readFileSync(src)
    }

    if (!imageBuffer) {
      throw new Error('Failed to load image')
    }

    // Process image with Sharp
    const image = sharp(imageBuffer)

    // Resize if dimensions are provided
    if (parsedWidth && parsedHeight) {
      image.resize(parsedWidth, parsedHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
    }

    // Convert to target format
    const buffer = await image.toFormat(targetFormat, {
      // Set quality if provided
      quality: parsedQuality
    }).toBuffer()

    // Set appropriate content type and cache headers
    res.set('Content-Type', `image/${targetFormat}`)
    res.set('Cache-Control', 'public, max-age=31536000') // Cache for 1 year
    res.send(buffer)

    // save the image to the path
    if (savepath) {
      const savepath_prefix = './public'
      const savepath_full = savepath_prefix + savepath

      // create folders with fs, if they don't exist
      const dir = path.dirname(savepath_full)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      // check if the file already exists
      if (fs.existsSync(savepath_full)) {
        console.log(`file already exists, skipping: ${src}`)
      } else {
        await sharp(buffer).toFile(savepath_full)
        console.log(`saved file: ${src}`)
      }
    }
  } catch (error) {
    console.error('Error processing image:', error)
    res.status(500).json({ error: 'Failed to process image' })
  }
})

const port = 4000
const host = 'localhost'
app.listen(port, host, () => {
  console.info(`Server listening at http://${host}:${port}`)
})
