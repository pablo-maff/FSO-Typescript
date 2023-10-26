import {
  FormControl,
  SelectChangeEvent,
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
import EntryFormWrapper from "./EntryFormWrapper";
import ModalWrapper from "../../../Public/ModalWrapper";

interface Props {
  patientId: string;
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
  diagnoses: Diagnose[];
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEntryForm = ({
  patientId,
  setPatient,
  diagnoses,
  modalOpen,
  setModalOpen,
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

  const [newEntryType, setNewEntryType] = useState<EntryType>(
    EntryType.HealthCheck
  );
  const handleSelectNewEntryType = (event: SelectChangeEvent) => {
    setNewEntryType(event.target.value as EntryType);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setErrorMessage("");
  };

  const handleBaseEntryInputs = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value, name } = event.target;

    setBaseEntryValues((prevEntry) => {
      return { ...prevEntry, [name]: value };
    });
  };

  const submitEntry = async (newEntry: NewEntry) => {
    try {
      const newPatientEntry = await patientService.createEntry(
        patientId,
        newEntry
      );

      setPatient((prevPatient) => {
        return {
          ...prevPatient,
          entries: [...prevPatient.entries, newPatientEntry as Entry],
        };
      });

      setErrorMessage("");
      setModalOpen(false);
      setBaseEntryValues(initialEntryValues);
      setHealthCheckRating(0);
      setDate(null);
      setNewDiagnosis([]);
      setDischargeDate(null);
      setDischargeCriteria("");
      setEmployerName("");
      setSickLeaveStartDate(null);
      setSickLeaveEndDate(null);
    } catch (error) {
      if (error) {
        console.error("error", error);
        setErrorMessage(parseErrorMessage(error));
        throw new Error(parseErrorMessage(error));
      }
    }
  };

  const handleAddEntry = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();
    if (!dayjs(date).isValid()) {
      const newErrorMessage = "Incorrect or missing date";
      setErrorMessage(newErrorMessage);
      throw new Error(newErrorMessage);
    }

    const formattedDate = dayjs(date).format("YYYY-MM-DD");

    switch (newEntryType) {
      case EntryType.HealthCheck:
        const newHealthCheckEntry = {
          ...baseEntryValues,
          diagnosisCodes: newDiagnosis,
          date: formattedDate,
          type: newEntryType,
          healthCheckRating,
        };
        return submitEntry(newHealthCheckEntry);

      case EntryType.Hospital:
        if (!dayjs(dischargeDate).isValid()) {
          const newErrorMessage = "Incorrect or missing discharge date";

          setErrorMessage(newErrorMessage);
          throw new Error(newErrorMessage);
        }

        const formattedDischargeDate =
          dayjs(dischargeDate).format("YYYY-MM-DD");

        const newHospitalEntry = {
          ...baseEntryValues,
          diagnosisCodes: newDiagnosis,
          date: formattedDate,
          type: newEntryType,
          discharge: {
            date: formattedDischargeDate,
            criteria: dischargeCriteria,
          },
        };
        return submitEntry(newHospitalEntry);

      case EntryType.OccupationalHealthcare:
        let sickLeave;

        if (
          !dayjs(sickLeaveStartDate).isValid() ||
          !dayjs(sickLeaveEndDate).isValid()
        ) {
          const newErrorMessage = "Invalid sick leave date";

          setErrorMessage(newErrorMessage);
          throw new Error(newErrorMessage);
        } else {
          sickLeave = {
            startDate: dayjs(sickLeaveStartDate).format("YYYY-MM-DD"),
            endDate: dayjs(sickLeaveEndDate).format("YYYY-MM-DD"),
          };
        }

        const newOccupationalEntry = {
          ...baseEntryValues,
          diagnosisCodes: newDiagnosis,
          date: formattedDate,
          type: newEntryType,
          employerName,
          sickLeave,
        };
        return submitEntry(newOccupationalEntry);

      default:
        assertNever(newEntryType);
    }
  };

  switch (newEntryType) {
    case EntryType.HealthCheck:
      return (
        <ModalWrapper
          title="Add a new HealthCheck Entry"
          modalOpen={modalOpen}
          error={errorMessage}
          onClose={closeModal}
        >
          <EntryFormWrapper
            onSubmit={handleAddEntry}
            onCancel={closeModal}
            newEntryType={newEntryType}
            handleSelectNewEntryType={handleSelectNewEntryType}
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
          </EntryFormWrapper>
        </ModalWrapper>
      );

    case EntryType.Hospital:
      return (
        <ModalWrapper
          title="New Hospital Entry"
          modalOpen={modalOpen}
          error={errorMessage}
          onClose={closeModal}
        >
          <EntryFormWrapper
            onSubmit={handleAddEntry}
            onCancel={closeModal}
            newEntryType={newEntryType}
            handleSelectNewEntryType={handleSelectNewEntryType}
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
          </EntryFormWrapper>
        </ModalWrapper>
      );

    case EntryType.OccupationalHealthcare:
      return (
        <ModalWrapper
          title="Add a new Occupational Healthcare Entry"
          modalOpen={modalOpen}
          error={errorMessage}
          onClose={closeModal}
        >
          <EntryFormWrapper
            onSubmit={handleAddEntry}
            onCancel={closeModal}
            newEntryType={newEntryType}
            handleSelectNewEntryType={handleSelectNewEntryType}
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
                maxDate={sickLeaveEndDate ? sickLeaveEndDate : null}
                required={Boolean(sickLeaveEndDate)}
              />
              <DatePickerValue
                value={sickLeaveEndDate}
                id="sickLeave-endDate"
                name="sickLeave.endDate"
                label="Sick leave end date"
                sx={{ width: "100%", my: 1, ml: 4 }}
                setValue={setSickLeaveEndDate}
                minDate={sickLeaveStartDate ? sickLeaveStartDate : null}
                required={Boolean(sickLeaveStartDate)}
              />
            </BaseEntryInputs>
          </EntryFormWrapper>
        </ModalWrapper>
      );

    default:
      assertNever(newEntryType);
  }
};

export default AddEntryForm;
