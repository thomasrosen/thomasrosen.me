export type Article = {
  content: any
  filepath: string
  getStaticProps: () => Promise<any>
  data: {
    id: string
    date: string
    title: string
    tags: string[]
    latitude?: number
    longitude?: number

    coverphoto_src?: string

    audio: string
    audio_length: string
    audio_src?: string

    summary: string // equal to text from TimelineEntry
    plaintext: string

    slug: string
  }
}

export type TimelineEntry = {
  id?: string
  date: string
  title?: string
  tags?: string[]
  latitude?: number
  longitude?: number

  image?: string | { src: string; blurDataURL?: string }
  imageOrientation?: 'v' | 'h'
  imageAspectRatio?: number

  audio?: string
  audio_length?: string

  text?: string // equal to summary from Article

  author?: string
  url?: string
  displayAs: string
}
