import React from 'react';
import { Box, CircularProgress } from '@mui/material';

function FieldInputValue(props) {
  const { isOpen, loading, sx = {}, ...other } = props;
  return !loading ? (
    <Box
      {...other}
      sx={[
        sx,
        {
          pl: 1,
          flex: 1,
          cursor: 'pointer',
          overflow: 'hidden',
          border: 1,
          borderColor: 'transparent',
          '&:hover': {
            borderColor: 'neutral.hover',
            bgcolor: 'neutral.hover',
          },
        },
        isOpen && {
          boxShadow: 8,
          borderColor: 'background.default',
          bgcolor: 'neutral.background',
          '&  input': {
            typography: 'body2',
          },
        },
      ]}
    />
  ) : (
    <Box pl={2}>
      <CircularProgress color="neutral" size={15} />
    </Box>
  );
}

export default FieldInputValue;
