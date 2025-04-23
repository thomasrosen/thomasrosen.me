import nextMDX from '@next/mdx'
import path from 'path'
import recmaNextjsStaticProps from 'recma-nextjs-static-props'
import { refractor } from 'refractor'
// import refractor_bash from 'refractor/lang/bash'
// import refractor_csv from 'refractor/lang/csv'
// import refractor_excelFormula from 'refractor/lang/excel-formula'
// import refractor_ignore from 'refractor/lang/ignore'
// import refractor_jsx from 'refractor/lang/jsx'
import type { NextConfig } from 'next'
// import recmaMdxImportMedia from 'recma-mdx-import-media'
import remarkBreaks from 'remark-breaks'
import remarkComment from 'remark-comment'
import remarkFootnotesExtra from 'remark-footnotes-extra'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { fileURLToPath } from 'url'
// import { rehypePreElements } from './src/lib/unified/rehypePreElements'
// import recmaMdxChangeImports from 'recma-mdx-change-imports'
// import withYaml from 'next-plugin-yaml'
import recmaExportFilepath from 'recma-export-filepath'
import recmaMdxEscapeMissingComponents from 'recma-mdx-escape-missing-components'
import rehypeMdxTitle from 'rehype-mdx-title'
import rehypePreLanguage from 'rehype-pre-language'
import { remarkFootnoteReferences } from './src/lib/unified/remarkFootnoteReferences'

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
  output: 'standalone',
  poweredByHeader: false,
  devIndicators: false,

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  skipTrailingSlashRedirect: false,

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
      test: /\.(xml|rss)$/,
      use: {
        loader: 'raw-loader',
      },
    })

    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'js-yaml-loader',
    })

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
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },
}

// nextConfig = withYaml(nextConfig)

// Merge MDX config with Next.js config
const withMDX = nextMDX({
  extension: /\.mdx?$/,
  // Optionally provide remark and rehype plugins
  options: {
    recmaPlugins: [
      recmaMdxEscapeMissingComponents,
      // recmaMdxChangeImports,
      // recmaMdxImportMedia,
      [
        recmaExportFilepath,
        {
          absolute: true,
        },
      ],
      recmaNextjsStaticProps,
    ],
    remarkPlugins: [
      remarkComment,
      remarkGfm,
      remarkBreaks,
      [remarkFootnotesExtra, { breakLink: true }],
      remarkFootnoteReferences,
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: 'data' }],
    ],
    rehypePlugins: [
      rehypePreLanguage,
      rehypeMdxTitle,
      // rehypePreElements,
      // ['rehype-katex', { strict: true, throwOnError: true }]
    ],
    remarkRehypeOptions: {
      allowDangerousHtml: true,
      handlers: {
        inlineCode: (state, node, parent) => {
          // pass the value to the code element
          return {
            type: 'element',
            tagName: 'code',
            properties: {
              value: node.value,
            },
            children: [
              {
                type: 'text',
                value: node.value,
              },
            ],
          }
        },
        code: (state, node, parent) => {
          // instead of refractor, we could also use https://github.com/wooorm/starry-night
          // starry-night is probably the best we can get, but it is more heavy.

          let highlightTreeChildren = []
          try {
            const highlightTree = refractor.highlight(
              node.value,
              node.lang || 'txt'
            )
            highlightTreeChildren = highlightTree.children
          } catch (error) {
            console.error('ERROR_aeJKJvEI', error)

            highlightTreeChildren = [
              {
                type: 'text',
                value: node.value,
              },
            ]
          }

          // pass lang and value to the pre element
          return {
            type: 'element',
            tagName: 'pre',
            properties: {
              lang: node.lang,
              value: node.value,
              className: `language-${node.lang}`,
            },
            children: highlightTreeChildren,
          }
        },
      },
      unknownHandler: (state, node, parent) => {
        if (node.type === 'footnoteReferenceLink') {
          return {
            type: 'element',
            tagName: 'a',
            properties: {
              'data-is-footnote': true,
              'data-label': node.label,
              href: node.url,
            },
            children: node.children,
          }
        }

        return node
      },
    },
  },
})

const nextConfigWithMDX = withMDX(nextConfig)

export default nextConfigWithMDX
