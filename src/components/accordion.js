import * as React from 'react';
import {styled} from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiTypography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const style = (theme) => {
  return {
    border: `2px solid ${theme.palette.highlight.main}`,
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

export default function CustomAccordion() {

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <div>
      <Accordion elevation={0} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <MuiAccordionSummary
          expandIcon={<ExpandMoreIcon sx={{borderRadius: '12px', border: '2px solid #f2f1f6', width: '30px', height: '30px', color: '#000', padding: '5px'}}  />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <MuiTypography>Accordion 1</MuiTypography>
        </MuiAccordionSummary>
        <MuiAccordionDetails>
          <MuiTypography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </MuiTypography>
        </MuiAccordionDetails>
      </Accordion>
      <Accordion elevation={0} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <MuiAccordionSummary
          expandIcon={<ExpandMoreIcon sx={{borderRadius: '12px', border: '2px solid #f2f1f6', width: '30px', height: '30px', color: '#000', padding: '5px'}}  />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <MuiTypography>Accordion 2</MuiTypography>
        </MuiAccordionSummary>
        <MuiAccordionDetails>
          <MuiTypography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </MuiTypography>
        </MuiAccordionDetails>
      </Accordion>
    </div>
  )
}
