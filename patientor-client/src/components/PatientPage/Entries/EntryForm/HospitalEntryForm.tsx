import { Box, Button, TextField, Typography } from "@mui/material";
import { EntryType, NewEntry } from "../../../../types";
import { useState } from "react";

const initialEntryState: NewEntry = {
  description: "",
  date: "",
  specialist: "",
  type: EntryType.Hospital,
  diagnosisCodes: [],
  discharge: {
    date: "",
    criteria: "",
  },
};

interface AddEntry {
  (event: React.FormEvent, newEntry: NewEntry): Promise<void>;
}

interface Props {
  handleAddEntry: AddEntry;
}

const HospitalEntryForm = ({ handleAddEntry }: Props) => {
  const [newEntry, setNewEntry] = useState<NewEntry>(initialEntryState);

  if (newEntry.type !== "Hospital") return;

  function handleNewEntryInputs(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;

    if (name === "discharge.date" || name === "discharge.criteria") {
      // * If the name is 'discharge.date' or 'discharge.criteria', update the corresponding property in the discharge object
      setNewEntry((prevEntry) => {
        if (prevEntry.type !== "Hospital") return prevEntry;

        return {
          ...prevEntry,
          discharge: {
            ...prevEntry.discharge,
            [name.split(".")[1]]: value,
          },
        };
      });
    }

    setNewEntry((prevEntry) => {
      return { ...prevEntry, [name]: value };
    });
  }

  const submitForm = (event: React.FormEvent) => {
    console.log("newEntry", newEntry);
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
        New Hospital Entry
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
          id="entry-discharge-date"
          name="discharge.date"
          label="Discharge date"
          sx={{ width: "100%", my: 1 }}
          value={newEntry.discharge.date}
          onChange={handleNewEntryInputs}
        />
        <TextField
          id="entry-discharge-criteria"
          name="discharge.criteria"
          label="Discharge criteria"
          sx={{ width: "100%", my: 1 }}
          value={newEntry.discharge.criteria}
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

export default HospitalEntryForm;
