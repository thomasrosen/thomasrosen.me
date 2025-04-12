// This file is only used during development and build
// It will be tree-shaken in production builds

export async function handleDevImage({ src, width, quality, newPath }) {
  try {
    const full_url_src = `http://localhost:3000/${src}`
    const url = `http://localhost:4000/load_image?src=${encodeURIComponent(full_url_src)}&w=${width}&q=${quality}&p=${encodeURIComponent(newPath)}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to optimize image: ${response.statusText}`)
    }
  } catch (error) {
    console.error('Error optimizing image:', error)
  }
} 
