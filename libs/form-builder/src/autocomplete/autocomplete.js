import React from 'react';
import MuiAutocomplete from '@mui/material/Autocomplete';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import FormGroup from '../group/form-group';
import withMiddleware from '../with-middleware/with-middleware';

function Autocomplete({ label, name, control, register, context, ...rest }) {
  return (
    <FormGroup>
      <label>{label}</label>
      <Controller
        render={({ field }) => (
          <MuiAutocomplete
            {...field}
            onChange={(_, data) => field.onChange(data)}
            renderInput={(params) => <TextField {...params} label="Movie" />}
            {...rest}
          />
        )}
        name={name}
        control={control}
      />
    </FormGroup>
  );
}

export default Autocomplete;
export const autocomplete = withMiddleware(Autocomplete);
