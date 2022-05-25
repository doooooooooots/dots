import React from 'react';
import MuiAccordion from '@mui/material/Accordion';
import { styled } from '@mui/system';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:before': {
    display: 'none',
  },
  '& .MuiButtonBase-root': {
    minHeight: theme.spacing(4),
  },
}));

export default Accordion;
