import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Output,
} from "../../components";

import {
  Done as DoneIcon,
  Undo as RestoreDefaultsIcon,
} from "@mui/icons-material";
import deleteIcon from "../../assets/icons/icon-delete.png";

import { ShortWeekNames } from "../../helper/constants";
import { removeItemByIndex } from "../../utils";
import {
  addSessionToClass,
  deleteSessionFromClass,
  editSessionOfClass,
} from "../../redux/action/class-actions";

const DeleteButton = (props) => (
  <IconButton {...props} sx={{ borderRadius: "50%" }}>
    <ImgIcon alt="delete">{deleteIcon}</ImgIcon>
  </IconButton>
);

const Session = (props) => {
  const { data, index, sessions, setSessionData, isEdit, classId } = props;
  const [touched, setTouched] = useState(false);
  const dispatch = useDispatch();
  const allCoaches = useSelector((state) => state.businesses.coachesOfBusiness);
  const termsOfBusiness = useSelector((state) => state.terms.termsOfBusiness);

  const initialData = useRef(data);

  const handleChange = (e, field) => {
    setTouched(true);
    let newSessions = [...sessions];
    let updatedSession = { ...data };

    const value =
      field === "startTime" || field === "endTime" || field === "dayIndex"
        ? e
        : e.target.value;

    switch (field) {
      case "startTime":
      case "endTime":
      case "coachId":
      case "waitlistCapacity":
      case "fullCapacity":
      case "facility":
      case "name":
        updatedSession[field] = value;
        break;

      case "dayIndex":
        let newIndex = [...data.dayIndex];
        if (newIndex.includes(value))
          newIndex = newIndex.filter((item) => item !== value);
        else newIndex.push(value);
        updatedSession[field] = newIndex;
        break;

      case "selectedTerm":
        let selectedTerm = termsOfBusiness.find(({ _id }) => _id === value);

        updatedSession[field] = selectedTerm;
        break;

      default:
    }

    newSessions[index] = updatedSession;
    setSessionData(newSessions);
  };

  const restoreDefaults = () => {
    let newSessions = [...sessions];
    newSessions[index] = { ...initialData.current };

    setSessionData(newSessions);
    setTouched(false);
  };

  const onEditSuccess = () => {
    setTouched(false);
  };

  const onEdit = (edit) => {
    const {
      id,
      name,
      dayIndex,
      selectedTerm: term,
      endTime,
      startTime,
      coachId,
      fullCapacity: fullcapacity,
      waitlistCapacity: waitcapacity,
      facility,
    } = sessions[index];

    if (edit) {
      let data = {
        id,
        name,
        pattern: dayIndex.map((day) => ShortWeekNames[day]),
        term,
        endTime,
        startTime,
        coachId,
        fullcapacity,
        waitcapacity,
        facility,
      };
      dispatch(editSessionOfClass({ callback: onEditSuccess, data }));
    } else {
      let data = {
        classId,
        name,
        pattern: dayIndex.map((day) => ShortWeekNames[day]),
        term,
        endTime,
        startTime,
        coachId,
        fullcapacity,
        waitcapacity,
        facility,
      };
      dispatch(addSessionToClass({ callback: onEditSuccess, data }));
    }
  };

  const isSessionEdit = sessions[index].id;

  const handleDelete = () => {
    isSessionEdit && dispatch(deleteSessionFromClass(isSessionEdit));
    let newSessions = removeItemByIndex(sessions, index);
    setSessionData(newSessions);
    setTouched(false);
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
            label="Term"
            value={termsOfBusiness.length ? data.selectedTerm?._id : ""}
            variant={"filled"}
            onChange={(e) => handleChange(e, "selectedTerm")}
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
          <Output
            title="Start Date"
            description={data.selectedTerm?.startDate?.split("T")[0]}
          />
          {/* <DatePicker
            disabled
            onChange={(e) => handleChange(e, "startDate")}
            label="Start Date"
            date={startingDate}
          /> */}
        </Box>
        <Box>
          <Output
            title="End Date"
            description={data.selectedTerm?.endDate?.split("T")[0]}
          />
          {/* <DatePicker
            disabled
            onChange={(e) => handleChange(e, "endDate")}
            label="End Date"
            date={endingDate}
          /> */}
        </Box>
      </CardRow>
      <CardRow>
        <TextField
          variant="filled"
          label="Session Name"
          sx={{ width: "100%" }}
          value={data.name}
          onChange={(e) => handleChange(e, "name")}
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
                <DayText sx={{ textTransform: "capitalize" }}> {day}</DayText>
                <CheckBox
                  checked={data.dayIndex.includes(i)}
                  onClick={() => {
                    handleChange(i, "dayIndex");
                  }}
                />
              </Box>
            );
          })}
        </CardRow>

        <TimePicker
          label="Start Time"
          date={data.startTime}
          onChange={(e) => handleChange(e, "startTime")}
        />
        <TimePicker
          label="End Time"
          date={data.endTime}
          onChange={(e) => handleChange(e, "endTime")}
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
          onChange={(e) => handleChange(e, "facility")}
        />
        <TextField
          variant="filled"
          value={data.fullCapacity}
          label="Full Class Capacity"
          onChange={(e) => handleChange(e, "fullCapacity")}
        />
        <TextField
          value={data.waitlistCapacity}
          variant="filled"
          label="Waitlist Capacity"
          onChange={(e) => handleChange(e, "waitlistCapacity")}
        />
        <TextField
          select
          value={allCoaches.length ? data.coachId : ""}
          label="Coach Name"
          variant="filled"
          onChange={(e) => handleChange(e, "coachId")}
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
        {!touched || !isSessionEdit ? (
          <DeleteButton onClick={handleDelete} />
        ) : null}
        {touched && isEdit && (
          <IconButton
            sx={{ borderRadius: "50%", marginLeft: "15px" }}
            onClick={() => onEdit(isSessionEdit?.length)}
          >
            <DoneIcon color="success" />
          </IconButton>
        )}
        {isEdit && touched && isSessionEdit?.length && (
          <IconButton
            sx={{ borderRadius: "50%", marginLeft: "15px" }}
            onClick={restoreDefaults}
          >
            <RestoreDefaultsIcon />
          </IconButton>
        )}
      </CardRow>
    </Box>
  );
};

export default Session;
