import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Box,
  MenuItem,
  CircularProgress,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import {
  TextField,
  Grid,
  Output,
  Accordion,
  GradientButton,
} from "../../components";
import { Card, HeadingText, SubHeadingText } from "../../components/common";
import { getMemberEnrolmentList } from "../../redux/action/memberAction";
import {
  memberEnrolmentDrop,
  memberEnrolmentSuspend,
  memberEnrolmentReturnFromSuspend,
  transferEnrolment,
} from "../../redux/action/enrolmentAction";
import { getClassSessionsByTermId } from "../../redux/action/sessionAction";
import toPascal from "../../utils/to-pascal";

const statusMap = {
  ENROLLED: "Enrolled",
  DROPPED: "Dropped",
  SUSPEND: "Suspended",
  RETURN_FROM_SUSPENSION: "Return From Suspension",
  WAITLISTED: "In Waitlist",
};

const endpointList = {
  transfer: "transfer",
  drop: "drop",
  suspend: "suspend",
  return: "return",
};

const Enrolment = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const member = useSelector((state) => state.members.currentMember || {});
  const businessList = useSelector((state) => state.businesses.businessList);
  const enrolmentList = useSelector((state) => state.members.enrolmentList);
  const sessionList = useSelector(
    (state) => state.sessions.sessionsOfClassInTerm
  );
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [selectedEnrolment, setSelectedEnrolment] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDropReason, setSelectedDropReason] = useState("");

  const clubMembershipId = useMemo(() => {
    const list = member?.membership;
    const membership = list?.find(
      (mShip) => mShip.businessId === selectedBusiness
    );
    return membership?.clubMembershipId || "";
  }, [member, selectedBusiness]);

  useEffect(() => {
    businessList.length && setSelectedBusiness(businessList[0]._id);
  }, [businessList]);

  useEffect(() => {
    member?._id &&
      selectedBusiness &&
      dispatch(
        getMemberEnrolmentList({
          memberId: member._id,
          businessId: selectedBusiness,
        })
      );
  }, [dispatch, member, selectedBusiness]);

  useEffect(() => {
    if (enrolmentList.length) {
      setSelectedEnrolment(enrolmentList[0]._id);
      setSelectedStatus(enrolmentList[0].enrolledStatus);
      setSelectedDropReason(enrolmentList[0]?.discontinuationReason || "");
      dispatch(
        getClassSessionsByTermId(
          enrolmentList[0].class._id,
          enrolmentList[0].session.term._id
        )
      );
    }
  }, [dispatch, enrolmentList]);

  const currentEnrolment = useMemo(() => {
    return enrolmentList.find(
      (enrolment) => enrolment._id === selectedEnrolment
    );
  }, [enrolmentList, selectedEnrolment]);

  useEffect(() => {
    if (!sessionList.length || !currentEnrolment) return;
    // When we select a new class (enrolment), request for getting the new
    // sessionList is sent, but sessionList is not updated yet so we have to
    // check if we have the currentEnrolment.sessionId in sessionList
    const defaultSession = sessionList.find(
      ({ _id }) => _id === currentEnrolment.sessionId
    );
    setSelectedSession(defaultSession?._id || "");
  }, [sessionList, currentEnrolment]);

  const initialSessionId = useMemo(() => {
    if (!currentEnrolment) return "";
    return currentEnrolment.sessionId;
  }, [currentEnrolment]);

  const enrolmentDate = useMemo(() => {
    if (!currentEnrolment) return " - - - ";
    const date = new Date(currentEnrolment.registeredDate);
    return date.toLocaleString();
  }, [currentEnrolment]);

  const dropDate = useMemo(() => {
    if (!currentEnrolment || !currentEnrolment?.droppedDate) return "N/A";
    const date = new Date(currentEnrolment.droppedDate);
    return date.toLocaleString();
  }, [currentEnrolment]);

  const pattern = useMemo(() => {
    if (!selectedSession) return "";
    const session = sessionList.find(({ _id }) => _id === selectedSession);
    if (!session) return "";
    const days = session.pattern.map(({ day }) => day).join(", ");
    const startTime = new Date(
      session.pattern[0].startTime
    ).toLocaleTimeString();
    const endTime = new Date(session.pattern[0].endTime).toLocaleTimeString();
    return `${toPascal(days)}, ${startTime} to ${endTime}`.replace(
      /:00 /g,
      " "
    );
  }, [selectedSession, sessionList]);

  const businessChangeHandler = (e) => setSelectedBusiness(e.target.value);

  const enrolmentChangeHandler = (e) => {
    const enrolmentId = e.target.value;
    setSelectedEnrolment(enrolmentId);
    const enrolmentObject = enrolmentList.find(
      (enrolment) => enrolment._id === enrolmentId
    );
    setSelectedStatus(enrolmentObject.enrolledStatus);
    setSelectedDropReason(enrolmentObject?.discontinuationReason || "");
    dispatch(
      getClassSessionsByTermId(
        enrolmentObject.class._id,
        enrolmentObject.session.term._id
      )
    );
  };

  const sessionChangeHandler = (e) => {
    const sessionId = e.target.value;
    setSelectedSession(sessionId);
    if (sessionId !== initialSessionId) {
      setSelectedDropReason("");
      setSelectedStatus("");
    } else {
      setSelectedStatus(currentEnrolment.enrolledStatus);
      setSelectedDropReason(currentEnrolment?.discontinuationReason || "");
    }
  };

  const statusChangeHandler = (e) => {
    const status = e.target.value;
    if (status !== statusMap.DROPPED) setSelectedDropReason("");
    setSelectedStatus(e.target.value);
  };

  const dropReasonChangeHandler = (e) => setSelectedDropReason(e.target.value);

  const currentEndpoint = useMemo(() => {
    if (!currentEnrolment) return null;
    if (
      selectedSession &&
      currentEnrolment.sessionId !== selectedSession &&
      currentEnrolment.enrolledStatus !== "DROPPED"
    )
      return endpointList.transfer;
    if (currentEnrolment.enrolledStatus === selectedStatus) return null;
    switch (selectedStatus) {
      case "DROPPED":
        return endpointList.drop;
      case "SUSPEND":
        return endpointList.suspend;
      case "RETURN_FROM_SUSPENSION":
        return endpointList.return;
      default:
        return null;
    }
  }, [currentEnrolment, selectedSession, selectedStatus]);

  if (!member)
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 153px)",
        }}
      >
        <CircularProgress />
      </Box>
    );

  console.log(currentEndpoint);

  const discardHandler = () => history.goBack();
  const saveHandler = () => {
    switch (currentEndpoint) {
      case endpointList.transfer: {
        dispatch(transferEnrolment(selectedEnrolment, selectedSession));
        break;
      }
      case endpointList.drop: {
        dispatch(memberEnrolmentDrop(selectedEnrolment));
        break;
      }
      case endpointList.suspend: {
        dispatch(memberEnrolmentSuspend(selectedEnrolment));
        break;
      }
      case endpointList.return: {
        dispatch(memberEnrolmentReturnFromSuspend(selectedEnrolment));
        break;
      }
      default:
        return;
    }
  };

  return (
    <>
      <Card>
        <HeadingText>{member.name}</HeadingText>
        <SubHeadingText>Student/Member</SubHeadingText>
        <Grid>
          <TextField
            select
            variant="filled"
            label="Business Name"
            value={selectedBusiness}
            onChange={businessChangeHandler}
          >
            {businessList.map(({ _id, name }) => {
              return (
                <MenuItem key={_id} value={_id}>
                  {name}
                </MenuItem>
              );
            })}
          </TextField>
          <Box />
          <Output
            title="Club Membership Number"
            description={clubMembershipId}
          />
        </Grid>
      </Card>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box
            sx={{ display: "flex", flex: 1, alignItems: "center", mr: "10px" }}
          >
            <Typography variant="h2" sx={{ fontSize: "20px", flex: 1 }}>
              Enrolment Details
            </Typography>
            <GradientButton sx={{ fontWeight: "bold" }}>
              Add a new enrolment
            </GradientButton>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid>
            <TextField
              select
              variant="filled"
              label="Class Name"
              value={selectedEnrolment}
              onChange={enrolmentChangeHandler}
            >
              {enrolmentList.map(({ _id, class: { name } }) => (
                <MenuItem key={_id} value={_id}>
                  {toPascal(name)}
                </MenuItem>
              ))}
            </TextField>
            <Output
              title="Term"
              description={
                currentEnrolment
                  ? toPascal(currentEnrolment.session.term.label)
                  : ""
              }
            />
            <Output title="Timings" description={pattern} />
            <TextField
              select
              variant="filled"
              label="Session"
              value={selectedSession}
              onChange={sessionChangeHandler}
            >
              {sessionList.map(({ _id, name }) => {
                return (
                  <MenuItem key={_id} value={_id}>
                    {toPascal(name)}
                  </MenuItem>
                );
              })}
            </TextField>
            <TextField
              select
              variant="filled"
              label="Enrolment Status"
              value={selectedStatus}
              onChange={statusChangeHandler}
              disabled={
                selectedSession !== initialSessionId ||
                currentEnrolment?.enrolledStatus === "DROPPED"
              }
            >
              {Object.entries(statusMap).map(([value, text]) => (
                <MenuItem key={value} value={value}>
                  {text}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              variant="filled"
              label="Drop/Cancel Reason"
              value={selectedDropReason}
              onChange={dropReasonChangeHandler}
              disabled={
                selectedSession !== initialSessionId ||
                selectedStatus !== "DROPPED" ||
                currentEnrolment.enrolledStatus === "DROPPED"
              }
            >
              <MenuItem value="DROPPED">Dropped</MenuItem>
              <MenuItem value="CLASS_TRANSFER">Class transfer</MenuItem>
            </TextField>
            <Output title="Enroled DateTime" description={enrolmentDate} />
            <Output title="Drop DateTime" description={dropDate} />
          </Grid>
        </AccordionDetails>
      </Accordion>
      <GradientButton size="large" onClick={saveHandler}>
        Save
      </GradientButton>
      <GradientButton size="large" invert onClick={discardHandler}>
        Discard
      </GradientButton>
    </>
  );
};
export default Enrolment;
