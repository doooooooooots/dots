import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import FieldInputValueBase from './field-input-value-base';

function FieldInputValueDefault(props) {
  const { loading, type, value, sx = {}, ...other } = props;

  return !loading ? (
    <FieldInputValueBase
      {...FieldInputValueBase.bindProps({ value })}
      sx={sx}
      {...other}
    >
      {value}
    </FieldInputValueBase>
  ) : (
    <Box pl={2}>
      <CircularProgress color="neutral" size={15} />
    </Box>
  );
}

export default FieldInputValueDefault;
