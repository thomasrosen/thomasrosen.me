const path = require('path')

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

  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    }

    // Add rule for JSON files
    config.module.rules.push({
      test: /\.json$/,
      type: 'javascript/auto',
      use: {
        loader: 'json-loader',
      },
    })

    // Add rule for audio files
    config.module.rules.push({
      test: /\.(mp3|m4a|mp4|wav|ogg)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/media',
          outputPath: isServer ? '../static/media' : 'static/media',
          name: '[name].[hash].[ext]',
          emitFile: true,
        },
      },
    })

    // Add rule for XML/RSS files
    config.module.rules.push({
      test: /\.(xml|rss|yml)$/,
      use: {
        loader: 'raw-loader',
      },
    })

    // Ignore HEIC files
    config.module.rules.push({
      test: /\.heic$/i,
      use: 'ignore-loader'
    })

    // // Add rule for image files with spaces in names
    // config.module.rules.push({
    //   test: /\.(png|jpg|jpeg|gif|webp|avif)$/,
    //   use: {
    //     loader: 'file-loader',
    //     options: {
    //       publicPath: '/_next/static/media',
    //       outputPath: isServer ? '../static/media' : 'static/media',
    //       name: '[name].[hash].[ext]',
    //       emitFile: true,
    //       esModule: true,
    //     },
    //   },
    // })

    return config
  },

  images: {
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.js',
    deviceSizes: [64, 128, 200, 400, 600, 1200], // only allow some specific sizes
    imageSizes: [64, 128, 200, 400, 600, 1200], // optional: for images with 'sizes' attribute
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
