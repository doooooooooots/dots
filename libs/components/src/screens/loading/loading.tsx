import React from 'react';
import { Stack, Typography } from '@mui/material';
import DotsCircularProgress from '../base-spinner/base-spinner';

function Loading(props) {
  const { minWidth = 120, maxWidth = '100vh', sx, hideTypo } = props;
  return (
    <Stack
      p={3}
      spacing={2}
      bgcolor="background.default"
      borderRadius={1}
      justifyContent="center"
      alignItems="center"
      minWidth={minWidth}
      maxWidth={maxWidth}
      sx={sx}
    >
      <DotsCircularProgress />
      {!hideTypo && (
        <Typography component="p" variant="h6">
          Chargement
        </Typography>
      )}
    </Stack>
  );
}

export default Loading;
