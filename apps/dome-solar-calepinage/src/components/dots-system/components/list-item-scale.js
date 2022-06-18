import { Box } from '@mui/material';
import React from 'react';
import getCriticityColor from '../utils/get-criticity-color';
import StyledItem from './styled-item';

/**
 * SCALE VALUE
 */
const ScaleValue = (props, ref) => {
  const { value, label, index, max, ...other } = props;
  const color = getCriticityColor(index, max);
  return (
    <StyledItem {...other} ref={ref}>
      <Box
        minWidth={15}
        mr={2}
        sx={{
          width: 120,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {label}
      </Box>
      {new Array(index).fill(0).map((_, _index) => (
        <Box
          key={_index}
          width={16}
          height={16}
          sx={{ bgcolor: color, borderRadius: '4px' }}
        />
      ))}
      {new Array(max - index).fill(0).map((_, _index) => (
        <Box
          key={_index}
          width={16}
          height={16}
          sx={{ bgcolor: 'neutral.100', borderRadius: '4px' }}
        />
      ))}
    </StyledItem>
  );
};

export default React.forwardRef(ScaleValue);
