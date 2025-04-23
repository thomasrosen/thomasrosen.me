import fs from 'fs';

// Function to ensure directory exists
export function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.info(`📁 Created directory: ${dir}`);
  }
}


export function ensureCleanDirectoryExists(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true })
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.info(`📁 Created directory: ${dir}`);
  }
}
