import '@/fonts/petrona-v28-latin/index.css'
import { loadDays } from '@/utils/loadDays'
export default function PageTravel() {
  let days = null

  try {
    days = loadDays()
  } catch (error) {
    throw new Error(`Could not load the days: ${error.message}`)
  }

  return (
    <div className='tab_content'>
      <h2>Days</h2>

      <br />
      <br />
      <br />
    </div>
  )
}
