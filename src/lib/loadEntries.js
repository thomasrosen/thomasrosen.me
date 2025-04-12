import fs from 'fs'

export function loadEntries() {
  try {
    let data = fs.readFileSync('./src/data/entries.json', 'utf8')
    data = JSON.parse(data)

    const entries = data.entries
    return entries
  } catch (error) {
    console.error('ERROR_ElwYQYeQ', error)
  }

  return []
}
