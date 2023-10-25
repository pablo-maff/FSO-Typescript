import axios from "axios";
import {
  Entry,
  NewEntry,
  Patient,
  PatientFormValues,
  ValidationError,
} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const get = async (id: string) => {
  try {
    const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

    return data;
  } catch (error) {
    if (
      axios.isAxiosError<ValidationError, Record<string, unknown>>(error) &&
      error.response
    ) {
      throw error.response.data;
    }
  }
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

export async function createEntry(patientId: string, object: NewEntry) {
  try {
    const newEntry = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${patientId}/entries`,
      object
    );

    return newEntry.data;
  } catch (error) {
    if (
      axios.isAxiosError<ValidationError, Record<string, unknown>>(error) &&
      error.response
    ) {
      throw error.response.data;
    }
  }
}

export default {
  getAll,
  get,
  create,
  createEntry,
};
