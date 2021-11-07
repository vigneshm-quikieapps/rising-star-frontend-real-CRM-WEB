import { useMemo, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";

import { Card, CardRow } from "../../components/common";
import {
  Accordion,
  TextField,
  Table as CustomTable,
  ImgIcon,
  IconButton,
  Pagination,
  Tooltip,
  Outputs,
} from "../../components";
import moreIcon from "../../assets/icons/icon-more.png";
import arrowDownIcon from "../../assets/icons/icon-arrow-down.png";
import allergyIcon from "../../assets/icons/icon-allergy.png";
import { objectToArray } from "../../utils";
import { enrollmentHeaders } from "../../helper/constants";
import { getClassSessionsByTermId } from "../../redux/action/sessionAction";
import { getTermsOfClass } from "../../redux/action/terms-actions";
import { getMembersOfSession } from "../../redux/action/memberAction";

const MoreIconButton = () => (
  <IconButton sx={{ mr: "10px" }}>
    <ImgIcon alt="more">{moreIcon}</ImgIcon>
  </IconButton>
);

const ExpandIcon = () => <ImgIcon>{arrowDownIcon}</ImgIcon>;

const VerifiedIcon = ({ title = "test" }) => (
  <Tooltip title={title}>
    <Box sx={{ display: "inline-block" }}>
      <ImgIcon>{allergyIcon}</ImgIcon>
    </Box>
  </Tooltip>
);

const ClassEnrollments = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id: classId } = useParams();
  const classTerms = useSelector((state) => state.terms.termsOfClass);
  const classSessionsInTerm = useSelector(
    (state) => state.sessions.sessionsOfClassInTerm
  );
  const membersOfSession = useSelector(
    (state) => state.members.membersOfSession
  );
  const { page: currentPage, totalPages } = useSelector(
    (state) => state.members
  );
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedSession, setSelectedSession] = useState("");

  const pagination = (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(event, value) => {}}
    />
  );

  const tableRows = useMemo(
    () =>
      membersOfSession.map(
        ({
          _id,
          droppedDate,
          discontinuationReason,
          member,
          memberConsent,
          startDate,
          registeredDate,
          enrolledStatus,
        }) => {
          let date = new Date(registeredDate);
          let enrolledDate = registeredDate
            ? date.toISOString().split("T")[0] +
              " / " +
              date.toLocaleTimeString()
            : "N/A";
          const allergy = (
            <VerifiedIcon title={memberConsent?.consent?.allergies} />
          );
          const condition = (
            <VerifiedIcon title={memberConsent?.consent?.condition} />
          );
          return {
            onClick: () => history.push(`/members/info/${_id}`),
            items: [
              member.name,
              allergy,
              condition,
              startDate ? startDate.split("T")[0] : "N/A",
              enrolledDate,
              enrolledStatus,
              discontinuationReason,
              droppedDate ? droppedDate : "N/A",
            ],
          };
        }
      ),
    [membersOfSession, history]
  );

  const handleTermChange = (e) => {
    setSelectedTerm(e.target.value);
  };

  const handleSessionChange = (e) => {
    setSelectedSession(e.target.value);
  };

  useEffect(() => {
    dispatch(getTermsOfClass(classId));
  }, [dispatch, classId]);

  useEffect(
    () => classTerms.length && setSelectedTerm(classTerms[0]._id),
    [classTerms]
  );

  useEffect(() => {
    if (selectedTerm) dispatch(getClassSessionsByTermId(classId, selectedTerm));
  }, [dispatch, classId, selectedTerm]);

  useEffect(() => {
    classSessionsInTerm.length &&
      setSelectedSession(classSessionsInTerm[0]._id);
  }, [classSessionsInTerm]);

  useEffect(() => {
    selectedSession && dispatch(getMembersOfSession(selectedSession));
  }, [selectedSession, dispatch]);

  const sessionInfo = useMemo(() => {
    if (!selectedSession) return;
    const currentSession = classSessionsInTerm.find(
      (session) => session._id === selectedSession
    );
    const {
      term,
      pattern,
      status,
      facility,
      coach,
      fullcapacity,
      fullcapacityfilled,
      waitcapacity,
      waitcapacityfilled,
    } = currentSession;
    const info = {
      "Start Date": term.startDate.split("T")[0],
      "End Date": term.endDate.split("T")[0],
      "Start Time": pattern[0].startTime.split("T")[0],
      "End Time": pattern[0].endTime.split("T")[0],
      Pattern: pattern[0].day,
      Facility: facility,
      "Session Enrolment Status": status,
      "Coach Name": coach?.name,
      "Full class capacity": fullcapacity,
      Enrolled: fullcapacityfilled,
      "Waitlist Capacity": waitcapacity,
      "Waitlist Enrolled": waitcapacityfilled,
    };
    return info;
  }, [selectedSession, classSessionsInTerm]);

  return (
    <Box>
      <Card>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(250px, 1fr))",
            columnGap: "20px",
          }}
        >
          <TextField
            select
            value={selectedTerm}
            label="Term"
            onChange={handleTermChange}
            variant="filled"
          >
            {classTerms ? (
              classTerms.map(({ _id, label }) => (
                <MenuItem key={_id} value={_id}>
                  {label}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" />
            )}
          </TextField>
          <TextField
            select
            label="Session"
            value={selectedSession}
            onChange={handleSessionChange}
            variant="filled"
          >
            {classSessionsInTerm ? (
              classSessionsInTerm.map(({ _id, name }) => {
                return (
                  <MenuItem key={_id} value={_id}>
                    {name}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem value="" />
            )}
          </TextField>
        </Box>
        <Box sx={{ mt: "20px" }}>
          <Outputs items={sessionInfo} />
        </Box>
      </Card>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Box sx={{ display: "flex", flex: 1, alignItems: "center" }}>
            <Typography variant="h3" sx={{ fontSize: "20px", flex: 1 }}>
              Members
            </Typography>
            <MoreIconButton />
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <CustomTable
            headers={enrollmentHeaders}
            rows={tableRows}
            pagination={pagination}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ClassEnrollments;
