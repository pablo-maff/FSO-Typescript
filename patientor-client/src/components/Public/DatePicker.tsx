import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { FormControl } from "@mui/material";

interface Props extends DatePickerProps<Dayjs | null> {
  id: string;
  value: Dayjs | null;
  setValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  name: string;
  label: string;
  required?: boolean;
}

export default function DatePickerValue({
  id,
  value,
  setValue,
  name,
  label,
  required = false,
  ...rest
}: Props) {
  return (
    <FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={value}
          format="YYYY/MM/DD"
          slotProps={{
            textField: {
              required: required,
              id: id,
              name: name,
              helperText: "YYYY/MM/DD",
            },
          }}
          onChange={(newValue) => setValue(newValue)}
          {...rest}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
