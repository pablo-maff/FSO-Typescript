import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import { Box, List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import PatientGender from "./PatientGender";
import { Entry } from "../../types";

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

  console.log("patient", patient);

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
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Entries</Typography>
        {patient.entries.map((entry: Entry) => (
          <Box key={entry.id}>
            <Box>
              <Typography sx={{ display: "inline-block" }}>
                {entry.date}
              </Typography>
              <Typography
                sx={{ fontStyle: "italic", display: "inline-block", ml: 2 }}
              >
                {entry.description}
              </Typography>
            </Box>
            <List sx={{ listStyleType: "disc", pl: 4 }}>
              {entry.diagnosisCodes?.map((code) => (
                <ListItem sx={{ display: "list-item" }}>{code}</ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PatientPage;
