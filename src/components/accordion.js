import {styled} from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';

const style = (theme) => {
  return {
    border: `1.5px solid ${theme.palette.highlight.main}`,
    borderRadius: `${theme.shape.borderRadius.primary}`,
    "& .MuiAccordionSummary-root": {
      "& .MuiTypography-root": {
        fontFamily: `${theme.typography.fontFamily}`,
        fontWeight: 'bold',
        fontSize: '20px',
      }
    },
    "& .MuiAccordionDetails-root": {
      borderTop: `2px solid ${theme.palette.highlight.main}`
    }
  }
}

const Accordion = styled(MuiAccordion)(({theme}) => 
  style(theme)
);

export default Accordion;