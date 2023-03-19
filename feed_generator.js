const RSS = require('rss')

const author = 'Thomas Rosen'

/*
const categories = {
  'Arts': [
    'Design',
    'Fashion & Beauty',
    'Food',
    'Literature',
    'Performing Arts',
    'Visual Arts',
  ],
  'Business': [
    'Business News',
    'Careers',
    'Investing',
    'Management & Marketing',
    'Shopping',
  ],
  'Comedy': [],
  'Education': [
    'Education Technology',
    'Higher Education',
    'K-12',
    'Language Courses',
    'Training',
  ],
  'Games & Hobbies': [
    'Automotive',
    'Aviation',
    'Hobbies',
    'Other Games',
    'Video Games',
  ],
  'Government & Organizations': [
    'Local',
    'National',
    'Non-Profit',
    'Regional',
  ],
  'Health': [
    'Alternative Health',
    'Fitness & Nutrition',
    'Self-Help',
    'Sexuality',
  ],
  'Kids & Family': [],
  'Music': [],
  'News & Politics': [],
  'Religion & Spirituality': [
    'Buddhism',
    'Christianity',
    'Hinduism',
    'Islam',
    'Judaism',
    'Other',
    'Spirituality',
  ],
  'Science & Medicine': [
    'Medicine',
    'Natural Sciences',
    'Social Sciences',
  ],
  'Society & Culture': [
    'History',
    'Personal Journals',
    'Philosophy',
    'Places & Travel',
  ],
  'Sports & Recreation': [
    'Amateur',
    'College & High School',
    'Outdoor',
    'Professional',
  ],
  'Technology': [
    'Gadgets',
    'Podcasting',
    'Software How-To',
    'Tech News',
  ],
  'TV & Film': [],
}
*/

function generate_rss_feed(options) {

  const {
    articles = []
  } = options || {}

  const all_tags = [...new Set(articles.flatMap(article => article.data.tags || []))]
  const all_itunes_tags = [...new Set(articles.flatMap(article => article.data.itunes_tags || []))]

  const current_year = new Date().getFullYear()

  const description = 'This is the feed of my blog. Expect anything and everything. But mostly tech and random stories. Maybe some calm political stuff.'

  const feed_image_url = 'https://thomasrosen.me/logo512.jpg'

  const email = 'hello@thomasrosen.me'

  /* lets create an rss feed */
  const feed = new RSS({
    title: 'Thomas Rosen',
    description: description,
    feed_url: 'https://thomasrosen.me/blog/feed.rss',
    site_url: 'https://thomasrosen.me',
    image_url: feed_image_url,
    // docs: 'http://example.com/rss/docs.html',
    // geoRSS: true,
    author: author,
    managingEditor: email,
    webMaster: email,
    copyright: `${current_year} ${author}`,
    // language: 'en',
    categories: all_tags,
    pubDate: new Date().toISOString(),
    // ttl: '60',
    custom_namespaces: {
      'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
    },
    custom_elements: [
      { 'itunes:subtitle': description },
      { 'itunes:author': author },
      { 'itunes:summary': description },
      { 'itunes:owner': [
        { 'itunes:name': author },
        { 'itunes:email': email }
      ]},
      { 'itunes:image': {
        _attr: {
          href: feed_image_url
        }
      }},
      ...all_itunes_tags.map(tag => ({
        'itunes:category': {
          _attr: {
            text: tag
          }
        }
      }))
    ]
  })

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i]

    let coverphoto_url = feed_image_url
    const coverphoto = article.data.coverphoto
    if (
      !!coverphoto
      && typeof coverphoto === 'string'
      && coverphoto.length > 0
    ) {
      coverphoto_url = `https://thomasrosen.me${coverphoto}`
    }

    feed.item({
      title: article.data.title,
      description: article.data.markdown,
      url: `https://thomasrosen.me/articles/${article.data.slug}`, // link to the item
      guid: article.data.slug, // optional - defaults to url
      categories: article.data.tags, // optional - array of item categories
      author: author, // optional - defaults to feed author property
      date: article.data.date, // any format that js Date can parse.
      // lat: 33.417974, //optional latitude field for GeoRSS
      // long: -111.933231, //optional longitude field for GeoRSS
      // enclosure: {
      //   url: '...',
      //   file: 'path-to-file',
      // }, // optional enclosure
      custom_elements: [
        { 'itunes:author': author },
        { 'itunes:subtitle': article.data.title },
        { 'itunes:image': {
          _attr: {
            href: coverphoto_url
          }
        }},
        // {'itunes:duration': '7:04'}
      ]
    })
  }

  // cache the xml to send to clients
  const xml = feed.xml({ indent: true });

  return xml
}

module.exports = {
  generate_rss_feed
}
