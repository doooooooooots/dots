import React from 'react';
import { Grid, Typography } from '@mui/material';

function SectionTitle(props) {
  const { primary } = props;
  return (
    <Grid item xs={12}>
      <Typography variant="h6">{primary}</Typography>
    </Grid>
  );
}

export default SectionTitle;
