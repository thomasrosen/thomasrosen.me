import ExifReader from 'exifreader';
import fs from 'fs';
import { imageSize } from 'image-size';
import path from 'path';

// Define paths
const outputImagesDir = './src/data/timeline/images';

// Supported image formats
const supportedFormats = ['.jpg', '.jpeg', '.png'];

// Function to read image metadata
function getImageMetadata(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    const tags = ExifReader.load(buffer);

    // Get image dimensions
    const dimensions = imageSize(buffer);

    const datetime = tags.DateTime?.description || tags.DateTimeOriginal?.description || tags.DateTimeDigitized?.description

    const textKey = ['Caption/Abstract', 'UserComment', 'ImageDescription', 'Comments'].find(tag => tags[tag]?.description)

    let text = '';
    if (tags[textKey]?.description) {
      text = tags[textKey]?.description;
    }

    return {
      exif: tags,
      width: dimensions.width,
      height: dimensions.height,
      datetime: exifToISO(datetime),
      text,
      latitude: tags.GPSLatitude?.description,
      longitude: tags.GPSLongitude?.description,
    };
  } catch (error) {
    console.warn(`⚠️ Could not read metadata for ${filePath}:`, error.message);
    return null;
  }
}

// Function to process image files
export function processImageFiles() {
  try {
    // Read all files from the output directory
    const files = fs.readdirSync(outputImagesDir);

    // Process each image file
    const images = [];

    for (const filename of files) {
      const filePath = path.join(outputImagesDir, filename);
      const ext = path.extname(filename).toLowerCase();

      if (!supportedFormats.includes(ext)) {
        console.info(`Skipping ${filename}: Not a supported image format`);
        continue;
      }

      const metadata = getImageMetadata(filePath);
      if (!metadata) {
        continue;
      }

      // Create image entry with correct path for imports
      images.push({
        date: metadata.datetime,
        latitude: metadata.latitude,
        longitude: metadata.longitude,
        displayAs: 'image',
        author: 'Thomas Rosen',
        title: '', // path.parse(filename).name,
        text: metadata.text,
        image: filename,
        imageAspectRatio: metadata.width / metadata.height,
        tags: []
      });
    }

    // Sort images by date
    images.sort((a, b) => new Date(b.date) - new Date(a.date));

    console.info(`✅ Successfully processed ${images.length} images`);
    return images;
  } catch (error) {
    console.error('❌ Error processing image files:', error);
    return [];
  }
}

/**
 * Convert EXIF datetime to ISO 8601 format
 * @param {string} exifDateTime - EXIF datetime string (format: YYYY:MM:DD HH:MM:SS)
 * @param {string} [subsec] - Subseconds (e.g., "234")
 * @param {string} [timezone] - Timezone offset (e.g., "+01:00" or "Z")
 * @returns {string} ISO 8601 formatted date
 */
function exifToISO(exifDateTime, subsec, timezone) {
  if (!exifDateTime) return null;

  // Basic conversion: Replace colons and add T
  let isoStr = exifDateTime
    .replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3')  // Date part
    .replace(' ', 'T');                                // Time separator

  // Add subseconds if provided
  if (subsec) {
    isoStr = isoStr.replace(/(T\d{2}:\d{2}:\d{2})/, `$1.${subsec}`);
  }

  // Add timezone (default to Z if none provided)
  return isoStr + (timezone || 'Z');
}
