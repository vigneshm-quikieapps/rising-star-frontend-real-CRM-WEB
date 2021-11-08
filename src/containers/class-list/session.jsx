import { Box } from "@mui/system";
import { CardRow, DayText } from "../../components/common";
import StyledTextField from "../../components/textfield";
import deleteIcon from "../../assets/icons/icon-delete.png";
import IconButton from "../../components/icon-button";
import ImgIcon from "../../components/img-icon";
import { ShortWeekNames } from "../../helper/constants";
import StyledCheckbox from "../../components/styled-checkbox";
import { MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { removeItemByIndex } from "../../utils";
import BasicTimePicker from "../../components/time-picker";

const DeleteButton = (props) => (
  <IconButton {...props} sx={{ borderRadius: "50%", margin: "15px 0 5px" }}>
    <ImgIcon alt="delete">{deleteIcon}</ImgIcon>
  </IconButton>
);

const Session = (props) => {
  const { data, index, sessions, setSessionData } = props;
  const allCoaches = useSelector((state) => state.businesses.coachesOfBusiness);

  const handleNameChange = (e) => {
    let newSession = sessions.map((item) => {
      if (item.id === index) {
        return { ...data, name: e.target.value };
      }
      return item;
    });

    setSessionData(newSession);
  };

  const handleDayIndexChange = (i) => {
    let newSession = sessions.map((item) => {
      if (item.id === index) {
        return { ...data, dayIndex: i };
      }
      return item;
    });

    setSessionData(newSession);
  };

  const handleFacilityChange = (e) => {
    let newSession = sessions.map((item) => {
      if (item.id === index) {
        return { ...data, facility: e.target.value };
      }
      return item;
    });

    setSessionData(newSession);
  };

  const handleFullCapacityChange = (e) => {
    let newSession = sessions.map((item) => {
      if (item.id === index) {
        return { ...data, fullCapacity: e.target.value };
      }
      return item;
    });

    setSessionData(newSession);
  };

  const handleWaitlistCapacityChange = (e) => {
    let newSession = sessions.map((item) => {
      if (item.id === index) {
        return { ...data, waitlistCapacity: e.target.value };
      }
      return item;
    });

    setSessionData(newSession);
  };

  const handleCoachChange = (e) => {
    let newSession = sessions.map((item) => {
      if (item.id === index) {
        return { ...data, coachId: e.target.value };
      }
      return item;
    });

    setSessionData(newSession);
  };

  const handleStartTimeChange = (time) => {
    let newSession = sessions.map((item) => {
      if (item.id === index) {
        return { ...data, startTime: time };
      }
      return item;
    });

    setSessionData(newSession);
  };

  const handleEndTimeChange = (time) => {
    let newSession = sessions.map((item) => {
      if (item.id === index) {
        return { ...data, endTime: time };
      }
      return item;
    });
    setSessionData(newSession);
  };

  const handleDelete = () => {
    let newSession = sessions.filter((item) => {
      return item.id !== index;
    });

    setSessionData(newSession);
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
      <CardRow>
        <StyledTextField
          variant="filled"
          label="Session Name"
          sx={{ width: "100%" }}
          value={data.name}
          onChange={handleNameChange}
        />
      </CardRow>

      <CardRow
        sx={{
          margin: "15px auto",
        }}
      >
        <CardRow sx={{ width: "46%" }}>
          {ShortWeekNames.map((day, i) => {
            return (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "auto",
                  flexWrap: "nowrap",
                }}
              >
                <DayText> {day}</DayText>
                <StyledCheckbox
                  checked={data.dayIndex === i}
                  onClick={() => {
                    handleDayIndexChange(i);
                  }}
                />
              </Box>
            );
          })}
        </CardRow>

        <BasicTimePicker
          label="Start time"
          date={data.startTime}
          onChange={handleStartTimeChange}
        />
        <BasicTimePicker
          label="End time"
          date={data.endTime}
          onChange={handleEndTimeChange}
        />
      </CardRow>

      <CardRow>
        <StyledTextField
          variant="filled"
          label="Facility"
          value={data.facility}
          sx={{ width: "23%", margin: 0 }}
          onChange={handleFacilityChange}
        />

        <StyledTextField
          variant="filled"
          value={data.fullCapacity}
          label="Full class capacity"
          sx={{ width: "23%", margin: 0 }}
          onChange={handleFullCapacityChange}
        />

        <StyledTextField
          value={data.waitlistCapacity}
          variant="filled"
          label="Waitlist capacity"
          sx={{ width: "23%", margin: 0 }}
          onChange={handleWaitlistCapacityChange}
        />

        <StyledTextField
          select
          value={allCoaches.length ? data.coachId : ""}
          sx={{ width: "23%", margin: 0 }}
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
        </StyledTextField>
      </CardRow>

      <CardRow
        sx={{
          justifyContent: "center",
        }}
      >
        <DeleteButton onClick={handleDelete} />
      </CardRow>
    </Box>
  );
};

export default Session;
