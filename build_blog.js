console.info('➡️  Started building blog...') 

const matter = require('gray-matter');
const fs = require('fs')

// directory path
const dir = './blog/'
const blog_build_dir = './build/blog/'
const articles_build_dir = './build/blog/articles/'


const showdown  = require('showdown')
const converter = new showdown.Converter({
  noHeaderId: true,
  headerLevelStart: 2,
  simplifiedAutoLink: true,
  excludeTrailingPunctuationFromURLs: true,
  strikethrough: true,
  tables: true,
  tasklists: true,
  simpleLineBreaks: true,
  openLinksInNewWindow: true,
})

function buildBlog() {
  return new Promise((resolve, reject) => {
    // list all files in the directory
    fs.readdir(dir, (error, files) => {
      let articles = []

      try {
        if (error) {
          throw error
        }

        // files object contains all files names
        // log them on console
        articles = files
          .map(filename => {
            if (filename.endsWith('.md')) {

              const filecontent = fs.readFileSync(dir + filename, { encoding: 'utf8', flag: 'r' });
              const data = matter(filecontent)

              // data.markdown = data.content
              data.html = converter.makeHtml(data.content)
              delete data.content

              return data
            }

            return null
          })
          .filter(Boolean)

      } catch (error) {
        reject(error)
      }

      resolve(articles)
    })
  })
}

buildBlog()
  .then(articles => {
    console.info('✅ Loaded articles.')

    const summary_list = articles
      .map(article => {
        return {
          date: article.data.date,
          title: article.data.title,
          slug: article.data.slug,
          font: article.data.font,
          tags: article.data.tags,
        }
      })


    // delete blog_build_dir
    if (fs.existsSync(blog_build_dir)) {
      fs.rmdirSync(blog_build_dir, { recursive: true })
    }

    // check if build directory exists and create it, if not
    if (!fs.existsSync(blog_build_dir)) {
      // create each directory in the path
      fs.mkdirSync(blog_build_dir, { recursive: true })
    }

    // write blog summary to file
    fs.writeFileSync(blog_build_dir + 'articles.json', JSON.stringify({ articles: summary_list }))



    // check if build directory exists and create it, if not
    if (!fs.existsSync(articles_build_dir)) {
      // create each directory in the path
      fs.mkdirSync(articles_build_dir, { recursive: true })
    }

    // write each blog articles to its own file
    articles.forEach(article => {
      if (
        article.data.hasOwnProperty('slug')
        && typeof article.data.slug === 'string'
        && article.data.slug.length > 0
      ) {
        const slug = article.data.slug

        const new_article = {
          article: {
            ...article.data,
            html: article.html,
          }
        }

        fs.writeFileSync(articles_build_dir + slug + '.json', JSON.stringify(new_article))
      }
    })



    const public_blog_dir = './public/blog/'
    // delete blog_build_dir
    if (fs.existsSync(public_blog_dir)) {
      fs.rmdirSync(public_blog_dir, { recursive: true })
    }

    // check if build directory exists and create it, if not
    if (!fs.existsSync(public_blog_dir)) {
      // create each directory in the path
      fs.mkdirSync(public_blog_dir, { recursive: true })
    }

    // copy blog_build_dir to ./public/blog
    fs.cpSync(blog_build_dir, public_blog_dir, { recursive: true, overwrite: true });



    console.info('✅ Blog build complete.')

    // end node process
    process.exit(0)
  })
  .catch(console.error)
