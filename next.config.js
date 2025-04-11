/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  skipTrailingSlashRedirect: false,

  // Optional: Change the output directory `out` -> `dist`
  distDir: 'build',

  images: {
    loader: 'custom',
    loaderFile: './src/utils/imageLoader.js',
    // deviceSizes: [100, 200, 400], // only allow 100px and 200px variants
    // imageSizes: [200], // optional: for images with 'sizes' attribute
  },

  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/articles',
        permanent: false,
      },
      {
        source: '/zenris',
        destination: '/articles/zenris',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
