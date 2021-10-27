import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  AccordionContainer,
  CardRow,
  DayText,
  Description,
  HeadingText,
  ModalContainer,
} from "../../components/common";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "../../components/icon-button";
import { Outputs } from "../outputs";
import { objectToArray } from "../../utils";
import StyledTextField from "../../components/textfield";
import {
  AccordionDetails,
  AccordionSummary,
  MenuItem,
  TextField,
} from "@mui/material";
import Accordion from "../../components/accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GradientButton from "../../components/gradient-button";
import ImgIcon from "../../components/img-icon";
import plusIcon from "../../assets/icons/icon-add.png";
import deleteIcon from "../../assets/icons/icon-delete.png";
import CustomTable from "../../components/table";
import StyledPagination from "../../components/pagination";
import StyledCheckbox from "../../components/styled-checkbox";
import DatePicker from "./../../components/date-picker";
import { ShortWeekNames } from "../../helper/constants";

const CrossIconButton = () => (
  <IconButton>
    <CloseIcon />
  </IconButton>
);

const DeleteButton = () => (
  <IconButton sx={{ borderRadius: "50%" }}>
    <ImgIcon alt="delete">{deleteIcon}</ImgIcon>
  </IconButton>
);

const classId = {
  "Class ID": "DL39020458",
};

const sessionId = {
  "Session ID": "00394827321",
};

const sessions = Array(3)
  .fill(1)
  .map((_, index) => {
    return {
      id: index,
      item: {
        sessionName: `session ${index}`,
        day: ShortWeekNames[index % 6],
        facility: "Gym hall",
        fullCapacity: 20,
        waitlistCapacity: 10,
        coachName: `coach ${index * 2}`,
      },
    };
  });

const headers = [
  "Charge Name",
  "Amount",
  "Mandatory",
  "Pay Frequency",
  "Action",
];

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date("2014-08-18T21:11:54"));
  const [sessionsBuffer, setSessionsBuffer] = React.useState(sessions);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const rows = Array(3)
    .fill(1)
    .map((_, index) => {
      return {
        id: index,
        onClick: () => {
          console.log("row ", index);
        },
        items: [
          <StyledTextField
            sx={{ width: "100%" }}
            placeholder={"Charge Name"}
            onChange={() => {}}
          ></StyledTextField>,
          <StyledTextField
            sx={{ width: "45%" }}
            placeholder={"Amount"}
            onChange={() => {}}
          ></StyledTextField>,
          <StyledCheckbox />,
          <StyledTextField
            select
            sx={{ width: "100%" }}
            value={"select "}
            onChange={() => {}}
          >
            <MenuItem value="EQUALS">option 1</MenuItem>
            <MenuItem value="NO_EQUALS">option 2</MenuItem>
          </StyledTextField>,
          <DeleteButton />,
        ],
      };
    });

  const pagination = (
    <StyledPagination count={5} page={page} onChange={handleChange} />
  );

  return (
    <Box>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "hidden" }}
      >
        <Box
          sx={{
            overflow: "hidden",
            width: "80%",
            height: "90%",
            margin: "2.5% 10%",
            borderRadius: "20px",
            border: "solid 1px #f2f1f6",
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              overflow: "scroll",
              width: "100%",
              height: "100%",
              padding: "0 15px 5px",
            }}
          >
            <CardRow
              sx={{
                position: "fixed",
                width: "78%",
                backgroundColor: "#fff",
                zIndex: 11,
                marginTop: 0,
                padding: "10px 0",
                boxShadow: "0 3px 6px #8888",
              }}
            >
              <HeadingText id="modal-modal-title" variant="h6" component="h2">
                Class Definition and Schedule
              </HeadingText>
              <CrossIconButton />
            </CardRow>
            <CardRow sx={{ marginTop: "6%" }}>
              <Outputs arr={objectToArray(classId)} />
            </CardRow>
            <CardRow>
              <Description
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  margin: "17px 0px 30px 0px",
                }}
              >
                Basic Information
              </Description>
            </CardRow>
            <CardRow sx={{ marginBottom: "20px" }}>
              <StyledTextField
                sx={{ width: "30%" }}
                label="Class Name*"
                onChange={() => {}}
              ></StyledTextField>

              <StyledTextField
                sx={{ width: "30%" }}
                label="Bussiness Name*"
                onChange={() => {}}
              ></StyledTextField>

              <StyledTextField
                select
                sx={{ width: "30%" }}
                label="Class Status"
                value={"select "}
                onChange={() => {}}
              >
                <MenuItem value="EQUALS">Equals to</MenuItem>
                <MenuItem value="NO_EQUALS">Not equals to</MenuItem>
              </StyledTextField>
            </CardRow>

            <CardRow sx={{ marginBottom: "20px" }}>
              <StyledTextField
                select
                sx={{ width: "30%" }}
                label="Registration Consent Form"
                value={"select "}
                onChange={() => {}}
              >
                <MenuItem value="EQUALS">option 1</MenuItem>
                <MenuItem value="NO_EQUALS">option 2</MenuItem>
              </StyledTextField>

              <StyledTextField
                select
                sx={{ width: "30%" }}
                label="Class Category*"
                value={"select "}
                onChange={() => {}}
              >
                <MenuItem value="EQUALS">Equals to</MenuItem>
                <MenuItem value="NO_EQUALS">Not equals to</MenuItem>
              </StyledTextField>

              <StyledTextField
                select
                sx={{ width: "30%" }}
                label="Evaluation Scheme*"
                value={"select "}
                onChange={() => {}}
              >
                <MenuItem value="EQUALS">Equals to</MenuItem>
                <MenuItem value="NO_EQUALS">Not equals to</MenuItem>
              </StyledTextField>
            </CardRow>

            <CardRow>
              <StyledTextField
                sx={{
                  width: "100%",
                  "& .MuiInputBase-root": {
                    height: "auto",
                  },
                }}
                multiline
                rows={4}
                placeholder={"About this class"}
                onChange={(e) => {}}
              ></StyledTextField>
            </CardRow>

            <CardRow>
              <AccordionContainer>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Enrolment Controls</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <CardRow sx={{ marginTop: "10px" }}>
                      <StyledTextField
                        select
                        sx={{ width: "40%" }}
                        label="Age"
                        value={"select "}
                        onChange={() => {}}
                      >
                        <MenuItem value="EQUALS">option 1</MenuItem>
                        <MenuItem value="NO_EQUALS">option 2</MenuItem>
                      </StyledTextField>
                      <StyledTextField
                        select
                        sx={{ width: "40%" }}
                        label="Gender"
                        value={"select "}
                        onChange={() => {}}
                      >
                        <MenuItem value="EQUALS">option 1</MenuItem>
                        <MenuItem value="NO_EQUALS">option 2</MenuItem>
                      </StyledTextField>
                    </CardRow>
                  </AccordionDetails>
                </Accordion>
              </AccordionContainer>
            </CardRow>

            <CardRow>
              <AccordionContainer>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <CardRow sx={{ margin: "10px 0", width: "100%" }}>
                      <Typography>Charges</Typography>
                      <GradientButton>
                        <ImgIcon alt="plus">{plusIcon}</ImgIcon>Add Charge
                      </GradientButton>
                    </CardRow>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      padding: 0,
                      backgroundColor: "rgba(219, 216, 227, 0.5)",
                    }}
                  >
                    <CustomTable
                      headers={headers}
                      rows={rows}
                      pagination={pagination}
                    />
                  </AccordionDetails>
                </Accordion>
              </AccordionContainer>
            </CardRow>

            <CardRow>
              <AccordionContainer>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <CardRow sx={{ width: "100%", padding: "0 10px 0 0" }}>
                      <Typography>Class Schedule</Typography>
                      <GradientButton>
                        <ImgIcon alt="plus">{plusIcon}</ImgIcon>Add Session
                      </GradientButton>
                    </CardRow>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      padding: 0,
                      backgroundColor: "rgba(219, 216, 227, 0.5)",
                    }}
                  >
                    <CardRow>
                      <Outputs arr={objectToArray(sessionId)} />
                    </CardRow>
                    <CardRow
                      sx={{ marginTop: "1%", justifyContent: "space-between" }}
                    >
                      <StyledTextField
                        select
                        label="term"
                        value={"select "}
                        variant={"filled"}
                        onChange={() => {}}
                        sx={{ width: "55%" }}
                      >
                        <MenuItem value="EQUALS">option 1</MenuItem>
                        <MenuItem value="NO_EQUALS">option 2</MenuItem>
                      </StyledTextField>

                      <DatePicker
                        label="Date"
                        date={date}
                        onChange={(newDate) => setDate(newDate)}
                      />

                      <DatePicker
                        label="Date"
                        date={date}
                        onChange={(newDate) => setDate(newDate)}
                      />
                    </CardRow>
                    <CardRow>
                      <Description
                        sx={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          margin: "17px 0px 30px 0px",
                        }}
                      >
                        Sessions
                      </Description>
                    </CardRow>

                    {sessionsBuffer.length &&
                      sessionsBuffer.map((session, index) => {
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
                                value={session.item.sessionName}
                                onChange={() => {}}
                              ></StyledTextField>
                            </CardRow>
                            <CardRow
                              sx={{
                                width: "30%",
                                margin: "15px auto",
                              }}
                            >
                              {ShortWeekNames.map((day, index) => {
                                return (
                                  <Box
                                    sx={{
                                      width: "3.5%",
                                      margin: "auto",
                                    }}
                                  >
                                    <DayText> {day}</DayText>
                                    <StyledCheckbox />
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
                      })}
                  </AccordionDetails>
                </Accordion>
              </AccordionContainer>
            </CardRow>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
