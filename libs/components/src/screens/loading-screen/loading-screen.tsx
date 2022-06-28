import React from 'react';
import { Box } from '@mui/material';
import Loading from '../loading/loading';

function LoadingScreen() {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      height="100%"
      bgcolor="neutral.background"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Loading />
    </Box>
  );
}

export default LoadingScreen;
