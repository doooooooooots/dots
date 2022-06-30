import { Typography } from '@mui/material';
import { isArray, isObject } from 'lodash';
import React from 'react';

// [ ](Adrien): Use entity getter
function FieldInputValueRelationship(props) {
  const { value, getter } = props;

  return (
    <Typography variant="caption">
      {value && isArray(value) && value.map(getter).join(', ')}
      {value && isObject(value) && getter(value)}
    </Typography>
  );
}

FieldInputValueRelationship.bindProp = ({ value, getter }) => ({
  value,
  getter,
});

export default FieldInputValueRelationship;
