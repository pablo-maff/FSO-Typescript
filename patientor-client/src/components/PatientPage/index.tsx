import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import PatientGender from "./PatientGender";

function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Not a string!");
  }
}

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);

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

    fetchPatient(id);
  }, [id]);

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
    </Box>
  );
};

export default PatientPage;
