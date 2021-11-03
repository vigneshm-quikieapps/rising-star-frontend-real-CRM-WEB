import { useState, useEffect, useCallback } from "react";
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
import { attendanceRows, attendanceHeaders } from "../../helper/constants";
import { objectToArray } from "../../utils";
import { getTermsOfClass } from "../../redux/action/terms-actions";
import {
  getAttendanceOfSessionByDate,
  getSessionInAclassByTermId,
} from "../../redux/action/sessionAction";
import { getMembersOfSession } from "../../redux/action/memberAction";
import verifiedIcon from "../../assets/icons/icon-allergy.png";

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
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const allTerms = useSelector((state) => state.terms.termsOfClass);
  const [termsData, setTermsData] = useState([]);
  const members = useSelector((state) => state.members);
  const allSessions = useSelector(
    (state) => state.sessions.sessionListInAclassByterm
  );
  const attendanceList = useSelector((state) => state.sessions.attendanceList);
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedTermId, setSelectedTermId] = useState("");
  const [sessionDetailsArray, setSessionDetailsArray] = useState([]);
  const [sessionsData, setSessionsData] = useState([]);
  const [tableRowData, setTableRowData] = useState([]);

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

  const handleTermChange = (e) => {
    setSelectedTermId(e.target.value);
  };

  const handleSessionChange = (e) => {
    setSelectedSession(e.target.value);
  };

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
  }, [members, allTerms]);

  useEffect(() => {
    const value = termsData[0] ? termsData[0].id : "";
    setSelectedTermId(value);
  }, [termsData]);

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

  useEffect(() => {
    if (selectedTermId !== "") {
      dispatch(
        getSessionInAclassByTermId({
          classId: id,
          termId: selectedTermId,
        })
      );
    } else {
      setSessionsData([]);
    }

    setSessionDetailsArray([]);
  }, [dispatch, id, selectedTermId]);

  useEffect(() => {
    const value = sessionsData[0] ? sessionsData[0].id : "";
    setSelectedSession(value);
  }, [sessionsData]);

  useEffect(() => {
    selectedSession && dispatch(getMembersOfSession(selectedSession));
    let selectedSessionObj = allSessions.find(
      (item) => item._id === selectedSession
    );
    if (selectedSessionObj) {
      const { pattern, coach, fullcapacity, fullcapacityfilled } =
        selectedSessionObj;
      let sessionsDataObject = {
        "Start Time": pattern[0].startTime.split("T")[0],
        "End Time": pattern[0].endTime.split("T")[0],
        Facility: "Gym Hall (static)",
        "Coach Name": coach.name,
        Pattern: pattern[0].day,
        "Full class capacity": fullcapacity,
        Enrolled: fullcapacityfilled,
      };

      let sessionsDataArray = objectToArray(sessionsDataObject);
      setSessionDetailsArray(sessionsDataArray);
    }
  }, [selectedSession, dispatch, allSessions]);

  useEffect(() => {
    if (selectedSession) {
      let params = {
        sessionId: selectedSession,
        date: date.toISOString().split("T")[0],
      };
      dispatch(getAttendanceOfSessionByDate(params));
    }
  }, [date, dispatch, selectedSession]);

  // const setTableRows = useCallback(() => {
  //   let attendanceRecords = attendanceList?.attendance?.records;
  //   let attendanceArray = attendanceRecords?.map((item) => {
  //     const {
  //       attended,
  //       comments,
  //       member: { name },
  //       contacts,
  //       memberConsent: {
  //         consent: { allergies, condition },
  //       },
  //     } = item;
  //     return {
  //       name,
  //       parentContact: null,
  //       ecContact: contacts[0]?.contact,
  //       allergies: allergies,
  //       conditions: condition,
  //       paymentStatus: null,
  //       startDate: null,
  //       attended,
  //       comments: comments || "",
  //     };
  //   });

  //   let finalRowDataArray = attendanceArray.map((item, index) => {
  //     let itemArray = objectToArray(item);
  //     return {
  //       id: index,
  //       items: itemArray.map((i) => {
  //         if (i[0] === "allergies" || i[0] === "conditions") {
  //           return <ImgIcon alt="verify">{verifiedIcon}</ImgIcon>;
  //         }
  //         return i[1];
  //       }),
  //     };
  //   });
  //   setTableRowData(finalRowDataArray);
  // }, [attendanceList]);

  useEffect(() => {
    if (attendanceList?.attendance) {
      // setTableRows();
    }
  }, [
    attendanceList,
    //  setTableRows
  ]);

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
            {termsData ? (
              termsData.map(({ id, termName }) => (
                <MenuItem key={id} value={id}>
                  {termName}
                </MenuItem>
              ))
            ) : (
              <MenuItem value=""></MenuItem>
            )}
          </TextField>

          <TextField
            select
            label="Session"
            id="demo-simple-select"
            value={selectedSession || ""}
            onChange={handleSessionChange}
            variant="filled"
            sx={{ width: "272px", marginRight: "15px" }}
          >
            {sessionsData ? (
              sessionsData.map(({ id, sessionName }) => {
                return (
                  <MenuItem key={id} value={id}>
                    {sessionName}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem value={""}></MenuItem>
            )}
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
