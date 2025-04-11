'use client'

export default function collectingImageLoader({ src, width = 100, quality = 100 }) {

  const ending = src.split('.').pop()
  const src_base64 = Buffer.from(src).toString('base64') // .replace(/=/g, '')
  const newPath = `/generated/q${quality}-w${width}-${src_base64}.${ending}`

    ; (async () => {
      const response = await fetch(`http://localhost:20814?src=${encodeURIComponent(src)}&w=${width}&q=${quality}&p=${encodeURIComponent(newPath)}`)
      const data = await response.json()
      console.log('data', data)
    })()

  return newPath;
};
