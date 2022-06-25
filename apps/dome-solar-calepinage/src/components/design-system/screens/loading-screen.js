import React from 'react';
import { Box } from '@mui/material';
import { SIDEBAR_WIDTH } from '../../../constants/constants';
import Loading from './loading';

function LoadingScreen() {
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
      <Loading />
    </Box>
  );
}

export default LoadingScreen;
