import { Typo } from '@/components/Typo'
import { HR } from '@/components/hr'
import { sanitizeUrl } from '@braintree/sanitize-url'
import type { MDXComponents } from 'mdx/types'
import type { MDXRemoteOptions } from 'next-mdx-remote-client/rsc'
import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import recmaExportFilepath from 'recma-export-filepath'
import recmaMdxEscapeMissingComponents from 'recma-mdx-escape-missing-components'
import recmaNextjsStaticProps from 'recma-nextjs-static-props'
import { refractor } from 'refractor'
import rehypeMdxTitle from 'rehype-mdx-title'
import rehypePreLanguage from 'rehype-pre-language'
import remarkBreaks from 'remark-breaks'
import remarkFootnotesExtra from 'remark-footnotes-extra'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
// import nextMDX from '@next/mdx'
import { rehypeMapHtmlElementsToReact } from '@/lib/unified/rehypeMapHtmlElementsToReact'
import { remarkFootnoteReferences } from '@/lib/unified/remarkFootnoteReferences'
import { cn } from '@/lib/utils'

// import refractor_bash from 'refractor/lang/bash'
// import refractor_csv from 'refractor/lang/csv'
// import refractor_excelFormula from 'refractor/lang/excel-formula'
// import refractor_ignore from 'refractor/lang/ignore'
// import refractor_jsx from 'refractor/lang/jsx'

// refractor.register(refractor_jsx)
// refractor.register(refractor_excelFormula)
// refractor.register(refractor_bash)
// refractor.register(refractor_csv)
// refractor.register(refractor_ignore)
// refractor.alias({
//   markup: ['atom', 'html', 'mathml', 'rss', 'ssml', 'svg', 'xml', 'vue'],
// })

export const components: MDXComponents = {
  code: (props) => {
    return <code className="-my-0.75 -mx-0.5 rounded-[8px] bg-accent px-1 py-0.75" {...props} />
  },
  div: (props) => <Typo as="div" {...props} />,
  h1: (props) => <Typo as="h1" {...props} />,
  h2: (props) => <Typo as="h2" {...props} />,
  h3: (props) => <Typo as="h3" {...props} />,
  h4: (props) => <Typo as="h4" className="opacity-80" {...props} />,
  h5: (props) => <Typo as="h5" className="opacity-70" {...props} />,
  h6: (props) => <Typo as="h6" className="opacity-60" {...props} />,
  hr: (props) => <HR {...props} />,
  a: (props: any) => {
    const className = props.className

    // const isFootnote = props['data-is-footnote']
    // if (isFootnote) {
    //   const label = props['data-label']
    //
    //   return (
    //     <Tooltip delayDuration={100}>
    //       <TooltipTrigger asChild>
    //         <Link {...props} target='_blank'>
    //           <Badge>{props.children}</Badge>
    //         </Link>
    //       </TooltipTrigger>
    //       <TooltipContent>
    //         <Link {...props} target='_blank'>
    //           <div className='flex flex-col gap-1'>
    //             {label ? <strong>{label}</strong> : null}
    //             {props.href ? (
    //               <em className='inline-block w-fit max-w-[200px] break-all text-xs leading-tight opacity-60'>
    //                 {props.href}
    //               </em>
    //             ) : null}
    //           </div>
    //         </Link>
    //       </TooltipContent>
    //     </Tooltip>
    //   )
    // }

    return (
      <Link
        {...props}
        className={cn(
          'underline decoration-2 decoration-primary underline-offset-2 hover:decoration-1',
          'hyphens-none break-all',
          className
        )}
        target="_blank"
      >
        {props.children}
      </Link>
    )
  },
  pre: (props) => {
    const language = props.lang || 'text/plain'

    return (
      <div className="group/code relative mb-4 text-neutral">
        <div className="-mb-3 flex items-center justify-between rounded-xs border px-4 py-1 pb-4">
          <span className="font-mono text-xs">{language}</span>
        </div>
        <pre
          className={cn(
            '!m-0 max-w-[calc(100vw-5rem)] overflow-auto whitespace-pre-wrap rounded-xs border bg-sheet p-4 text-sheet-foreground',
            props.className
          )}
        >
          {props.children}
        </pre>
      </div>
    )
  },
  table: (props) => <table className="mb-3 w-full border p-1" {...props} />,
  tr: (props) => <tr className="border p-1" {...props} />,
  td: (props) => <td className="border p-1" {...props} />,
  th: (props) => <th className="border p-1" {...props} />,
  thead: (props) => <thead className="border p-1" {...props} />,
  tbody: (props) => <tbody className="border p-1" {...props} />,
  p: (props) => {
    return (
      <Typo as="p" {...props}>
        {props.children}
      </Typo>
    )
    // const [child] = node?.children || []

    // if (child && child.type === 'text' && child.value.startsWith('[\n')) {
    //   return (
    //     <p className='mb-4' {...props}>
    //       <BlockMath math={child.value.slice(1, child.value.length - 1)} />
    //     </p>
    //   )
    // }

    // const isOnlyEmoijs = containsOnlyEmojisAndWhitespace(child.value)
    // return <p className={cn('mb-4', isOnlyEmoijs && 'text-4xl')} {...props} />
  },
  li: (props) => <li className="mb-1" {...props} />,
  ul: (props) => <ul className="ms-3 list-disc" {...props} />,
  ol: (props) => {
    const start = props.start || 1
    const li_count = 0 // props.children.filter((subnode: any) => subnode.tagName === 'li').length - 1
    const max_number = start + li_count

    let margin_start_class = ''
    if (max_number > 10_000) {
      margin_start_class = 'ms-16'
    } else if (max_number > 1000) {
      margin_start_class = 'ms-14'
    } else if (max_number > 100) {
      margin_start_class = 'ms-12'
    } else if (max_number > 10) {
      margin_start_class = 'ms-8'
    } else if (max_number > 0) {
      margin_start_class = 'ms-5'
    }

    return <ol className={cn('list-decimal', margin_start_class)} {...props} />
  },
  blockquote: (props) => (
    <blockquote
      className="relative mb-3 pl-3 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-1 before:rounded-full before:bg-primary before:content-['']"
      {...props}
    />
  ),
  img: (props) => {
    if (!props.src || typeof props.src !== 'string') {
      return null
    }

    const imagePath = require(`@/data${props.src}`)
    const src = imagePath.default

    return (
      <Image
        {...(props as ImageProps)}
        className={cn('h-auto w-full rounded-xs', props.className)}
        height={600}
        src={src}
        width={600}
      />
    )
  },
  Audio: (props) => {
    if (!props.src || typeof props.src !== 'string') {
      return null
    }

    try {
      // Import the audio file using the file-loader
      const audioPath = require(`@/data${props.src}`)
      const src = audioPath.default

      const title = props.title

      return (
        <audio {...props} controls={true} preload="metadata" src={src} title={title}>
          <source src={src} type="audio/mpeg" />
          <a href={src}>
            <button type="button">{title ? `Herunterladen: "${title}"` : 'Herunterladen'}</button>
          </a>
        </audio>
      )
    } catch (error) {
      console.error('Error loading audio file:', error)
      return null
    }
  },
  Iframe: (props) => {
    const src = props.src ? sanitizeUrl(props.src) : undefined

    if (!src) {
      return null
    }

    return <iframe {...props} className={cn('overflow-hidden rounded-xl', props.className)} />
  },
}

export function useMDXComponents(components_overwrite: MDXComponents): MDXComponents {
  return {
    ...components,
    ...components_overwrite,
  }
}

export const mdxOptions: MDXRemoteOptions['mdxOptions'] = {
  format: 'mdx',
  development: false,
  remarkPlugins: [
    remarkGfm,
    remarkBreaks,
    [remarkFootnotesExtra, { breakLink: true }],
    remarkFootnoteReferences,
    remarkFrontmatter,
    [remarkMdxFrontmatter, { name: 'data' }],
  ],
  rehypePlugins: [
    rehypeMapHtmlElementsToReact,
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
          const highlightTree = refractor.highlight(node.value, node.lang || 'txt')
          highlightTreeChildren = (highlightTree.children || []) as any
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
}
