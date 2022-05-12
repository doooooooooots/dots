import { Grid } from '@mui/material';
import * as React from 'react';

function Single({ children }) {
  return (
    <Grid container spacing={1} sx={{ height: '100%' }}>
      {children}
    </Grid>
  );
}

export default React.memo(Single);
