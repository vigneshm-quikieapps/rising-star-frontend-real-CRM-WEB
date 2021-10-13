import * as React from 'react';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiTypography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Accordion from './accordion';

export default function CustomAccordion() {
    const [expanded, setExpanded] = React.useState(false);
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  
    return (
      <div>
        <Accordion elevation={0} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <MuiAccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <MuiTypography>
              Accordion 1
            </MuiTypography>
          </MuiAccordionSummary>
          <MuiAccordionDetails>
            <MuiTypography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
              Aliquam eget maximus est, id dignissim quam.
            </MuiTypography>
          </MuiAccordionDetails>
        </Accordion>
        <Accordion elevation={0} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <MuiAccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <MuiTypography>
              Accordion 2
            </MuiTypography>
          </MuiAccordionSummary>
          <MuiAccordionDetails>
            <MuiTypography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
              Aliquam eget maximus est, id dignissim quam.
            </MuiTypography>
          </MuiAccordionDetails>
        </Accordion>
      </div>
    );
  }