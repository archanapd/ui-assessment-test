import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: `1px solid #D8DFE7`,
  padding: '12px 0',
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<AddIcon sx={{ fontSize: '20px', color: '#0069B1', }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? '#fff'
      : '#fff',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    
  },
  padding: '0',
  '.MuiAccordionSummary-root': {
    borderBottom: '2px solid red'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: 0,
  },
  '& .MuiAccordionSummary-content .MuiTypography-root': {
    color: '#62616B',
    fontSize: '18px',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: '0 0 16px 0',
  color: '#B9B9CB',
  fontSize: '14px',
  borderBottom: '0',
  '.MuiAccordionDetails-root': {
    paddingLeft: '0',
    paddingRight: '0',
  },
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Beginner</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Skor 0-9
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Intermediate</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Skor 10-49
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Advance</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Skor 50-100
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
