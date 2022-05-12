import { Typography } from '@mui/material';
import React from 'react';

function SingleMainTitle(props) {
  const { title } = props;
  return (
    <Typography variant='h2' mb={4}>
      {title}
    </Typography>
  );
}

export default SingleMainTitle;
