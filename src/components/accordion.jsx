import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";

const style = (theme) => {
  return {
    border: `1.7px solid ${theme.palette.highlight.main}`,
    borderRadius: `${theme.shape.borderRadiuses.primary}`,
    "& .MuiAccordionSummary-root": {
      "& .MuiTypography-root": {
        fontFamily: `${theme.typography.fontFamily}`,
        fontWeight: "bold",
        fontSize: "20px",
      },
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
      border: `1.7px solid ${theme.palette.highlight.main}`,
      borderRadius: `${theme.shape.borderRadiuses.primary}`,
      color: `${theme.palette.text.primary}`,
      padding: "10px",
    },
    "& .MuiAccordionDetails-root": {
      borderTop: `2px solid ${theme.palette.highlight.main}`,
    },
  };
};

const Accordion = styled(MuiAccordion)(({ theme }) => style(theme));

export default Accordion;
