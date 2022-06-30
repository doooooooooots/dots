import React from 'react';
import { Box } from '@mui/system';
import { isArray } from 'lodash';

function FieldInputValueBase(props) {
  const { sx, isOpen, ...other } = props;
  let _sx = isArray(sx) ? sx : [sx];

  return (
    <Box
      {...other}
      sx={[
        ..._sx,
        {
          pl: 1,
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          cursor: 'pointer',
          overflow: 'hidden',
          border: 1,
          borderColor: 'transparent',
          typography: 'body2',

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
            typography: 'body1',
          },
        },
      ]}
    />
  );
}

FieldInputValueBase.bindProps = ({ value }) => ({
  children: value,
});

export default FieldInputValueBase;
