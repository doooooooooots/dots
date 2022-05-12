import * as React from 'react';
import Box from '@mui/material/Box';
import LayoutAppBar from './layout-appbar';

function Layout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        minWidth: '1000px',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          // maxWidth: '1690px',
          margin: '0 auto',
          px: 5,
        }}
      >
        {children}
      </Box>

      {/* Fixed AppBar */}
      <LayoutAppBar />
    </Box>
  );
}

export default React.memo(Layout);
