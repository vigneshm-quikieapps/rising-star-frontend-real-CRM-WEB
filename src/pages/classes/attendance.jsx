import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  TextField,
  TableMui,
  Outputs,
  Accordion,
  Pagination,
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
  getAttendanceOfSessionByDate,
  getClassSessionsByTermId,
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
import {
  attendanceHeaders,
  ShortWeekNamesStartingWithSunday,
} from "../../helper/constants";
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
  const [date, setDate] = useState(null);
  const [attendanceList, setAttendanceList] = useState([]);
  const { currentPage, totalPages } = useSelector((state) => state.members);
  const membersOfSession = useSelector(
    (state) => state.members.membersOfSession
  );

  const handlePageChange = useCallback(
    (_, value) => {
      if (value !== currentPage)
        dispatch(getMembersOfSession(selectedSession, { page: value }));
    },
    [dispatch, currentPage, selectedSession]
  );

  const pagination = (
    <Pagination
      sx={{ my: "20px" }}
      count={totalPages}
      page={currentPage}
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
        })
      : [];
  }, [attendanceList, onChangeComment, onChangeAttended]);

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
    if (currentSession) {
      const {
        pattern,
        facility,
        coach,
        fullcapacity,
        fullcapacityfilled,
        startDate,
        endDate,
      } = currentSession;

      let patternCombined = "";
      pattern.forEach((item, index) => {
        patternCombined += item.day;
        if (index !== pattern.length - 1) {
          patternCombined += ", ";
        }
      });
      const { startTime, endTime } = pattern[0];

      const info = {
        "Start Time": new Date(startTime).toLocaleString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        "End Time": new Date(endTime).toLocaleString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        Facility: toPascal(facility),
        "Coach Name": toPascal(coach?.name),
        Pattern: toPascal(patternCombined),
        "Full class capacity": fullcapacity,
        Enrolled: fullcapacityfilled,
      };

      const dateInfo = {
        startDate,
        endDate,
        pattern: pattern.map((item) =>
          ShortWeekNamesStartingWithSunday.indexOf(item.day.toLowerCase())
        ),
      };
      return [info, dateInfo];
    }
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
    let attendanceRowData = membersOfSession?.map((item) => {
      const {
        startDate,
        member: { _id: memberId, name },
        memberConsent: {
          consent: { allergies, condition },
        },
      } = item;
      return {
        name,
        parentContact: "no data",
        ecContact: "no data",
        allergies,
        condition,
        paymentStatus: "No Info",
        startDate: startDate.split("T")[0],
        attended: "no data",
        comments: "no data",
        memberId,
      };
    });
    setAttendanceList(attendanceRowData ? attendanceRowData : []);
  }, [membersOfSession]);

  useEffect(() => {
    selectedSession.length &&
      dispatch(getMembersOfSession(selectedSession, { page: 1 }));
  }, [selectedSession, dispatch]);

  const dateUpperBound = useMemo(() => {
    const today = new Date();
    const sessionEndDate = new Date(sessionInfo && sessionInfo[1].endDate);
    return today >= sessionEndDate ? sessionEndDate : today;
  }, [sessionInfo]);

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
              dispatch(
                getAttendanceOfSessionByDate({
                  sessionId: selectedSession,
                  date: e.toISOString().split("T")[0],
                })
              );
            }}
            minDate={new Date(sessionInfo && sessionInfo[1].startDate)}
            maxDate={dateUpperBound}
            shouldDisableDate={(date) =>
              sessionInfo &&
              sessionInfo[1].pattern.indexOf(date.getDay()) === -1
            }
            label="Date"
            date={date}
          />
        </Box>
        <Box sx={{ mt: "20px" }}>
          <Outputs items={sessionInfo && sessionInfo[0]} />
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
            rows={date && attendanceRows?.length ? attendanceRows : []}
            pagination={pagination}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Attendance;
