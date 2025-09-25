import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleLayout } from '@/components/ArticleLayout'
import { loadArticles } from '@/lib/loadArticles'

export const dynamic = 'force-static'
export const dynamicParams = false

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const articles = await loadArticles()

export function generateStaticParams() {
  return articles.flatMap((article) =>
    article.data.slug
      ? [
          {
            slug:
              process.env.NODE_ENV === 'production'
                ? article.data.slug
                : encodeURIComponent(article.data.slug),
          },
        ]
      : []
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { slug } = await params

  const article = articles.find((this_article) => this_article.data.slug === slug)

  return {
    title: article?.data.title,
    description: article?.data.summary,
  }
}

export default async function PageArticle({ params }: Props) {
  const { slug } = (await params) || {}
  if (!slug) {
    throw new Error('No article slug provided.')
  }

  const article = articles.find((this_article) => this_article.data.slug === slug)
  if (!article) {
    notFound()
  }

  const { content, data, getStaticProps } = article
  const { props } = await getStaticProps()

  return (
    <ArticleLayout {...props} data={data}>
      {content}
    </ArticleLayout>
  )
}
