console.info('➡️ Started building blog...')

const matter = require('gray-matter')
const path = require('path')
const fs = require('fs')
const { readdir } = require('fs').promises;


const { generate_rss_feed } = require('./feed_generator.js')

// directory path
const dir_articles = './blog/articles/'
const dir_images = './blog/images/'
const dir_audio = './blog/audio/'
const blog_build_dir = './.tmp/build_blog/blog/'
const articles_build_dir = './.tmp/build_blog/blog/articles/'
const images_build_dir = './.tmp/build_blog/blog/images/'
const audio_build_dir = './.tmp/build_blog/blog/audio/'
const src_data_blog_dir = './src/data/blog/'

function buildBlog() {
  return new Promise(async (resolve, reject) => {
    const { remark } = await import('remark');
    const { default: strip } = await import('strip-markdown');

    // list all files in the directory
    await fs.readdir(dir_articles, async (error, files) => {
      let articles = []

      try {
        if (error) {
          throw error
        }

        // files object contains all files names
        // log them on console
        articles = await Promise.all(
          files
            .map(async filename => {
              if (filename.endsWith('.md')) {

                const filecontent = fs.readFileSync(dir_articles + filename, { encoding: 'utf8', flag: 'r' });
                const data = matter(filecontent)

                const markdown_img_regex = /!\[[^[\]]+\]\(<?(([^()]+)\.([^()]*?))>?\)/gmi;
                let plaintext = `${data.content || ''}`
                  .replace(markdown_img_regex, () => '') // replace all images with empty string (only in the plaintext version)

                plaintext = await remark()
                  .use(strip)
                  .process(plaintext)
                  .then(file => String(file))

                data.summary = plaintext.substring(0, 100).trim() + '…'
                data.plaintext = plaintext
                data.md = `${data.content || ''}`
                delete data.content

                return data
              }

              return null
            })
            .filter(Boolean)
        )

      } catch (error) {
        reject(error)
      }

      resolve(articles)
    })
  })
}

buildBlog()
  .then(async articles => {
    console.info('✅ Loaded articles.')

    const summary_list = articles
      .map(article => {
        return {
          date: article.data.date,
          title: article.data.title,
          slug: article.data.slug,
          coverphoto: article.data.coverphoto,
          font: article.data.font,
          tags: article.data.tags,
          summary: article.summary,
          has_audio: !!article.data.audio && typeof article.data.audio === 'string' && article.data.audio.length > 0,
        }
      })


    // delete blog_build_dir
    if (fs.existsSync(blog_build_dir)) {
      fs.rmSync(blog_build_dir, { recursive: true })
    }

    // check if build directory exists and create it, if not
    if (!fs.existsSync(blog_build_dir)) {
      // create each directory in the path
      fs.mkdirSync(blog_build_dir, { recursive: true })
    }

    // write blog summary to file
    fs.writeFileSync(blog_build_dir + 'articles.json', JSON.stringify({ articles: summary_list }))

    // write rss feed file (RSS2)
    fs.writeFileSync(blog_build_dir + 'feed.rss', xml)


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
            plaintext: article.plaintext || '',
            md: article.md || '',
          }
        }

        fs.writeFileSync(articles_build_dir + slug + '.json', JSON.stringify(new_article))
      }
    })



    // START images

    // check if build directory exists and create it, if not
    if (fs.existsSync(dir_images)) {
      if (!fs.existsSync(images_build_dir)) {
        // create each directory in the path
        fs.mkdirSync(images_build_dir, { recursive: true })
      }

      // copy images folder to ./src/data/blog/images
      fs.cpSync(dir_images, images_build_dir, { recursive: true, overwrite: true });
    }

    // END images



    // START audio
    // check if build directory exists and create it, if not
    if (fs.existsSync(dir_audio)) {
      if (!fs.existsSync(audio_build_dir)) {
        // create each directory in the path
        fs.mkdirSync(audio_build_dir, { recursive: true })
      }
      fs.cpSync(dir_audio, audio_build_dir, { recursive: true, overwrite: true });
    }
    // END audio




    // delete blog_build_dir
    if (fs.existsSync(src_data_blog_dir)) {
      fs.rmdirSync(src_data_blog_dir, { recursive: true })
    }

    // check if build directory exists and create it, if not
    if (!fs.existsSync(src_data_blog_dir)) {
      // create each directory in the path
      fs.mkdirSync(src_data_blog_dir, { recursive: true })
    }

    // copy blog_build_dir to ./src/data/blog
    fs.cpSync(blog_build_dir, src_data_blog_dir, { recursive: true, overwrite: true });




    // delete tmp blog_build_dir
    if (fs.existsSync(blog_build_dir)) {
      fs.rmdirSync(blog_build_dir, { recursive: true });
    }

    console.info('✅ Blog build complete.');

    // end node process
    process.exit(0);
  })
  .catch(console.error)
