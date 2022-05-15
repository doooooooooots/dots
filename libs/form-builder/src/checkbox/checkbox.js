import React from 'react';
import { Checkbox as MuiCheckbox } from '@mui/material';
import { Controller } from 'react-hook-form';
import FormGroup from '../group/form-group';
import Label from '../label/label';
import withMiddleware from '../with-middleware/with-middleware';

function Checkbox({ label, control, name, ...other }) {
  return (
    <FormGroup>
      <Label label={label} />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MuiCheckbox
            onChange={(e) => field.onChange(e.target.checked)}
            checked={field.value}
            {...other}
          />
        )}
      />
    </FormGroup>
  );
}

export default Checkbox;
export const checkbox = withMiddleware(Checkbox);
