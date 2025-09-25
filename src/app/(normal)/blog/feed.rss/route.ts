import { generate_rss_feed } from '@/lib/feed_generator'
import { loadArticles } from '@/lib/loadArticles'

export const dynamic = 'force-static'

export async function GET() {
  const articles = await loadArticles()
  const xml = generate_rss_feed({ articles })

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml' },
  })
}
