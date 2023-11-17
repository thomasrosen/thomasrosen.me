import fs from 'fs';

const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000
};

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export const getRelativeTime = (d1, d2 = new Date()) => {
  const elapsed = d1.getTime() - d2.getTime();

  // "Math.abs" accounts for both "past" & "future" scenarios
  for (const u in units) {
    if (Math.abs(elapsed) > units[u] || u === 'second') {
      return rtf.format(Math.round(elapsed / units[u]), u);
    }
  }
};

export function loadArticles() {
  let data = fs.readFileSync(`./public/blog/articles.json`, 'utf8')
  data = JSON.parse(data)

  const articles = data.articles
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(article => {
      article.relative_date = getRelativeTime(new Date(article.date))
      article.has_tags = !!article.tags && Array.isArray(article.tags) && article.tags.length > 0
      return article
    })

  return articles
}
