import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import {
  Diagnose,
  Entry,
  EntryType,
  HealthCheckRating,
  NewBaseEntry,
  NewEntry,
  Patient,
} from "../../../../types";
import patientService from "../../../../services/patients";
import { assertNever, parseErrorMessage } from "../../../../utils";
import BaseEntryInputs from "./BaseEntryInputs";
import HealthRatingBar from "../../../Public/HealthRatingBar";
import dayjs, { Dayjs } from "dayjs";
import DatePickerValue from "../../../Public/DatePicker";

interface Props {
  patientId: string;
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
  newEntryType: EntryType;
  diagnoses: Diagnose[];
}

const EntryForm = ({
  patientId,
  setPatient,
  newEntryType,
  diagnoses,
}: Props) => {
  const initialEntryValues: NewBaseEntry = {
    description: "",
    specialist: "",
  };

  const [baseEntryValues, setBaseEntryValues] =
    useState<NewBaseEntry>(initialEntryValues);
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [newDiagnosis, setNewDiagnosis] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState<Dayjs | null>(null);
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<Dayjs | null>(
    null
  );
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<Dayjs | null>(null);

  const handleBaseEntryInputs = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value, name } = event.target;

    setBaseEntryValues((prevEntry) => {
      return { ...prevEntry, [name]: value };
    });
  };

  async function handleAddEntry(event: SyntheticEvent) {
    event.preventDefault();
    try {
      let newEntry;

      if (!dayjs(date).isValid()) {
        return setErrorMessage("Incorrect or missing date");
      }

      const formattedDate = dayjs(date).format("YYYY-MM-DD");

      switch (newEntryType) {
        case EntryType.HealthCheck:
          newEntry = {
            ...baseEntryValues,
            diagnosisCodes: newDiagnosis,
            date: formattedDate,
            type: EntryType.HealthCheck,
            healthCheckRating,
          };
          break;

        case EntryType.Hospital:
          if (!dayjs(dischargeDate).isValid()) {
            return setErrorMessage("Incorrect or missing discharge date");
          }

          const formattedDischargeDate =
            dayjs(dischargeDate).format("YYYY-MM-DD");

          newEntry = {
            ...baseEntryValues,
            diagnosisCodes: newDiagnosis,
            date: formattedDate,
            type: EntryType.Hospital,
            discharge: {
              date: formattedDischargeDate,
              criteria: dischargeCriteria,
            },
          };
          break;

        case EntryType.OccupationalHealthcare:
          const sickLeave =
            dayjs(sickLeaveStartDate).isValid() ||
            dayjs(sickLeaveEndDate).isValid()
              ? {
                  startDate: dayjs(sickLeaveStartDate).format("YYYY-MM-DD"),
                  endDate: dayjs(sickLeaveEndDate).format("YYYY-MM-DD"),
                }
              : undefined;

          newEntry = {
            ...baseEntryValues,
            diagnosisCodes: newDiagnosis,
            date: formattedDate,
            type: EntryType.OccupationalHealthcare,
            employerName,
            sickLeave,
          };
          break;

        default:
          break;
      }

      console.log("newEntry", newEntry);

      const newPatientEntry = await patientService.createEntry(
        patientId,
        newEntry as NewEntry // TODO
      );

      setPatient((prevPatient) => {
        return {
          ...prevPatient,
          entries: [...prevPatient.entries, newPatientEntry as Entry],
        };
      });
      setErrorMessage("");
    } catch (error) {
      if (error) {
        console.error("error", error);
        setErrorMessage(parseErrorMessage(error));
        throw new Error(parseErrorMessage(error));
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
            <Typography
              variant="h6"
              sx={{ py: 1 }}
            >
              New HealthCheck Entry
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <form
              id="new-entry-form-healthcheck"
              onSubmit={handleAddEntry}
            >
              <BaseEntryInputs
                baseEntryValues={baseEntryValues}
                onChange={handleBaseEntryInputs}
                dateValue={date}
                setDateValue={setDate}
                diagnoses={diagnoses}
                newDiagnosis={newDiagnosis}
                setNewDiagnosis={setNewDiagnosis}
              >
                <FormControl required>
                  <Typography
                    component="label"
                    htmlFor="healthcheck-rating"
                    sx={{ my: 1 }}
                    aria-required="true"
                  >
                    HealthCheck Rating*
                  </Typography>
                  <HealthRatingBar
                    id="healthcheck-rating"
                    rating={healthCheckRating}
                    showText={true}
                    readOnly={false}
                    onChange={setHealthCheckRating}
                  />
                </FormControl>
              </BaseEntryInputs>
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
            <Typography
              variant="h6"
              sx={{ py: 1 }}
            >
              New Hospital Entry
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <form
              id="new-entry-form-hospital"
              onSubmit={handleAddEntry}
            >
              <BaseEntryInputs
                baseEntryValues={baseEntryValues}
                onChange={handleBaseEntryInputs}
                dateValue={date}
                setDateValue={setDate}
                diagnoses={diagnoses}
                newDiagnosis={newDiagnosis}
                setNewDiagnosis={setNewDiagnosis}
              >
                <DatePickerValue
                  value={dischargeDate}
                  id="discharge-date"
                  name="discharge.date"
                  label="Discharge date"
                  sx={{ width: "100%", my: 1 }}
                  setValue={setDischargeDate}
                  required
                />
                <TextField
                  id="discharge-criteria"
                  name="discharge.criteria"
                  label="Discharge criteria"
                  sx={{ width: "100%", my: 1 }}
                  value={dischargeCriteria}
                  onChange={(e) => setDischargeCriteria(e.target.value)}
                  required
                />
              </BaseEntryInputs>
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
            <Typography
              variant="h6"
              sx={{ py: 1 }}
            >
              New Occupational Healthcare Entry
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <form
              id="new-entry-form-occupationalHealthcare"
              onSubmit={handleAddEntry}
            >
              <BaseEntryInputs
                baseEntryValues={baseEntryValues}
                onChange={handleBaseEntryInputs}
                dateValue={date}
                setDateValue={setDate}
                diagnoses={diagnoses}
                newDiagnosis={newDiagnosis}
                setNewDiagnosis={setNewDiagnosis}
              >
                <FormControl sx={{ display: "block" }}>
                  <TextField
                    id="employerName"
                    name="employerName"
                    label="Employer name"
                    sx={{ my: 1, minWidth: "300px" }}
                    value={employerName}
                    onChange={(e) => setEmployerName(e.target.value)}
                    required
                  />
                </FormControl>
                <DatePickerValue
                  value={sickLeaveStartDate}
                  id="sickLeave-startDate"
                  name="sickLeave.startDate"
                  label="Sick leave start date"
                  sx={{ width: "100%", my: 1 }}
                  setValue={setSickLeaveStartDate}
                  required={!!sickLeaveEndDate}
                />
                <DatePickerValue
                  value={sickLeaveEndDate}
                  id="sickLeave-endDate"
                  name="sickLeave.endDate"
                  label="Sick leave end date"
                  sx={{ width: "100%", my: 1, ml: 4 }}
                  setValue={setSickLeaveEndDate}
                  required={!!sickLeaveStartDate}
                />
              </BaseEntryInputs>
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

    default:
      assertNever(newEntryType);
  }
};

export default EntryForm;
