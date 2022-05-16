import React from 'react';
import { Switch as MuiSwitch } from '@mui/material';
import { Controller } from 'react-hook-form';
import FormGroup from '../group/form-group';
import Label from '../label/label';
import withMiddleware from '../with-middleware/with-middleware';

function Switch({ label, name, control, register, context, ...rest }) {
  return (
    <FormGroup>
      <Label label={label} />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MuiSwitch
            onChange={(e) => field.onChange(e.target.checked)}
            checked={field.value}
            {...rest}
          />
        )}
      />
    </FormGroup>
  );
}

export default Switch;
export const switchInput = withMiddleware(Switch);
