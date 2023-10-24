import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Diagnose, ValidationError } from "../types";

const getAll = async () => {
  try {
    const { data } = await axios.get<Diagnose[]>(`${apiBaseUrl}/diagnoses`);

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

export default {
  getAll,
};
