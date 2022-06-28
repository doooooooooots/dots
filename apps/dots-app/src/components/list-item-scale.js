import { Box, Stack } from '@mui/material';
import React from 'react';
import getCriticityColor from '../utils/get-criticity-color';
import StyledItem from './styled-item';
import Tag from './tag';

export const ScaleBox = (props) => {
  const { index, max } = props;
  if (!index || !max || max - index < 0) return null;

  const color = getCriticityColor(index, max);

  return (
    <Tag startIcon={index}>
      <Stack direction="row" spacing={0.25}>
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
      </Stack>
    </Tag>
  );
};

ScaleBox.bindProps = ({ index, value, length }) => ({
  index,
  max: length,
});

/**
 * SCALE VALUE
 */
const ListItemScale = (props, ref) => {
  const { value, label, index, max, ...other } = props;
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
      <ScaleBox index={index} max={max} />
    </StyledItem>
  );
};

export default React.forwardRef(ListItemScale);
