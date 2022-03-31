import { useParams } from "react-router";
import { useState, useEffect, useMemo } from "react";
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

import {
  Accordion,
  DatePicker,
  TextField,
  Outputs,
  Table,
  Status,
} from "../../components";

import { getTermsOfClass } from "../../redux/action/terms-actions";
import { getClassSessionsByTermId } from "../../redux/action/sessionAction";
import { getPaymentDetailsOfSession } from "../../redux/action/billingActions";
import { setPageTitle } from "../../redux/action/shared-actions";
import toPascal from "../../utils/to-pascal";

const InputsContainer = styled(Box)(({ theme }) => ({
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
  if (time === undefined || time === "Invalid Date") return "- - -";
  const convertedTime = new Date(time).toLocaleTimeString("en", {
    timeStyle: "short",
    hour12: true,
  });
  return convertedTime;
};

const toISODate = (simpleDate) => {
  let date = new Date(simpleDate);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  return `${year}-${month}-01`;
};

const tableHeaders = ["Name", "Payment Status"];

const ClassPayments = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const termList = useSelector((state) => state.terms.termsOfClass);
  const sessionList = useSelector(
    (state) => state.sessions.sessionsOfClassInTerm,
  );
  const paymentList = useSelector((state) => state.billing.paymentList);
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    dispatch(setPageTitle("Payments"));
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
  }, [sessionList]);

  const items = useMemo(() => {
    const currentSession = sessionList.find(
      (session) => session._id === selectedSession,
    );
    const days = currentSession?.pattern.map(({ day }) => day).join(", ");
    return {
      "Start Time": `${timeConverter(
        currentSession?.pattern[0].startTime || "",
      )}`,
      "End Time": `${timeConverter(currentSession?.pattern[0].endTime || "")}`,
      Facility: currentSession?.facility || "",
      "Coach Name": currentSession?.coach.name || "",
      Pattern: toPascal(days) || "",
      "Full Class Capacity": currentSession?.fullcapacity || "",
      Enrolled: currentSession?.fullcapacityfilled || "",
    };
  }, [sessionList, selectedSession]);

  useEffect(() => {
    if (selectedSession && date) {
      dispatch(
        getPaymentDetailsOfSession({
          sessionId: selectedSession,
          date: toISODate(date),
        }),
      );
    }
  }, [dispatch, selectedSession, date]);

  const termChangeHandler = (e) => {
    setSelectedTerm(e.target.value);
  };

  const sessionChangeHandler = (e) => {
    const sessionId = e.target.value;
    setSelectedSession(sessionId);
  };

  const tableItems = useMemo(() => {
    if (!paymentList) return [];
    return paymentList.map(({ _id, member: { name }, paid }) => ({
      id: _id,
      items: [
        name,
        <Status
          status={paid ? "green" : "red"}
          title={paid ? "Paid" : "Unpaid"}
        />,
      ],
    }));
  }, [paymentList]);

  return (
    <Box sx={{ width: "100%" }}>
      <InputsContainer>
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
              variant="outlined"
              InputLabelProps={{ style: { background: "#fff" } }}
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
              variant="outlined"
              InputLabelProps={{ style: { background: "#fff" } }}
              sx={{ width: "100%" }}
              value={selectedSession}
              onChange={sessionChangeHandler}
            >
              {sessionList.map(({ _id, name }) => (
                <MenuItem key={_id} value={_id}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <DatePicker
              label="Pay Month"
              date={date}
              onChange={(newDate) => setDate(newDate)}
              views={["year", "month"]}
              textfieldProps={{
                sx: {
                  width: "100%",
                },
              }}
            />
          </Grid>
        </Grid>
        <Outputs items={items} columnCount={4} rowGap={2} />
      </InputsContainer>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Registered Members</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table headers={tableHeaders} rows={tableItems} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ClassPayments;
