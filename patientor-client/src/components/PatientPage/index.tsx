import { useParams } from "react-router-dom";
import { Diagnose, EntryType, Patient } from "../../types";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import PatientGender from "./PatientGender";
import { Entry } from "../../types";
import diagnoseService from "../../services/diagnoses";
import PatientEntry from "./Entries";
import EntryForm from "./Entries/EntryForm";

function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Not a string!");
  }
}

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);
  const [showEntryForm, setShowEntryForm] = useState<boolean>(false);
  const [newEntryType, setNewEntryType] = useState<EntryType>(
    EntryType.HealthCheck
  );

  const { id } = useParams();

  assertIsString(id);

  useEffect(() => {
    const fetchPatient = async (id: string): Promise<void> => {
      try {
        const fetchedPatient = await patientService.get(id);

        setPatient(fetchedPatient as Patient);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchPatient(id);
  }, [id]);

  useEffect(() => {
    const fetchDiagnoseList = async (): Promise<void> => {
      try {
        const fetchedDiagnoses = await diagnoseService.getAll();
        setDiagnoses(fetchedDiagnoses as Diagnose[]);
      } catch (error) {
        console.error(error);
      }
    };
    void fetchDiagnoseList();
  }, []);

  const handleSelectNewEntryType = (event: SelectChangeEvent) => {
    setNewEntryType(event.target.value as EntryType);
  };

  if (!patient) {
    return <p style={{ color: "red" }}>The selected patient was not found</p>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h4">{patient.name}</Typography>
        <PatientGender gender={patient.gender} />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography>Occupation: {patient.occupation}</Typography>
        <Typography>Birthday: {patient.dateOfBirth}</Typography>
        <Typography>SSN: {patient.ssn}</Typography>
      </Box>
      <Button
        variant="contained"
        sx={{ mt: 4, mb: 2 }}
        onClick={() => setShowEntryForm(!showEntryForm)}
      >
        <Typography>{!showEntryForm ? "Add Entry" : "Hide Form"}</Typography>
      </Button>
      {showEntryForm && (
        <>
          <Box sx={{ my: 2 }}>
            <FormControl sx={{ minWidth: "250px" }}>
              <InputLabel id="select-new-entry-type-label">
                New Entry Type
              </InputLabel>
              <Select
                labelId="select-new-entry-type-label"
                id="select-new-entry-type"
                value={newEntryType}
                label="New Entry Type"
                onChange={handleSelectNewEntryType}
              >
                <MenuItem value={EntryType.HealthCheck}>HealthCheck</MenuItem>
                <MenuItem value={EntryType.Hospital}>Hospital</MenuItem>
                <MenuItem value={EntryType.OccupationalHealthcare}>
                  Occupational Healthcare
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <EntryForm
            patientId={id}
            newEntryType={newEntryType}
            setPatient={
              setPatient as React.Dispatch<React.SetStateAction<Patient>>
            }
          />
        </>
      )}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Entries</Typography>
        {patient.entries.map((entry: Entry) => (
          <PatientEntry
            key={entry.id}
            entry={entry}
            diagnoses={diagnoses}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PatientPage;
