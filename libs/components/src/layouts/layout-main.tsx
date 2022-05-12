import { Box } from '@mui/material';
import * as React from 'react';

interface LayoutMainProps {
  children: React.ReactNode;
}

function LayoutMain(props: LayoutMainProps) {
  const { children } = props;
  return (
    <Box
      component="main"
      sx={{
        flex: '1 0 calc(1000px - 40px - 40px - 240px)',
        width: 'calc(1000px - 40px - 40px - 240px)',
        pt: 'calc(44px)',
        display: 'flex',
        minHeight: '100vh',
        outline: 'none',
        flexDirection: 'column',
      }}
    >
      {children}
    </Box>
  );
}

export default React.memo(LayoutMain);
