import React, { useCallback } from 'react';
import { Stack } from '@mui/material';
import FieldLabel from './field-label';
import FieldInput from './field-input';

const FIELD_HEIGHT = 30;

function Field(props) {
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
      <FieldLabel
        type={type}
        label={label}
        sx={{
          height: FIELD_HEIGHT,
          width: 155,
          borderRight: 1,
          borderColor: 'divider',
        }}
      />
      <FieldInput
        name={name}
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

export default Field;
