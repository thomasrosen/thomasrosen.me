export async function importBlogDataImage(path) {
  try {
    // Remove any URL encoding from the path
    const cleanPath = decodeURIComponent(path)
    // Ensure the path starts with a slash
    const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`

    // Try to import the image
    const imageModule = await import(`@/data${normalizedPath}`)
    console.log('imageModule.default', imageModule.default)

    if (!imageModule?.default) {
      throw new Error('Invalid image module')
    }

    return imageModule.default
  } catch (error) {
    console.error('Error importing image:', error)
    return null
  }
} 
