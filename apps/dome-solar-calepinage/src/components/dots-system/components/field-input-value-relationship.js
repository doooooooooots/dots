import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import FieldInputValueBase from './field-input-value-base';

function FieldInputValueRelationship(props) {
  const { loading, value, options, ...other } = props;

  return !loading ? (
    <FieldInputValueBase {...other}>
      {value.map((item) => item.givenName).join(', ')}
    </FieldInputValueBase>
  ) : (
    <Box pl={2}>
      <CircularProgress color="neutral" size={15} />
    </Box>
  );
}

export default FieldInputValueRelationship;
