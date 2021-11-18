import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { CardRow } from "../../components";
import { ShortMonthNames } from "../../helper/constants";

const MonthPicker = ({ title, onChange }) => {
  const [selectedMonth, setSelectedMonth] = useState(0);
  return (
    <Box>
      {title && <Typography sx={{ fontSize: "14px" }}>{title}</Typography>}
      <CardRow sx={{ marginTop: "10px" }}>
        {ShortMonthNames.map((month, index) => {
          const isSelected = selectedMonth === index;
          return (
            <Typography
              key={month}
              onClick={() => {
                onChange && onChange(index);
                setSelectedMonth(index);
              }}
              sx={{
                cursor: "pointer",
                textAlign: "center",
                width: "30%",
                padding: "3px 9px",
                borderRadius: "10px",
                border: (theme) => `solid 1px ${theme.palette.highlight.main}`,
                margin: "0 2.5px",
                opacity: isSelected ? 1 : 0.5,
                backgroundColor: (theme) =>
                  isSelected
                    ? theme.palette.highlight.main
                    : theme.palette.background.main,
              }}
            >
              {month}
            </Typography>
          );
        })}
      </CardRow>
    </Box>
  );
};

export default MonthPicker;
