import { useParams } from "react-router";
import { useState, useEffect, useCallback } from "react";
import {
  MenuItem,
  styled,
  Box,
  Grid,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TopNav from "./components/top-nav";
import {
  Accordion,
  GradientButton,
  DatePicker,
  TextField,
  Output,
  Outputs,
  Table,
} from "../../components/index";

import { getTermsOfClass } from "../../redux/action/terms-actions";
import { getClassSessionsByTermId } from "../../redux/action/sessionAction";
import { getPaymentDetailsOfSession } from "../../redux/action/billingActions";

const StyleBox = styled(Box)(({ theme }) => ({
  padding: "20px",
  marginBottom: "15px",
  border: `1px solid ${theme.palette.ternary.main}`,
  borderRadius: theme.shape.borderRadiuses.secondary,
  "& .MuiTypography-h4": {
    fontWeight: 700,
    marginBottom: "0.1em",
  },
  "& .MuiTypography-subtitle2": {
    fontWeight: 700,
    color: theme.palette.text.primary,
    opacity: 0.5,
    marginBottom: "1em",
    fontSize: "1rem",
  },
}));

const timeConverter = (time) => {
  const convertedTime = new Date(time).toLocaleTimeString("en", {
    timeStyle: "short",
    hour12: true,
    timeZone: "UTC",
  });

  if (time === undefined || time === "Invalid Date") {
    return "- - -";
  } else {
    return convertedTime;
  }
};

const dateToIsoDateConverter = (simpleDate) => {
  // console.log(new Date(simpleDate).getFullYear());
  if (simpleDate) {
    // let date = simpleDate.toISOString();
    let date = new Date(simpleDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = "1";

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }

    // console.log(year+'-' + month + '-'+dt);
    return `${year}-${month}-${dt}`;
  }
};

const ClassPayments = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const termList = useSelector((state) => state.terms.termsOfClass);
  const sessionList = useSelector(
    (state) => state.sessions.sessionsOfClassInTerm
  );
  const paymentList = useSelector((state) => state.billing.paymentList);

  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [date, setDate] = useState(new Date());
  const [items, setItems] = useState({
    "Start Time": "- - -",
    "End Time": "- - -",
    Facility: "- - -",
    "Coach Name": "- - -",
    Pattern: "- - -",
    "Full class capacity": "- - -",
    Enrolled: "- - -",
  });

  const tableHeaders = ["Name", "Start Date", "Start", "Payment Status"];

  const getPaymentTableParams = useCallback((sessionId, date) => {
    return new Promise((resolve, reject) => {
      const paymentTableParams = {
        sessionId: sessionId,
        date: dateToIsoDateConverter(date),
      };
      resolve(paymentTableParams);
    });
  }, []);

  useEffect(() => {
    dispatch(getTermsOfClass(id));
  }, [dispatch, id]);

  useEffect(() => {
    termList && setSelectedTerm(termList[0]?._id || "");
  }, [termList]);

  useEffect(() => {
    if (selectedTerm) dispatch(getClassSessionsByTermId(id, selectedTerm));
  }, [dispatch, id, selectedTerm]);

  useEffect(() => {
    sessionList && setSelectedSession(sessionList[0]?._id || "");
    sessionList &&
      setItems((previous) => ({
        ...previous,
        "Start Time": `${timeConverter(
          sessionList[0]?.pattern[0].startTime || "- - -"
        )}`,
        "End Time": `${timeConverter(
          sessionList[0]?.pattern[0].endTime || "- - -"
        )}`,
        Facility: sessionList[0]?.facility || "- - -",
        "Coach Name": sessionList[0]?.coach.name || "- - -",
        Pattern: sessionList[0]?.pattern[0].day || "- - -",
        "Full class capacity": sessionList[0]?.fullcapacity || "- - -",
        Enrolled: sessionList[0]?.fullcapacityfilled || "- - -",
      }));
  }, [sessionList]);

  useEffect(() => {
    getPaymentTableParams(selectedSession, date).then((res) => {
      console.log(res);
      if (res.sessionId && res.date) {
        dispatch(getPaymentDetailsOfSession(res));
      }
    });
  }, [dispatch, getPaymentTableParams, selectedSession, date]);

  const termChangeHandler = (e) => {
    setSelectedTerm(e.target.value);
  };

  const sessionChangeHandler = (e) => {
    const sessionId = e.target.value;
    setSelectedSession(sessionId);
    const filterSession = sessionList.filter(
      (session) => session._id === sessionId
    );
    setItems((previous) => ({
      ...previous,
      "Start Time": `${timeConverter(
        filterSession[0]?.pattern[0].startTime || "- - -"
      )}`,
      "End Time": `${timeConverter(
        filterSession[0]?.pattern[0].endTime || "- - -"
      )}`,
      Facility: filterSession[0]?.facility || "- - -",
      "Coach Name": filterSession[0]?.coach.name || "- - -",
      Pattern: filterSession[0]?.pattern[0].day || "- - -",
      "Full class capacity": filterSession[0]?.fullcapacity || "- - -",
      Enrolled: filterSession[0]?.fullcapacityfilled || "- - -",
    }));
  };

  console.log(paymentList);

  return (
    <Box sx={{ width: "100%" }}>
      {/* <TopNav /> */}
      <StyleBox>
        <Grid
          container
          alignItems="center"
          spacing={3}
          sx={{ marginBottom: "20px" }}
        >
          <Grid item xs={4}>
            <TextField
              select
              label="Term"
              variant="filled"
              sx={{ width: "100%" }}
              value={selectedTerm}
              onChange={termChangeHandler}
            >
              {termList.map((li, index) => (
                <MenuItem key={`T${index}`} value={`${li._id}`}>
                  {li.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              label="Session"
              variant="filled"
              sx={{ width: "100%" }}
              value={selectedSession}
              onChange={sessionChangeHandler}
            >
              {sessionList.map((li, index) => (
                <MenuItem key={`s${index}`} value={`${li._id}`}>
                  {li.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <DatePicker
              label="Start Date"
              date={date}
              onChange={(newDate) => setDate(newDate)}
              views={["year", "month"]}
              inputProps={{
                sx: {
                  width: "100%",
                },
              }}
            />
          </Grid>
        </Grid>
        <Outputs items={items} columnCount={4} rowGap={2} />
      </StyleBox>
      <Accordion
        // expanded={expanded === `panel${index + 1}`}
        // onChange={handleChange(`panel${index + 1}`)}
        sx={{ marginBottom: "16px" }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Registered Members</Typography>
        </AccordionSummary>
        <AccordionDetails
        // sx={{ padding: 0, paddingBottom: "10px" }}
        >
          {/* <Table headers={tableHeaders} /> */}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ClassPayments;
