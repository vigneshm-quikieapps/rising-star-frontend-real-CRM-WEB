import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";

const style = (theme) => {
  return {
    "&.MuiAccordion-root": {
      border: `1px solid ${theme.palette.ternary.main}`,
      borderRadius: `${theme.shape.borderRadiuses.secondary}`,
      boxShadow: "none",
    },
    "& .MuiAccordionSummary-root": {
      height: "68px",
      "& .MuiTypography-root": {
        fontWeight: "bold",
        fontSize: "20px",
      },
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
      border: `1px solid ${theme.palette.ternary.main}`,
      borderRadius: `${theme.shape.borderRadiuses.primary}`,
      color: `${theme.palette.text.primary}`,
      padding: "10px",
    },
    "& .MuiAccordionDetails-root": {
      borderTop: `1px solid ${theme.palette.ternary.main}`,
    },
  };
};

const Accordion = styled(MuiAccordion)(({ theme }) => style(theme));

export default Accordion;
