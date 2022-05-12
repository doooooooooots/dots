import { TextField } from '@mui/material';
import React from 'react';

const RuleValueText = (props) => {
  const { value, onChange } = props;
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <TextField
      placeholder="text"
      defaultValue={value}
      onBlur={handleChange}
      type="text"
      sx={{
        fontSize: (theme) => theme.typography.body2.fontSize,
      }}
    />
  );
};

export default RuleValueText;
