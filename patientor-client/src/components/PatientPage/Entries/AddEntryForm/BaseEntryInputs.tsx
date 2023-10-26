import { FormControl, TextField } from "@mui/material";
import { Diagnose, NewBaseEntry } from "../../../../types";
import DatePickerValue from "../../../Public/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import MultipleSelectChip from "../../../Public/MultipleSelect";

interface Props {
  children: React.ReactNode;
  baseEntryValues: NewBaseEntry;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dateValue: Dayjs | null;
  setDateValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  diagnoses: Diagnose[];
  newDiagnosis: string[];
  setNewDiagnosis: React.Dispatch<React.SetStateAction<string[]>>;
}

const BaseEntryInputs = ({
  children,
  baseEntryValues,
  onChange,
  dateValue,
  setDateValue,
  diagnoses,
  newDiagnosis,
  setNewDiagnosis,
}: Props) => {
  return (
    <>
      <TextField
        id="entry-description"
        name="description"
        label="Description"
        multiline
        sx={{ width: "100%", mb: 1 }}
        value={baseEntryValues.description}
        onChange={onChange}
        required
      />
      <DatePickerValue
        value={dateValue}
        id="entry-date"
        name="date"
        label="Date"
        sx={{ width: "100%", my: 1 }}
        setValue={setDateValue}
        required
      />
      <FormControl sx={{ display: "block" }}>
        <TextField
          id="entry-specialist"
          name="specialist"
          label="Specialist"
          sx={{ my: 1, minWidth: "300px" }}
          value={baseEntryValues.specialist}
          onChange={onChange}
          required
        />
      </FormControl>
      <MultipleSelectChip
        options={diagnoses.map((diagnose) => diagnose.code)}
        value={newDiagnosis}
        setValues={setNewDiagnosis}
        label="Diagnosis Codes"
      />
      {children}
    </>
  );
};

export default BaseEntryInputs;
