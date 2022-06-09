import React from 'react';
import { Typography } from '@mui/material';
import Accordion from '../accordeon';
import AccordionDetails from '../accordion-details';
import AccordionSummary from '../accordion-summary';
import dynamic from 'next/dynamic';

const SideGenerator = dynamic(() => import('./accordeon-generator-content'), {
  ssr: false,
});

function AccordeonGenerator(props) {
  const { expanded, onChange } = props;

  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
        <Typography>Générateur</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ bgcolor: 'background.default' }}>
        <SideGenerator />
      </AccordionDetails>
    </Accordion>
  );
}

export default AccordeonGenerator;
