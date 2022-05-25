import React from 'react';
import { Typography } from '@mui/material';
import Accordion from '../accordeon';
import AccordionDetails from '../accordion-details';
import AccordionSummary from '../accordion-summary';
import SideRoof from './accordeon-roof-content';

function AccordeonRoof(props) {
  const { expanded, onChange } = props;
  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography>Toiture</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <SideRoof />
      </AccordionDetails>
    </Accordion>
  );
}

export default AccordeonRoof;
