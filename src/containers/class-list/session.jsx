import { Box } from "@mui/system";
import { CardRow, DayText } from "../../components/common";
import StyledTextField from "../../components/textfield";
import deleteIcon from "../../assets/icons/icon-delete.png";
import IconButton from "../../components/icon-button";
import ImgIcon from "../../components/img-icon";
import { ShortWeekNames } from "../../helper/constants";
import StyledCheckbox from "../../components/styled-checkbox";
import { MenuItem } from "@mui/material";
import { useState } from "react";

const DeleteButton = () => (
  <IconButton sx={{ borderRadius: "50%" }}>
    <ImgIcon alt="delete">{deleteIcon}</ImgIcon>
  </IconButton>
);

const Session = (props) => {
  const { data: session, index } = props;
  const [sessionName, setSessionName] = useState("");
  const [sessionDayIndex, setSessionDayIndex] = useState(-1);
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
          value={sessionName}
          onChange={(e) => {
            setSessionName(e.target.value);
          }}
        ></StyledTextField>
      </CardRow>
      <CardRow
        sx={{
          width: "330px",
          margin: "15px auto",
        }}
      >
        {ShortWeekNames.map((day, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "auto",
                flexWrap: "nowrap",
              }}
            >
              <DayText> {day}</DayText>
              <StyledCheckbox
                checked={index === sessionDayIndex}
                onClick={() => {
                  setSessionDayIndex(index);
                }}
              />
            </Box>
          );
        })}
      </CardRow>
      <CardRow>
        <StyledTextField
          variant="filled"
          label="Facility"
          // value={session.item.facility}
          sx={{ width: "23%", margin: 0 }}
          onChange={() => {}}
        ></StyledTextField>

        <StyledTextField
          variant="filled"
          // value={session.item.fullCapacity}
          label="Full class capacity"
          sx={{ width: "23%", margin: 0 }}
          onChange={() => {}}
        ></StyledTextField>

        <StyledTextField
          // value={session.item.waitlistCapacity}
          variant="filled"
          label="Waitlist capacity"
          sx={{ width: "23%", margin: 0 }}
          onChange={() => {}}
        ></StyledTextField>

        <StyledTextField
          select
          // value={session.item.coachName}
          sx={{ width: "23%", margin: 0 }}
          label="Coach Name"
          variant="filled"
          onChange={() => {}}
        >
          <MenuItem value="EQUALS">option 1</MenuItem>
          <MenuItem value="NO_EQUALS">option 2</MenuItem>
        </StyledTextField>
      </CardRow>

      <CardRow
        sx={{
          justifyContent: "center",
        }}
      >
        <DeleteButton />
      </CardRow>
    </Box>
  );
};

export default Session;
