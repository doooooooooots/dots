import React from 'react';
import { Typography } from '@mui/material';
import Accordion from '../accordeon';
import AccordionDetails from '../accordion-details';
import AccordionSummary from '../accordion-summary';
import SideObstacles from './accordeon-obstacle-content';

function AccordeonObstacle(props) {
  const { expanded, onChange } = props;
  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography>Obstacles</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <SideObstacles />
      </AccordionDetails>
    </Accordion>
  );
}

export default AccordeonObstacle;
