import {
  AccordionDetails,
  AccordionSummary,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  Accordion,
  DatePicker,
  GradientButton,
  ImgIcon,
} from "../../../components";
import {
  AccordionContainer,
  CardRow,
  Description,
} from "../../../components/common";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import plusIcon from "../../../assets/icons/icon-add.png";

import { Box } from "@mui/system";
import StyledTextField from "../../../components/textfield";
import { useSelector } from "react-redux";
import Session from "../../class-list/session";
import StyledPagination from "../../../components/pagination";
import { useState } from "react";

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

const Sessions = (props) => {
  const { classSessions, setClassSessions, selectedTerm, setSelectedTerm } =
    props;
  const [page, setPage] = useState(1);

  const termsOfBusiness = useSelector((state) => state.terms.termsOfBusiness);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const addSessionRow = () => {
    let newSessions = [...classSessions];
    newSessions.push({
      name: "",
      dayIndex: -1,
      facility: "",
      fullCapacity: "",
      waitlistCapacity: "",
      coachId: "",
    });
    setPage(1);
    setClassSessions(newSessions);
  };

  const totalPages = Math.ceil(classSessions.length / 2);

  return (
    <CardRow>
      <AccordionContainer>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <CardRow sx={{ width: "100%", padding: "0 10px 0 0" }}>
              <Typography>Class Schedule</Typography>
              <GradientButton
                onClick={(e) => {
                  e.stopPropagation();
                  addSessionRow();
                }}
              >
                <ImgIcon alt="plus">{plusIcon}</ImgIcon>Add Session
              </GradientButton>
            </CardRow>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: 0,
              backgroundColor: "rgba(219, 216, 227, 0.5)",
            }}
          >
            <Box sx={{ padding: "15px" }}>
              <CardRow
                sx={{
                  marginTop: "1%",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ width: "40%" }}>
                  <StyledTextField
                    select
                    label="term"
                    value={termsOfBusiness.length ? selectedTerm._id : ""}
                    variant={"filled"}
                    onChange={(e) => {
                      setSelectedTerm(
                        termsOfBusiness.find(
                          ({ _id }) => _id === e.target.value
                        )
                      );
                    }}
                    sx={{ width: "100%" }}
                  >
                    {termsOfBusiness.length ? (
                      termsOfBusiness.map(({ _id, label }) => {
                        return (
                          <MenuItem key={label} value={_id}>
                            {label}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem value="">No terms</MenuItem>
                    )}
                  </StyledTextField>
                </Box>
                <Box sx={{ width: "20%" }}>
                  <DatePicker
                    disabled
                    label="Start Date"
                    date={selectedTerm?.startDate}
                  />
                </Box>
                <Box sx={{ width: "20%" }}>
                  <DatePicker
                    disabled
                    label="End Date"
                    date={selectedTerm?.endDate}
                    sx={{ width: "100%", margin: 20 }}
                  />
                </Box>
              </CardRow>
            </Box>
            {classSessions.length ? (
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
                {classSessions.map((session, index) => {
                  const start = (page - 1) * 2;
                  if (index >= start && index <= start + 1) {
                    return (
                      <Session
                        key={index}
                        data={session}
                        index={index}
                        sessions={classSessions}
                        setSessionData={setClassSessions}
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
                onChange={handleChange}
              />
            </CardRow>
          </AccordionDetails>
        </Accordion>
      </AccordionContainer>
    </CardRow>
  );
};

export default Sessions;
