const path = require('path')
const fs = require('fs')
const { readdir } = require('fs').promises

const sharp = require('sharp')

const empty_transparent_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

async function* getFilesRecursive(dir, root = dir) {
  // source: https://stackoverflow.com/a/45130990/2387277
  // source: https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
  // I added the part with the root_path variable, because I wanted to get the relative path of the files.

  const root_path = path.resolve(root) + '/'

  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFilesRecursive(res, dir);
    } else {
      yield res.replace(root_path, '');
    }
  }
}

function get_genres(playlist) {
  let genres = playlist.Songs
    // sort the genres by count with reduce
    .reduce((acc, song) => {
      const genre = song.Genre
      if (!acc.hasOwnProperty(genre)) {
        acc[genre] = 0
      }
      acc[genre] += 1
      return acc
    }, {})

  genres = Object.entries(genres)
    .sort((a, b) => b[1] - a[1])
    .map(([genre, count]) => genre)
    .slice(0, 3) // only keep the top 3 genres

  return genres
}

function get_artists(playlist) {
  let artists = playlist.Songs
    // sort the artists by count with reduce
    .reduce((acc, song) => {
      const artist = song.Artist
      if (!acc.hasOwnProperty(artist)) {
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
      const x = i % 2 * (canvasWidth / 2); // Calculate x position based on column
      const y = Math.floor(i / 2) * (canvasHeight / 2); // Calculate y position based on row

      // Composite the image onto the canvas
      images.push({
        input: Buffer.from(imageURIs[i].split(',')[1], 'base64'), // Extract image data from data URI
        top: y,
        left: x
      })
    }


  // Create a new canvas with the specified width and height
  const canvas = sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
    }
  })
    .composite(images)
    .png({ encoding: "base64" })

  const dataUrl = await canvas.toBuffer();
  return `data:image/png;base64,${dataUrl.toString('base64')}`;
}

async function get_playlist_coverphoto(playlist) {
  let images = []

  for (const song of playlist.Songs) {
    const image = song['Album Artwork']
    if (image && image !== '') {
      if (!images.find(img => img === image)) {
        images.push(image)
        if (images.length >= 4) {
          break
        }
      }
    }
  }

  if (images.length === 0) {
    return empty_transparent_png
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

  // Call the function to combine images
  const finished_image = await combineImages(images, {
    canvasWidth: 128,
    canvasHeight: 128,
  })

  return finished_image
}

async function build_music_metadata() {
  const playlists = []
  const playlist_dir = './data_about_thomasrosen/music/playlists/'
  for await (const relative_filepath of getFilesRecursive(playlist_dir)) {
    // get the playlist_date from the filename (2018 12 DEZ.json) with regexp
    const playlist_date = relative_filepath.match(/(\d{4}) (\d{2}) ([A-Z]{3})\.json/)
    if (!playlist_date) {
      continue
    }
    const year = playlist_date[1]
    const month = playlist_date[2]
    const playlist_date_string = `${year}-${month}-01T00:00:00.000Z`


    // get playlist
    const playlist = JSON.parse(fs.readFileSync(playlist_dir + relative_filepath))

    if (playlist.Songs.hasOwnProperty('Title')) {
      // if there is only one song, ios saves this as an object, not as an array
      playlist.Songs = [playlist.Songs]
    }

    // push playlist metadata to playlists
    playlists.push({
      name: playlist.Name,
      filename: relative_filepath,
      date_month: playlist_date_string,
      date_updated: playlist.Date,
      count: playlist.Songs.length,
      genres: get_genres(playlist),
      // artists: get_artists(playlist),
      coverphoto: await get_playlist_coverphoto(playlist),
    })
  }

  // console.log(playlists)

  const playlists_metadata = {
    playlists,
  }

  fs.writeFileSync('./public/music/playlists.json', JSON.stringify(playlists_metadata))
  fs.writeFileSync('./build/music/playlists.json', JSON.stringify(playlists_metadata))
}
build_music_metadata()
