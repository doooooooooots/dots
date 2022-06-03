import React from 'react';
import { Typography, Box } from '@mui/material';
import { POPPER_SEARCH_PADDING } from '../../../constants';

function SelectNoResult() {
  return (
    <Box px={POPPER_SEARCH_PADDING}>
      <Typography variant="h6" component="p">
        Pas de résultat
      </Typography>
    </Box>
  );
}

export default SelectNoResult;
