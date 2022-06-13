import React from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

function SelectNoResult(props) {
  const { content = 'No result' } = props;
  return (
    <Box p={1} borderRadius={1} textAlign="center">
      {content && typeof content === 'string' ? (
        <Typography varianh="h6">{content}</Typography>
      ) : (
        content
      )}
    </Box>
  );
}

export default SelectNoResult;
