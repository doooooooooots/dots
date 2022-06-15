import React from 'react';
import { Stack } from '@mui/material';
import FieldLabel from './field-label';
import FieldInput from './field-input';

const FIELD_HEIGHT = 30;

function Field(props) {
  const { name, label, type, value, icon, onChange } = props;

  return (
    <Stack direction="row" alignItems="center">
      <FieldLabel
        type={type}
        icon={icon}
        label={label}
        sx={{
          height: FIELD_HEIGHT,
          width: 155,
          borderRight: 1,
          borderColor: 'divider',
        }}
      />
      <FieldInput
        sx={{ height: FIELD_HEIGHT }}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
    </Stack>
  );
}

export default Field;
