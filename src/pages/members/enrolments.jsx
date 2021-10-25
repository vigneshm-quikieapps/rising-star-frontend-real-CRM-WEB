import { useParams } from "react-router";
import React, { useState } from "react";
import Output from "../../components/output";

import { MenuItem, styled, Box, Grid, Typography } from "@mui/material";
import Accordion from "../../components/accordion";
import GradientButton from "../../components/gradient-button";
import DatePicker from "../../components/date-picker";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "../../components/icon-button";
import { icons } from "../../helper/constants";
import TextField from "../../components/textfield";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getMemberEnrolmentList,
  memberEnrolmentDropped,
  memberEnrolmentSuspend,
  memberEnrolmentReturnFromSuspend,
} from "../../redux/action/memberAction";
import { getBusinessList } from "../../redux/action/businesses-actions";
import { getClassById } from "../../redux/action/class-actions";

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

  return `${day}, ${startTime} to ${endTime}`;
};

const enrolledStatusConverter = (data) => {
  return `${data?.enrolledStatus.slice(0, 1)}${data?.enrolledStatus
    .slice(1, data?.enrolledStatus.length)
    .toLowerCase()}`;
};

const droppedStatusConverter = (data) => {
  return `${data?.discontinuationReason.slice(
    0,
    1
  )}${data?.discontinuationReason
    .slice(1, data?.discontinuationReason.length)
    .toLowerCase()}`;
};

const MemberEnrollment = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const enrollmentList = useSelector((state) => state.members.enrolmentList);
  const businessList = useSelector((state) => state.businesses.businessList);
  const sessionList = useSelector((state) => state.classes.class);

  const businessId = businessList[0]?._id;
  const memberId = "614b270bc265630cd55a0520";

  // const Sessiontimming = `${
  //   enrollmentList[0]?.session.pattern[0].day
  // }, ${timeConverter(
  //   enrollmentList[0]?.session.pattern[0].startTime
  // )} to ${timeConverter(enrollmentList[0]?.session.pattern[0].endTime)}`;

  const [BusinessName, setBusinessName] = useState("");
  const [date, setDate] = useState(new Date("2014-08-18T21:11:54"));

  const [enrolmentDetailsInput, setEnrolmentDetailsInput] = useState({
    enrolmentId: "",
    className: "",
    term: "",
    session: "",
    enrolStatus: "",
    dropReason: "",
    timming: "",
    startDate: "",
    enrolDateTime: "",
    dropDateTime: "",
  });

  console.log(enrolmentDetailsInput.enrolStatus);
  useEffect(() => {
    dispatch(getBusinessList());
    setBusinessName(`${businessId}`);
    businessId && dispatch(getMemberEnrolmentList({ businessId, memberId }));
  }, [businessId, dispatch]);

  useEffect(() => {
    setEnrolmentDetailsInput({
      ...enrolmentDetailsInput,
      enrolmentId: `${enrollmentList[0]?._id}`,
      className: `${enrollmentList[0]?.classId}`,
      term: `${enrollmentList[0]?._id}`,
      session: `${enrollmentList[0]?.session.name}`,
      enrolStatus: `${enrolledStatusConverter(enrollmentList[0])}`,
      dropReason: `${
        droppedStatusConverter(enrollmentList[0]) === undefined && ""
      }`,
      timming: `${timeConverter(
        enrollmentList[0]?.session.pattern[0].day,
        enrollmentList[0]?.session.pattern[0].startTime,
        enrollmentList[0]?.session.pattern[0].endTime
      )}`,
      startDate: `${enrollmentList[0]?.startDate}`,
      enrolDateTime: `${enrollmentList[0]?.registeredDate}`,
      dropDateTime: `${enrollmentList[0]?.droppedDate}`,
    });
  }, [enrollmentList]);

  const businessChangeHandler = (e) => {
    setBusinessName(e.target.value);
    console.log(e.target.value);
  };

  const inputOnChangeHandler = (e) => {
    const { name, value } = e.target;
    setEnrolmentDetailsInput({
      ...enrolmentDetailsInput,
      [name]: value,
    });
  };

  const classChangehandler = (e) => {
    console.log(e.target);
    const tragetId = e.target.value;
    const newClassDetails = enrollmentList.filter(
      (li) => enrollmentList.class.name === tragetId
    );
    setEnrolmentDetailsInput({
      ...enrolmentDetailsInput,
      // term: `${enrollmentList[0]._id}`,
      session: `${newClassDetails.session.name}`,
      enrolStatus: `${enrolledStatusConverter(newClassDetails)}`,
      dropReason: `${
        droppedStatusConverter(newClassDetails) === undefined && ""
      }`,
      timming: `${timeConverter(
        newClassDetails.session.pattern[0].day,
        newClassDetails.session.pattern[0].startTime,
        newClassDetails.session.pattern[0].endTime
      )}`,
      startDate: `${newClassDetails.startDate}`,
      enrolDateTime: `${newClassDetails.registeredDate}`,
      dropDateTime: `${newClassDetails.droppedDate}`,
    });
  };

  const sessionChangeHandler = () => {
    setEnrolmentDetailsInput({
      ...enrolmentDetailsInput,
      enrolStatus: "Enroled",
      dropReason: "",
    });
  };

  // Dropped, dropped , sent request to dropped api
  // Dropped, class_transfer, sent request to dropped api,
  // Suspend, sent request to suspend api
  // Return from suspend, sent request to return from suspend api

  const saveClickHandler = () => {
    if (
      enrolmentDetailsInput.enrolStatus === "Dropped" &&
      enrolmentDetailsInput.dropReason === "Dropped"
    ) {
      dispatch(memberEnrolmentDropped());
    } else if (
      enrolmentDetailsInput.enrolStatus === "Dropped" &&
      enrolmentDetailsInput.dropReason === "Class transfer"
    ) {
      dispatch(memberEnrolmentDropped());
    } else if (
      enrolmentDetailsInput.enrolStatus === "Suspend" &&
      enrolmentDetailsInput.dropReason === ""
    ) {
      dispatch(memberEnrolmentSuspend());
    } else if (
      enrolmentDetailsInput.enrolStatus === "Return from suspend" &&
      enrolmentDetailsInput.dropReason === ""
    ) {
      dispatch(memberEnrolmentReturnFromSuspend());
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <StyleBox>
        <Typography variant="h4" component="div">
          Ayman Mogal
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
              value={BusinessName}
              onChange={businessChangeHandler}
            >
              {businessList.map((li, index) => (
                <MenuItem key={`B${index}`} value={`${li._id}`}>
                  {li.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <Output
              title="Member"
              description="KK000"
              sx={{ marginLeft: "20px" }}
            />
          </Grid>
          <Grid item xs={4}>
            <Output
              title="Club Membership Number"
              description={
                // ""
                enrollmentList[0] && `${enrollmentList[0].clubMembershipId}`
              }
            />
          </Grid>
        </Grid>
      </StyleBox>
      <Accordion>
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
              sx={{ textTransform: "none", fontSize: "1rem" }}
              onClick={(e) => {
                e.stopPropagation();
                console.log("i got clicked");
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
            <Grid item xs={3}>
              <Output
                title="Enrolment Id"
                description={enrolmentDetailsInput.enrolmentId}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                select
                label="Class Name*"
                variant="filled"
                sx={{ width: "100%" }}
                value={enrolmentDetailsInput.className}
                onChange={classChangehandler}
              >
                {enrollmentList?.map((li) => (
                  <MenuItem key={li.class.name} value={li.class._id}>
                    {li.class.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <Output title="Term" description="2022 Summer" />
            </Grid>
            <Grid item xs={3}>
              <TextField
                select
                label="Session"
                variant="filled"
                sx={{ width: "100%" }}
                value={enrolmentDetailsInput.session}
                onChange={sessionChangeHandler}
              >
                <MenuItem
                  key={`BS${enrolmentDetailsInput.session}`}
                  value={`${enrolmentDetailsInput.session}`}
                >
                  {enrolmentDetailsInput.session}
                </MenuItem>
                {/* {enrollmentList?.map((data) =>
                  data.sessions.map((li, index) => (
                    <MenuItem key={`BS${li.session.name}`} value={`${li.session._id}`}>
                      {li.session.name}
                    </MenuItem>
                  ))
                )} */}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                select
                label="Enrol status"
                variant="filled"
                name="enrolStatus"
                value={enrolmentDetailsInput.enrolStatus}
                onChange={inputOnChangeHandler}
                sx={{ width: "100%" }}
              >
                {enrolStatus.map((li) => (
                  <MenuItem key={`ES${li.name}`} value={li.value}>
                    {li.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                select
                label="Drop/Cancel Reason"
                variant="filled"
                name="dropReason"
                value={enrolmentDetailsInput.dropReason}
                onChange={inputOnChangeHandler}
                sx={{ width: "100%" }}
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
                description={enrolmentDetailsInput.timming}
              />
            </Grid>
            <Grid item xs={3}>
              <DatePicker
                label="Start Date"
                date={date}
                onChange={(newDate) => setDate(newDate)}
              />
            </Grid>
            <Grid item xs={3}>
              <Output
                title="Enroled Datetime"
                description={enrolmentDetailsInput.enrolDateTime}
              />
            </Grid>
            <Grid item xs={3}>
              <Output title="Drop Datetime" description="- - -" />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Box sx={{ marginTop: "15px" }}>
        <GradientButton
          sx={{ textTransform: "none", fontSize: "1rem", marginRight: "10px" }}
          onClick={saveClickHandler}
        >
          Save
        </GradientButton>
        <GradientButton
          sx={{ textTransform: "none", fontSize: "1rem" }}
          discard
        >
          Cancel
        </GradientButton>
      </Box>
    </Box>
  );
};

export default MemberEnrollment;
