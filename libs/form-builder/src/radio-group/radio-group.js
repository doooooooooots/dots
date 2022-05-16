import {
  FormControlLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
} from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import FormGroup from '../group/form-group';
import Label from '../label/label';
import withMiddleware from '../with-middleware/with-middleware';

function RadioGroup({
  label,
  name,
  control,
  register,
  options,
  context,
  ...rest
}) {
  return (
    <FormGroup>
      <Label label={label} />
      <Controller
        render={({ field }) => (
          <MuiRadioGroup aria-label="gender" {...field} {...rest}>
            {options.map((value) => (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio />}
                label={value}
              />
            ))}
          </MuiRadioGroup>
        )}
        name={name}
        control={control}
      />
    </FormGroup>
  );
}

export default RadioGroup;
export const radioGroup = withMiddleware(RadioGroup);
