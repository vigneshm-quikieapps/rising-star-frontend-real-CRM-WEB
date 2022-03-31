import { useMemo, useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";

import { Card } from "../../components/common";
import {
  Accordion,
  TextField,
  Table as CustomTable,
  ImgIcon,
  Pagination,
  Tooltip,
  Outputs,
} from "../../components";
import arrowDownIcon from "../../assets/icons/icon-arrow-down.png";
import allergyIcon from "../../assets/icons/icon-allergy.png";
import { enrollmentHeaders } from "../../helper/constants";
import { getClassSessionsByTermId } from "../../redux/action/sessionAction";
import { getTermsOfClass } from "../../redux/action/terms-actions";
import { getMembersOfSession } from "../../redux/action/memberAction";
import { setPageTitle } from "../../redux/action/shared-actions";
import toPascal from "../../utils/to-pascal";

const ExpandIcon = () => <ImgIcon>{arrowDownIcon}</ImgIcon>;

const VerifiedIcon = ({ title, type }) => {
  return (
    <Tooltip title={title || `No ${type}`}>
      <Box sx={{ display: "inline-block" }}>
        <ImgIcon>{allergyIcon}</ImgIcon>
      </Box>
    </Tooltip>
  );
};

const reformatDate = (dateStr) => {
  let dArr = dateStr.split("-"); // ex input "2010-01-18"
  return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"
};
const ClassEnrollments = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id: classId } = useParams();
  const classTerms = useSelector((state) => state.terms.termsOfClass);
  const classSessionsInTerm = useSelector(
    (state) => state.sessions.sessionsOfClassInTerm,
  );
  const membersOfSession = useSelector(
    (state) => state.members.membersOfSession,
  );
  const membersOfSession1 = useSelector(
    (state) => state.members.membersOfSession,
  );
  // console.log("membersOfSession", membersOfSession1);
  const { currentPage, totalPages } = useSelector((state) => state.members);
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedSession, setSelectedSession] = useState("");

  useEffect(() => dispatch(setPageTitle("Enrolments")), [dispatch]);

  const handlePageChange = useCallback(
    (_, value) => {
      if (value !== currentPage)
        dispatch(getMembersOfSession(selectedSession, { page: value }));
    },
    [dispatch, currentPage, selectedSession],
  );

  const pagination = (
    <Pagination
      sx={{ my: "20px" }}
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
    />
  );
  let temp = membersOfSession.filter((data) => data.member !== null);
  const tableRows = useMemo(
    () =>
      temp.map(
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
            ? reformatDate(date.toISOString().split("T")[0]) +
              " / " +
              date.toLocaleTimeString(navigator.language, {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "N/A";
          const allergy = (
            <VerifiedIcon
              title={memberConsent?.consent?.allergies}
              type={"allergies"}
            />
          );
          const condition = (
            <VerifiedIcon
              title={memberConsent?.consent?.condition}
              type={"conditions"}
            />
          );
          return {
            onClick: () => history.push(`/members/info/${_id}`),
            items: [
              member?.name,
              allergy,
              condition,
              startDate ? reformatDate(startDate.split("T")[0]) : "N/A",
              enrolledDate,
              toPascal(enrolledStatus),
              toPascal(discontinuationReason),
              droppedDate ? reformatDate(droppedDate.split("T")[0]) : "N/A",
            ],
          };
        },
      ),
    [membersOfSession, history],
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
    [classTerms],
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
    if (!selectedSession) return {};
    const currentSession = classSessionsInTerm.find(
      (session) => session._id === selectedSession,
    );
    if (!currentSession) return {};
    const {
      startDate,
      endDate,
      pattern,
      status,
      facility,
      coach,
      fullcapacity,
      fullcapacityfilled,
      waitcapacity,
      waitcapacityfilled,
    } = currentSession;
    const days = pattern.map(({ day }) => day).join(", ");
    const info = {
      "Start Date": reformatDate(startDate.split("T")[0]),
      "End Date": reformatDate(endDate.split("T")[0]),
      "Start Time": new Date(pattern[0].startTime).toLocaleTimeString(
        navigator.language,
        {
          hour: "2-digit",
          minute: "2-digit",
        },
      ),
      "End Time": new Date(pattern[0].endTime).toLocaleTimeString(
        navigator.language,
        {
          hour: "2-digit",
          minute: "2-digit",
        },
      ),
      Pattern: toPascal(days),
      Facility: facility,
      "Session Enrolment Status": toPascal(status).replaceAll("_", " "),
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
            variant="outlined"
            InputLabelProps={{ style: { background: "#fff" } }}
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
            variant="outlined"
            InputLabelProps={{ style: { background: "#fff" } }}
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
          <Typography variant="h3" sx={{ fontSize: "20px", flex: 1 }}>
            Members
          </Typography>
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
