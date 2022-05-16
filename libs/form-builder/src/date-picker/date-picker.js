import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker as MuiDatePicker, LocalizationProvider } from '@mui/lab';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import FormGroup from '../group/form-group';
import Label from '../label/label';
import withMiddleware from '../with-middleware/with-middleware';

export const DatePicker = ({
  label,
  name,
  control,
  register,
  context,
  ...other
}) => {
  return (
    <FormGroup>
      <Label label={label} />
      <LocalizationProvider utils={DateFnsUtils}>
        <Controller
          name={name}
          control={control}
          // eslint-disable-next-line no-unused-vars
          render={({ field: { ref, ...rest } }) => (
            <MuiDatePicker
              label="Date picker dialog"
              renderInput={(params) => <TextField {...params} />}
              {...rest}
              {...other}
            />
          )}
        />
      </LocalizationProvider>
    </FormGroup>
  );
};

export default DatePicker;
export const datePicker = withMiddleware(DatePicker);
