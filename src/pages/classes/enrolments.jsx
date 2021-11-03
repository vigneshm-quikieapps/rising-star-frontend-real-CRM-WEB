import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Box, MenuItem } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { Card, CardRow, HeadingText } from "../../components/common";
import {
  TextField,
  Table as CustomTable,
  ImgIcon,
  IconButton,
  Pagination,
} from "../../components";
import { Outputs } from "../../containers/outputs";
import moreIcon from "../../assets/icons/icon-more.png";
import verifiedIcon from "../../assets/icons/icon-allergy.png";
import { objectToArray } from "../../utils";
import { enrollmentHeaders } from "../../helper/constants";
import { getSessionInAclassByTermId } from "../../redux/action/sessionAction";
import { getTermsOfClass } from "../../redux/action/terms-actions";
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

const ClassEnrollments = () => {
  const { id } = useParams();
  const members = useSelector((state) => state.members);
  const allTerms = useSelector((state) => state.terms.termsOfClass);
  const allSessions = useSelector(
    (state) => state.sessions.sessionListInAclassByterm
  );
  const [page, setPage] = useState(members.page);
  const [pages] = useState(members.totalPages);
  const [tableRowData, setTableRowData] = useState([]);
  const [termsData, setTermsData] = useState([]);
  const [sessionsData, setSessionsData] = useState([]);
  const [selectedTermId, setSelectedTermId] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [sessionDetailsArray, setSessionDetailsArray] = useState([]);

  const dispatch = useDispatch();

  const pagination = (
    <Pagination
      count={pages}
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
      <HeadingText>Members</HeadingText>
      <CardRow>
        <UpIconButton />
        <MoreIconButton />
      </CardRow>
    </CardRow>
  );

  const setTableRows = useCallback(() => {
    let sessionMembersDetailsArray = members.membersOfSession.map(
      ({
        droppedDate,
        discontinuationReason,
        member,
        memberConsent,
        startDate,
        registeredDate,
        enrolledStatus,
      }) => {
        let date = registeredDate?.split("T");
        let enrolledDate = date ? `${date[0]}/${date[1]}` : "N/A";
        return {
          name: member.name,
          allergies: memberConsent && memberConsent.consent.allergies,
          conditions: memberConsent && memberConsent.consent.condition,
          startDate: startDate ? startDate.split("T")[0] : "N/A",
          enrolledDate,
          enrolledStatus: enrolledStatus,
          discontinuationReason: discontinuationReason,
          droppedDate: droppedDate ? droppedDate : "N/A",
        };
      }
    );
    let finalRowDataArray = sessionMembersDetailsArray.map((item, index) => {
      let itemArray = objectToArray(item);
      return {
        id: index,
        items: itemArray.map((i) => {
          if (i[0] === "allergies" || i[0] === "conditions") {
            return <ImgIcon alt="verify">{verifiedIcon}</ImgIcon>;
          }
          return i[1];
        }),
      };
    });
    setTableRowData(finalRowDataArray);
  }, [members.membersOfSession]);

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
    members?.membersOfSession?.length && setTableRows();
  }, [members, allTerms, setTableRows, selectedSession]);

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
    setTableRowData([]);
  }, [dispatch, id, selectedTermId]);

  useEffect(() => {
    const value = sessionsData[0] ? sessionsData[0].id : "";
    setSelectedSession(value);
  }, [sessionsData]);

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
    selectedSession && dispatch(getMembersOfSession(selectedSession));
    let selectedSessionObj = allSessions.find(
      (item) => item._id === selectedSession
    );
    if (selectedSessionObj) {
      const {
        term,
        pattern,
        status,
        coach,
        fullcapacity,
        fullcapacityfilled,
        waitcapacity,
        waitcapacityfilled,
      } = selectedSessionObj;

      let sessionsDataObject = {
        "Start Date": term.startDate.split("T")[0],
        "End Date": term.endDate.split("T")[0],
        "Start Time": pattern[0].startTime.split("T")[0],
        "End Time": pattern[0].endTime.split("T")[0],
        Pattern: pattern[0].day,
        Facility: "Gym Hall (static)",
        "Session Enrolment Status": status,
        "Coach Name": coach?.name,
        "Full class capacity": fullcapacity,
        Enrolled: fullcapacityfilled,
        "Waitlist capacity": waitcapacity,
        "Waitlist Enrolled": waitcapacityfilled,
      };

      let sessionsDataArray = objectToArray(sessionsDataObject);
      setSessionDetailsArray(sessionsDataArray);
    }
  }, [selectedSession, dispatch, allSessions]);

  return (
    <Box>
      <Card sx={{ height: "249px" }}>
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
            sx={{ width: "272px" }}
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
              <MenuItem value=""></MenuItem>
            )}
          </TextField>
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

      <CustomTable
        heading={heading}
        headers={enrollmentHeaders}
        rows={tableRowData}
        pagination={pagination}
      />
    </Box>
  );
};

export default ClassEnrollments;
