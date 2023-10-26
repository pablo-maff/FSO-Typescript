import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl, SxProps } from "@mui/material";
import { Theme } from "@mui/system";

interface Props {
  id: string;
  value: Dayjs | null;
  setValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  name: string;
  label: string;
  required?: boolean;
  sx?: SxProps<Theme> | undefined;
}

export default function DatePickerValue({
  id,
  value,
  setValue,
  name,
  label,
  required = false,
  sx,
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
          sx={sx}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
