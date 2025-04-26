import { loadTimeline } from '@/lib/loadTimeline'

async function getAllowedData() {
  const timeline = await loadTimeline()

  const allowedTags = timeline.flatMap((entry) => entry.tags ?? [])
  const allowedData = allowedTags.map((tag) => ({ tags: [tag] }))
  return allowedData
}

// ----------------------

type Data = Awaited<ReturnType<typeof getAllowedData>>[number]

function base64Encode(data: string) {
  return Buffer.from(data).toString('base64')
}

function base64Decode(data: string) {
  return Buffer.from(data, 'base64').toString('utf-8')
}

export function encodeData(data: Data) {
  return base64Encode(JSON.stringify(data))
}

export function decodeData(data: string) {
  const decodedData: Data = JSON.parse(base64Decode(decodeURIComponent(data)))
  return decodedData
}

export async function generateStaticParamsForTimeline() {
  return (await getAllowedData()).map((data) => ({
    data: encodeData(data),
  }))
}
