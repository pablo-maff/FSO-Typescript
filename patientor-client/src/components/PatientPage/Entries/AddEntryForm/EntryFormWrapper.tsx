import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { SyntheticEvent } from "react";
import { EntryType } from "../../../../types";

interface Props {
  children: React.ReactNode;
  newEntryType: EntryType;
  handleSelectNewEntryType: (event: SelectChangeEvent) => void;
  onSubmit: (event: SyntheticEvent) => Promise<void>;
  onCancel: () => void;
}

const EntryFormWrapper = ({
  children,
  newEntryType,
  handleSelectNewEntryType,
  onSubmit,
  onCancel,
}: Props) => {
  return (
    <>
      <FormControl sx={{ minWidth: "250px" }}>
        <InputLabel id="select-new-entry-type-label">New Entry Type</InputLabel>
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
      <Divider sx={{ mt: 1, mb: 2 }} />
      <Box sx={{ width: "100%" }}>
        <form
          id="new-entry-form-healthcheck"
          onSubmit={onSubmit}
        >
          {children}
          <Grid sx={{ mt: 2 }}>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: "right",
                }}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default EntryFormWrapper;
