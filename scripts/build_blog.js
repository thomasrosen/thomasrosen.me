console.info('➡️ Started building blog...')

const fs = require('fs')

// directory path
const data_blog_dir = './blog/'
const src_data_blog_dir = './src/data/blog/'

console.info('✅ Loaded articles.')

// delete blog_build_dir
if (fs.existsSync(src_data_blog_dir)) {
  fs.rmdirSync(src_data_blog_dir, { recursive: true })
}

// check if build directory exists and create it, if not
if (!fs.existsSync(src_data_blog_dir)) {
  // create each directory in the path
  fs.mkdirSync(src_data_blog_dir, { recursive: true })
}

// copy blog_build_dir to ./src/data/blog
fs.cpSync(data_blog_dir, src_data_blog_dir, { recursive: true, overwrite: true });

console.info('✅ Blog build complete.');

// end node process
process.exit(0);
