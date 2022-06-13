import React from 'react';
import { Stack } from '@mui/material';
import { isArray } from 'lodash';

function PopperContainer(props, ref) {
  const { sx, ...other } = props;
  const _sx = isArray(sx) ? sx : [sx];
  return (
    <Stack
      ref={ref}
      {...other}
      direction="column"
      sx={[
        {
          bgcolor: 'background.default',
          boxShadow: 12,
          maxHeight: '55vh',
          overflow: 'hidden',
        },
        ..._sx,
      ]}
    />
  );
}

export default React.forwardRef(PopperContainer);
