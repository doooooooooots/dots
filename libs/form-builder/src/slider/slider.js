import { Slider as MuiSlider } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import FormGroup from '../group/form-group';
import Label from '../label/label';

function Slider({ control, label, name, ...other }) {
  return (
    <FormGroup>
      <Label label={label} />
      <Controller
        name={name}
        control={control}
        defaultValue={[0, 10]}
        render={({ field }) => (
          <MuiSlider
            {...field}
            onChange={(_, value) => {
              field.onChange(value);
            }}
            valueLabelDisplay='auto'
            max={10}
            step={1}
            {...other}
          />
        )}
      />
    </FormGroup>
  );
}

export default Slider;
