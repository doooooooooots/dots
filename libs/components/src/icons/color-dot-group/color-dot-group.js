import React from 'react';
import { Stack } from '@mui/material';

const ColorDotGroup = (props) => {
  const { size = 'medium', children } = props;

  return (
    <Stack direction="row" spacing={'-3px'}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          size: size,
        });
      })}
    </Stack>
  );
};

export default ColorDotGroup;
