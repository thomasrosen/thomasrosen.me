import ExifReader from 'exifreader';
import fs from 'fs';
import matter from 'gray-matter';
import { imageSize } from 'image-size';
import path from 'path';
const { execSync } = require('child_process');

// Define paths
const inputImagesDir = './data_about_thomasrosen/timeline/images';
const inputEntriesPath = './data_about_thomasrosen/timeline/entries.yml';
const outputImagesDir = './src/data/timeline/images';
const outputEntriesPath = './src/data/timeline/entries.json';

// Supported image formats
const supportedFormats = ['.jpg', '.jpeg', '.png'];

// Function to ensure directory exists
function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.info(`📁 Created directory: ${dir}`);
  }
}

// Function to read image metadata
function getImageMetadata(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    const tags = ExifReader.load(buffer);

    // Get image dimensions
    const dimensions = imageSize(buffer);

    return {
      width: dimensions.width,
      height: dimensions.height,
      exif: tags
    };
  } catch (error) {
    console.warn(`⚠️ Could not read metadata for ${filePath}:`, error.message);
    return null;
  }
}

// Function to process image files
export function processImageFiles() {
  try {
    // Create output directory and copy images
    if (!fs.existsSync(outputImagesDir)) {
      return []
      // fs.mkdirSync(outputImagesDir, { recursive: true });
    }
    execSync(`cp -r ${inputImagesDir}/* ${outputImagesDir}/`);
    console.info(`✅ Successfully copied images to ${outputImagesDir}`);

    // Read all files from the output directory
    const files = fs.readdirSync(outputImagesDir);

    // Process each image file
    const images = [];

    for (const file of files) {
      const filePath = path.join(outputImagesDir, file);
      const ext = path.extname(file).toLowerCase();

      if (!supportedFormats.includes(ext)) {
        console.info(`Skipping ${file}: Not a supported image format`);
        continue;
      }

      const metadata = getImageMetadata(filePath);
      if (!metadata) continue;

      // Extract date from EXIF or use file creation date
      const date = metadata.exif?.DateTimeOriginal?.description ||
        metadata.exif?.DateTime?.description ||
        fs.statSync(filePath).birthtime.toISOString();

      // Create image entry with correct path for imports
      images.push({
        date,
        displayAs: 'image',
        title: path.parse(file).name,
        image: `/data/timeline/images/${file}`, // Path relative to /public/
        imageAspectRatio: metadata.width / metadata.height,
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

// Function to process timeline entries
function processTimelineEntries(images) {
  try {
    // Check if entries file exists
    if (!fs.existsSync(inputEntriesPath)) {
      console.info(`ℹ️ No entries file found at ${inputEntriesPath}, using only images`);
      return images;
    }

    // Read YAML file
    const yamlContent = fs.readFileSync(inputEntriesPath, 'utf8');
    const { data } = matter(`---
${yamlContent}
---`);

    // Ensure entries is an array
    const entries = Array.isArray(data.entries) ? data.entries : [];

    // Create a map of images by their path for quick lookup
    const imageMap = new Map(images.map(img => [img.image, img]));

    // Process entries first, merging with image data if available
    const processedEntries = entries.map(entry => {
      if (entry.image && imageMap.has(entry.image)) {
        // If entry has an image that exists in our images, merge the data
        const imageData = imageMap.get(entry.image);
        imageMap.delete(entry.image); // Remove from map to track which images are used
        return {
          ...imageData,
          ...entry // Entry data takes precedence
        };
      }
      return entry;
    });

    // Add any remaining images that weren't in entries
    const remainingImages = Array.from(imageMap.values());
    const combinedEntries = [...processedEntries, ...remainingImages];

    // Sort all entries by date
    combinedEntries.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Ensure output directory exists
    ensureDirectoryExists(outputEntriesPath);

    // Write JSON file
    fs.writeFileSync(outputEntriesPath, JSON.stringify({ entries: combinedEntries }, null, 2));

    console.info(`✅ Successfully combined ${entries.length} entries with ${images.length} images (${remainingImages.length} images added)`);
    return combinedEntries;
  } catch (error) {
    console.error('❌ Error processing timeline entries:', error);
    console.error('Error details:', error.stack);
    return images;
  }
}

// // Run the script
// const images = processImageFiles();
// processTimelineEntries(images);
