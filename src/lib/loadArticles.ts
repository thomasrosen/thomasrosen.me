import { getRelativeTime } from '@/lib/getRelativeTime'
import { components, mdxOptions } from '@@/mdx-components'
import fs from 'fs'
import { evaluate, type MDXRemoteOptions } from 'next-mdx-remote-client/rsc'
import path from 'path'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import strip from 'strip-markdown'
import { unified } from 'unified'
import { removeFrontmatter } from './unified/removeFrontmatter'

type Article = {
  default: any
  filepath: string
  getStaticProps: () => Promise<any>
  data: {
    slug: string
    title: string
    summary: string
    date: string
    audio: string
    tags: string[]
    audio_src?: string
    coverphoto_src?: string
    coverphoto_blurDataURL?: string
  }
}

export async function loadArticles() {
  const currentDir = process.cwd()
  console.log('currentDir', currentDir)
  const articlesDirectory = `${currentDir}/src/data/blog/articles/`
  console.log('articlesDirectory', articlesDirectory)
  const files = fs.readdirSync(articlesDirectory)
  const mdxFiles = files.filter((file) => /\.mdx?$/.test(file))
  console.log('mdxFiles', mdxFiles)

  const modules = (
    await Promise.all(
      mdxFiles.map(async (filename: string): Promise<Article> => {
        const filepath = path.join(articlesDirectory, filename)
        console.log('filepath', filepath)
        const fileContent = fs.readFileSync(filepath, 'utf8')
        console.log('fileContent', fileContent)

        const options: MDXRemoteOptions = {
          mdxOptions: mdxOptions as any,
          parseFrontmatter: true,
        }

        const { frontmatter } = await evaluate({
          source: fileContent,
          options,
          components,
        })

        const data = frontmatter || {}

        const orginal_file_content = fs.readFileSync(filepath, 'utf8')

        const plaintext = await unified()
          .use(remarkParse)
          .use(remarkFrontmatter)
          .use(removeFrontmatter)
          .use(strip as any)
          .use(remarkStringify)
          .process(orginal_file_content)
          .then((file: any) => String(file).trim())

        const summary = plaintext.substring(0, 100).trim() + '…'

        let coverphoto_src = null
        let coverphoto_blurDataURL = null
        if (
          !!data &&
          typeof data.coverphoto === 'string' &&
          data.coverphoto?.length > 0
        ) {
          try {
            // Remove any URL encoding from the path
            const cleanPath = decodeURIComponent(data.coverphoto)
            const currentDir = process.cwd()
            const imagePath = await import(`${currentDir}/src/data${cleanPath}`)
            coverphoto_src = imagePath.default.src
            coverphoto_blurDataURL = imagePath.default.blurDataURL
          } catch (error) {
            console.error('Error loading cover photo:', error)
            // Continue without the cover photo rather than failing the build
          }
        }

        let audio_src = null
        if (
          !!data &&
          typeof data.audio === 'string' &&
          data.audio?.length > 0
        ) {
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

        return {
          ...module,
          filepath,
          data: {
            ...data,
            plaintext,
            summary,
            has_audio:
              !!data.audio &&
              typeof data.audio === 'string' &&
              data.audio.length > 0,
            has_tags:
              !!data.tags && Array.isArray(data.tags) && data.tags.length > 0,
            relative_date: getRelativeTime(new Date(data.date)),

            audio_src,
            coverphoto_src,
            coverphoto_blurDataURL,
          },
        }
      })
    )
  ).sort(
    (a: Article, b: Article) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  )

  return modules
}
