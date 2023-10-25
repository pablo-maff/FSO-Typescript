import { Alert, Box } from "@mui/material";
import { useState } from "react";
import { EntryType, NewEntry, Patient } from "../../../../types";
import patientService from "../../../../services/patients";
import { parseErrorMessage } from "../../../../utils";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalHealthcareEntryForm from "./OccupationalHealthcareForm";

interface Props {
  patientId: string;
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
  newEntryType: EntryType;
}

const EntryForm = ({ patientId, setPatient, newEntryType }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleAddEntry(
    event: React.FormEvent,
    newEntry: NewEntry
  ): Promise<void> {
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
      setErrorMessage("");
    } catch (error) {
      if (error) {
        console.error("error", error);
        setErrorMessage(parseErrorMessage(error));
      }
    }
  }

  switch (newEntryType) {
    case EntryType.HealthCheck:
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
            <HealthCheckEntryForm handleAddEntry={handleAddEntry} />
          </Box>
        </>
      );

    case EntryType.Hospital:
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
            <HospitalEntryForm handleAddEntry={handleAddEntry} />
          </Box>
        </>
      );

    case EntryType.OccupationalHealthcare:
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
            <OccupationalHealthcareEntryForm handleAddEntry={handleAddEntry} />
          </Box>
        </>
      );

    default:
      break;
  }
};

export default EntryForm;
