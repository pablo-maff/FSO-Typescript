import { Box, Typography } from "@mui/material";
import { HealthCheckEntry } from "../../../../types";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import HealthRatingIcon from "./HealthRatingIcon";

interface Props {
  entry: HealthCheckEntry;
  children: React.ReactNode;
}

const ShowHealthCheckEntry = ({ children, entry }: Props) => {
  return (
    <Box sx={{ border: "2px solid", borderRadius: "5px", my: 2, p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ mr: 1 }}>{entry.date}</Typography>
        <MonitorHeartIcon />
      </Box>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      <HealthRatingIcon rating={entry.healthCheckRating} />
      <Typography>Diagnosed by {entry.specialist}</Typography>
      {children}
    </Box>
  );
};

export default ShowHealthCheckEntry;
