import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Gender } from "../../types";

const PatientGender = ({ gender }: { gender: Gender }) => {
  switch (gender) {
    case "male":
      return <MaleIcon />;
    case "female":
      return <FemaleIcon />;
    case "other":
      return <TransgenderIcon />;
    default:
      throw new Error("Patient's gender is not of type Gender");
  }
};

export default PatientGender;
