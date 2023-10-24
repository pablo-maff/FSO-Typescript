import { Favorite } from "@mui/icons-material";
import { HealthCheckRating } from "../../../../types";

const HealthRatingIcon = ({ rating }: { rating: HealthCheckRating }) => {
  const iconColors = ["green", "yellow", "orange", "red"];
  return <Favorite sx={{ fill: iconColors[rating] }} />;
};

export default HealthRatingIcon;
