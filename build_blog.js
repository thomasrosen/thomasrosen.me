console.info('➡️  Started building blog...')

const matter = require('gray-matter')
const path = require('path')
const sharp = require('sharp')
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
const public_data_blog_dir = './public/data/blog/'
const data_blog_dir = './src/data/blog/'


const showdown = require('showdown')
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

async function* getFilesRecursive(dir, root = dir) {
  // source: https://stackoverflow.com/a/45130990/2387277
  // source: https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
  // I added the part with the root_path variable, because I wanted to get the relative path of the files.

  const root_path = path.resolve(root) + '/'

  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFilesRecursive(res, dir);
    } else {
      yield res.replace(root_path, '');
    }
  }
}

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
                const text = data.content.replace(markdown_img_regex, (match, g1, g2, g3) => {
                  const fileextension_lowercase = g3.toLowerCase()

                  if (
                    fileextension_lowercase === 'jpg'
                    || fileextension_lowercase === 'jpeg'
                    || fileextension_lowercase === 'png'
                  ) {
                    return match.replace(g1, `${g2}_1000.jpg`)
                  }
                  // if (fileextension_lowercase === 'png') {
                  //   return match.replace(g1, `${g2}_1000.${fileextension_lowercase}`)
                  // }

                  return String(match)
                })

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

function get_img_src_path(image_path) {
  const markdown_img_src_regex = /([^()]+)\.[^()]*?/;
  const coverphoto_w1000_match = image_path.match(markdown_img_src_regex)
  const coverphoto_w1000 = (
    coverphoto_w1000_match !== null
      ? coverphoto_w1000_match[1] + '_1000.jpg'
      : image_path
  )

  return coverphoto_w1000
}

buildBlog()
  .then(async articles => {
    console.info('✅ Loaded articles.')

    const summary_list = articles
      .map(article => {

        const coverphoto_w1000 = get_img_src_path(article.data.coverphoto || '', '1000')

        return {
          date: article.data.date,
          title: article.data.title,
          slug: article.data.slug,
          coverphoto: coverphoto_w1000,
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

      // copy images folder to ./src/data/blog/images
      fs.cpSync(dir_images, images_build_dir, { recursive: true, overwrite: true });

      // Generate smaller versions of the images
      const imageSizes = [1000] // 100, ...
      const imageFormats = ['jpg'] // webp, jpg, png

      for await (const relative_filepath of getFilesRecursive(dir_images)) {
        const absolute_filepath = path.join(dir_images, relative_filepath)
        const fileExtension_original = path.extname(absolute_filepath)
        const fileExtension = fileExtension_original.toLowerCase()
        // const fileName = path.basename(absolute_filepath, fileExtension)

        if (fileExtension === '.jpg' || fileExtension === '.jpeg' || fileExtension === '.png' || fileExtension === '.webp') {
          const image = sharp(absolute_filepath);

          for (const format of imageFormats) {
            for (const size of imageSizes) {
              let new_relative_filepath = relative_filepath.replace(fileExtension_original, `_${size}.${format}`)
              const resizedImagePath = path.join(images_build_dir, new_relative_filepath)
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
    if (fs.existsSync(public_data_blog_dir)) {
      fs.rmdirSync(public_data_blog_dir, { recursive: true })
    }

    // check if build directory exists and create it, if not
    if (!fs.existsSync(public_data_blog_dir)) {
      // create each directory in the path
      fs.mkdirSync(public_data_blog_dir, { recursive: true })
    }

    // copy blog_build_dir to ./src/data/blog
    fs.cpSync(blog_build_dir, public_data_blog_dir, { recursive: true, overwrite: true });




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
