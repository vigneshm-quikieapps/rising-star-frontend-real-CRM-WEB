import { useState } from "react";
import { useDispatch } from "react-redux";
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
import Session from "./session";
import {
  addSessionToClass,
  editSessionOfClass,
  deleteSessionFromClass,
} from "../../../redux/action/class-actions";

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

const reshapeSessionData = ({
  fullCapacity,
  waitlistCapacity,
  ...otherData
}) => ({
  fullcapacity: fullCapacity,
  waitcapacity: waitlistCapacity,
  ...otherData,
});

const Sessions = ({ sessionList, setClassSessions, classId, touched }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [showAddSession, setShowAddSession] = useState(classId ? false : true);
  const handlePageChange = (_, value) => {
    setShowAddSession(false);
    setPage(value);
  };

  const totalPages = Math.ceil(sessionList.length / 3);

  const addSessionHandler = (data) => {
    const sessionData = reshapeSessionData(data);
    if (classId) {
      return dispatch(
        addSessionToClass({ classId, ...sessionData }, () => {
          setShowAddSession(false);
        }),
      );
    }
    setClassSessions((prevSessions) => {
      return [data, ...prevSessions];
    });
    setShowAddSession(false);
  };

  const editSessionHandler = (data) => {
    const sessionData = reshapeSessionData(data);
    if (data?.id) return dispatch(editSessionOfClass(sessionData, () => {}));
    setClassSessions((prevSessions) => {
      const updatedSessions = prevSessions.map(
        (prevSessionData, sessionIndex) => {
          const { index, ...dataWithoutIndex } = data;
          if (sessionIndex === index) return dataWithoutIndex;
          return prevSessionData;
        },
      );
      return updatedSessions;
    });
  };

  const deleteSessionHandler = ({ index, id }) => {
    if (!id) {
      setClassSessions((prevSessions) =>
        prevSessions.filter((session, sessionIndex) => sessionIndex !== index),
      );
    } else {
      dispatch(deleteSessionFromClass(id));
    }
  };

  return (
    <CardRow>
      <AccordionContainer>
        <Accordion defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <CardRow sx={{ width: "100%", padding: "0 10px 0 0" }}>
              <Typography>Class Schedule</Typography>
              <GradientButton
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAddSession(true);
                }}
                sx={{ fontSize: "16px", fontWeight: "bold" }}
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
                  isNew
                  initialData={{}}
                  onAction={addSessionHandler}
                  onDelete={() => setShowAddSession(false)}
                />
              )}
              {sessionList.map((session, index) => {
                const start = (page - 1) * 3;
                if (index >= start && index <= start + 2) {
                  return (
                    <Session
                      areSessionsTouched={touched}
                      key={index}
                      index={index}
                      initialData={session}
                      onAction={editSessionHandler}
                      onDelete={deleteSessionHandler}
                    />
                  );
                }
                return null;
              })}
            </>
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
