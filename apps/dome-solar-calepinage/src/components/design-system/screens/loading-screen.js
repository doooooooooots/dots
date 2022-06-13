import React from 'react';
import { Box, Stack, Typography, CircularProgress } from '@mui/material';
import { SIDEBAR_WIDTH } from '../../../constants/constants';

function Loading() {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={SIDEBAR_WIDTH}
      height="100%"
      bgcolor="neutral.background"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        p={3}
        spacing={2}
        backgroundColor="background.default"
        borderRadius={1}
        boxShadow={(theme) => theme.shadows[10]}
        alignItems="center"
      >
        <CircularProgress />
        <Typography variant="h6">Chargement</Typography>
      </Stack>
    </Box>
  );
}

export default Loading;
