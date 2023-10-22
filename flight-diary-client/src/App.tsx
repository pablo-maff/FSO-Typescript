import { useEffect, useState } from 'react'
import { DiaryEntry } from './types'
import { createDiaryEntry, getAllDiaryEntries } from './services/diaryService'

const newEntryInitialState = {
  date: '',
  visibility: '',
  weather: '',
  comment: '',
}

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  const [newEntry, setNewEntry] = useState(newEntryInitialState)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    getAllDiaryEntries().then((data) => {
      setDiaryEntries(data)
    })
  }, [])

  function handleNewEntryInputs(event: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: { value: any; name: any }
  }) {
    const { value, name } = event.target

    setNewEntry((prevEntry) => ({ ...prevEntry, [name]: value }))
  }

  async function handleAddEntry(event: React.SyntheticEvent) {
    event.preventDefault()
    try {
      const newDiaryEntry = await createDiaryEntry(newEntry)
      console.log('newDiaryEntry', newDiaryEntry)

      setDiaryEntries((prevEntries) =>
        prevEntries.concat(newDiaryEntry as DiaryEntry)
      )
      setNewEntry(newEntryInitialState)
      setErrorMessage('')
    } catch (error) {
      if (error) {
        setErrorMessage(error as string)
      }
    }
  }

  return (
    <main>
      <section
        id="add-diary-entry"
        aria-label="new flight diary entry"
      >
        <h2>Add New Entry</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={handleAddEntry}>
          <div>
            <label htmlFor="new-diary-entry-date">Date</label>
            <input
              type="text"
              id="new-diary-entry-date"
              name="date"
              value={newEntry.date}
              onChange={handleNewEntryInputs}
            />
          </div>
          <div>
            <label htmlFor="new-diary-entry-visibility">Visibility</label>
            <input
              type="text"
              id="new-diary-entry-visibility"
              name="visibility"
              value={newEntry.visibility}
              onChange={handleNewEntryInputs}
            />
          </div>
          <div>
            <label htmlFor="new-diary-entry-weather">Weather</label>
            <input
              type="text"
              id="new-diary-entry-weather"
              name="weather"
              value={newEntry.weather}
              onChange={handleNewEntryInputs}
            />
          </div>
          <div>
            <label htmlFor="new-diary-entry-comment">Comment</label>
            <input
              type="text"
              id="new-diary-entry-comment"
              name="comment"
              value={newEntry.comment}
              onChange={handleNewEntryInputs}
            />
          </div>
          <div>
            <button
              type="submit"
              id="new-diary-entry-submit"
            >
              Add
            </button>
          </div>
        </form>
      </section>
      <section
        id="flight-diary-entries"
        aria-label="flight diary entries"
      >
        <h2
          id="section-title"
          aria-label="diary entries"
        >
          Diary Entries
        </h2>
        <div id="flight-diary-entries-container">
          <ul id="flight-diary-entries-list">
            {diaryEntries.map((entry) => (
              <li
                key={entry.id}
                id="flight-diary-entry"
              >
                <h4>{entry.date}</h4>
                <p>visibility: {entry.visibility}</p>
                <p>weather: {entry.weather}</p>
                <p>
                  comment: <em>{entry.comment}</em>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default App
