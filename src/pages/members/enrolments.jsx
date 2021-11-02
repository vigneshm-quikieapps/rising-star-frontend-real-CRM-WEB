import { useParams } from "react-router";
import React, { useState, useCallback } from "react";

import { MenuItem, styled, Box, Grid, Typography } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import IconButton from "../../components/icon-button";
import { icons } from "../../helper/constants";
import {
  Accordion,
  GradientButton,
  DatePicker,
  TextField,
  Output,
} from "../../components/index";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMemberEnrolmentList } from "../../redux/action/memberAction";
import {
  memberEnrolmentDropped,
  memberEnrolmentSuspend,
  memberEnrolmentReturnFromSuspend,
  transferEnrolment,
} from "../../redux/action/enrolmentAction";
import { getSessionInAclassByTermId } from "../../redux/action/sessionAction";

const StyleBox = styled(Box)(({ theme }) => ({
  padding: "20px",
  marginBottom: "15px",
  border: `1px solid ${theme.palette.ternary.main}`,
  borderRadius: theme.shape.borderRadiuses.secondary,
  "& .MuiTypography-h4": {
    fontWeight: 700,
    marginBottom: "0.1em",
  },
  "& .MuiTypography-subtitle2": {
    fontWeight: 700,
    color: theme.palette.text.primary,
    opacity: 0.5,
    marginBottom: "1em",
    fontSize: "1rem",
  },
}));

const enrolStatus = [
  { name: "Enroled", value: "Enrolled" },
  { name: "Dropped", value: "Dropped" },
  { name: "Suspend", value: "Suspend" },
  { name: "Return from suspend", value: "Return from suspend" },
  { name: "Waitlisted", value: "Waitlisted" },
];

const dropReasonStatus = [
  { name: "Dropped", value: "Dropped" },
  { name: "Class transfer", value: "Class transfer" },
];

const timeConverter = (day, startTiming, endTiming) => {
  const startTime = new Date(startTiming).toLocaleTimeString("en", {
    timeStyle: "short",
    hour12: true,
    timeZone: "UTC",
  });

  const endTime = new Date(endTiming).toLocaleTimeString("en", {
    timeStyle: "short",
    hour12: true,
    timeZone: "UTC",
  });

  if (
    day === undefined ||
    startTiming === "Invalid Date" ||
    endTiming === "Invalid Date"
  ) {
    return "- - -";
  } else {
    return `${day}, ${startTime} to ${endTime}`;
  }
};

const dateConverter = (ISOdate) => {
  const dateTime = `${new Date(ISOdate).toLocaleString()}`;
  if (dateTime === "Invalid Date") {
    return "- - -";
  } else {
    return dateTime;
  }
};

const StatusConverter = (data) => {
  if (data !== "") {
    return `${data?.slice(0, 1)}${data?.slice(1, data?.length).toLowerCase()}`;
  } else {
    return "";
  }
};

const removeDuplicateClass = (array, key) => {
  return array.reduce((arr, item) => {
    const removed = arr.filter((i) => i[key] !== item[key]);
    return [...removed, item];
  }, []);
};

const MemberEnrollment = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const enrollmentList = useSelector((state) => state.members.enrolmentList);
  const currentMember = useSelector((state) => state.members.currentMember);
  const businessList = useSelector((state) => state.businesses.businessList);
  const sessionList = useSelector(
    (state) => state.sessions.sessionListInAclassByterm
  );
  const businessId = businessList[0]?._id;

  const [selectedBusiness, setSelectedBusiness] = useState("");

  const [date, setDate] = useState("");

  const [selectedSession, setSelectedSession] = useState("");

  const [textfieldDisabled, setTextfieldDisabled] = useState(false);
  const [sessionDisabled, setSessionDisabled] = useState(false);
  const [dropReasonDisabled, setDropReasonDisabled] = useState("");

  const [enrolmentDetailsInput, setEnrolmentDetailsInput] = useState({
    enrolmentId: "",
    className: "",
    term: "",
    // session: "",
    enrolStatus: "",
    dropReason: "",
    timming: "",
    enrolDateTime: "",
    dropDateTime: "",
  });

  const [expanded, setExpanded] = useState("panel1");

  useEffect(() => {
    businessId && setSelectedBusiness(businessId);
  }, [businessId]);

  const params = useCallback((id, businessId) => {
    return new Promise((resolve, reject) => {
      const data = {
        memberId: id,
        businessId: businessId,
      };
      resolve(data);
    });
  }, []);

  const classfetchPrarams = useCallback((classId, termId) => {
    return new Promise((resolve, reject) => {
      const data = {
        termId: termId,
        classId: classId,
      };
      resolve(data);
    });
  }, []);

  useEffect(() => {
    params(id, selectedBusiness).then((res) => {
      if (res.memberId && res.businessId) {
        dispatch(getMemberEnrolmentList(res));
      }
    });
  }, [dispatch, id, params, selectedBusiness]);

  useEffect(() => {
    classfetchPrarams(
      enrollmentList[0]?.classId,
      enrollmentList[0]?.session.term._id
    ).then((res) => {
      if (res.classId && res.termId) {
        dispatch(getSessionInAclassByTermId(res));
      }
    });
  }, [dispatch, classfetchPrarams, enrollmentList]);

  useEffect(() => {
    sessionList && setSelectedSession(sessionList[0]?._id);
  }, [sessionList]);

  useEffect(() => {
    const filterSessionList = sessionList.filter(
      (session) => session._id === enrollmentList[0]?.session._id
    );

    const filterEnrolmentList = enrollmentList.filter(
      (enrolment) => enrolment.session._id === filterSessionList[0]?._id
    );

    if (filterEnrolmentList.length > 0) {
      setEnrolmentDetailsInput((previous) => ({
        ...previous,
        enrolmentId: `${filterEnrolmentList[0]?._id}`,
        enrolStatus: `${StatusConverter(
          filterEnrolmentList[0]?.enrolledStatus
        )}`,
        dropReason: `${StatusConverter(
          filterEnrolmentList[0]?.discontinuationReason
        )}`,
        timming: `${timeConverter(
          filterEnrolmentList[0]?.session.pattern[0].day,
          filterEnrolmentList[0]?.session.pattern[0].startTime,
          filterEnrolmentList[0]?.session.pattern[0].endTime
        )}`,
        enrolDateTime: `${dateConverter(
          filterEnrolmentList[0]?.registeredDate
        )}`,
        dropDateTime: `${dateConverter(filterEnrolmentList[0]?.droppedDate)}`,
      }));
      // setDate(new Date(`${filterEnrolmentList[0]?.startDate}`));
      setDate(dateConverter(filterEnrolmentList[0]?.startDate));
      setTextfieldDisabled(
        StatusConverter(filterEnrolmentList[0]?.enrolledStatus) === "Dropped" ||
          StatusConverter(filterEnrolmentList[0]?.enrolledStatus) === "Suspend"
          ? true
          : false
      );
      setSessionDisabled(
        StatusConverter(filterEnrolmentList[0]?.enrolledStatus) === "Dropped" ||
          StatusConverter(filterEnrolmentList[0]?.enrolledStatus) === "Suspend"
          ? true
          : false
      );
      setDropReasonDisabled(true);

      setSelectedSession(filterEnrolmentList[0]?.session._id);
    }
  }, [enrollmentList, sessionList]);

  useEffect(() => {
    setEnrolmentDetailsInput((previous) => ({
      ...previous,
      className: `${enrollmentList[0]?.classId}`,
      term: `${enrollmentList[0]?.session.term._id}`,
    }));
  }, [enrollmentList]);

  const businessChangeHandler = (e) => {
    setSelectedBusiness(e.target.value);
  };

  const inputOnChangeHandler = (e) => {
    const { name, value } = e.target;
    setEnrolmentDetailsInput({
      ...enrolmentDetailsInput,
      [name]: value,
    });
  };

  const classChangehandler = (e) => {
    const tragetId = e.target.value;

    dispatch(
      getSessionInAclassByTermId({
        classId: tragetId,
        termId: enrolmentDetailsInput.term,
      })
    );
  };

  const sessionChangeHandler = (e) => {
    setSelectedSession(e.target.value);

    const filterSessionList = sessionList.filter(
      (session) => session._id === e.target.value
    );

    const filterEnrolmentList = enrollmentList.filter(
      (enrolment) => enrolment.session._id === e.target.value
    );

    if (filterEnrolmentList.length > 0) {
      setEnrolmentDetailsInput((previous) => ({
        ...previous,
        enrolmentId: `${filterEnrolmentList[0]?._id}`,
        enrolStatus: `${StatusConverter(
          filterEnrolmentList[0]?.enrolledStatus
        )}`,
        dropReason: `${StatusConverter(
          filterEnrolmentList[0]?.discontinuationReason
        )}`,
        timming: `${timeConverter(
          filterEnrolmentList[0]?.session.pattern[0].day,
          filterEnrolmentList[0]?.session.pattern[0].startTime,
          filterEnrolmentList[0]?.session.pattern[0].endTime
        )}`,
        enrolDateTime: `${dateConverter(
          filterEnrolmentList[0]?.registeredDate
        )}`,
        dropDateTime: `${dateConverter(filterEnrolmentList[0]?.droppedDate)}`,
      }));
      // setDate(new Date(`${filterEnrolmentList[0]?.startDate}`));
      setDate(dateConverter(filterEnrolmentList[0]?.startDate));
      setTextfieldDisabled(
        StatusConverter(filterEnrolmentList[0]?.enrolledStatus) === "Dropped"
          ? true
          : false
      );
    } else {
      setEnrolmentDetailsInput((previous) => ({
        ...previous,
        enrolStatus: "",
        dropReason: "",
        timming: `${timeConverter(
          filterSessionList[0]?.pattern[0].day,
          filterSessionList[0]?.pattern[0].startTime,
          filterSessionList[0]?.pattern[0].endTime
        )}`,
        enrolDateTime: "- - -",
        dropDateTime: "- - -",
      }));
      setDate(null);
      setTextfieldDisabled(true);
      // setSessionDisabled(false)
    }
  };

  const enrolStatusChangeHandler = (e) => {
    if (
      e.target.value === "Enrolled" ||
      e.target.value === "Suspend" ||
      e.target.value === "Return from suspend"
    ) {
      setEnrolmentDetailsInput({
        ...enrolmentDetailsInput,
        enrolStatus: e.target.value,
        dropReason: "",
      });
      setDropReasonDisabled(true);
    } else {
      setEnrolmentDetailsInput({
        ...enrolmentDetailsInput,
        enrolStatus: e.target.value,
      });
      setDropReasonDisabled(false);
    }
  };

  // Dropped, dropped , sent request to dropped api
  // Dropped, class_transfer, sent request to dropped api,
  // Suspend, sent request to suspend api
  // Return from suspend, sent request to return from suspend api

  const saveClickHandler = (enrolID) => {
    const transferData = {
      enrolmentId: enrolID,
      newSessionId: selectedSession,
    };
    console.log(transferData);
    if (
      enrolmentDetailsInput.enrolStatus === "Dropped" &&
      enrolmentDetailsInput.dropReason === "Dropped"
    ) {
      dispatch(memberEnrolmentDropped(enrolID));
    } else if (
      enrolmentDetailsInput.enrolStatus === "Dropped" &&
      enrolmentDetailsInput.dropReason === "Class transfer"
    ) {
      dispatch(memberEnrolmentDropped(enrolID));
    } else if (
      enrolmentDetailsInput.enrolStatus === "Suspend" &&
      enrolmentDetailsInput.dropReason === ""
    ) {
      dispatch(memberEnrolmentSuspend(enrolID));
    } else if (
      enrolmentDetailsInput.enrolStatus === "Return from suspend" &&
      enrolmentDetailsInput.dropReason === ""
    ) {
      dispatch(memberEnrolmentReturnFromSuspend(enrolID));
    } else if (
      enrolmentDetailsInput.enrolStatus === "" &&
      enrolmentDetailsInput.dropReason === ""
    ) {
      dispatch(transferEnrolment(transferData));
      // console.log(transferData);
    }
  };

  // console.log(
  //   enrolmentDetailsInput.enrolStatus,
  //   enrolmentDetailsInput.dropReason
  // );
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <StyleBox>
        <Typography variant="h4" component="div">
          {currentMember ? currentMember.member.name : "- - -"}
        </Typography>
        <Typography variant="subtitle2" component="div">
          Student/Member
        </Typography>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <TextField
              select
              label="Business Name"
              variant="filled"
              sx={{ width: "100%" }}
              value={selectedBusiness}
              onChange={businessChangeHandler}
            >
              {businessList.map((li, index) => (
                <MenuItem key={`B${index}`} value={`${li._id}`}>
                  {li.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* <Grid item xs={4}>
            <Output
              title="Member"
              description="KK000"
              sx={{ marginLeft: "20px" }}
            />
          </Grid> */}
          <Grid item xs={4}>
            <Output
              title="Club Membership Number"
              description={
                // ""
                enrollmentList[0]
                  ? `${enrollmentList[0].clubMembershipId}`
                  : "- - -"
              }
              sx={{ marginLeft: "20px" }}
            />
          </Grid>
        </Grid>
      </StyleBox>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            "& .MuiAccordionSummary-content": {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },
          }}
        >
          <Typography>Enrolment Details</Typography>
          <div>
            <GradientButton
              sx={{ textTransform: "none" }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Add a new enrolment
            </GradientButton>
            <IconButton
              sx={{
                margin: "0 10px",
              }}
            >
              <img src={icons.more} alt="user" height="20px" width="20px" />
            </IconButton>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={3}>
            {/* <Grid item xs={3}>
              <Output
                title="Enrolment Id"
                description={enrolmentDetailsInput.enrolmentId}
              />
            </Grid> */}
            <Grid item xs={4}>
              <TextField
                select
                label="Class Name*"
                variant="filled"
                sx={{ width: "100%" }}
                value={enrolmentDetailsInput.className}
                onChange={classChangehandler}
              >
                {removeDuplicateClass(enrollmentList, "classId")?.map((li) => (
                  <MenuItem key={li.class.name} value={li.class._id}>
                    {li.class.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <Output title="Term" description="2022 Summer" />
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="Session"
                variant="filled"
                sx={{ width: "100%" }}
                value={selectedSession}
                onChange={sessionChangeHandler}
                disabled={sessionDisabled}
              >
                {/* <MenuItem
                  key={`BS${enrolmentDetailsInput.session}`}
                  value={`${enrolmentDetailsInput.session}`}
                >
                  {enrolmentDetailsInput.session}
                </MenuItem> */}
                {sessionList?.map((li) => (
                  <MenuItem key={`BS${li.name}`} value={`${li._id}`}>
                    {li.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ marginTop: "4px" }}>
            <Grid item xs={4}>
              <TextField
                select
                label="Enrol status"
                variant="filled"
                name="enrolStatus"
                value={enrolmentDetailsInput.enrolStatus}
                onChange={enrolStatusChangeHandler}
                sx={{
                  width: "100%",
                }}
                disabled={textfieldDisabled}
              >
                {enrolStatus.map((li) => (
                  <MenuItem key={`ES${li.name}`} value={li.value}>
                    {li.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="Drop/Cancel Reason"
                variant="filled"
                name="dropReason"
                value={enrolmentDetailsInput.dropReason}
                onChange={inputOnChangeHandler}
                sx={{ width: "100%" }}
                disabled={dropReasonDisabled}
              >
                {dropReasonStatus.map((li) => (
                  <MenuItem key={`DR${li.name}`} value={li.value}>
                    {li.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <Output
                title="Timmings"
                description={
                  enrolmentDetailsInput
                    ? enrolmentDetailsInput.timming
                    : "- - -"
                }
              />
            </Grid>
            <Grid item xs={4}>
              {/* <DatePicker
                label="Start Date"
                date={date}
                onChange={(newDate) => setDate(newDate)}
                disabled={textfieldDisabled}
              /> */}
              <Output title="Start Date" description={date ? date : "- - -"} />
            </Grid>
            <Grid item xs={4}>
              <Output
                title="Enroled Datetime"
                description={
                  enrolmentDetailsInput
                    ? enrolmentDetailsInput.enrolDateTime
                    : "- - -"
                }
              />
            </Grid>
            <Grid item xs={4}>
              <Output
                title="Drop Datetime"
                description={
                  enrolmentDetailsInput
                    ? enrolmentDetailsInput.dropDateTime
                    : "- - -"
                }
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Box sx={{ marginTop: "15px" }}>
        <GradientButton
          sx={{ textTransform: "none", marginRight: "10px" }}
          onClick={() => saveClickHandler(enrolmentDetailsInput.enrolmentId)}
          size="large"
        >
          Save
        </GradientButton>
        <GradientButton sx={{ textTransform: "none" }} discard size="large">
          Cancel
        </GradientButton>
      </Box>
    </Box>
  );
};

export default MemberEnrollment;
