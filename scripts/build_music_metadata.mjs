import fs from 'node:fs'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { ensureCleanDirectoryExists } from './ensureDirectoryExists.mjs'

const empty_transparent_png =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

const playlist_covers_dir = './src/data/music/playlist_covers/'
const album_artworks_dir = './src/data/music/album_artworks/'
const playlists_dir = './src/data/music/playlists/'
ensureCleanDirectoryExists(playlist_covers_dir)
ensureCleanDirectoryExists(album_artworks_dir)
ensureCleanDirectoryExists(playlists_dir)

const filetype = 'png'
const imagesize = 128

// Album Artwork URL

async function* getFilesRecursive(dir, root = dir) {
  // source: https://stackoverflow.com/a/45130990/2387277
  // source: https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
  // I added the part with the root_path variable, because I wanted to get the relative path of the files.

  const root_path = `${path.resolve(root)}/`

  const dirents = await readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name)
    if (dirent.isDirectory()) {
      yield* getFilesRecursive(res, dir)
    } else if (typeof res === 'string') {
      yield res.replace(root_path, '')
    } else {
      yield res
    }
  }
}

function get_genres(playlist) {
  let genres = playlist.Songs
    // sort the genres by count with reduce
    .reduce((acc, song) => {
      const genre = song.Genre
      if (!Object.hasOwn(acc, genre)) {
        acc[genre] = 0
      }
      acc[genre] += 1
      return acc
    }, {})

  genres = Object.entries(genres)
    .sort((a, b) => b[1] - a[1])
    .map(([genre, _count]) => genre)
    .slice(0, 12) // only keep the top N genres

  return genres
}

function get_artists(playlist) {
  let artists = playlist.Songs
    // sort the artists by count with reduce
    .reduce((acc, song) => {
      const artist = song.Artist
      if (!Object.hasOwn(acc, artist)) {
        acc[artist] = 0
      }
      acc[artist] += 1
      return acc
    }, {})

  artists = Object.entries(artists)
    .sort((a, b) => b[1] - a[1])
    .map(([artist, count]) => artist)
    .slice(0, 3) // only keep the top 3 artists

  return artists
}

// Function to combine images into a 2x2 grid
async function combineImages(imageURIs, options = {}) {
  const {
    canvasWidth = 128, // Adjust as needed
    canvasHeight = 128, // Adjust as needed
  } = options

  const images = []

  // Loop through the image URIs and composite them onto the canvas
  for (let i = 0; i < imageURIs.length; i++) {
    const width = canvasWidth / 2
    const height = canvasHeight / 2
    const x = (i % 2) * width // Calculate x position based on column
    const y = Math.floor(i / 2) * height // Calculate y position based on row

    const imageAsBuffer = Buffer.from(imageURIs[i].split(',')[1], 'base64')

    // resize the image
    const image = sharp(imageAsBuffer)
    image.resize(width, height, { fit: 'cover' })
    const resizedImageAsBuffer = await image.toBuffer()

    // Composite the image onto the canvas
    images.push({
      input: resizedImageAsBuffer, // Extract image data from data URI
      top: y,
      left: x,
    })
  }

  // Create a new canvas with the specified width and height
  const canvas = sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent background
    },
  }).composite(images)

  const imageAsBuffer = await canvas.toFormat(filetype).toBuffer()
  return imageAsBuffer
}

function sanitizeFilename(filename) {
  filename = filename
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, '_') // Replace any non-alphanumeric chars with underscore
    .replace(/_{2,}/g, '_') // Replace multiple consecutive underscores with single one

  const max_length = 50
  const current_length = filename.length
  if (current_length > max_length) {
    filename = `${filename.slice(0, max_length)}_${current_length}`
  }

  return `${filename}`
}

function saveAllAlbumArtworks(playlist) {
  for (const [index, song] of playlist.Songs.entries()) {
    const image = song['Album Artwork']
    if (image && image !== '') {
      try {
        // Create a unique filename using album name and artist
        const filename = `${sanitizeFilename(`${song.Artist} ${song.Album}`)}.${filetype}`
        const filepath = `${album_artworks_dir}${filename}`

        // Only process if it's a valid data URI
        if (image.startsWith('data:image')) {
          // Extract the base64 data
          const base64Data = image.split(',')[1]
          if (base64Data) {
            const imageBuffer = Buffer.from(base64Data, 'base64')
            // const image = sharp(imageBuffer)
            // image.resize(imagesize, imagesize, { fit: 'cover', withoutEnlargement: true })
            // const resizedImageBuffer = await image.toBuffer()

            fs.writeFileSync(filepath, imageBuffer)
            // Update the reference in the playlist
            playlist.Songs[index]['Album Artwork'] = filename
          }
        }
      } catch (error) {
        console.error(`Failed to save artwork for ${song.Album}: ${error.message}`)
        playlist.Songs[index]['Album Artwork'] = '' // Clear invalid artwork
      }
    }
  }

  return playlist
}

async function get_playlist_coverphoto(playlist) {
  const images = []

  for (const song of playlist.Songs) {
    const image = song['Album Artwork']
    if (image && image !== '') {
      // Skip if it's a file path (from our previous processing)
      if (image.startsWith(album_artworks_dir)) {
        continue
      }

      if (image.startsWith('data:image') && !images.find((img) => img === image)) {
        images.push(image)
        if (images.length >= 4) {
          break
        }
      }
    }
  }

  if (images.length === 0) {
    images.push(empty_transparent_png)
    images.push(empty_transparent_png)
    images.push(empty_transparent_png)
    images.push(empty_transparent_png)
  }

  if (images.length === 1) {
    images.push(empty_transparent_png)
    images.push(empty_transparent_png)
    images.push(empty_transparent_png)
  }

  if (images.length === 2) {
    images.push(empty_transparent_png)
    images.push(empty_transparent_png)
  }

  if (images.length === 3) {
    images.push(empty_transparent_png)
  }

  try {
    // Call the function to combine images
    const finished_image = await combineImages(images, {
      canvasWidth: imagesize,
      canvasHeight: imagesize,
    })

    const filename = `${sanitizeFilename(playlist.Name)}.${filetype}`
    const filepath = `${playlist_covers_dir}${filename}`
    fs.writeFileSync(filepath, finished_image)

    return filename
  } catch (error) {
    console.error(`Failed to create cover photo for playlist ${playlist.Name}: ${error.message}`)
    return empty_transparent_png
  }
}

async function build_music_metadata() {
  const playlists = []
  const playlist_dir = './data_about_thomasrosen/music/playlists/'
  for await (const relative_filepath of getFilesRecursive(playlist_dir)) {
    // get the playlist_date from the filename (2018 12 DEZ.json) with regexp

    const filename = relative_filepath.split('/').pop()
    const [filename_without_extension, extension] = filename.split('.')
    const safe_filename = `${sanitizeFilename(filename_without_extension)}.${extension}`
    const playlist_date = relative_filepath.match(/(\d{4}) (\d{2}) ([A-Z]{3})\.json/)
    if (!playlist_date) {
      continue
    }
    const year = playlist_date[1]
    const month = playlist_date[2]
    const playlist_date_string = `${year}-${month}-01T00:00:00.000Z`

    // get playlist
    const playlist = JSON.parse(fs.readFileSync(playlist_dir + relative_filepath))

    if (Object.hasOwn(playlist.Songs, 'Title')) {
      // if there is only one song, ios saves this as an object, not as an array
      playlist.Songs = [playlist.Songs]
    }

    const coverphoto = await get_playlist_coverphoto(playlist)
    const parsed_playlist = await saveAllAlbumArtworks(playlist)
    const new_filepath = `${playlists_dir}${safe_filename}`
    fs.writeFileSync(new_filepath, JSON.stringify(parsed_playlist))

    // push playlist metadata to playlists
    playlists.push({
      name: playlist.Name,
      filename: safe_filename,
      date_month: playlist_date_string,
      date_updated: playlist.Date,
      count: playlist.Songs.length,
      genres: get_genres(playlist),
      artists: get_artists(playlist),
      coverphoto,
    })
  }

  const playlists_metadata = {
    playlists,
  }

  fs.writeFileSync('./src/data/music/playlists.json', JSON.stringify(playlists_metadata))
}

build_music_metadata()
