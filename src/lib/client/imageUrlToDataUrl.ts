import 'maplibre-gl/dist/maplibre-gl.css'

const preview_img_width = Math.round(3024 / 60)
const preview_img_height = Math.round(4032 / 60)

export function imageUrlToDataUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous' // to avoid CORS issues
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = preview_img_width // img.naturalWidth
      canvas.height = preview_img_height // img.naturalHeight

      const img_width = img.height
      const img_height = img.width

      const hRatio = preview_img_width / img_width
      const vRatio = preview_img_height / img_height
      const ratio = Math.min(hRatio, vRatio)
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0, img_width, img_height, 0, 0, img_width * ratio, img_height * ratio)

      const dataURL = canvas.toDataURL('image/png') // or 'image/jpeg'

      resolve(dataURL)
    }
    img.onerror = (error) => {
      console.warn('failed-to-load-image', name, url, error)
      reject()
    }
    img.src = url
  })
}
