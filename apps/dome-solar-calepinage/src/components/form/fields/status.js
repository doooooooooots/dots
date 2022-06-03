import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { STATUS_OPTIONS } from '../../../constants';

function Status(props, ref) {
  return (
    <Select {...props} ref={ref} label="Status" fullWidth>
      {STATUS_OPTIONS.map((status) => (
        <MenuItem key={status} value={status}>
          {status}
        </MenuItem>
      ))}
    </Select>
  );
}

export default React.forwardRef(Status);
