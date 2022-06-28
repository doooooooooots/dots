import React from 'react';
import { Typography } from '@mui/material';

function Label({ label }) {
  return <>{label && <Typography>{label}</Typography>}</>;
}

export default Label;
