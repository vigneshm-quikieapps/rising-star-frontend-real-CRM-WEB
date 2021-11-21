import { useState } from "react";
import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

import {
  Accordion,
  GradientButton,
  Pagination as StyledPagination,
} from "../../../components";
import {
  AccordionContainer,
  CardRow,
  Description,
} from "../../../components/common";
import Session from "../../class-list/session";

const paginationCustomStyle = {
  "& ul": {
    justifyContent: "center",
    margin: "15px",
    "& .MuiButtonBase-root": {
      width: 30,
      height: 30,
      backgroundColor: "#fff",
      borderRadius: (theme) => theme.shape.borderRadiuses.primary,
    },
    "& .Mui-selected": {
      backgroundColor: (theme) => theme.palette.darkIndigo.main,
      color: "#fff",
    },
  },
};

const Sessions = ({
  classSessionsRef,
  setClassSessions,
  isEdit,
  classId,
  touched,
  initialSessions,
}) => {
  const [page, setPage] = useState(1);
  const [showAddSession, setShowAddSession] = useState(false);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const addSessionRow = () => {
    if (isEdit) {
      return setShowAddSession(true);
    }
    // classSessionsRef.unshift({
    //   name: "",
    //   dayIndex: [],
    //   facility: "",
    //   fullCapacity: "",
    //   waitlistCapacity: "",
    //   coachId: "",
    //   selectedTerm: { _id: "" },
    //   startDate: new Date(),
    //   endDate: new Date(),
    //   startTime: new Date(),
    //   endTime: new Date(),
    // });
    // setPage(1);
  };

  const totalPages = Math.ceil(initialSessions.length / 3);

  return (
    <CardRow>
      <AccordionContainer>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <CardRow sx={{ width: "100%", padding: "0 10px 0 0" }}>
              <Typography>Class Schedule</Typography>
              <GradientButton
                onClick={(e) => {
                  e.stopPropagation();
                  addSessionRow();
                }}
              >
                <AddIcon /> Add Session
              </GradientButton>
            </CardRow>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: 0,
              backgroundColor: "rgba(219, 216, 227, 0.5)",
            }}
          >
            {classSessionsRef.length ? (
              <>
                <CardRow>
                  <Description
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      margin: "17px 0px 5px 15px",
                    }}
                  >
                    Sessions
                  </Description>
                </CardRow>
                {showAddSession && (
                  <Session
                    areSessionsTouched={touched}
                    isEdit={isEdit}
                    initialSessionData={{
                      name: "",
                      dayIndex: [],
                      facility: "",
                      fullCapacity: "",
                      waitlistCapacity: "",
                      coachId: "",
                      selectedTerm: { _id: "" },
                      startDate: new Date(),
                      endDate: new Date(),
                      startTime: new Date(),
                      endTime: new Date(),
                    }}
                    // index={index}
                    // sessions={classSessions}
                    // setSessionData={setClassSessions}
                    classId={classId}
                  />
                )}
                {initialSessions.map((session, index) => {
                  const start = (page - 1) * 3;
                  if (index >= start && index <= start + 2) {
                    return (
                      <Session
                        areSessionsTouched={touched}
                        isEdit={isEdit}
                        key={index}
                        initialSessionData={session}
                        index={index}
                        classSessionsRef={classSessionsRef}
                        setSessionData={setClassSessions}
                        classId={classId}
                      />
                    );
                  }
                  return null;
                })}
              </>
            ) : null}

            <CardRow
              sx={{
                justifyContent: "center",
              }}
            >
              <StyledPagination
                sx={paginationCustomStyle}
                count={totalPages}
                page={page}
                onChange={handlePageChange}
              />
            </CardRow>
          </AccordionDetails>
        </Accordion>
      </AccordionContainer>
    </CardRow>
  );
};

export default Sessions;
