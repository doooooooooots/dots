import React from 'react';
import { Switch as MuiSwitch } from '@mui/material';
import { Controller } from 'react-hook-form';
import FormGroup from '../group/form-group';
import Label from '../label/label';

function Switch({ label, control, name, ...rest }) {
  return (
    <FormGroup>
      <Label label={label} />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MuiSwitch onChange={(e) => field.onChange(e.target.checked)} checked={field.value} {...rest} />
        )}
      />
    </FormGroup>
  );
}

export default Switch;
