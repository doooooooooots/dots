import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import FieldInputValueBase from './field-input-value-base';

function FieldInputValueDefault(props) {
  const { loading, type, value, sx = {} } = props;

  let Component;
  switch (type) {
    case 'date':
      Component = Box;
      break;
    default:
      Component = FieldInputValueBase;
  }

  return !loading ? (
    <Component {...Component.bindProps({ value })} sx={sx}>
      {value}
    </Component>
  ) : (
    <Box pl={2}>
      <CircularProgress color="neutral" size={15} />
    </Box>
  );
}

export default FieldInputValueDefault;
