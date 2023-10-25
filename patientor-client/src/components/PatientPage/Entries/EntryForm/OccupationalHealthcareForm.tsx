import { Box, Button, TextField, Typography } from "@mui/material";
import { EntryType, NewEntry } from "../../../../types";
import { useState } from "react";

const initialEntryState: NewEntry = {
  description: "",
  date: "",
  specialist: "",
  type: EntryType.OccupationalHealthcare,
  diagnosisCodes: [],
  employerName: "",
  sickLeave: {
    startDate: "",
    endDate: "",
  },
};

interface AddEntry {
  (event: React.FormEvent, newEntry: NewEntry): Promise<void>;
}

interface Props {
  handleAddEntry: AddEntry;
}

const OccupationalHealthcareEntryForm = ({ handleAddEntry }: Props) => {
  const [newEntry, setNewEntry] = useState<NewEntry>(initialEntryState);

  if (newEntry.type !== "OccupationalHealthcare" || !newEntry.sickLeave) return;

  function handleNewEntryInputs(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    console.log("name", name);
    if (name !== "sickLeave.startDate" && name !== "sickLeave.endDate") {
      return setNewEntry((prevEntry) => {
        return { ...prevEntry, [name]: value };
      });
    }
    // * If the name is 'discharge.sickLeave.startDate' or 'sickLeave.endDate', update the corresponding property in the discharge object
    setNewEntry((prevEntry) => {
      if (newEntry.type !== EntryType.OccupationalHealthcare) {
        return prevEntry;
      }

      if (
        prevEntry.type === EntryType.OccupationalHealthcare &&
        prevEntry.sickLeave
      ) {
        return {
          ...prevEntry,
          sickLeave: {
            ...prevEntry.sickLeave,
            [name.split(".")[1]]: value,
          },
        };
      }
      return prevEntry;
    });
  }

  const submitForm = (event: React.FormEvent) => {
    const toSubmit = { ...newEntry };
    if (
      toSubmit.sickLeave &&
      !toSubmit.sickLeave.startDate &&
      !toSubmit.sickLeave.endDate
    ) {
      delete toSubmit.sickLeave;
    }
    handleAddEntry(event, toSubmit).then(() => {
      setNewEntry(initialEntryState);
    });
  };

  return (
    <>
      <Typography
        variant="h6"
        sx={{ py: 1 }}
      >
        New Occupational Healthcare Entry
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
          id="entry-employerName"
          name="employerName"
          label="Employer Name"
          sx={{ width: "100%", my: 1 }}
          value={newEntry.employerName}
          onChange={handleNewEntryInputs}
        />
        <TextField
          id="entry-sickLeave-startDate"
          name="sickLeave.startDate"
          label="Sick Leave Start Date"
          sx={{ width: "100%", my: 1 }}
          value={newEntry.sickLeave.startDate}
          onChange={handleNewEntryInputs}
        />
        <TextField
          id="entry-sickLeave-endDate"
          name="sickLeave.endDate"
          label="Sick Leave End Date"
          sx={{ width: "100%", my: 1 }}
          value={newEntry.sickLeave.endDate}
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

export default OccupationalHealthcareEntryForm;
