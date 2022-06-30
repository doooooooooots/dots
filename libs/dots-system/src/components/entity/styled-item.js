import React from 'react';
import { Stack } from '@mui/material';

const StyledItem = (props) => (
  <Stack {...props} as="li" direction="row" py={0.5} px={1} spacing={1} />
);

export default StyledItem;
