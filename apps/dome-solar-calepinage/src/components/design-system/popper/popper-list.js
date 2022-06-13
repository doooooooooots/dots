import React from 'react';
import { Box } from '@mui/system';

export default function PopperList(props) {
  const { sx = {}, ...other } = props;
  return (
    <Box
      as="ul"
      sx={[
        {
          p: 0,
          margin: 0,
          listStyle: 'none',
          overflow: 'auto',
          flexGrow: 1,
        },
        sx,
      ]}
      {...other}
    />
  );
}
