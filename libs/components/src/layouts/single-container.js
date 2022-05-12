import { Box } from '@mui/system';
import React from 'react';

function SingleContainer(props) {
  const { children, sx, ...other } = props;
  return (
    <Box sx={[sx, { bgcolor: 'background.default' }]} borderRadius={1} {...other}>
      {children}
    </Box>
  );
}

export default SingleContainer;
