export async function importBlogDataImage(path) {
  try {
    // Remove any URL encoding from the path and ensure it starts with a slash
    const cleanPath = decodeURIComponent(path).startsWith('/')
      ? path
      : `/${path}`

    const imageModule = require(`@/data${cleanPath}`);

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
