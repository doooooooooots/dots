import React from 'react';
import { Grid, Typography, Divider } from '@mui/material';

function SectionTitle(props) {
  const { id, primary, noGutterTop } = props;
  return (
    <Grid
      id={id}
      item
      xs={12}
      sx={{ py: 2, mt: noGutterTop ? 0 : 2, borderRadius: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        {primary}
      </Typography>
      <Divider />
    </Grid>
  );
}

export default SectionTitle;
