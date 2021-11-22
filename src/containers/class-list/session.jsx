import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem, Box } from "@mui/material";
import {
  TextField,
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

import { shortWeekNames } from "../../helper/constants";
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
  const {
    initialSessionData,
    index,
    classSessionsRef,
    setSessionData,
    isEdit,
    classId,
    areSessionsTouched,
  } = props;
  const dispatch = useDispatch();
  const allCoaches = useSelector((state) => state.businesses.coachesOfBusiness);
  const termsOfBusiness = useSelector((state) => state.terms.termsOfBusiness);
  // id: _id,
  //       name,
  //       dayIndex: pattern.map((item) => {
  //         return shortWeekNames.indexOf(item.day.toLowerCase());
  //       }),
  //       facility: facility,
  //       fullCapacity: fullcapacity,
  //       waitlistCapacity: waitcapacity,
  //       coachId: coachId,
  //       startDate,
  //       endDate,
  //       selectedTerm: term,
  //       startTime: pattern[0].startTime,
  //       endTime: pattern[0].endTime,

  const [touched, setTouched] = useState(false);
  const [name, setName] = useState(initialSessionData.name);
  const [facility, setFacility] = useState(initialSessionData.facility);
  const [fullCapacity, setFullCapacity] = useState(
    initialSessionData.fullCapacity
  );
  const [waitlistCapacity, setWaitlistCapacity] = useState(
    initialSessionData.waitlistCapacity
  );
  const [coachId, setCoachId] = useState(initialSessionData.coachId);
  const [selectedTermId, setSelectedTermId] = useState(
    initialSessionData.selectedTerm._id
  );
  const [startTime, setStartTime] = useState(
    new Date(initialSessionData.startTime)
  );
  const [endTime, setEndTime] = useState(new Date(initialSessionData.endTime));
  const [pattern, setPattern] = useState(
    shortWeekNames.map((_, index) =>
      initialSessionData.dayIndex.includes(index)
    )
  );

  const handleChange = (e, field) => {
    setTouched(true);
    const updatedSession = classSessionsRef[index];

    const value =
      field === "startTime" || field === "endTime" || field === "dayIndex"
        ? e
        : e.target.value;

    switch (field) {
      case "startTime":
        setStartTime(value);
        updatedSession[field] = value;
        break;
      case "endTime":
        setEndTime(value);
        updatedSession[field] = value;
        break;
      case "coachId":
        setCoachId(value);
        updatedSession[field] = value;
        break;
      case "waitlistCapacity":
        setWaitlistCapacity(value);
        updatedSession[field] = value;
        break;
      case "fullCapacity":
        setFullCapacity(value);
        updatedSession[field] = value;
        break;
      case "facility":
        setFacility(value);
        updatedSession[field] = value;
        break;
      case "name":
        setName(value);
        updatedSession[field] = value;
        break;
      case "dayIndex":
        // setPattern((pattern) => {
        //   let updatedPattern = [...pattern];
        //   updatedPattern[value] = true;
        //   const reShapedPattern = updatedPattern.reduce(
        //     (prev, current, index) => {
        //       if (current) prev.push(shortWeekNames[index]);
        //       return prev;
        //     },
        //     []
        //   );
        //   updatedSession[field] = reShapedPattern;
        //   return updatedPattern;
        // });

        setPattern((prevPattern) => {
          let updatedPattern = [...prevPattern];
          updatedPattern[value] = !updatedPattern[value];
          return updatedPattern;
        });

        break;
      case "selectedTermId":
        updatedSession["selectedTerm"] = termsOfBusiness.find(
          (term) => term._id === value
        );
        setSelectedTermId(value);
        break;
      default:
        return;
    }
  };

  const restoreDefaults = () => {
    setName(initialSessionData.name);
    setFacility(initialSessionData.facility);
    setFullCapacity(initialSessionData.fullCapacity);
    setWaitlistCapacity(initialSessionData.waitlistCapacity);
    setCoachId(initialSessionData.coachId);
    setSelectedTermId(initialSessionData.selectedTerm._id);
    setStartTime(new Date(initialSessionData.startTime));
    setEndTime(new Date(initialSessionData.endTime));
    setPattern(
      shortWeekNames.map((_, index) =>
        initialSessionData.dayIndex.includes(index)
      )
    );
    setTouched(false);
  };

  const onEditSuccess = () => {
    setTouched(false);
  };

  const onEdit = () => {
    let data = {
      id: initialSessionData.id,
      name,
      pattern: pattern.reduce((prev, current, index) => {
        if (current) prev.push(shortWeekNames[index]);
        return prev;
      }, []),
      term: termsOfBusiness.find((term) => term._id === selectedTermId),
      endTime,
      startTime,
      coachId,
      fullcapacity: fullCapacity,
      waitcapacity: waitlistCapacity,
      facility,
    };

    dispatch(editSessionOfClass({ callback: onEditSuccess, data }));
  };

  const onAdd = (edit) => {
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
    } = classSessionsRef[index];

    if (edit) {
      let data = {
        id,
        name,
        pattern: dayIndex.map((day) => shortWeekNames[day]),
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
        pattern: dayIndex.map((day) => shortWeekNames[day]),
        term,
        endTime,
        startTime,
        coachId,
        startDate: term.startDate,
        endDate: term.endDate,
        fullcapacity,
        waitcapacity,
        facility,
      };
      dispatch(addSessionToClass({ callback: onEditSuccess, data }));
    }
  };

  const isSessionEdit = useMemo(
    () => classSessionsRef[index].id,
    [classSessionsRef, index]
  );

  const handleDelete = () => {
    isSessionEdit && dispatch(deleteSessionFromClass(isSessionEdit));
    let newSessions = removeItemByIndex(classSessionsRef, index);
    setSessionData(newSessions);
    setTouched(false);
  };
  useEffect(() => {
    areSessionsTouched.current[index] = touched;
  }, [touched, areSessionsTouched, index]);
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
            value={selectedTermId}
            variant={"filled"}
            onChange={(e) => handleChange(e, "selectedTermId")}
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
            description={
              initialSessionData.selectedTerm?.startDate?.split("T")[0] || "---"
            }
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
            description={
              initialSessionData.selectedTerm?.endDate?.split("T")[0] || "---"
            }
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
          value={name}
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
          {shortWeekNames.map((day, i) => {
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
                  checked={pattern[i]}
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
          date={startTime}
          onChange={(e) => handleChange(e, "startTime")}
        />
        <TimePicker
          label="End Time"
          date={endTime}
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
          value={facility}
          onChange={(e) => handleChange(e, "facility")}
        />
        <TextField
          variant="filled"
          value={fullCapacity}
          label="Full Class Capacity"
          onChange={(e) => handleChange(e, "fullCapacity")}
        />
        <TextField
          value={waitlistCapacity}
          variant="filled"
          label="Waitlist Capacity"
          onChange={(e) => handleChange(e, "waitlistCapacity")}
        />
        <TextField
          select
          value={coachId}
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
