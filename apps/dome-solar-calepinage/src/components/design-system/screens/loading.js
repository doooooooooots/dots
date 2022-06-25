import React from 'react';
import { CircularProgress, Stack, Typography } from '@mui/material';

function Loading(props) {
  const { minWidth = 120, maxWidth = '100vh' } = props;
  return (
    <Stack
      p={3}
      spacing={2}
      backgroundColor="background.default"
      borderRadius={1}
      alignItems="center"
      minWidth={minWidth}
      maxWidth={maxWidth}
    >
      <CircularProgress />
      <Typography component="p" variant="h6">
        Chargement
      </Typography>
    </Stack>
  );
}

export default Loading;
