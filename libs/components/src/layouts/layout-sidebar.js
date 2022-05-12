import { Box } from '@mui/material';
import * as React from 'react';

function LayoutSidebar({ children }) {
  return (
    <Box
      className='hide-in-full'
      component='nav'
      sx={{
        flex: '0 0 240px',
        width: '240px'
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          mt: '44px',
          pt: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          width: 'inherit'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default React.memo(LayoutSidebar);
