import { Box, Typography } from "@mui/material";
import { HospitalEntry } from "../../../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

interface Props {
  entry: HospitalEntry;
  children: React.ReactNode;
}

const ShowHospitalEntry = ({ children, entry }: Props) => {
  return (
    <Box sx={{ border: "2px solid", borderRadius: "5px", my: 2, p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ mr: 1 }}>{entry.date}</Typography>
        <LocalHospitalIcon />
      </Box>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      <Typography>Diagnosed by {entry.specialist}</Typography>
      {children}
      <Typography variant="h6">Discharged</Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ mr: 1 }}>{entry.discharge.date}</Typography>
        <Typography>{entry.discharge.criteria}</Typography>
      </Box>
    </Box>
  );
};

export default ShowHospitalEntry;
