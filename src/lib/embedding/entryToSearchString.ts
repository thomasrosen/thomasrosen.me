export function entryToSearchString(data: any): string {
  const clonedData = JSON.parse(JSON.stringify(data))

  let cleanedData = clonedData
  if (typeof clonedData === 'object' && clonedData !== null) {
    clonedData.id = undefined // this is not good in a search string for embeddings
    clonedData.image = undefined
    clonedData.imageAspectRatio = undefined
    clonedData.imageOrientation = undefined
    clonedData.audio = undefined

    // delete all properties that are null or undefined
    cleanedData = Object.fromEntries(
      Object.entries(clonedData).filter(([_, v]) => v !== null && v !== undefined && v !== '')
    )
  }

  return JSON.stringify(cleanedData)
    .replace(/[(){}[\]"";]/g, ' ') // remove json-stringify characters
    .replace(/[\t\n\r\s]+/g, ' ') // collapse whitespace
    .trim()
}
