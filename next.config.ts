import path from 'path'
// import refractor_bash from 'refractor/lang/bash'
// import refractor_csv from 'refractor/lang/csv'
// import refractor_excelFormula from 'refractor/lang/excel-formula'
// import refractor_ignore from 'refractor/lang/ignore'
// import refractor_jsx from 'refractor/lang/jsx'
import type { NextConfig } from 'next'
// import recmaMdxImportMedia from 'recma-mdx-import-media'
import { fileURLToPath } from 'url'
// import { rehypePreElements } from './src/lib/unified/rehypePreElements'
// import recmaMdxChangeImports from 'recma-mdx-change-imports'
// import withYaml from 'next-plugin-yaml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// refractor.register(refractor_jsx)
// refractor.register(refractor_excelFormula)
// refractor.register(refractor_bash)
// refractor.register(refractor_csv)
// refractor.register(refractor_ignore)
// refractor.alias({
//   markup: ['atom', 'html', 'mathml', 'rss', 'ssml', 'svg', 'xml', 'vue'],
// })

let nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  skipTrailingSlashRedirect: false,

  // output: undefined,
  // outputFileTracingIncludes: {
  //   '/*': ['/**/*'],
  // },

  experimental: {
    scrollRestoration: true,
    routerBFCache: true,
    viewTransition: true,
  },

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
          emitFile: true,
          publicPath: '/_next/static/media',
          outputPath: isServer ? '../static/media' : 'static/media',
          name: '[name].[contenthash].[ext]',
        },
      },
    })

    // Add rule for XML/RSS files
    config.module.rules.push({
      test: /\.(xml|rss|md|mdx)$/,
      use: {
        loader: 'raw-loader',
      },
    })

    // Update YAML loader configuration
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: [
        {
          loader: 'js-yaml-loader',
          options: {
            asJSON: true,
          },
        },
      ],
    })

    // // Add rule for MDX files
    // config.module.rules.push({
    //   test: /\.mdx?$/,
    //   use: [
    //     {
    //       loader: '@next/mdx',
    //       options: {
    //         extension: /\.mdx?$/,
    //       },
    //     },
    //   ],
    // })

    // Ignore HEIC files
    config.module.rules.push({
      test: /\.heic$/i,
      use: 'ignore-loader',
    })

    return config
  },

  images: {
    deviceSizes: [64, 128, 200, 400, 600, 1200], // only allow some specific sizes
    imageSizes: [64, 128, 200, 400, 600, 1200], // optional: for images with 'sizes' attribute
    // path: '.next/image',
    // loader: 'default',
    // remotePatterns: [new URL('https://picsum.photos/**')],
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

  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },
}

// nextConfig = withYaml(nextConfig)

// Merge MDX config with Next.js config
/*
const withMDX = nextMDX({
  extension: /\.mdx?$/,
  // Optionally provide remark and rehype plugins
  options: 
})
nextConfig = withMDX(nextConfig)
*/

export default nextConfig
