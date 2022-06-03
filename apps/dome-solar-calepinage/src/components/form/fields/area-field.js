import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { AREA_FIELD_OPTIONS } from '../../../constants';

function AreaField(props, ref) {
  return (
    <Select {...props} ref={ref} fullWidth>
      {AREA_FIELD_OPTIONS.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}

export default React.forwardRef(AreaField);
