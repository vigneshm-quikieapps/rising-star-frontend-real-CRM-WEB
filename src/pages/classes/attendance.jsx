import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  TextField,
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
  addAttendance,
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
import {
  attendanceHeaders,
  shortWeekNamesStartingWithSunday,
} from "../../helper/constants";
import arrowDownIcon from "../../assets/icons/icon-arrow-down.png";
import phoneIcon from "../../assets/icons/icon-phone.png";
import allergyIcon from "../../assets/icons/icon-allergy.png";

import { Undo as RestoreDefaultsIcon } from "@mui/icons-material";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [touched, setTouched] = useState(false);

  const restoreDefaults = (e) => {
    e.stopPropagation();
    setAttendanceList(attendanceRowData() ? attendanceRowData() : []);
    setTouched(false);
  };

  // const handlePageChange = useCallback(
  //   (_, value) => {
  //     if (value !== currentPage)
  //       dispatch(getMembersOfSession(selectedSession, { page: value }));
  //   },
  //   [dispatch, currentPage, selectedSession]
  // );

  const totalPages = useMemo(() => {
    let allMembersAttendanceCount = attendance?.records?.length;
    return allMembersAttendanceCount
      ? Math.ceil(allMembersAttendanceCount / 10)
      : 0;
  }, [attendance?.records]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const pagination = (
    <Pagination
      sx={{ my: "20px" }}
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
    />
  );

  const changeHandler = useCallback(
    (e, index, field) => {
      let updatedAttendance = [...attendanceList];

      switch (field) {
        case "attended":
          updatedAttendance[index].attended =
            !updatedAttendance[index].attended;
          break;
        case "comments":
          updatedAttendance[index].comments = e.target.value;
          break;
        default:
      }
      setTouched(true);
      setAttendanceList(updatedAttendance);
    },
    [attendanceList]
  );

  const onSave = (e) => {
    e.stopPropagation();
    if (attendanceList.length) {
      let attendanceData = {
        sessionId: selectedSession,
        date: date.toISOString().split("T")[0],
        records: attendanceList.map(({ memberId, attended, comments }) => ({
          memberId,
          attended,
          comments,
        })),
      };
      dispatch(
        addAttendance({
          data: attendanceData,
          callback: () => setTouched(false),
        })
      );
    }
  };

  const attendanceRows = useMemo(() => {
    if (attendanceList?.length) {
      let paginatedAttendanceRows = attendanceList.map((item, index) => {
        const start = (currentPage - 1) * 10;
        if (index >= start && index <= start + 9) {
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
                  changeHandler(null, index, "attended");
                }}
              />,
              <TextField
                value={comments}
                onChange={(e) => {
                  changeHandler(e, index, "comments");
                }}
              />,
            ],
          };
        }
        return null;
      });

      return paginatedAttendanceRows.filter((item) => item !== null);
    }
    return [];
  }, [attendanceList, currentPage, changeHandler]);

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
          shortWeekNamesStartingWithSunday.indexOf(item.day.toLowerCase())
        ),
      };
      return [info, dateInfo];
    }
  }, [selectedSession, classSessionsInTerm]);

  const attendanceRowData = useCallback(() => {
    return attendance?.records?.map((item) => {
      const {
        attended,
        memberId,
        member: {
          name,
          parent: { mobileNo: pContact },
          contacts,
        },
        memberConsent: {
          consent: { allergies, condition },
        },
      } = item;
      return {
        name,
        parentContact: pContact,
        ecContact: contacts[0].contact,
        allergies,
        condition,
        paymentStatus: "No Info",
        startDate: "No Info",
        attended,
        comments: "no data",
        memberId,
      };
    });
  }, [attendance?.records]);

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
      setSelectedSession(
        classSessionsInTerm[classSessionsInTerm.length - 1]._id
      );
  }, [classSessionsInTerm]);

  useEffect(() => {
    setDate(new Date());
  }, [selectedSession]);

  useEffect(() => {
    date &&
      selectedSession.length &&
      dispatch(
        getAttendanceOfSessionByDate({
          sessionId: selectedSession,
          date: date.toISOString().split("T")[0],
        })
      );
  }, [date, dispatch, selectedSession]);

  useEffect(() => {
    setAttendanceList(attendanceRowData() ? attendanceRowData() : []);
  }, [attendanceRowData]);

  // useEffect(() => {
  //   selectedSession.length &&
  //     dispatch(getMembersOfSession(selectedSession, { page: 1 }));
  // }, [selectedSession, dispatch]);

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
              setTouched(false);
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
              setTouched(false);
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
              setTouched(false);
              setDate(e);
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
            {touched && (
              <>
                <GradientButton sx={{ marginRight: "1%" }} onClick={onSave}>
                  Save
                </GradientButton>
                <IconButton
                  sx={{ borderRadius: "50%", margin: "0 10px" }}
                  onClick={restoreDefaults}
                >
                  <RestoreDefaultsIcon />
                </IconButton>
              </>
            )}
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
