import { ArticleLayout } from '@/components/ArticleLayout'
import { getEmbeddings, rank_documents } from '@/lib/embedding/embedding'
import { loadArticles } from '@/lib/loadArticles'
import { loadTimeline } from '@/lib/loadTimeline'
import type { TimelineEntry } from '@/types'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'
export const dynamicParams = false

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const articles = await loadArticles()
const allowedTypes = ['article']
const partial_timeline = (await loadTimeline()).filter((entry) =>
  allowedTypes.includes(entry.displayAs)
)

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

async function getSimliarTimeineEntries(query: string): Promise<TimelineEntry[]> {
  const entriesWithSearchText = partial_timeline
    .map((entry) => ({
      ...entry,
      searchtext: [entry.title, entry.text].filter(Boolean).join(' '),
    }))
    .filter(({ searchtext }) => !!searchtext && searchtext !== query)

  const source_embeddings = await getEmbeddings([query])
  const document_embeddings = await getEmbeddings(
    entriesWithSearchText.map(({ searchtext }) => searchtext)
  )

  let simliarTexts = await rank_documents(source_embeddings[0], document_embeddings)
  simliarTexts = simliarTexts.slice(0, 3)

  const entries: TimelineEntry[] = []
  for (const { text, similarity } of simliarTexts) {
    const foundEntry = entriesWithSearchText.find((entry) => entry.searchtext === text)
    if (foundEntry) {
      const entryAlreadyAdded = entries.find(
        (entry) => JSON.stringify(entry) === JSON.stringify(foundEntry)
      )
      if (!entryAlreadyAdded) {
        entries.push({
          ...foundEntry,
          rank: similarity,
        })
      }
    }

    if (entries.length >= 3) {
      break
    }
  }

  return entries.sort((a, b) => (b.rank || 0) - (a.rank || 0))
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

  const simlilarEntries = await getSimliarTimeineEntries([data.title, data.summary].join(' '))

  return (
    <ArticleLayout {...props} data={data} simlilarEntries={simlilarEntries}>
      {content}
    </ArticleLayout>
  )
}
