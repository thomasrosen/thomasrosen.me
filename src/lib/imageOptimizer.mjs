import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const IMAGE_CACHE_DIR = path.join(process.cwd(), '.next/cache/images')
const OPTIMIZED_IMAGES_DIR = path.join(process.cwd(), 'public/img_exports')

// Ensure cache and optimized images directories exist
async function ensureDirectories() {
  await fs.mkdir(IMAGE_CACHE_DIR, { recursive: true })
  await fs.mkdir(OPTIMIZED_IMAGES_DIR, { recursive: true })
}

export async function optimizeImage({
  src,
  width,
  quality = 75,
  format = 'jpg',
  outputPath,
}) {
  await ensureDirectories()

  const startTime = Date.now()
  const originalPath = path.join(process.cwd(), 'public', src)
  const originalStats = await fs.stat(originalPath)
  const originalSize = originalStats.size

  // Create directory if it doesn't exist
  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  // Optimize image
  await sharp(originalPath)
    .resize({ width })
    .toFormat(format, { quality })
    .toFile(outputPath)

  const optimizedStats = await fs.stat(outputPath)
  const optimizationTime = Date.now() - startTime

  return {
    src,
    width,
    quality,
    format,
    originalSize,
    optimizedSize: optimizedStats.size,
    optimizationTime,
    optimizedUrl: `/img_exports/${width}/${quality}/${src}`,
  }
}

export async function collectImageOptimizationData(images) {
  const results = []

  for (const image of images) {
    try {
      const result = await optimizeImage(image)
      results.push(result)
    } catch (error) {
      console.error(`Failed to optimize image ${image.src}:`, error)
    }
  }

  return results
}

// Utility function to get image dimensions
export async function getImageDimensions(
  src
) {
  const imagePath = path.join(process.cwd(), 'public', src)
  const metadata = await sharp(imagePath).metadata()
  return {
    width: metadata.width || 0,
    height: metadata.height || 0,
  }
}
