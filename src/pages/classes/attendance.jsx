import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  TextField,
  TableMui,
  Outputs,
  Accordion,
  Pagination,
  Status,
  Card,
  DatePicker,
  Title,
  Description,
  CardRow,
  ImgIcon,
  Table as CustomTable,
  CheckBox,
  Tooltip,
  GradientButton,
} from "../../components";

import { getTermsOfClass } from "../../redux/action/terms-actions";
import {
  getClassSessionsByTermId,
  getAttendanceOfSessionByDate,
} from "../../redux/action/sessionAction";
import { Box } from "@mui/system";
import {
  AccordionDetails,
  AccordionSummary,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import toPascal from "../../utils/to-pascal";
import moreIcon from "../../assets/icons/icon-more.png";
import { useDefaultDate } from "../../hooks";
import { attendanceHeaders } from "../../helper/constants";
import arrowDownIcon from "../../assets/icons/icon-arrow-down.png";
import phoneIcon from "../../assets/icons/icon-phone.png";
import allergyIcon from "../../assets/icons/icon-allergy.png";
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

const PhoneIcon = ({ title = "test" }) => (
  <Tooltip title={title}>
    <Box sx={{ display: "inline-block" }}>
      <ImgIcon>{phoneIcon}</ImgIcon>
    </Box>
  </Tooltip>
);

const Attendance = () => {
  const dispatch = useDispatch();
  const { id: classId } = useParams();
  const defaultDate = useDefaultDate();

  const classTerms = useSelector((state) => state.terms.termsOfClass);
  const classSessionsInTerm = useSelector(
    (state) => state.sessions.sessionsOfClassInTerm
  );
  const attendance = useSelector(
    (state) => state.sessions.attendanceList?.attendance
  );

  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [attendanceList, setAttendanceList] = useState([]);
  const [page, setPage] = useState(1);

  const totalPages = attendanceList.length
    ? Math.ceil(attendanceList.length / 10)
    : 1;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const pagination = (
    <Pagination
      sx={{ my: "20px" }}
      count={totalPages}
      page={page}
      onChange={handlePageChange}
    />
  );
  const onChangeAttended = useCallback(
    (i) => {
      let updatedAttendance = [...attendanceList];
      updatedAttendance[i].attended = !updatedAttendance[i].attended;

      setAttendanceList(updatedAttendance);
    },
    [attendanceList]
  );

  const onChangeComment = useCallback(
    (e, i) => {
      let updatedAttendance = [...attendanceList];
      updatedAttendance[i].comments = e.target.value;
      setAttendanceList(updatedAttendance);
    },
    [attendanceList]
  );
  const onSave = (e) => {
    e.stopPropagation();
  };
  const attendanceRows = useMemo(() => {
    return attendanceList.length
      ? attendanceList.map((item, index) => {
          const {
            name,
            parentContact,
            ecContact,
            allergies,
            condition,
            paymentStatus = "No Info",
            startDate = "No Info",
            attended,
            comments,
            memberId,
          } = item;

          const start = (page - 1) * 10;
          if (index >= start && index <= start + 9) {
            return {
              id: index,
              memberId,
              items: [
                name,
                <PhoneIcon title={parentContact} />,
                <PhoneIcon title={ecContact} />,
                <VerifiedIcon title={allergies} />,
                <VerifiedIcon title={condition} />,
                // <Status status="green" title="No Info" />,
                paymentStatus,
                startDate,
                <CheckBox
                  checked={attended}
                  onChange={() => {
                    onChangeAttended(index);
                  }}
                />,
                <TextField
                  value={comments}
                  onChange={(e) => {
                    onChangeComment(e, index);
                  }}
                />,
              ],
            };
          }
          return null;
        })
      : [];
  }, [attendanceList, onChangeComment, onChangeAttended, page]);

  const updatedDetail = useMemo(() => {
    let date = new Date(attendance?.updatedAt);
    let invalid = date.toString() === "Invalid Date";
    return {
      updatedBy: invalid ? "N/A" : attendance?.updatedBy.name,
      updatedAt: invalid
        ? "N/A"
        : `${date.toISOString().split("T")[0]} ${date.toLocaleTimeString()}`,
    };
  }, [attendance]);

  const sessionInfo = useMemo(() => {
    if (!selectedSession) return;
    const currentSession = classSessionsInTerm.find(
      (session) => session._id === selectedSession
    );
    const { pattern, facility, coach, fullcapacity, fullcapacityfilled } =
      currentSession;
    const info = {
      "Start Time": pattern[0].startTime.split("T")[0],
      "End Time": pattern[0].endTime.split("T")[0],
      Facility: toPascal(facility),
      "Coach Name": toPascal(coach?.name),
      Pattern: toPascal(pattern[0].day),
      "Full class capacity": fullcapacity,
      Enrolled: fullcapacityfilled,
    };
    return info;
  }, [selectedSession, classSessionsInTerm]);

  useEffect(() => {
    dispatch(getTermsOfClass(classId));
  }, [dispatch, classId]);

  useEffect(() => {
    classTerms.length && setSelectedTerm(classTerms[0]._id);
  }, [classTerms]);

  useEffect(() => {
    selectedTerm && dispatch(getClassSessionsByTermId(classId, selectedTerm));
  }, [dispatch, selectedTerm, classId]);

  useEffect(() => {
    classSessionsInTerm.length &&
      setSelectedSession(classSessionsInTerm[0]._id);
  }, [classSessionsInTerm]);

  useEffect(() => {
    let attendanceRowData = attendance?.records?.map((item) => {
      const {
        member: {
          name,
          parent: { mobileNo },
          contacts,
        },
        memberConsent: {
          consent: { allergies, condition },
        },
        attended,
        comments,
        memberId,
      } = item;
      return {
        name,
        parentContact: mobileNo,
        ecContact: contacts[0].contact,
        allergies,
        condition,
        paymentStatus: "No Info",
        startDate: "No Info",
        attended,
        comments,
        memberId,
      };
    });
    setAttendanceList(attendanceRowData ? attendanceRowData : []);
  }, [attendance]);

  useEffect(() => {
    selectedSession.length &&
      dispatch(
        getAttendanceOfSessionByDate({
          sessionId: selectedSession,
          date: date.toISOString().split("T")[0],
        })
      );
  }, [selectedSession, date, dispatch]);

  return (
    <Box>
      <Card>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3,  1fr)",
            columnGap: "20px",
          }}
        >
          <TextField
            select
            value={classTerms.length ? selectedTerm : ""}
            label="Term"
            onChange={(e) => {
              setSelectedTerm(e.target.value);
            }}
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
            onChange={(e) => {
              setSelectedSession(e.target.value);
            }}
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

          <DatePicker
            onChange={(e) => {
              setDate(e);
            }}
            label="Date"
            date={date}
          />
        </Box>
        <Box sx={{ mt: "20px" }}>
          <Outputs items={sessionInfo} />
        </Box>
      </Card>
      <CardRow
        sx={{
          justifyContent: "flex-start",
          alignItems: "center",
          flexWrap: "nowrap",
        }}
      >
        <Title>Last Updated by</Title>
        <Description>{updatedDetail.updatedBy}</Description>
        <Title sx={{ marginLeft: "30px" }}>Last Updated at</Title>
        <Description>{updatedDetail.updatedAt}</Description>
      </CardRow>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Box sx={{ display: "flex", flex: 1, alignItems: "center" }}>
            <Typography variant="h3" sx={{ fontSize: "20px", flex: 1 }}>
              Members
            </Typography>
            <GradientButton sx={{ marginRight: "1%" }} onClick={onSave}>
              Save
            </GradientButton>
            <MoreIconButton />
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <CustomTable
            headers={attendanceHeaders}
            rows={attendanceRows?.length ? attendanceRows : []}
            pagination={pagination}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Attendance;
