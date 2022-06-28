import { TextField } from '@mui/material';
import React from 'react';
import FormInputEnum from './form-input-radio-cards';

function FormInput(props) {
  const { type, options } = props;

  switch (type) {
    case 'select':
      return <FormInputEnum options={options} />;
    default:
      return (
        <TextField
          fullWidth
          sx={{ input: { bgcolor: 'neutral.25', borderRadius: 1 } }}
        />
      );
  }
}

export default FormInput;
