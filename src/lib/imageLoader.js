'use client'

export default function collectingImageLoader({ src, width = 100, quality = 100 }) {
  const ending = src.split('.').pop()
  const src_base64 = Buffer.from(src).toString('base64')
  const newPath = `/generated/q${quality}-w${width}-${src_base64}.${ending}`

  try {
    console.log('src', src)
    // This code will be completely removed during production build
    // Use dynamic import to ensure this code is tree-shaken in production
    import('@/lib/imageLoaderDev').then(({ handleDevImage }) => {
      handleDevImage({ src, width, quality, newPath })
    }).catch(console.error)
  } catch (error) {
    console.error('ERROR_pkLkGQ2w Error optimizing image:', error)
  }

  return newPath
}
