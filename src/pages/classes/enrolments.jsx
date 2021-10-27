import { useParams } from "react-router";
import {
  Card,
  CardRow,
  HeadingText,
  SubHeadingText,
} from "../../components/common";
import { Box, MenuItem } from "@mui/material";
import TextField from "../../components/textfield";
import CustomTable from "../../components/table";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ImgIcon from "../../components/img-icon";
import IconButton from "../../components/icon-button";
import moreIcon from "../../assets/icons/icon-more.png";
import { objectToArray } from "../../utils";
import { enrollmentHeaders } from "../../helper/constants";
import { Outputs } from "../../containers/outputs";
import Pagination from "./../../components/pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMembersEnrolledInASession } from "../../redux/action/sessionAction";
import verfiedIcon from "../../assets/icons/icon-allergy.png";
import BasicModal from "../../containers/modal/modal";
import { getClassById } from "../../redux/action/class-actions";
import {
  getAllTerms,
  getSessionsByTermId,
} from "../../redux/action/terms-actions";
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

const ClassEnrolments = () => {
  const allMembers = useSelector((state) => state.sessions.allMembersEnrolled);
  const classObj = useSelector((state) => state.classes.class);
  const allTerms = useSelector((state) => state.terms.allTerms);
  const allSessions = useSelector((state) => state.terms.termSessions);
  const { id } = useParams();
  const [page, setPage] = useState(allMembers.page);
  const [pages] = useState(allMembers.totalPages);
  const [tableRowData, setTableRowData] = useState([]);
  const [classInfoArray, setClassInfoArray] = useState([]);
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

  const setTableRows = () => {
    let sessionMembersDetailsArray = allMembers.docs.map((item) => {
      return {
        name: item.member.name,
        allergies: item.memberConsent && item.memberConsent.consent.allergies,
        conditions: item.memberConsent && item.memberConsent.consent.condition,
        startDate: item.startDate ? item.startDate : "N/A",
        enrolledDate: item.registeredDate ? item.registeredDate : "N/A",
        enrolledStatus: item.enrolledStatus,
        discontinuationReason: item.discontinuationReason,
        droppedDate: item.droppedDate ? item.droppedDate : "N/A",
      };
    });
    let finalRowDataArray = sessionMembersDetailsArray.map((item, index) => {
      let itemArray = objectToArray(item);
      return {
        id: index,
        items: itemArray.map((i) => {
          if (i[0] === "allergies" || i[0] === "conditions") {
            return <ImgIcon alt="verify">{verfiedIcon}</ImgIcon>;
          }
          return i[1];
        }),
      };
    });
    setTableRowData(finalRowDataArray);
  };

  const setClassInfo = () => {
    const { business } = classObj;
    const classInfoObject = {
      // "Class ID": "DL39020458",
      "City / Town": business.city,
      "Post Code": business.postcode,
      Status: business.status,
    };
    setClassInfoArray(objectToArray(classInfoObject));
  };

  const handleTermChange = (e) => {
    let termId = e.target.value;
    setSelectedTermId(termId);
    termId !== 0 ? dispatch(getSessionsByTermId(termId)) : setSessionsData([]);
    setSelectedSession();
    setSessionDetailsArray([]);
  };

  const handleSessionChange = (e) => {
    let sessionId = e.target.value;
    let selectedSessionObj =
      allSessions && allSessions.docs.find((e) => e._id === sessionId);
    setSelectedSession(selectedSessionObj);
    selectedSessionObj !== undefined
      ? renderSessionData(selectedSessionObj)
      : setSessionDetailsArray([]);
  };
  const renderSessionData = (Obj) => {
    const {
      term,
      pattern,
      status,
      coach,
      fullcapacity,
      fullcapacityfilled,
      waitcapacity,
      waitcapacityfilled,
    } = Obj;
    let sessionsDataObject = {
      "Start Date": term.startDate.split("T")[0],
      "End Date": term.endDate.split("T")[0],
      "Start Time": pattern[0].startTime.split("T")[0],
      "End Time": pattern[0].endTime.split("T")[0],
      Pattern: pattern[0].day,
      Facility: "Gym Hall (static)",
      "Session Enrolment Status": status,
      "Coach Name": coach[0].name,
      "Full class capacity": fullcapacity,
      Enrolled: fullcapacityfilled,
      "Waitlist capacity": waitcapacity,
      "Waitlist Enrolled": waitcapacityfilled,
    };

    let sessionsDataArray = objectToArray(sessionsDataObject);
    setSessionDetailsArray(sessionsDataArray);
  };
  useEffect(() => {
    dispatch(getClassById(id));
    dispatch(getAllTerms());
    dispatch(getAllMembersEnrolledInASession(id));
  }, [dispatch, id]);

  useEffect(() => {
    // setting terms data
    let termOptions =
      allTerms &&
      allTerms.map((item) => {
        return {
          id: item._id,
          termName: item.business[0].name,
        };
      });
    setTermsData(termOptions);
    setSelectedTermId(0);
    setSelectedSession();

    allMembers && allMembers.docs && setTableRows();
    classObj && setClassInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMembers, classObj]);

  useEffect(() => {
    let sessionOptions =
      allSessions &&
      allSessions.docs.map((item) => {
        return {
          id: item._id,
          sessionName: item.name,
        };
      });

    setSessionsData(sessionOptions);
  }, [allSessions]);

  return (
    <Box>
      <BasicModal />
      <Card>
        <CardRow>
          <HeadingText>{classObj && classObj.name}</HeadingText>
        </CardRow>

        <SubHeadingText>{classObj && classObj.business.name}</SubHeadingText>

        <CardRow>
          <Outputs arr={classInfoArray} />
        </CardRow>
      </Card>

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
            <MenuItem value={0}>Select Term</MenuItem>
            {termsData &&
              termsData.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.termName}
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
            sx={{ width: "272px" }}
          >
            <MenuItem value={0}>Select Session</MenuItem>
            {sessionsData &&
              sessionsData.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.sessionName}
                  </MenuItem>
                );
              })}
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

export default ClassEnrolments;
