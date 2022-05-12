import * as React from 'react';
import { Grid } from '@mui/material';
import SingleContainer from './single-container';

function SingleMain({ children, ...other }) {
  return (
    <Grid item sx={{ flex: 1 }}>
      <SingleContainer {...other}>{children}</SingleContainer>
    </Grid>
  );
}

export default React.memo(SingleMain);
