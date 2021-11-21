import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Box, MenuItem, Typography } from "@mui/material";
import {
  Done as DoneIcon,
  Undo as RestoreDefaultsIcon,
} from "@mui/icons-material";

import {
  CheckBox,
  Grid,
  ImgIcon,
  IconButton,
  Output,
  TextField,
  TimePicker,
} from "../../components";
import deleteIcon from "../../assets/icons/icon-delete.png";
import { ShortWeekNames } from "../../helper/constants";
import { date } from "yup";

const RoundedIconButton = styled(IconButton)({ borderRadius: "50%" });

const Pattern = ({ pattern, onChange }) => {
  const handleChange = (index) => {
    let updatedPattern = [...pattern];
    if (updatedPattern.includes(ShortWeekNames[index])) {
      updatedPattern = updatedPattern.filter(
        (day) => day !== ShortWeekNames[index]
      );
    } else {
      updatedPattern = [...updatedPattern, ShortWeekNames[index]];
    }
    onChange(updatedPattern);
  };

  return (
    <Box
      sx={{
        gridColumn: "1 / span 2",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {ShortWeekNames.map((day, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignItems: "center",
          }}
        >
          <Typography sx={{ textTransform: "capitalize", fontSize: "14px" }}>
            {day}
          </Typography>
          <CheckBox
            checked={pattern.includes(ShortWeekNames[index])}
            onClick={() => handleChange(index)}
          />
        </Box>
      ))}
    </Box>
  );
};

const Session = ({
  initialData: {
    name = "",
    facility = "",
    fullCapacity = "",
    waitlistCapacity = "",
    coachId = "",
    term = {},
    pattern = [],
    startDate = term?.startDate?.split("T")[0] || "- - -",
    endDate = term?.endDate?.split("T")[0] || "- - -",
    startTime = new Date(term?.startTime || Date.now()),
    endTime = new Date(term?.endTime || Date.now()),
  },
  onDelete,
  onAction,
}) => {
  const allCoaches = useSelector((state) => state.businesses.coachesOfBusiness);
  const termsOfBusiness = useSelector((state) => state.terms.termsOfBusiness);
  const [touched, setTouched] = useState(false);
  const initialState = {
    name,
    facility,
    fullCapacity,
    waitlistCapacity,
    coachId,
    term,
    pattern,
    startDate,
    endDate,
    startTime,
    endTime,
  };
  const [state, setState] = useState(initialState);

  const changeHandler = useCallback(
    (e, property) => {
      setTouched(true);
      const value =
        ["startTime", "endTime", "pattern"].indexOf(property) > -1
          ? e
          : e.target.value;
      if (property === "termId") {
        setState((prevState) => {
          const term = termsOfBusiness.find(({ _id }) => _id === value);
          return {
            ...prevState,
            term,
            startDate: term.startDate.split("T")[0],
            endDate: term.endDate.split("T")[0],
          };
        });
      }
      setState((prevState) => ({ ...prevState, [property]: value }));
    },
    [termsOfBusiness]
  );
  const pattenChangeHandler = useCallback(
    (pattern) => changeHandler(pattern, "pattern"),
    [changeHandler]
  );

  const restoreDefaults = () => {
    setState(initialState);
    setTouched(false);
  };

  return (
    <Box
      sx={{
        p: "20px",
        backgroundColor: "#dedce4",
        my: "20px",
      }}
    >
      <Grid columnCount={4} rowGap="20px" columnGap="20px">
        <TextField
          select
          label="Term"
          value={state?.term?._id || ""}
          variant={"filled"}
          onChange={(e) => changeHandler(e, "termId")}
          sx={{ gridColumn: "1 / span 2" }}
        >
          {termsOfBusiness.length ? (
            termsOfBusiness.map(({ _id, label }) => {
              return (
                <MenuItem key={label} value={_id}>
                  {label}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem value="">No terms</MenuItem>
          )}
        </TextField>
        <Output title="Start Date" description={state.startDate} />
        <Output title="End Date" description={state.endDate} />
        <TextField
          variant="filled"
          label="Session Name"
          sx={{ gridColumn: "1 / span 4" }}
          value={state.name}
          onChange={(e) => changeHandler(e, "name")}
        />
        <Pattern onChange={pattenChangeHandler} pattern={state.pattern} />
        <TimePicker
          label="Start Time"
          date={state.startTime}
          onChange={(e) => changeHandler(e, "startTime")}
        />
        <TimePicker
          label="End Time"
          date={state.endTime}
          onChange={(e) => changeHandler(e, "endTime")}
        />
        <TextField
          variant="filled"
          label="Facility"
          value={state.facility}
          onChange={(e) => changeHandler(e, "facility")}
        />
        <TextField
          variant="filled"
          value={state.fullCapacity}
          label="Full Class Capacity"
          onChange={(e) => changeHandler(e, "fullCapacity")}
        />
        <TextField
          value={state.waitlistCapacity}
          variant="filled"
          label="Waitlist Capacity"
          onChange={(e) => changeHandler(e, "waitlistCapacity")}
        />
        <TextField
          select
          value={state.coachId}
          label="Coach Name"
          variant="filled"
          onChange={(e) => changeHandler(e, "coachId")}
        >
          {allCoaches.length ? (
            allCoaches.map((item, i) => {
              return (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem value="">No Coaches</MenuItem>
          )}
        </TextField>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: "20px",
        }}
      >
        {!touched && (
          <RoundedIconButton onClick={onDelete}>
            <ImgIcon>{deleteIcon}</ImgIcon>
          </RoundedIconButton>
        )}
        {touched && (
          <>
            <RoundedIconButton onClick={() => onAction(state)}>
              <DoneIcon color="success" />
            </RoundedIconButton>
            <RoundedIconButton onClick={restoreDefaults}>
              <RestoreDefaultsIcon color="text.secondary" />
            </RoundedIconButton>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Session;
