import { List, ListItem, Typography } from "@mui/material";
import { Diagnose } from "../../../types";

interface Props {
  diagnosisCodes: string[] | undefined;
  diagnoses: Diagnose[];
}

const DiagnosesList = ({ diagnosisCodes, diagnoses }: Props) => {
  if (!diagnosisCodes) return null;

  return (
    <List sx={{ listStyleType: "disc", pl: 4 }}>
      <Typography variant="h6">Diagnoses</Typography>
      {diagnosisCodes.map((code, i) => (
        <ListItem
          key={i}
          sx={{ display: "list-item" }}
        >
          <Typography sx={{ display: "inline-block" }}>{code}</Typography>
          <Typography sx={{ display: "inline-block", ml: 1 }}>
            {diagnoses.find((d) => d.code === code)?.name}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default DiagnosesList;
