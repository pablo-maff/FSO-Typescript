import { Box, Button, TextField, Typography } from "@mui/material";
import { EntryType, NewEntry } from "../../../../types";
import { useState } from "react";

const initialEntryState: NewEntry = {
  description: "",
  date: "",
  specialist: "",
  healthCheckRating: 0,
  type: EntryType.HealthCheck,
  diagnosisCodes: [],
};

interface AddEntry {
  (event: React.FormEvent, newEntry: NewEntry): Promise<void>;
}

interface Props {
  handleAddEntry: AddEntry;
}

const HealthCheckEntryForm = ({ handleAddEntry }: Props) => {
  const [newEntry, setNewEntry] = useState<NewEntry>(initialEntryState);

  if (newEntry.type !== EntryType.HealthCheck) return;

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

  const submitForm = (event: React.FormEvent) => {
    handleAddEntry(event, newEntry).then(() => {
      setNewEntry(initialEntryState);
    });
  };

  return (
    <>
      <Typography
        variant="h6"
        sx={{ py: 1 }}
      >
        New HealthCheck Entry
      </Typography>
      <form onSubmit={submitForm}>
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
    </>
  );
};

export default HealthCheckEntryForm;
