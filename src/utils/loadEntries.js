import fs from 'fs'

export function loadDays() {
  try {
    let data = fs.readFileSync('./public/days.json', 'utf8')
    data = JSON.parse(data)

    const days = data.days.reverse()

    return days
  } catch (error) {
    console.error('ERROR_ElwYQYeQ', error)
  }

  return []
}
