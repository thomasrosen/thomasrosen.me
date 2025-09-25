export type Article = {
  content: any
  filepath: string
  getStaticProps: () => Promise<any>
  data: {
    id: string
    slug: string
    title: string
    summary: string
    date: string
    audio: string
    audio_length: string
    plaintext: string
    tags: string[]
    audio_src?: string
    coverphoto_src?: string
  }
}

export type TimelineEntry = {
  date: string
  displayAs: string
  title?: string
  text?: string
  author?: string
  url?: string
  image?: string | { src: string }
  imageAspectRatio?: number
  audio?: string
  audio_length?: string
  // loc?: {
  //   name?: string
  //   lat: number
  //   lng: number
  // }
  latitude?: number
  longitude?: number
  tags?: string[]
}
