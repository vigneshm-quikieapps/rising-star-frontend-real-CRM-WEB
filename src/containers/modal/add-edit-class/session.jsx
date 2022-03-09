import { useState, useCallback, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Box, MenuItem, Typography } from "@mui/material";
import {
  Done as DoneIcon,
  Save as SaveIcon,
  ClearRounded as CancelIcon,
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
} from "../../../components";
import deleteIcon from "../../../assets/icons/icon-delete.png";
import { shortWeekNames } from "../../../helper/constants";

const RoundedIconButton = styled(IconButton)({ borderRadius: "50%" });
const reformatDate = (dateStr) => {
  let dArr = dateStr.split("-"); // ex input "2010-01-18"
  return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"
};
const Pattern = ({ pattern, onChange }) => {
  const handleChange = (index) => {
    let updatedPattern = [...pattern];
    if (updatedPattern.includes(shortWeekNames[index])) {
      updatedPattern = updatedPattern.filter(
        (day) => day !== shortWeekNames[index],
      );
    } else {
      updatedPattern = [...updatedPattern, shortWeekNames[index]];
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
      {shortWeekNames.map((day, index) => (
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
            checked={pattern.includes(day)}
            onClick={() => handleChange(index)}
          />
        </Box>
      ))}
    </Box>
  );
};

const Session = ({
  index,
  initialData,
  onDelete,
  onAction,
  isNew,
  areSessionsTouched,
}) => {
  const allCoaches = useSelector((state) => state.businesses.coachesOfBusiness);
  // console.log("allCoaches", allCoaches);
  const termsOfBusiness = useSelector((state) => state.terms.termsOfBusiness);
  const [touched, setTouched] = useState(false);

  const initialState = useMemo(() => {
    const {
      id,
      name = "",
      facility = "",
      fullCapacity = "",
      waitlistCapacity = "",
      coachId = "",
      term = {},
      pattern = [],
      startDate = term?.startDate?.split("T")[0] || "- - -",
      endDate = term?.endDate?.split("T")[0] || "- - -",
      startTime,
      endTime,
    } = initialData;
    return {
      index,
      id,
      name,
      facility,
      fullCapacity,
      waitlistCapacity,
      coachId,
      term,
      pattern,
      startDate,
      endDate,
      startTime: new Date(startTime || Date.now()),
      endTime: new Date(endTime || Date.now()),
    };
  }, [index, initialData]);

  const [state, setState] = useState(initialState);

  useEffect(() => {
    !isNew && setState(initialState);
  }, [isNew, initialState]);

  useEffect(() => {
    if (isNew) {
      areSessionsTouched.current[0] = touched;
      return;
    }
    areSessionsTouched.current[index + 1] = touched;
  }, [isNew, touched, areSessionsTouched, index]);

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
    [termsOfBusiness],
  );
  const patternChangeHandler = useCallback(
    (pattern) => changeHandler(pattern, "pattern"),
    [changeHandler],
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
                <MenuItem key={_id} value={_id}>
                  {label}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem value="">No terms</MenuItem>
          )}
        </TextField>
        <Output
          title="Start Date"
          description={reformatDate(state.startDate.split("T")[0])}
        />
        <Output
          title="End Date"
          description={reformatDate(state.endDate.split("T")[0])}
        />
        <TextField
          variant="filled"
          label="Session Name"
          sx={{ gridColumn: "1 / span 4" }}
          value={state.name}
          onChange={(e) => changeHandler(e, "name")}
        />
        <Pattern onChange={patternChangeHandler} pattern={state.pattern} />
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
          <RoundedIconButton
            onClick={() => {
              setTouched(false);
              onDelete({ index, id: state.id });
            }}
          >
            {isNew ? (
              <CancelIcon color="secondary" />
            ) : (
              <ImgIcon>{deleteIcon}</ImgIcon>
            )}
          </RoundedIconButton>
        )}
        {touched && (
          <>
            <RoundedIconButton
              onClick={() => {
                setTouched(false);
                if (isNew) areSessionsTouched.current[0] = false;
                onAction(state);
              }}
            >
              {isNew ? <SaveIcon /> : <DoneIcon color="success" />}
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
