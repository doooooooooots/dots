import { Input } from '@mui/material';
import React from 'react';

const RuleValueFloat = (props) => {
  const { value, onChange } = props;

  return (
    <Input
      placeholder="float"
      value={value}
      onChange={onChange}
      type="number"
    />
  );
};

export default RuleValueFloat;
