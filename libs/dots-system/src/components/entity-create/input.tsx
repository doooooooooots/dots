import { FIELD_TYPES } from '@dots.cool/tokens';
import { TextField } from '@mui/material';
import React from 'react';
import FormInputEnum from './input-radio-cards';

function Input(props) {
  const { type, options, ...other } = props;

  switch (type) {
    case FIELD_TYPES.select:
      return <FormInputEnum options={options} />;
    default:
      return (
        <TextField
          fullWidth
          sx={{ input: { bgcolor: 'neutral.25', borderRadius: 1 } }}
          {...other}
        />
      );
  }
}

export default Input;
