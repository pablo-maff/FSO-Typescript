import axios from "axios";
import { Patient, PatientFormValues, ValidationError } from "../types";

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

export default {
  getAll,
  get,
  create,
};
