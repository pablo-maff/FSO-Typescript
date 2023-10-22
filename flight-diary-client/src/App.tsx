import axios from 'axios'
import { useEffect, useState } from 'react'
import { DiaryEntry } from './types'

const baseURL = 'http://localhost:3000'

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  const [newEntry, setNewEntry] = useState({
    date: '',
    visibility: '',
    weather: '',
    comment: '',
  })

  useEffect(() => {
    axios.get<DiaryEntry[]>(`${baseURL}/api/diaries`).then((response) => {
      setDiaryEntries(response.data)
    })
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleNewEntryInputs(event: { target: { value: any; name: any } }) {
    const { value, name } = event.target

    setNewEntry((prevEntry) => ({ ...prevEntry, [name]: value }))
  }

  function handleAddEntry(event: React.SyntheticEvent) {
    event.preventDefault()

    axios
      .post<DiaryEntry>(`${baseURL}/api/diaries`, newEntry)
      .then((response) => {
        setDiaryEntries((prevEntries) => prevEntries.concat(response.data))
      })
  }

  return (
    <main>
      <section
        id="add-diary-entry"
        aria-label="new flight diary entry"
      >
        <h2>Add New Entry</h2>
        <form onSubmit={handleAddEntry}>
          <div>
            <label htmlFor="new-diary-entry-date">Date</label>
            <input
              type="text"
              id="new-diary-entry-date"
              name="date"
              onChange={handleNewEntryInputs}
            />
          </div>
          <div>
            <label htmlFor="new-diary-entry-visibility">Visibility</label>
            <input
              type="text"
              id="new-diary-entry-visibility"
              name="visibility"
              onChange={handleNewEntryInputs}
            />
          </div>
          <div>
            <label htmlFor="new-diary-entry-weather">Weather</label>
            <input
              type="text"
              id="new-diary-entry-weather"
              name="weather"
              onChange={handleNewEntryInputs}
            />
          </div>
          <div>
            <label htmlFor="new-diary-entry-comment">Comment</label>
            <input
              type="text"
              id="new-diary-entry-comment"
              name="comment"
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
