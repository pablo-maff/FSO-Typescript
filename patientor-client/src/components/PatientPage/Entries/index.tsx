import { Diagnose, Entry, EntryType } from "../../../types";
import { assertNever } from "../../../utils";
import DiagnosesList from "./DiagnosesList";
import ShowHealthCheckEntry from "./HealthCheckEntry";
import ShowHospitalEntry from "./HospitalEntry";
import ShowOccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

interface Props {
  entry: Entry;
  diagnoses: Diagnose[];
}

const PatientEntry = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case EntryType.HealthCheck:
      return (
        <ShowHealthCheckEntry entry={entry}>
          <DiagnosesList
            diagnosisCodes={entry.diagnosisCodes}
            diagnoses={diagnoses}
          />
        </ShowHealthCheckEntry>
      );

    case EntryType.Hospital:
      return (
        <ShowHospitalEntry entry={entry}>
          <DiagnosesList
            diagnosisCodes={entry.diagnosisCodes}
            diagnoses={diagnoses}
          />
        </ShowHospitalEntry>
      );

    case EntryType.OccupationalHealthcare:
      return (
        <ShowOccupationalHealthcareEntry entry={entry}>
          <DiagnosesList
            diagnosisCodes={entry.diagnosisCodes}
            diagnoses={diagnoses}
          />
        </ShowOccupationalHealthcareEntry>
      );
    default:
      return assertNever(entry);
  }
};

export default PatientEntry;
