import { Box, MenuItem, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { CardRow, GradientButton, Popover, TextField } from "../../components";
import MonthPicker from "../pickers/month-picker";

const DateRange = ({
  anchorEl,
  handleClose,
  title,
  onChange,
  year,
  isRangeRequired = true,
}) => {
  const open = Boolean(anchorEl);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [selectedYear, setSelectedYear] = useState(year);
  const [fromSelectedYear, setFromSelectedYear] = useState(year);
  const [toSelectedYear, setToSelectedYear] = useState(year);

  const years = useMemo(() => {
    return Array(11)
      .fill(1)
      .map((_, index) => Number(year) - 5 + index);
  }, [year]);

  // const rangeStatus =
  //   isRangeRequired === undefined || isRangeRequired === true ? true : false;

  const onMonthChange = (index, field) => {
    switch (field) {
      case "To":
        setTo(index);
        break;
      case "From":
        setFrom(index);
        break;
      default:
    }
  };

  return (
    <Box
      sx={{
        display: "inline-block",
        borderRadius: "2px",
        boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.08)",
        border: (theme) => `solid 1px ${theme.palette.ternary.main}`,
        backgroundColor: (theme) => theme.palette.background.main,
      }}
    >
      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {isRangeRequired ? (
          <Box sx={{ padding: "15px" }}>
            <CardRow sx={{ padding: "7px 0" }}>
              <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                {title}
              </Typography>

              {/* <TextField
                select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                }}
                sx={{ width: "116px" }}
                variant="filled"
                label={"Year"}
              >
                {years.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField> */}
            </CardRow>

            <CardRow sx={{ flexWrap: "nowrap" }}>
              <Box sx={{ width: "240px" }}>
                <MonthPicker
                  title="From"
                  year={year}
                  onChange={(month, year) => {
                    onMonthChange(month, "From");
                    setFromSelectedYear(year, "From");
                  }}
                />
              </Box>
              <Box
                sx={{
                  margin: "0 10px",
                  width: "2px",
                  height: "250px",
                  borderLeft: (theme) =>
                    `solid 1px ${theme.palette.highlight.main}`,
                }}
              ></Box>
              <Box sx={{ width: "240px" }}>
                <MonthPicker
                  title="To"
                  year={year}
                  onChange={(month, year) => {
                    onMonthChange(month, "To");
                    setToSelectedYear(year, "To");
                  }}
                />
              </Box>
            </CardRow>

            <GradientButton
              onClick={() =>
                onChange(
                  new Date(fromSelectedYear, from),
                  new Date(toSelectedYear, to + 1, 0),
                )
              }
            >
              Apply
            </GradientButton>
          </Box>
        ) : (
          <Box sx={{ padding: "15px" }}>
            <CardRow sx={{ padding: "7px 0" }}>
              <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                {title}
              </Typography>

              <TextField
                select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                }}
                sx={{ width: "116px" }}
                variant="filled"
                label={"Year"}
              >
                {years.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </CardRow>

            <CardRow sx={{ flexWrap: "nowrap" }}>
              <Box sx={{ width: "240px" }}>
                <MonthPicker
                  isRangeRequired
                  title="Months"
                  onChange={(i) => {
                    onMonthChange(i, "From");
                  }}
                />
              </Box>
            </CardRow>

            <GradientButton
              onClick={() => onChange(new Date(selectedYear, from))}
            >
              Apply
            </GradientButton>
          </Box>
        )}
      </Popover>
    </Box>
  );
};

export default DateRange;
