import React from 'react';
import { Box } from '@mui/material';

function FieldInputValue(props) {
  const { isOpen, sx = {}, ...other } = props;
  return (
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
  );
}

export default FieldInputValue;
