import { components, mdxOptions } from '@@/mdx-components'
import fs from 'node:fs'
import path from 'node:path'
import { evaluate } from 'next-mdx-remote-client/rsc'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import strip from 'strip-markdown'
import { unified } from 'unified'
import type { Article } from '@/types'
import { removeFrontmatter } from './unified/removeFrontmatter'

export async function loadArticles() {
  try {
    const currentDir = process.cwd()
    const articlesDirectory = path.join(currentDir, 'src', 'data', 'blog', 'articles')

    // Check if directory exists
    if (!fs.existsSync(articlesDirectory)) {
      console.warn(`Articles directory does not exist: ${articlesDirectory}`)
      return [] // Return empty array instead of failing
    }

    const files = fs.readdirSync(articlesDirectory)
    const mdxFiles = files.filter((file) => /\.mdx?$/.test(file))

    if (mdxFiles.length === 0) {
      console.warn('No .md or .mdx files found in articles directory')
      return []
    }

    const modules = (
      await Promise.all(
        mdxFiles.map(async (filename: string): Promise<Article> => {
          const filepath = path.join(articlesDirectory, filename)
          const orginal_file_content = fs.readFileSync(filepath, 'utf8')

          type Frontmatter = Record<string, any>
          type Scope = Record<string, any>

          const module = await evaluate<Frontmatter, Scope>({
            source: orginal_file_content,
            options: {
              mdxOptions,
              parseFrontmatter: false,
            },
            components,
          })

          const mod: Record<string, any> = module.mod
          const data = mod.data || {}

          const plaintext = await unified()
            .use(remarkParse)
            .use(remarkFrontmatter)
            .use(removeFrontmatter)
            .use(strip as any)
            .use(remarkStringify)
            .process(orginal_file_content)
            .then((file: any) => String(file).trim())

          const summary = `${plaintext.substring(0, 100).trim()}…`

          let coverphoto_src: string | null = null
          if (!!data && typeof data.coverphoto === 'string' && data.coverphoto?.length > 0) {
            try {
              // Remove any URL encoding from the path
              const cleanPath = decodeURIComponent(data.coverphoto)
              // const currentDir = process.cwd()
              const imagePath = await import(`@/data${cleanPath}`)
              coverphoto_src = imagePath.default
            } catch (error) {
              console.error('Error loading cover photo:', error)
              // Continue without the cover photo rather than failing the build
            }
          }

          let audio_src: string | null = null
          if (!!data && typeof data.audio === 'string' && data.audio?.length > 0) {
            try {
              // Remove any URL encoding from the path
              const cleanPath = decodeURIComponent(data.audio)
              const audioPath = await import(`@/data${cleanPath}`)
              audio_src = audioPath.default
            } catch (error) {
              console.error('Error loading audio:', error)
              // Continue without the audio rather than failing the build
            }
          }

          const getStaticProps = mod.getStaticProps || (() => Promise.resolve({}))

          return {
            content: module.content,
            getStaticProps,
            filepath,
            data: {
              ...data,
              plaintext,
              summary,
              audio_src,
              coverphoto_src,
            },
          }
        })
      )
    ).sort(
      (a: Article, b: Article) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    )

    return modules
  } catch (error) {
    console.error('Error loading articles:', error)
    return []
  }
}
