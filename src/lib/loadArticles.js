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

export async function loadArticle(id) {
  try {
    id = decodeURIComponent(id)
    const articleData = await import(`@/data/blog/articles/${id}.json`)
    const article = articleData.default.article
    article.relative_date = getRelativeTime(new Date(article.date))
    article.has_tags = !!article.tags && Array.isArray(article.tags) && article.tags.length > 0
    return article
  } catch (error) {
    console.error(`ERROR_0zVGI26W Could not load the article: ${error.message}`)
  }

  return null
}
