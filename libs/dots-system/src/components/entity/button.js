import React, { useCallback } from 'react';
import { Stack } from '@mui/material';
import FieldInput from './field/field-input';

const FIELD_HEIGHT = 30;

function Button(props) {
  const { name, label, type, value, options, loading, onChange, sx, ...other } =
    props;

  const handleChange = useCallback(
    (data) => {
      onChange(name, data);
    },
    [name, onChange]
  );

  return (
    <Stack sx={sx} direction="row" alignItems="center">
      <FieldInput
        name={name}
        variant="button"
        value={value}
        type={type}
        options={options}
        loading={loading}
        onChange={handleChange}
        sx={{ height: FIELD_HEIGHT }}
        {...other}
      />
    </Stack>
  );
}

export default Button;
