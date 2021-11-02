import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Box, MenuItem } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { Card, CardRow, HeadingText } from "../../components/common";
import {
  TextField,
  Table as CustomTable,
  DatePicker,
  ImgIcon,
  IconButton,
  Pagination,
} from "../../components";
import { Outputs, TitleDescription } from "../../containers/outputs";
import moreIcon from "../../assets/icons/icon-more.png";
import {
  attendanceRows,
  attendanceHeaders,
  attendanceObject2,
} from "../../helper/constants";
import { objectToArray } from "../../utils";
import { getTermsOfClass } from "../../redux/action/terms-actions";
import { getSessionsByTermId } from "../../redux/action/sessionAction";
import { getMembersOfSession } from "../../redux/action/memberAction";

const MoreIconButton = () => (
  <IconButton>
    <ImgIcon alt="more">{moreIcon}</ImgIcon>
  </IconButton>
);

const UpIconButton = () => (
  <IconButton sx={{ marginRight: "10px" }}>
    <KeyboardArrowUpIcon />
  </IconButton>
);

const ClassAttendance = () => {
  const { id } = useParams();
  const [date, setDate] = useState(new Date("2014-08-18T21:11:54"));
  const [page, setPage] = useState(1);
  const classObj = useSelector((state) => state.classes.class);
  const [classInfoArray, setClassInfoArray] = useState([]);
  const dispatch = useDispatch();
  const allTerms = useSelector((state) => state.terms.termsOfClass);
  const [termsData, setTermsData] = useState([]);
  const members = useSelector((state) => state.members);
  const allSessions = useSelector((state) => state.sessions.sessionsOfTerm);
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedTermId, setSelectedTermId] = useState("");
  const [sessionDetailsArray, setSessionDetailsArray] = useState([]);
  const [sessionsData, setSessionsData] = useState([]);

  const setClassInfo = () => {
    const { business } = classObj;
    const classInfoObject = {
      // "Class ID": "DL39020458",
      "City / Town": business?.city,
      "Post Code": business?.postcode,
      Status: business?.status,
    };
    setClassInfoArray(objectToArray(classInfoObject));
  };

  const handleTermChange = (e) => {
    let termId = e.target.value;
    setSelectedTermId(termId);
    termId !== 0 ? dispatch(getSessionsByTermId(termId)) : setSessionsData([]);
    setSelectedSession(0);
    setSessionDetailsArray([]);
  };

  const renderSessionData = (Obj) => {
    const {
      _id,
      term,
      pattern,
      status,
      coach,
      fullcapacity,
      fullcapacityfilled,
      waitcapacity,
      waitcapacityfilled,
    } = Obj;

    dispatch(getMembersOfSession(_id));

    let sessionsDataObject = {
      "Start Date": term.startDate.split("T")[0],
      "End Date": term.endDate.split("T")[0],
      "Start Time": pattern[0].startTime.split("T")[0],
      "End Time": pattern[0].endTime.split("T")[0],
      Pattern: pattern[0].day,
      Facility: "Gym Hall (static)",
      "Session Enrolment Status": status,
      "Coach Name": coach.name,
      "Full class capacity": fullcapacity,
      Enrolled: fullcapacityfilled,
      "Waitlist capacity": waitcapacity,
      "Waitlist Enrolled": waitcapacityfilled,
    };

    let sessionsDataArray = objectToArray(sessionsDataObject);
    setSessionDetailsArray(sessionsDataArray);
  };
  const handleSessionChange = (e) => {
    let sessionId = e.target.value;
    let selectedSessionObj =
      allSessions.length && allSessions.find((e) => e._id === sessionId);
    setSelectedSession(selectedSessionObj);
    selectedSessionObj !== undefined
      ? renderSessionData(selectedSessionObj)
      : setSessionDetailsArray([]);
  };

  const pagination = (
    <Pagination
      count={3}
      page={page}
      onChange={(event, value) => setPage(value)}
    />
  );
  const heading = (
    <CardRow
      sx={{
        margin: "10px 20px",
      }}
    >
      <HeadingText>Registered Members</HeadingText>
      <CardRow>
        <UpIconButton />
        <MoreIconButton />
      </CardRow>
    </CardRow>
  );

  const arr2 = objectToArray(attendanceObject2);

  useEffect(() => {
    classObj && setClassInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classObj]);

  useEffect(() => {
    dispatch(getTermsOfClass(id));
  }, [dispatch, id]);

  useEffect(() => {
    // setting terms data
    let termOptions =
      allTerms.length &&
      allTerms.map(({ _id, label }) => {
        return {
          id: _id,
          termName: label,
        };
      });
    setTermsData(termOptions);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members, allTerms]);

  useEffect(() => {
    let sessionOptions =
      allSessions.length &&
      allSessions.map(({ _id, name }) => {
        return {
          id: _id,
          sessionName: name,
        };
      });

    setSessionsData(sessionOptions);
  }, [allSessions]);

  return (
    <Box>
      <Card sx={{ height: "194px" }}>
        <CardRow sx={{ justifyContent: "flex-start" }}>
          <TextField
            select
            id="demo-simple-select"
            value={selectedTermId}
            label="Term"
            onChange={handleTermChange}
            variant="filled"
            sx={{ width: "272px", marginRight: "15px" }}
          >
            <MenuItem value={0}>Select Term</MenuItem>
            {termsData &&
              termsData.map(({ id, termName }) => (
                <MenuItem key={id} value={id}>
                  {termName}
                </MenuItem>
              ))}
          </TextField>

          <TextField
            select
            label="Session"
            id="demo-simple-select"
            value={selectedSession ? selectedSession._id : ""}
            onChange={handleSessionChange}
            variant="filled"
            sx={{ width: "272px", marginRight: "15px" }}
          >
            <MenuItem value={0}>Select Session</MenuItem>
            {sessionsData &&
              sessionsData.map(({ id, sessionName }) => {
                return (
                  <MenuItem key={id} value={id}>
                    {sessionName}
                  </MenuItem>
                );
              })}
          </TextField>
          <DatePicker
            label="Date"
            date={date}
            onChange={(newDate) => setDate(newDate)}
            sx={{ width: "272px" }}
          />
        </CardRow>

        <CardRow
          sx={{
            marginTop: "15px",
            justifyContent: "flex-start",
          }}
        >
          <Outputs arr={sessionDetailsArray} />
        </CardRow>
      </Card>

      <CardRow sx={{ margin: "5px 0", justifyContent: "flex-start" }}>
        <TitleDescription
          title={"Last Updated by"}
          description={"Bethany Lafferty"}
        />
        <TitleDescription
          title={"Last Updated at"}
          description={"13/09/2021 9:32 am"}
        />
      </CardRow>
      <CustomTable
        heading={heading}
        headers={attendanceHeaders}
        rows={attendanceRows}
        pagination={pagination}
      />
    </Box>
  );
};

export default ClassAttendance;
