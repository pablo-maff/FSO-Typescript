import { useParams } from "react-router-dom";
import { Diagnose, Patient } from "../../types";
import { Box, Button, Typography } from "@mui/material";
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
      <Box sx={{ my: 2 }}>
        <Button
          variant="contained"
          onClick={() => setShowEntryForm(!showEntryForm)}
        >
          <Typography>{!showEntryForm ? "Add Entry" : "Hide Form"}</Typography>
        </Button>
      </Box>
      {showEntryForm && (
        <EntryForm
          patientId={id}
          setPatient={
            setPatient as React.Dispatch<React.SetStateAction<Patient>>
          }
        />
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
