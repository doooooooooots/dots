import React from 'react';
import { Box } from '@mui/system';
import { ucFirst } from '@dots.cool/utils';
import { Tooltip } from '@mui/material';

function ButtonBaseUnstyled({ tooltip, children }) {
  return (
    <Tooltip title={ucFirst(tooltip)}>
      <Box display={'flex'} alignItems="center">
        {children}
      </Box>
    </Tooltip>
  );
}

export default ButtonBaseUnstyled;
