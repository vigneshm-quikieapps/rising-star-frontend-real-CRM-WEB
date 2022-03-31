import { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

import { getSessionsOfClass } from "../../redux/action/class-actions";
import { setPageTitle } from "../../redux/action/shared-actions";
import toPascal from "../../utils/to-pascal";
import { Accordion, Output, Outputs, ImgIcon } from "../../components";
import arrowDownIcon from "../../assets/icons/icon-arrow-down.png";

const OutputsContainer = ({
  header: { title: headerTitle = "", description: headerDescription = "" },
  children,
}) => (
  <Box
    sx={{
      bgcolor: (theme) => theme.palette.highlight.main,
      borderRadius: (theme) => theme.shape.borderRadiuses.ternary,
      p: "10px",
      mb: "10px",
      "&:last-child": { mb: 0 },
    }}
  >
    <Output
      variant="header"
      title={headerTitle}
      description={headerDescription}
    />
    {children}
  </Box>
);

const ClassDefinition = () => {
  const dispatch = useDispatch();
  const theClass = useSelector((state) => state.classes.class);
  const sessions = useSelector((state) => state.classes.classSessions);
  const { _id: classId, enrolmentControls = [], charges = [] } = theClass;

  useEffect(() => dispatch(setPageTitle("Definition")), [dispatch]);

  const Charges = useCallback(
    () =>
      charges.map(({ _id, name, amount, mandatory, payFrequency }) => {
        const outputItems = {
          Amount: amount,
          Mandatory: mandatory ? "Yes" : "No",
          "Pay Frequency": toPascal(payFrequency),
        };

        return (
          <OutputsContainer
            key={_id}
            header={{ title: "Charge", description: name }}
          >
            <Outputs items={outputItems} />
          </OutputsContainer>
        );
      }),
    [charges],
  );
  const reformatDate = (dateStr) => {
    let dArr = dateStr.split("-"); // ex input "2010-01-18"
    return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"
  };
  const Sessions = useCallback(
    () =>
      sessions.map((session) => {
        const {
          _id,
          name,
          trailAllowed,
          fullcapacity,
          waitcapacity,
          facility,
          startDate,
          endDate,
          termData: { label: termLabel },
          pattern: [{ startTime, endTime }],
          coach: { name: coachName },
        } = session;
        const days = session.pattern.map(({ day }) => day).join(", ");
        const outputItems = {
          "Start Date": reformatDate(startDate.split("T")[0]),
          "End Date": reformatDate(endDate.split("T")[0]),
          "Trail Session Allowed": trailAllowed ? "Yes" : "No",
          "Session Name": name,
          Pattern: toPascal(days),
          "Start Time": new Date(startTime).toLocaleTimeString(
            navigator.language,
            { hour: "2-digit", minute: "2-digit" },
          ),
          "End Time": new Date(endTime).toLocaleTimeString(navigator.language, {
            hour: "2-digit",
            minute: "2-digit",
          }),
          "Coach Name": coachName,
          "Full Class Capacity": fullcapacity,
          "Waitlist Capacity": waitcapacity,
          Facility: facility,
        };
        return (
          <OutputsContainer
            key={_id}
            header={{ title: "Term", description: termLabel }}
          >
            <Outputs items={outputItems} />
          </OutputsContainer>
        );
      }),
    [sessions],
  );

  const enrolmentControlItems = useMemo(() => {
    return enrolmentControls.reduce((prev, { name = "", values = [] }) => {
      let title = name;
      const description = toPascal(values.join(", "));
      return { ...prev, [title]: description };
    }, {});
  }, [enrolmentControls]);

  useEffect(() => {
    classId && dispatch(getSessionsOfClass(classId));
  }, [dispatch, classId]);

  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ImgIcon>{arrowDownIcon}</ImgIcon>}>
          <Typography variant="h3" sx={{ fontSize: "20px" }}>
            Enrolment Controls
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Outputs items={enrolmentControlItems} />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ImgIcon>{arrowDownIcon}</ImgIcon>}>
          <Typography variant="h3" sx={{ fontSize: "20px" }}>
            Charges
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Charges />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ImgIcon>{arrowDownIcon}</ImgIcon>}>
          <Typography variant="h3" sx={{ fontSize: "20px" }}>
            Class Schedule
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Sessions />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ClassDefinition;
