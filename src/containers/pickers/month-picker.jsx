import { Typography, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useMemo, useEffect } from "react";
import { CardRow, TextField } from "../../components";
import { ShortMonthNames } from "../../helper/constants";

const MonthPicker = ({ title, onChange, year, isRangeRequired }) => {
  const years = useMemo(() => {
    return Array(11)
      .fill(1)
      .map((_, index) => Number(year) - 10 + index);
  }, [year]);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(year);
  useEffect(() => {
    onChange(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear, onChange]);
  return (
    <Box>
      {title && (
        <Typography sx={{ fontSize: "14px", height: "48px" }} component="div">
          {title}
          {!isRangeRequired && (
            <TextField
              select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value, title);
              }}
              sx={{ width: "116px", float: "right" }}
              variant="filled"
              label={"Year"}
            >
              {years.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Typography>
      )}
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
