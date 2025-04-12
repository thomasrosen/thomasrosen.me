export async function loadArticles() {
  try {
    const articlesData = await import('@/data/blog/articles.json');
    const articles = articlesData.default.articles
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map(article => {
        article.has_tags = !!article.tags && Array.isArray(article.tags) && article.tags.length > 0
        return article
      })

    return articles
  } catch (error) {
    console.error('ERROR_0zVGI26W', error)
  }

  return []
}
