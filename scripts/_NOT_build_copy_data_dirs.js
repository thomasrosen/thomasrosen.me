console.info('➡️ Started copying directories...')

cleanCopyDir('./blog/', './src/data/blog/')
cleanCopyDir('./data_about_thomasrosen/timeline/', './src/data/timeline/')

console.info('✅ Finished copying directories.')

// end node process
process.exit(0);



//--------------------------------



function cleanCopyDir(src, dest) {
  const fs = require('fs')

  // delete blog_build_dir
  if (fs.existsSync(dest)) {
    fs.rmdirSync(dest, { recursive: true })
  }

  // check if build directory exists and create it, if not
  if (!fs.existsSync(dest)) {
  // create each directory in the path
    fs.mkdirSync(dest, { recursive: true })
  }

  fs.cpSync(src, dest, { recursive: true, overwrite: true });
}
