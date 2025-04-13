/**
 * Imports an image from the data directory using Next.js's image optimization
 * @param {string} path - The path to the image relative to the data directory
 * @returns {Promise<{src: string, blurDataURL?: string} | null>} - The image source and optional blur data URL
 */
export async function importBlogDataImage(path) {
  try {
    // Remove any URL encoding from the path and ensure it starts with a slash
    const cleanPath = decodeURIComponent(path).startsWith('/')
      ? path
      : `/${path}`

    // Since __dirname is in .next/server/app/articles, we need to go up 4 levels
    // to reach the project root, then go into src/data
    // const fullPath = `../../../../src/data${cleanPath}`

    // Import the image using Next.js's dynamic import
    const imageModule = require(`@/data${cleanPath}`);
    console.log('imageModule.default', imageModule.default)
    // const imageModule = await import(fullPath)
    // console.log('imageModule', imageModule)

    // Return the image data in the format expected by Next.js Image component
    return {
      src: imageModule.default.src,
      blurDataURL: imageModule.default.blurDataURL,
    }
  } catch (error) {
    console.error('Error importing image:', error)
  }

  return {
    src: null,
    blurDataURL: null,
  }
} 
