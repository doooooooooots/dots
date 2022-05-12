import { Grid } from '@mui/material';
import * as React from 'react';
import SingleContainer from './single-container';

function SingleSidebar({ children }) {
  return (
    <Grid item width={250}>
      <SingleContainer>{children}</SingleContainer>
    </Grid>
  );
}

export default React.memo(SingleSidebar);
