const RSS = require('rss')

/*
https://podcasters.apple.com/support/823-podcast-requirements
https://help.apple.com/itc/podcasts_connect/#/itcb54353390
https://help.apple.com/itc/podcasts_connect/#/itcbaf351599
https://podcasters.apple.com/support/1691-apple-podcasts-categories

validators:
https://podba.se/validate/?url=https://thomasrosen.me/blog/feed.rss
https://www.castfeedvalidator.com/validate.php?url=https://thomasrosen.me/blog/feed.rss
https://validator.w3.org/feed/check.cgi?url=https%3A%2F%2Fthomasrosen.me%2Fblog%2Ffeed.rss
*/

const author = 'Thomas Rosen'

function generate_rss_feed(options) {

  const {
    articles = []
  } = options || {}

  const all_tags = [...new Set(articles.flatMap(article => article.data.tags || []))]

  const current_year = new Date().getFullYear()

  const description = 'This is the feed of my blog. Expect anything and everything. But mostly tech and random stories. Maybe some calm political stuff.'

  const feed_image_url = 'https://thomasrosen.me/DSC03214_square_2000.jpg'

  const email = 'hello@thomasrosen.me'

  /* lets create an rss feed */
  const feed = new RSS({
    title: 'Thomas Rosen - Blog',
    description: description,
    feed_url: 'https://thomasrosen.me/blog/feed.rss',
    site_url: 'https://thomasrosen.me',
    image_url: feed_image_url,
    // docs: 'http://example.com/rss/docs.html',
    // geoRSS: true,
    author: author,
    managingEditor: `${email} (${author})`,
    webMaster: `${email} (${author})`,
    copyright: `Copyright ${current_year} ${author}`,
    language: 'en',
    categories: all_tags,
    pubDate: new Date().toISOString(),
    // ttl: '60',
    custom_namespaces: {
      'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
    },
    custom_elements: [
      { 'itunes:explicit': 'no' }, // yes/no/clean or true/false ???
      { 'itunes:type': 'episodic' },
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
      {'itunes:category': [
        {_attr: {
          text: 'Society & Culture'
        }},
        {'itunes:category': {
          _attr: {
            text: 'Personal Journals'
          }
        }},
        {'itunes:category': {
          _attr: {
            text: 'Places & Travel'
          }
        }},
      ]},
      {'itunes:category': [
        {_attr: {
          text: 'Technology'
        }},
      ]},
      {'itunes:category': [
        {_attr: {
          text: 'Arts'
        }},
        {'itunes:category': {
          _attr: {
            text: 'Books'
          }
        }},
      ]},
      {'itunes:category': [
        {_attr: {
          text: 'Business'
        }},
        {'itunes:category': {
          _attr: {
            text: 'Non-Profit'
          }
        }},
      ]},
      {'itunes:category': [
        {_attr: {
          text: 'Health & Fitness'
        }},
        {'itunes:category': {
          _attr: {
            text: 'Mental Health'
          }
        }},
        {'itunes:category': {
          _attr: {
            text: 'Sexuality'
          }
        }},
      ]},
    ]
  })

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i]

    const episode_number = i + 1

    let coverphoto_url = feed_image_url
    const coverphoto = article.data.coverphoto
    if (
      !!coverphoto
      && typeof coverphoto === 'string'
      && coverphoto.length > 0
    ) {
      coverphoto_url = `https://thomasrosen.me${coverphoto}`
    }



    let audio_url = 'https://thomasrosen.me/media/Empty_Podcast_Audio.m4a' // A small basicly empty audio file as the default enclosure. So the item is shown in Apple Podcasts.
    let audio_file = './public/media/Empty_Podcast_Audio.m4a' // A small basicly empty audio file as the default enclosure. So the item is shown in Apple Podcasts.
    const audio = article.data.audio
    if (
      !!audio
      && typeof audio === 'string'
      && audio.length > 0
    ) {
      audio_url = `https://thomasrosen.me${audio}`
      audio_file = `.${audio}`
    }

    let audio_length = '00:10' // length of the empty default enclosure
    const audio_length_tmp = article.data.audio_length
    if (
      !!audio_length_tmp
      && typeof audio_length_tmp === 'string'
      && audio_length_tmp.length > 0
    ) {
      audio_length = audio_length_tmp
    }

    feed.item({
      title: article.data.title,
      description: article.plaintext,
      url: `https://thomasrosen.me/articles/${article.data.slug}`, // link to the item
      guid: article.data.id || undefined, // optional - defaults to url
      categories: article.data.tags, // optional - array of item categories
      author: author, // optional - defaults to feed author property
      date: article.data.date, // any format that js Date can parse.
      // lat: 33.417974, //optional latitude field for GeoRSS
      // long: -111.933231, //optional longitude field for GeoRSS
      enclosure: {
        url: audio_url,
        file: audio_file,
      },
      custom_elements: [
        { 'itunes:duration': audio_length }, // '00:10'
        { 'itunes:explicit': 'no' },
        { 'itunes:episodeType': 'full' }, // full / trailer / bonus
        { 'itunes:episode': episode_number },
        { 'itunes:season': 1 },
        { 'itunes:author': author },
        { 'itunes:subtitle': article.plaintext },
        { 'itunes:summary': article.plaintext },
        { 'itunes:image': {
          _attr: {
            href: coverphoto_url
          }
        }},
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
