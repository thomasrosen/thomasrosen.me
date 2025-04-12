import '@/fonts/petrona-v28-latin/index.css'
import { loadEntries } from '@/lib/loadEntries'

function EntryText({ entry }) {
  return (
    <div>
      {entry.title && <h3>{entry.title}</h3>}
      {entry.text && <p>{entry.text}</p>}
    </div>
  )
}

function EntryLink({ entry }) {
  if (!entry.url) {
    return null
  }

  return (
    <a href={entry.url} target='_blank' rel='noreferrer'>
      {entry.title || entry.url}
    </a>
  )
}

function Entry({ entry }) {
  const parsedEntry = {
    ...entry,
    date: new Date(entry.date),
    displayAs: entry.displayAs || 'text',
  }

  switch (parsedEntry.displayAs) {
    case 'text':
      return <EntryText entry={parsedEntry} />
    case 'link':
      return <EntryLink entry={parsedEntry} />
    default:
      return null
  }
}

export default async function PageTravel() {
  const entries = await loadEntries()

  return (
    <div className='tab_content'>
      <h2>Entries</h2>

      <div>
        {(entries || []).map((entry) => (
          <Entry key={entry.date} entry={entry} />
        ))}
      </div>

      <hr />

      <pre>{JSON.stringify(entries, null, 2)}</pre>
    </div>
  )
}
