import { Box, Typography } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../../../types";
import WorkIcon from "@mui/icons-material/Work";

interface Props {
  entry: OccupationalHealthcareEntry;
  children: React.ReactNode;
}

const ShowOccupationalHealthcareEntry = ({ children, entry }: Props) => {
  return (
    <Box sx={{ border: "2px solid", borderRadius: "5px", my: 2, p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ mr: 1 }}>{entry.date}</Typography>
        <WorkIcon sx={{ mr: 1 }} />
        <Typography>{entry.employerName}</Typography>
      </Box>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      <Typography>Diagnosed by {entry.specialist}</Typography>
      {children}
      {entry.sickLeave && (
        <Box>
          <Typography variant="h6">Sick Leave</Typography>
          <Box>
            <Typography>Start date: {entry.sickLeave?.startDate}</Typography>
            <Typography>End date: {entry.sickLeave?.endDate}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ShowOccupationalHealthcareEntry;
