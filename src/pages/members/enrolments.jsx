import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  MenuItem,
  CircularProgress,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import { TextField, Grid, Output, Accordion } from "../../components";
import {
  Card,
  CardRow,
  HeadingText,
  SubHeadingText,
} from "../../components/common";
import { getMemberEnrolmentList } from "../../redux/action/memberAction";
import {
  memberEnrolmentDropped,
  memberEnrolmentSuspend,
  memberEnrolmentReturnFromSuspend,
  transferEnrolment,
} from "../../redux/action/enrolmentAction";
import { getClassSessionsByTermId } from "../../redux/action/sessionAction";
import toPascal from "../../utils/to-pascal";
import { getClassList } from "../../redux/action/class-actions";

const statusMap = {
  ENROLLED: "Enrolled",
  DROPPED: "Dropped",
  SUSPEND: "Suspended",
  RETURN_FROM_SUSPENSION: "Return From Suspension",
  WAITLISTED: "In Waitlist",
};

const Enrolment = () => {
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
  const [endPoint, setEndPoint] = useState(null);

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
      setSelectedDropReason(enrolmentList[0].discontinuationReason || "");
    }
  }, [enrolmentList]);

  const currentEnrolment = useMemo(() => {
    return enrolmentList.find(
      (enrolment) => enrolment?._id === selectedEnrolment
    );
  }, [enrolmentList, selectedEnrolment]);

  const enrolmentDate = useMemo(() => {
    if (!currentEnrolment) return " - - - ";
    const date = new Date(currentEnrolment.registeredDate);
    return date.toLocaleString();
  }, [currentEnrolment]);

  const dropDate = useMemo(() => {
    if (!currentEnrolment) return " - - - ";
    return currentEnrolment?.droppedDate || "N/A";
  }, [currentEnrolment]);

  useEffect(() => {
    if (!currentEnrolment) return;
    setSelectedEnrolment(currentEnrolment._id);
    setSelectedStatus(currentEnrolment.enrolledStatus);
    setSelectedDropReason(currentEnrolment.discontinuationReason || "");
  }, [currentEnrolment]);

  const initialSessionId = useMemo(() => {
    if (!currentEnrolment || !sessionList.length) return "";
    const initialSession = sessionList.find(
      ({ _id }) => _id === currentEnrolment.sessionId
    );
    return initialSession?._id || "";
  }, [currentEnrolment, sessionList]);

  useEffect(() => {
    if (!initialSessionId) return;
    setSelectedSession(initialSessionId);
  }, [initialSessionId]);

  useEffect(() => {
    currentEnrolment &&
      dispatch(
        getClassSessionsByTermId(
          currentEnrolment.class._id,
          currentEnrolment.session.term._id
        )
      );
  }, [dispatch, currentEnrolment]);

  useEffect(() => {
    if (!currentEnrolment) return;
    if (selectedSession !== currentEnrolment.session._id) {
      setSelectedDropReason("");
      setSelectedStatus("");
      setEndPoint("transfer");
    } else {
      setSelectedStatus(currentEnrolment.enrolledStatus);
      setSelectedDropReason(currentEnrolment.discontinuationReason || "");
    }
  }, [currentEnrolment, selectedSession]);

  const pattern = useMemo(() => {
    if (!selectedSession) return "";
    const session = sessionList.find(({ _id }) => _id === selectedSession);
    if (!session) return "";
    const days = session.pattern.map(({ day }) => day).join(", ");
    const startTime = new Date(
      session.pattern[0].startTime
    ).toLocaleTimeString();
    const endTime = new Date(session.pattern[0].endTime).toLocaleTimeString();
    return `${toPascal(days)}, ${startTime} to ${endTime}`.replace(/:00 /, " ");
  }, [selectedSession, sessionList]);

  const businessChangeHandler = (e) => setSelectedBusiness(e.target.value);
  const enrolmentChangeHandler = (e) => setSelectedEnrolment(e.target.value);
  const sessionChangeHandler = (e) => setSelectedSession(e.target.value);
  const statusChangeHandler = (e) => {
    const status = e.target.value;
    if (status !== statusMap.DROPPED) setSelectedDropReason("");
    setSelectedStatus(e.target.value);
    switch (status) {
      case statusMap.DROPPED: {
        setEndPoint("drop");
        break;
      }
      case statusMap.SUSPEND: {
        setEndPoint("suspend");
        break;
      }
      case statusMap.RETURN_FROM_SUSPENSION: {
        setEndPoint("return");
        break;
      }
      default: {
        setEndPoint(null);
      }
    }
  };
  const dropReasonChangeHandler = (e) => setSelectedDropReason(e.target.value);
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
  const { name: memberName, membership } = member;
  const clubMembershipId =
    membership?.find((mShip) => mShip.businessId === selectedBusiness)
      ?.clubMembershipId || "";

  console.log(selectedDropReason);
  console.log(endPoint);

  return (
    <>
      <Card>
        <HeadingText>{memberName}</HeadingText>
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
          <Typography variant="h2" sx={{ fontSize: "20px" }}>
            Enrolment Details
          </Typography>
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
    </>
  );
};
export default Enrolment;
