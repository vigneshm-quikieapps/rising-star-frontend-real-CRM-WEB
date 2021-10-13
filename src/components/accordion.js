import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiTypography from '@mui/material/Typography';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius.secondary,
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon 
                  sx={{
                    fontSize: '2rem', 
                    color: '#000', 
                    padding: '3px', 
                    border: '2px solid #f2f1f6', 
                    borderRadius: '12px'
                  }} 
                />}
    {...props}
  />
))(({ theme }) => ({
  borderRadius: theme.shape.borderRadius.secondary,
  backgroundColor: '#fff',
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const Label = styled((props) => (
  <MuiTypography {...props}>{props.label}</MuiTypography>
))(({theme }) => ({
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeight,
  fontSize: theme.typography.fontSize,
  letterSpacing: theme.typography.letterSpacing
}));


export default function CustomizedAccordions() {
  const [open, setOpen] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setOpen(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={open === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Label variant="h4" label="Collapsible" />
        </AccordionSummary>
        <AccordionDetails>
          Lorem
        </AccordionDetails>
      </Accordion>
    </div>
  );
}