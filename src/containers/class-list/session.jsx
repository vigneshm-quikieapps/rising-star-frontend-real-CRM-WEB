import { useState } from "react";
import { useSelector } from "react-redux";
import { MenuItem, Box } from "@mui/material";
import {
  TextField,
  DatePicker,
  TimePicker,
  CheckBox,
  IconButton,
  ImgIcon,
  CardRow,
  DayText,
} from "../../components";

import DoneIcon from "@mui/icons-material/Done";
import deleteIcon from "../../assets/icons/icon-delete.png";

import { ShortWeekNames } from "../../helper/constants";
import { removeItemByIndex } from "../../utils";

const DeleteButton = (props) => (
  <IconButton {...props} sx={{ borderRadius: "50%" }}>
    <ImgIcon alt="delete">{deleteIcon}</ImgIcon>
  </IconButton>
);

const Session = (props) => {
  const { data, index, sessions, setSessionData, isEdit } = props;
  const [startingDate, setStartingDate] = useState(
    data.selectedTerm?.startDate
  );
  const [endingDate, setEndingDate] = useState(data.selectedTerm?.endDate);

  const allCoaches = useSelector((state) => state.businesses.coachesOfBusiness);
  const termsOfBusiness = useSelector((state) => state.terms.termsOfBusiness);

  const handleTermChange = (e) => {
    let newSessions = [...sessions];
    let selectedTerm = termsOfBusiness.find(
      ({ _id }) => _id === e.target.value
    );
    newSessions[index] = {
      ...data,
      startDate: selectedTerm.startDate,
      endDate: selectedTerm.endDate,
      selectedTerm,
    };
    setStartingDate(selectedTerm.startDate);
    setEndingDate(selectedTerm.endDate);
    setSessionData(newSessions);
  };

  const handleStartDateChange = (date) => {
    let newSessions = [...sessions];
    newSessions[index] = {
      ...data,
      startDate: date,
    };
    setSessionData(newSessions);
    setStartingDate(date);
  };

  const handleEndDateChange = (date) => {
    let newSessions = [...sessions];
    newSessions[index] = {
      ...data,
      endDate: date,
    };
    setSessionData(newSessions);
    setEndingDate(date);
  };

  const handleNameChange = (e) => {
    let newSessions = [...sessions];
    newSessions[index] = {
      ...data,
      name: e.target.value,
    };
    setSessionData(newSessions);
  };

  const handleDayIndexChange = (i) => {
    let newSessions = [...sessions];
    let newIndex = [...data.dayIndex];

    if (newIndex.includes(i)) newIndex = newIndex.filter((item) => item !== i);
    else newIndex.push(i);

    newSessions[index] = {
      ...data,
      dayIndex: newIndex,
    };
    setSessionData(newSessions);
  };

  const handleFacilityChange = (e) => {
    let newSessions = [...sessions];
    newSessions[index] = {
      ...data,
      facility: e.target.value,
    };
    setSessionData(newSessions);
  };

  const handleFullCapacityChange = (e) => {
    let newSessions = [...sessions];
    newSessions[index] = {
      ...data,
      fullCapacity: e.target.value,
    };
    setSessionData(newSessions);
  };

  const handleWaitlistCapacityChange = (e) => {
    let newSessions = [...sessions];
    newSessions[index] = {
      ...data,
      waitlistCapacity: e.target.value,
    };
    setSessionData(newSessions);
  };

  const handleCoachChange = (e) => {
    let newSessions = [...sessions];
    newSessions[index] = {
      ...data,
      coachId: e.target.value,
    };
    setSessionData(newSessions);
  };

  const handleStartTimeChange = (time) => {
    let newSessions = [...sessions];
    newSessions[index] = {
      ...data,
      startTime: time,
    };
    setSessionData(newSessions);
  };

  const handleEndTimeChange = (time) => {
    let newSessions = [...sessions];
    newSessions[index] = {
      ...data,
      endTime: time,
    };
    setSessionData(newSessions);
  };

  const handleDelete = () => {
    let newSessions = removeItemByIndex(sessions, index);
    setSessionData(newSessions);
  };

  return (
    <Box
      key={index}
      sx={{
        backgroundColor: "#dedce4",
        padding: "15px 10px .5%",
        margin: "10px 0",
      }}
    >
      <CardRow
        sx={{
          display: "grid",
          columnGap: "20px",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          margin: "15px auto",
        }}
      >
        <Box sx={{ gridColumn: "1 / span 2" }}>
          <TextField
            select
            label="term"
            value={termsOfBusiness.length ? data.selectedTerm?._id : ""}
            variant={"filled"}
            onChange={handleTermChange}
            sx={{ width: "100%" }}
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
        </Box>
        <Box>
          <DatePicker
            onChange={handleStartDateChange}
            label="Start Date"
            date={startingDate}
          />
        </Box>
        <Box>
          <DatePicker
            onChange={handleEndDateChange}
            label="End Date"
            date={endingDate}
          />
        </Box>
      </CardRow>
      <CardRow>
        <TextField
          variant="filled"
          label="Session Name"
          sx={{ width: "100%" }}
          value={data.name}
          onChange={handleNameChange}
        />
      </CardRow>

      <CardRow
        sx={{
          display: "grid",
          columnGap: "20px",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          margin: "15px auto",
        }}
      >
        <CardRow
          sx={{
            gridColumn: "1 / span 2",
            margin: "0",
            justifyContent: "space-around",
          }}
        >
          {ShortWeekNames.map((day, i) => {
            return (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "nowrap",
                }}
              >
                <DayText> {day}</DayText>
                <CheckBox
                  checked={data.dayIndex.includes(i)}
                  onClick={() => {
                    handleDayIndexChange(i);
                  }}
                />
              </Box>
            );
          })}
        </CardRow>

        <TimePicker
          label="Start time"
          date={data.startTime}
          onChange={handleStartTimeChange}
        />
        <TimePicker
          label="End time"
          date={data.endTime}
          onChange={handleEndTimeChange}
        />
      </CardRow>

      <CardRow
        sx={{
          display: "grid",
          columnGap: "20px",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
        }}
      >
        <TextField
          variant="filled"
          label="Facility"
          value={data.facility}
          onChange={handleFacilityChange}
        />
        <TextField
          variant="filled"
          value={data.fullCapacity}
          label="Full class capacity"
          onChange={handleFullCapacityChange}
        />
        <TextField
          value={data.waitlistCapacity}
          variant="filled"
          label="Waitlist capacity"
          onChange={handleWaitlistCapacityChange}
        />
        <TextField
          select
          value={allCoaches.length ? data.coachId : ""}
          label="Coach Name"
          variant="filled"
          onChange={handleCoachChange}
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
            <MenuItem value="">No coaches</MenuItem>
          )}
        </TextField>
      </CardRow>

      <CardRow
        sx={{
          justifyContent: "center",
          margin: "15px 0 5px",
        }}
      >
        <DeleteButton onClick={handleDelete} />
        {isEdit ? (
          <IconButton sx={{ borderRadius: "50%", marginLeft: "15px" }}>
            <DoneIcon
              sx={{
                color: (theme) => theme.palette.secondary.main,
                fontSize: "28px",
              }}
            />
          </IconButton>
        ) : null}
      </CardRow>
    </Box>
  );
};

export default Session;
