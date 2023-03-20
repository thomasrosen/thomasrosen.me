console.info('➡️  Started building blog...') 

const matter = require('gray-matter')
const path = require('path')
const sharp = require('sharp')
const fs = require('fs')

const { generate_rss_feed } = require('./feed_generator.js')

// directory path
const dir_articles = './blog/articles/'
const dir_images = './blog/images/'
const dir_audio = './blog/audio/'
const blog_build_dir = './build/blog/'
const articles_build_dir = './build/blog/articles/'
const images_build_dir = './build/blog/images/'
const audio_build_dir = './build/blog/audio/'
const public_blog_dir = './public/blog/'


const showdown  = require('showdown')
showdown.setFlavor('github')
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
  ghCodeBlocks: true,
})

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

              const markdown_img_regex = /!\[[^[\]]+\]\(<?(([^()]+)\.[^()]*?)>?\)/gmi;
              const text = data.content.replace(markdown_img_regex, (match, g1, g2) => match.replace(g1, `${g2}_1000.jpg`))

              let plaintext = `${data.content}`
                .replace(markdown_img_regex, () => '') // replace all images with empty string (only in the plaintext version)

              plaintext = await remark()
                .use(strip)
                .process(plaintext)
                .then(file => String(file))

              data.summary = plaintext.substring(0, 100).trim() + '…'
              data.plaintext = plaintext
              data.html = converter.makeHtml(text)
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
    const xml = generate_rss_feed({ articles })
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
            html: article.html || '',
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

      // copy images folder to ./public/blog/images
      fs.cpSync(dir_images, images_build_dir, { recursive: true, overwrite: true });

      // Generate smaller versions of the images
      const imageSizes = [1000] // 100, ...
      const imageFormats = ['jpg'] // webp, jpg, png

      const files = fs.readdirSync(dir_images)
        
      for (const file of files) {
        const filePath = path.join(dir_images, file)
        const fileExtension = path.extname(filePath).toLowerCase()
        const fileName = path.basename(filePath, fileExtension)

        if (fileExtension === '.jpg' || fileExtension === '.jpeg' || fileExtension === '.png' || fileExtension === '.webp') {
          const image = sharp(filePath);

          for (const format of imageFormats) {
            for (const size of imageSizes) {
              const resizedImagePath = path.join(images_build_dir, `${fileName}_${size}.${format}`)
              await image
                .resize({ width: size })
                .toFormat(format)
                .toFile(resizedImagePath)
            }
          }
        }
      }

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
