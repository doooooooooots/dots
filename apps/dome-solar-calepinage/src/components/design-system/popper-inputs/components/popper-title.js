import React from 'react';
import { useTheme } from '@mui/system';
import { CircularProgress, Stack } from '@mui/material';

export default function PopperTitle(props) {
  const { title, loading } = props;
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: '8px 10px',
        fontWeight: 600,
      }}
    >
      {title}
      {loading && <CircularProgress color="inherit" size={15} />}
    </Stack>
  );
}
