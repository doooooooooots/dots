import React from 'react';
import { Stack } from '@mui/material';

function FieldGroupContainer(props) {
  const { children } = props;
  return (
    <Stack
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

export default FieldGroupContainer;
