import React from 'react';
import { Stack } from '@mui/material';

function Container(props) {
  const { direction, children } = props;
  return (
    <Stack
      direction={direction}
      spacing={(direction === 'row') * 1}
      sx={{
        px: 2,
        maxHeight: '50vh',
        overflow: 'auto',
        '& > div:not(:last-child)': { borderBottom: 1, borderColor: 'divider' },
      }}
    >
      {children}
    </Stack>
  );
}

export default Container;
