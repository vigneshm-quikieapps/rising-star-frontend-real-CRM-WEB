import { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

import toKebab from "../../utils/to-kebab";
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
  const { enrolmentControls = [], charges = [] } = theClass;

  const Charges = useCallback(
    () =>
      charges.map(({ _id, name, amount, mandatory, payFrequency }) => {
        const outputItems = {
          Amount: amount,
          Mandatory: mandatory ? "Yes" : "No",
          "Pay Frequency": toKebab(payFrequency),
        };

        return (
          <OutputsContainer
            key={_id}
            header={{ title: "Charge", description: toKebab(name) }}
          >
            <Outputs items={outputItems} />
          </OutputsContainer>
        );
      }),
    [charges]
  );

  const enrolmentControlItems = useMemo(() => {
    return enrolmentControls.reduce((prev, { name = "", values = [] }) => {
      let title = toKebab(name);
      const description = values.join(" ,");
      return { ...prev, [title]: description };
    }, {});
  }, [enrolmentControls]);

  useEffect(() => {}, [theClass]);

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
    </>
  );
};

export default ClassDefinition;
