export function entryToSearchString(data: any) {
  data.id = undefined // this is not good in a search string for embeddings
  data.image = undefined
  data.imageAspectRatio = undefined
  data.imageOrientation = undefined
  data.audio = undefined

  // delete all properties that are null or undefined
  const cleanedData = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== null && v !== undefined && v !== '')
  )

  return JSON.stringify(cleanedData)
    .replace(/[(){}[\]"";]/g, ' ') // remove json-stringify characters
    .replace(/[\t\n\r\s]+/g, ' ') // collapse whitespace
    .trim()
}
