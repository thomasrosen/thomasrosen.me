import bundleAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
    forceSwcTransforms: true,
    ppr: false, // 'incremental',
    //   scrollRestoration: true,
    //   routerBFCache: true,
    //   viewTransition: true,
  },

  webpack: (config, { isServer }) => {
    config.infrastructureLogging = {
      level: 'error', // or 'warn' if you still want some warnings
    }

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
          outputPath: isServer ? '../../static/media' : 'static/media',
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

    // // Find existing rule handling images
    // const imageRule = config.module.rules.find((rule: any) => {
    //   if (typeof rule !== 'object') {
    //     return false
    //   }
    //   if (!rule.test) {
    //     return false
    //   }
    //   return rule.test?.toString().includes('jpg') || rule.test?.toString().includes('png')
    // })
    //
    // if (imageRule) {
    //   imageRule.type = 'asset/resource' // Tell Webpack: treat as file, not as inline asset
    //   delete imageRule.parser // Clean up potential leftover settings
    // }

    return config
  },

  images: {
    deviceSizes: [64, 128, 200, 400, 600, 1200], // only allow some specific sizes
    imageSizes: [64, 128, 200, 400, 600, 1200], // optional: for images with 'sizes' attribute
    // path: '.next/image',
    // loader: 'default',
    // remotePatterns: [new URL('https://picsum.photos/**')],
  },

  // biome-ignore lint/suspicious/useAwait: nextjs expects this to be async
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
      {
        source: '/follow',
        destination: '/',
        permanent: false,
      },
      {
        source: '/contact',
        destination: '/',
        permanent: false,
      },
      {
        source: '/sponsor',
        destination: '/',
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

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})
nextConfig = withBundleAnalyzer(nextConfig)

export default nextConfig
