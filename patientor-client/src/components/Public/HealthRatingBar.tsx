import { Rating, Typography } from "@mui/material";
import { Favorite } from "@mui/icons-material";

import { styled } from "@mui/material/styles";
import { HealthCheckRating } from "../../types";

type BarProps = {
  id?: string;
  rating: number;
  showText: boolean;
  readOnly?: boolean;
  onChange?: React.Dispatch<React.SetStateAction<HealthCheckRating>>;
};

const StyledRating = styled(Rating)({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
});

const HEALTHBAR_TEXTS = [
  "The patient is in great shape",
  "The patient has a low risk of getting sick",
  "The patient has a high risk of getting sick",
  "The patient has a diagnosed condition",
];

const HealthRatingBar = ({
  id,
  rating,
  showText,
  readOnly = true,
  onChange,
}: BarProps) => {
  return (
    <div className="health-bar">
      <StyledRating
        id={id}
        readOnly={readOnly}
        value={4 - rating}
        max={4}
        icon={<Favorite fontSize="inherit" />}
        onChange={(_e, newValue) => {
          if (onChange) {
            if (newValue === null && rating < 3) {
              return onChange(rating + 1);
            } else if (newValue) {
              onChange(4 - Number(newValue));
            }
          }
        }}
        emptyIcon={
          <Favorite
            style={{ opacity: 0.55 }}
            fontSize="inherit"
          />
        }
      />

      {showText ? (
        <Typography sx={{ mt: 1 }}>{HEALTHBAR_TEXTS[rating]}</Typography>
      ) : null}
    </div>
  );
};

export default HealthRatingBar;
