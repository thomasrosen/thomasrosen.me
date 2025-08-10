import { sanitizeUrl } from '@braintree/sanitize-url'
import Image from 'next/image'
import Link from 'next/link'
import * as prod from 'react/jsx-runtime'
import { BlockMath } from 'react-katex'
import { refractor } from 'refractor'
import refractor_bash from 'refractor/lang/bash'
import refractor_csv from 'refractor/lang/csv'
import refractor_excelFormula from 'refractor/lang/excel-formula'
import refractor_ignore from 'refractor/lang/ignore'
import refractor_jsx from 'refractor/lang/jsx'
import rehypeRaw from 'rehype-raw'
import rehypeReact from 'rehype-react'
import remarkBreaks from 'remark-breaks'
import remarkFootnotesExtra from 'remark-footnotes-extra'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { Typo } from '@/components/Typo'
import { containsOnlyEmojisAndWhitespace } from '@/lib/containsOnlyEmojisAndWhitespace'
import { correctMarkdownTextForRender } from '@/lib/correctMarkdownText'
import { cn } from '@/lib/utils'
import { rehypePreElements } from './unified/rehypePreElements'
import { remarkFootnoteReferences } from './unified/remarkFootnoteReferences'

refractor.register(refractor_jsx)
refractor.register(refractor_excelFormula)
refractor.register(refractor_bash)
refractor.register(refractor_csv)
refractor.register(refractor_ignore)
refractor.alias({
  markup: ['atom', 'html', 'mathml', 'rss', 'ssml', 'svg', 'xml', 'vue'],
})

const production = {
  Fragment: (prod as any).Fragment,
  jsx: (prod as any).jsx,
  jsxs: (prod as any).jsxs,
}

export function markdownToReact(markdown: string) {
  markdown = correctMarkdownTextForRender(markdown)

  const file = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkFootnotesExtra, {
      breakLink: true,
    })
    .use(remarkFootnoteReferences)
    .use(remarkRehype, {
      allowDangerousHtml: true,
      handlers: {
        inlineCode: (state, node, parent) => ({
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
        }),
        code: (state, node, parent) => {
          // instead of refractor, we could also use https://github.com/wooorm/starry-night
          // starry-night is probably the best we can get, but it is more heavy.

          let highlightTreeChildren = []
          try {
            const highlightTree = refractor.highlight(node.value, node.lang || 'txt')
            highlightTreeChildren = highlightTree.children as any
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
    })
    .use(rehypeRaw)
    .use(rehypePreElements)
    // @ts-expect-error: the react types are missing.
    .use(rehypeReact, {
      ...production,
      passNode: true,
      components: {
        code: ({ node, ...props }: any) => {
          return <code {...props}>{props.value}</code>
        },
        div: ({ node, ...props }: any) => props.children,
        h1: ({ node, ...props }: any) => <Typo as="h1" {...props} />,
        h2: ({ node, ...props }: any) => <Typo as="h2" {...props} />,
        h3: ({ node, ...props }: any) => <Typo as="h3" {...props} />,
        h4: ({ node, ...props }: any) => <Typo as="h4" className="opacity-80" {...props} />,
        h5: ({ node, ...props }: any) => <Typo as="h5" className="opacity-70" {...props} />,
        h6: ({ node, ...props }: any) => <Typo as="h6" className="opacity-60" {...props} />,
        hr: ({ node, ...props }: any) => (
          <hr
            className="my-8 h-[3px] rounded-[3px] border-0 bg-[currentColor] opacity-10"
            {...props}
          />
        ),
        a: ({ node, ...props }: any) => {
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
                className
              )}
              target="_blank"
            >
              {props.children}
            </Link>
          )
        },
        pre: ({ node, ...props }: any) => {
          let language = props.lang || 'text/plain'
          const value = props.value || ''
          let children = null

          if (language === 'message/rfc822') {
            // message/rfc822 is the mime type for email
            language = 'Email'

            children = (
              <div className="max-w-[calc(100vw-5rem)] whitespace-pre-wrap rounded-xs border bg-sheet p-4 text-sheet-foreground">
                {value}
              </div>
            )
          } else {
            children = (
              <pre
                className={cn(
                  '!m-0 max-w-[calc(100vw-5rem)] overflow-auto whitespace-pre-wrap rounded-xs border bg-sheet p-4 text-sheet-foreground',
                  props.className
                )}
              >
                {props.children}
              </pre>
            )
          }

          return (
            <div className="group/code relative mb-4 text-neutral">
              <div className="-mb-3 flex items-center justify-between rounded-xs border px-4 py-1 pb-4">
                <span className="font-mono text-xs">{language}</span>
              </div>
              {children}
            </div>
          )
        },
        table: ({ node, ...props }: any) => <table className="mb-4 w-full border p-1" {...props} />,
        tr: ({ node, ...props }: any) => <tr className="border p-1" {...props} />,
        td: ({ node, ...props }: any) => <td className="border p-1" {...props} />,
        th: ({ node, ...props }: any) => <th className="border p-1" {...props} />,
        thead: ({ node, ...props }: any) => <thead className="border p-1" {...props} />,
        tbody: ({ node, ...props }: any) => <tbody className="border p-1" {...props} />,
        p: ({ node, ...props }: any) => {
          const [child] = node.children

          if (child.type === 'text' && child.value.startsWith('[\n')) {
            return (
              <p className="mb-4" {...props}>
                <BlockMath math={child.value.slice(1, child.value.length - 1)} />
              </p>
            )
          }

          const isOnlyEmoijs = containsOnlyEmojisAndWhitespace(child.value)
          return <p className={cn('mb-4', isOnlyEmoijs && 'text-4xl')} {...props} />
        },
        li: ({ node, ...props }: any) => <li className="mb-4" {...props} />,
        ul: ({ node, ...props }: any) => <ul className="ms-4 list-disc" {...props} />,
        ol: ({ node, ...props }: any) => {
          const start = props.start || 1
          const li_count =
            node.children.filter((subnode: any) => subnode.tagName === 'li').length - 1
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
        blockquote: ({ node, ...props }: any) => (
          <blockquote
            className="relative mb-4 pl-4 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-1 before:rounded-full before:bg-primary before:content-['']"
            {...props}
          />
        ),
        img: async ({ node, ...props }: any) => {
          if (!props.src || typeof props.src !== 'string') {
            return null
          }

          const imagePath = await import(`@/data${props.src}`)
          const src = imagePath.default

          return (
            <Image
              {...props}
              className={cn('h-auto w-full rounded-xl', props.className)}
              height={600}
              src={src}
              width={600}
            />
          )
        },
        audio: async ({ node, ...props }: any) => {
          if (!props.src || typeof props.src !== 'string') {
            return null
          }

          try {
            // Import the audio file using the file-loader
            const audioPath = await import(`@/data${props.src}`)
            const src = audioPath.default

            const title = props.title

            return (
              <audio {...props} controls={true} preload="metadata" src={src} title={title}>
                <source src={src} type="audio/mpeg" />
                <a href={src}>
                  <button type="button">
                    {title ? `Herunterladen: "${title}"` : 'Herunterladen'}
                  </button>
                </a>
              </audio>
            )
          } catch (error) {
            console.error('Error loading audio file:', error)
            return null
          }
        },
        iframe: ({ node, ...props }: any) => {
          const src = props.src ? sanitizeUrl(props.src) : undefined

          if (!src) {
            return null
          }

          return <iframe {...props} className={cn('overflow-hidden rounded-xl', props.className)} />
        },
      },
    })
    .processSync(markdown)

  return file.result
}
