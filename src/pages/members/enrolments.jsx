import { useEffect, useMemo, useState, useCallback } from "react";
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

import { enrolmentStatusMap } from "../../helper/constants";
import {
  TextField,
  Grid,
  Output,
  Accordion,
  GradientButton,
  Pagination,
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
import { setPageTitle } from "../../redux/action/shared-actions";

const Enrolment = () => {
  const dispatch = useDispatch();
  const member = useSelector((state) => state.members.currentMember || {});
  const businessList = useSelector((state) => state.businesses.businessList);
  const enrolmentList = useSelector((state) => state.members.enrolmentList);
  const sessionList = useSelector(
    (state) => state.sessions.sessionsOfClassInTerm,
  );
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [selectedEnrolment, setSelectedEnrolment] = useState("");
  const history = useHistory();

  useEffect(() => dispatch(setPageTitle("Enrolments")), [dispatch]);
  const addNewEnrolment = useCallback(
    (id) => {
      history.push(`/members/newEnrollment/${id}`);
    },
    [history],
  );

  const clubMembershipId = useMemo(() => {
    const list = member?.membership;
    const membership = list?.find(
      (mShip) => mShip.businessId === selectedBusiness,
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
        }),
      );
  }, [dispatch, member, selectedBusiness]);

  useEffect(() => {
    if (enrolmentList.length) {
      setSelectedEnrolment(enrolmentList[0]._id);
      dispatch(
        getClassSessionsByTermId(
          enrolmentList[0].class._id,
          enrolmentList[0].session.term._id,
        ),
      );
    } else {
      setSelectedEnrolment("");
    }
  }, [dispatch, enrolmentList]);

  const currentEnrolment = useMemo(
    () => enrolmentList.find(({ _id }) => _id === selectedEnrolment),
    [enrolmentList, selectedEnrolment],
  );

  const calcDate = (date) =>
    date ? new Date(date).toLocaleDateString() : " - - - ";

  const enrolmentDate = calcDate(currentEnrolment?.registeredDate);
  const startDate = calcDate(currentEnrolment?.startDate);
  const lastActionDate = calcDate(currentEnrolment?.updatedAt);

  const pattern = useMemo(() => {
    if (!currentEnrolment) return "";
    const session = sessionList.find(
      ({ _id }) => _id === currentEnrolment?.sessionId,
    );
    if (!session) return "";
    const days = session.pattern.map(({ day }) => day).join(", ");
    const startTime = new Date(
      session.pattern[0].startTime,
    ).toLocaleTimeString();
    const endTime = new Date(session.pattern[0].endTime).toLocaleTimeString();
    return `${toPascal(days)}, ${startTime} to ${endTime}`.replace(
      /:00 /g,
      " ",
    );
  }, [currentEnrolment, sessionList]);

  const businessChangeHandler = (e) => setSelectedBusiness(e.target.value);

  const enrolmentChangeHandler = (e) => {
    const enrolmentId = e.target.value;
    setSelectedEnrolment(enrolmentId);
    const enrolmentObject = enrolmentList.find(
      (enrolment) => enrolment._id === enrolmentId,
    );
    dispatch(
      getClassSessionsByTermId(
        enrolmentObject.class._id,
        enrolmentObject.session.term._id,
      ),
    );
  };

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
            {businessList
              .filter(({ _id }) =>
                member?.membership?.some(
                  ({ businessId }) => businessId === _id,
                ),
              )
              .map(({ _id, name }) => {
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
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Typography variant="h2" sx={{ fontSize: "20px", flex: 1 }}>
              Enrolment Details
            </Typography>
            <GradientButton active sx={{ mr: 2 }} onClick={addNewEnrolment}>
              Add a new enrolment
            </GradientButton>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid sx={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
            <Output
              title="Class Name"
              description={toPascal(currentEnrolment?.class?.name)}
            />
            <Output title="Last Action Date" description={lastActionDate} />
            <Output
              title="Drop/Cancel Reason"
              description={
                currentEnrolment?.enrolledStatus === "DROPPED" &&
                currentEnrolment?.discontinuationReason
              }
            />
            <Output
              title="Enrol Status"
              description={enrolmentStatusMap[currentEnrolment?.enrolledStatus]}
            />
            <Output title="Enrol Date/Time" description={enrolmentDate} />
            <Output title="Member Start Date" description={startDate} />
            <Output
              title="Term"
              description={toPascal(currentEnrolment?.session?.term?.label)}
            />
            <Output
              title="Term Start Date"
              description={calcDate(currentEnrolment?.session?.term?.startDate)}
            />
            <Output
              title="Term End Date"
              description={calcDate(currentEnrolment?.session?.term?.endDate)}
            />
            <Output
              title="Session"
              description={toPascal(currentEnrolment?.session?.name)}
            />
            <Output title="Timings" description={pattern} />
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Box
        sx={{
          "& .MuiButton-root": {
            width: "250px",
            mr: 2,
            "&:last-child": { mr: 0 },
          },
        }}
      >
        {["ENROLLED", "WAITLISTED"].indexOf(currentEnrolment?.enrolledStatus) >
          -1 && (
          <GradientButton sx={{ fontWeight: "bold" }} invert active>
            Change Session
          </GradientButton>
        )}
        {currentEnrolment?.enrolledStatus &&
          currentEnrolment?.enrolledStatus !== "DROPPED" && (
            <GradientButton sx={{ fontWeight: "bold" }} invert active>
              Drop
            </GradientButton>
          )}
        {currentEnrolment?.enrolledStatus === "ENROLLED" && (
          <GradientButton sx={{ fontWeight: "bold" }} invert active>
            Suspend
          </GradientButton>
        )}
        {currentEnrolment?.enrolledStatus === "SUSPEND" && (
          <GradientButton sx={{ fontWeight: "bold" }} invert active>
            Return From Suspend
          </GradientButton>
        )}
        {currentEnrolment?.enrolledStatus === "WAITLISTED" && (
          <GradientButton sx={{ fontWeight: "bold" }} invert active>
            Move To Main List
          </GradientButton>
        )}
      </Box>
      <Pagination
        count={enrolmentList.length}
        sx={{ mt: 2 }}
        page={
          enrolmentList.findIndex(({ _id }) => _id === currentEnrolment?._id) +
          1
        }
        onChange={(_, page) => {
          setSelectedEnrolment(enrolmentList[page - 1]._id);
        }}
      />
    </>
  );
};
export default Enrolment;
