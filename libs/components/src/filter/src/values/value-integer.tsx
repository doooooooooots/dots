import { Input } from '@mui/material';
import React from 'react';

const RuleValueInteger = (props) => {
  const { value, onChange } = props;

  return (
    <Input
      placeholder="integer"
      value={value}
      onChange={onChange}
      type="number"
    />
  );
};

export default RuleValueInteger;
