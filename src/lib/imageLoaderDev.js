// This file is only used during development and build
// It will be tree-shaken in production builds

export async function handleDevImage({ src, width, quality, newPath }) {
  try {
    const url = `http://localhost:4000/load_image?src=${encodeURIComponent(src)}&w=${width}&q=${quality}&p=${encodeURIComponent(newPath)}`
    console.log('url', url)

    const response = await fetch(url, {
      headers: {
        'Origin': 'http://localhost:3000'
      },
      credentials: 'include'
    })
    if (!response.ok) {
      throw new Error(`Failed to optimize image: ${response.statusText}`)
    }
  } catch (error) {
    console.error('ERROR_C9rOxFKS Error optimizing image:', error)
  }
} 
