import React from 'react';
import { Stack } from '@mui/material';
import { FORM_LABEL_SPACING } from '@dots.cool/tokens';

function FormGroup({ children }) {
  return <Stack spacing={FORM_LABEL_SPACING}>{children}</Stack>;
}

export default FormGroup;
