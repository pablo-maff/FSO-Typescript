import axios from 'axios'
import { DiaryEntry, ValidationError } from '../types'

const baseURL = 'http://localhost:3000/api/diaries'

export function getAllDiaryEntries() {
  return axios.get<DiaryEntry[]>(baseURL).then((response) => response.data)
}

export async function createDiaryEntry(object: {
  date: string
  visibility: string
  weather: string
  comment: string
}) {
  try {
    const newDiary = await axios.post<DiaryEntry>(baseURL, object)

    return newDiary.data
  } catch (error) {
    if (
      axios.isAxiosError<ValidationError, Record<string, unknown>>(error) &&
      error.response
    ) {
      throw error.response.data
    }
  }
}
