import { useEffect, useState } from 'react'
import { DiaryEntry, NewDiaryEntry } from './types'
import { createDiaryEntry, getAllDiaryEntries } from './services/diaryService'
import { parseErrorMessage } from './utils'

const newEntryInitialState: NewDiaryEntry = {
  date: '',
  visibility: '',
  weather: '',
  comment: '',
}

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>(newEntryInitialState)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    getAllDiaryEntries().then((data) => {
      setDiaryEntries(data)
    })
  }, [])

  function handleNewEntryInputs(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value, name } = event.target

    setNewEntry((prevEntry) => ({ ...prevEntry, [name]: value }))
  }

  async function handleAddEntry(event: React.SyntheticEvent) {
    event.preventDefault()
    try {
      const newDiaryEntry = await createDiaryEntry(newEntry)

      setDiaryEntries((prevEntries) =>
        prevEntries.concat(newDiaryEntry as DiaryEntry)
      )
      setNewEntry(newEntryInitialState)
      setErrorMessage('')
    } catch (error) {
      if (error) {
        setErrorMessage(parseErrorMessage(error))
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
          <fieldset style={{ padding: '8px' }}>
            <legend>New Flight Diary Entry</legend>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <label htmlFor="new-diary-entry-date">Date</label>
                <label aria-required="true">*</label>
              </div>
              <input
                type="date"
                id="new-diary-entry-date"
                name="date"
                required
                value={newEntry.date}
                onChange={handleNewEntryInputs}
              />
            </div>
            <fieldset
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                margin: '8px 0',
              }}
              aria-required="true"
            >
              <legend>Weather*</legend>
              <div id="weather-container">
                <label htmlFor="new-diary-entry-weather-sunny">Sunny</label>
                <input
                  type="radio"
                  id="new-diary-entry-weather-sunny"
                  name="weather"
                  value="sunny"
                  onChange={handleNewEntryInputs}
                  checked={newEntry.weather === 'sunny'}
                  required
                />
              </div>
              <div>
                <label htmlFor="new-diary-entry-weather-windy">Windy</label>
                <input
                  type="radio"
                  id="new-diary-entry-weather-windy"
                  name="weather"
                  value="windy"
                  onChange={handleNewEntryInputs}
                  checked={newEntry.weather === 'windy'}
                />
              </div>
              <div>
                <label htmlFor="new-diary-entry-weather-cloudy">Cloudy</label>
                <input
                  type="radio"
                  id="new-diary-entry-weather-cloudy"
                  name="weather"
                  value="cloudy"
                  onChange={handleNewEntryInputs}
                  checked={newEntry.weather === 'cloudy'}
                />
              </div>
              <div>
                <label htmlFor="new-diary-entry-weather-rainy">Rainy</label>
                <input
                  type="radio"
                  id="new-diary-entry-weather-rainy"
                  name="weather"
                  value="rainy"
                  onChange={handleNewEntryInputs}
                  checked={newEntry.weather === 'rainy'}
                />
              </div>
              <div>
                <label htmlFor="new-diary-entry-weather-stormy">Stormy</label>
                <input
                  type="radio"
                  id="new-diary-entry-weather-stormy"
                  name="weather"
                  value="stormy"
                  onChange={handleNewEntryInputs}
                  checked={newEntry.weather === 'stormy'}
                />
              </div>
            </fieldset>
            <fieldset
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                margin: '8px 0',
              }}
              aria-required="true"
            >
              <legend>Visibility*</legend>
              <div id="visibility-container">
                <label htmlFor="new-diary-entry-visibility-great">Great</label>
                <input
                  type="radio"
                  id="new-diary-entry-visibility-great"
                  name="visibility"
                  value="great"
                  onChange={handleNewEntryInputs}
                  checked={newEntry.visibility === 'great'}
                  required
                />
              </div>
              <div>
                <label htmlFor="new-diary-entry-visibility-good">Good</label>
                <input
                  type="radio"
                  id="new-diary-entry-visibility-good"
                  name="visibility"
                  value="good"
                  onChange={handleNewEntryInputs}
                  checked={newEntry.visibility === 'good'}
                />
              </div>
              <div>
                <label htmlFor="new-diary-entry-visibility-ok">Ok</label>
                <input
                  type="radio"
                  id="new-diary-entry-visibility-ok"
                  name="visibility"
                  value="ok"
                  onChange={handleNewEntryInputs}
                  checked={newEntry.visibility === 'ok'}
                />
              </div>
              <div>
                <label htmlFor="new-diary-entry-visibility-poor">Poor</label>
                <input
                  type="radio"
                  id="new-diary-entry-visibility-poor"
                  name="visibility"
                  value="poor"
                  onChange={handleNewEntryInputs}
                  checked={newEntry.visibility === 'poor'}
                />
              </div>
            </fieldset>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="new-diary-entry-comment">Comment</label>
              <textarea
                id="new-diary-entry-comment"
                name="comment"
                value={newEntry.comment}
                onChange={handleNewEntryInputs}
              />
            </div>
            <div style={{ padding: '8px 0', textAlign: 'right' }}>
              <button
                type="submit"
                id="new-diary-entry-submit"
                style={{ padding: '8px 32px' }}
              >
                Add
              </button>
            </div>
          </fieldset>
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
