import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { OPERATORS } from '../enums/operators';

export default function SelectOperator(props) {
  const { label, value, onChange } = props;

  return (
    <FormControl variant='outlined'>
      <InputLabel id='select-operator'>{label || "C'est ..."}</InputLabel>
      <Select
        labelId='select-operator'
        id='select-operator'
        onChange={onChange}
        value={value ?? ''}
        label={label || "C'est ..."}
      >
        {OPERATORS.map((operator) =>
          operator ? (
            <MenuItem key={operator} value={operator}>
              {operator}
            </MenuItem>
          ) : null
        )}
      </Select>
    </FormControl>
  );
}
