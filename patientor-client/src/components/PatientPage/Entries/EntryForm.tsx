import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { EntryType, NewHealthCheckEntry, Patient } from "../../../types";
import patientService from "../../../services/patients";
import { parseErrorMessage } from "../../../utils";

interface Props {
  patientId: string;
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
}

const initialEntryState: NewHealthCheckEntry = {
  description: "",
  date: "",
  specialist: "",
  healthCheckRating: 0,
  type: EntryType.HealthCheck,
  diagnosisCodes: [],
};

const EntryForm = ({ patientId, setPatient }: Props) => {
  const [newEntry, setNewEntry] =
    useState<NewHealthCheckEntry>(initialEntryState);
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleNewEntryInputs(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;

    setNewEntry((prevEntry) => {
      if (
        name === "diagnosisCodes" &&
        Array.isArray(prevEntry.diagnosisCodes) &&
        typeof value === "string"
      ) {
        if (value.includes(",")) {
          const values = value.split(",").map((v) => v.trim());
          console.log("values", values);

          return { ...prevEntry, [name]: values };
        }
        return { ...prevEntry, [name]: [value] };
      }

      return { ...prevEntry, [name]: value };
    });
  }

  async function handleAddEntry(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      const newDiaryEntry = await patientService.createEntry(
        patientId,
        newEntry
      );

      if (!newDiaryEntry) {
        throw new Error("Unable to create diary entry");
      }

      setPatient((prevPatient) => {
        return {
          ...prevPatient,
          entries: [...prevPatient.entries, newDiaryEntry],
        };
      });
      setNewEntry(initialEntryState);
      setErrorMessage("");
    } catch (error) {
      if (error) {
        console.error(error);
        setErrorMessage(parseErrorMessage(error));
      }
    }
  }

  return (
    <>
      {errorMessage && (
        <Alert
          severity="error"
          sx={{ color: "red", my: 4 }}
        >
          {errorMessage}
        </Alert>
      )}
      <Box sx={{ p: 2, width: "100%", border: "2px solid" }}>
        <Typography
          variant="h6"
          sx={{ py: 1 }}
        >
          New HealthCheck Entry
        </Typography>
        <form onSubmit={handleAddEntry}>
          <TextField
            id="entry-description"
            name="description"
            label="Description"
            sx={{ width: "100%", mb: 1 }}
            value={newEntry.description}
            onChange={handleNewEntryInputs}
          />
          <TextField
            id="entry-date"
            name="date"
            label="Date"
            sx={{ width: "100%", my: 1 }}
            value={newEntry.date}
            onChange={handleNewEntryInputs}
          />
          <TextField
            id="entry-specialist"
            name="specialist"
            label="Specialist"
            sx={{ width: "100%", my: 1 }}
            value={newEntry.specialist}
            onChange={handleNewEntryInputs}
          />
          <TextField
            id="entry-healthCheckRating"
            name="healthCheckRating"
            label="Healthcheck Rating"
            sx={{ width: "100%", my: 1 }}
            value={newEntry.healthCheckRating}
            onChange={handleNewEntryInputs}
          />
          <TextField
            id="entry-diagnosis-codes"
            name="diagnosisCodes"
            label="Diagnosis codes"
            sx={{ width: "100%", my: 1 }}
            value={newEntry.diagnosisCodes}
            onChange={handleNewEntryInputs}
          />
          <Box sx={{ textAlign: "right", mt: 1 }}>
            <Button
              type="submit"
              variant="contained"
            >
              Add Entry
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default EntryForm;
