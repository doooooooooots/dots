import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { PURLIN_TYPES_OPTIONS } from '../../../constants/constants';

function PurlinTypes(props) {
  return (
    <Select {...props} fullWidth>
      {PURLIN_TYPES_OPTIONS.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}

export default PurlinTypes;
