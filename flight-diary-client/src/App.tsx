import axios from 'axios'
import { useEffect, useState } from 'react'
import { DiaryEntry } from './types'

const baseURL = 'http://localhost:3000'

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    axios.get<DiaryEntry[]>(`${baseURL}/api/diaries`).then((response) => {
      setDiaryEntries(response.data)
    })
  }, [])

  return (
    <main>
      <section
        id="flight-diary-entries"
        aria-label="flight diary entries"
      >
        <h2
          id="section-title"
          aria-label="diary entries"
        >
          Diary entries
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
