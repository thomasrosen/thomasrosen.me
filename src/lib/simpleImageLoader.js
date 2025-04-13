'use client'

export default function simpleImageLoader({ src, width = 100, quality = 100 }) {
  const newPath = `${src}?w=${width}&q=${quality}`

  return newPath
}
