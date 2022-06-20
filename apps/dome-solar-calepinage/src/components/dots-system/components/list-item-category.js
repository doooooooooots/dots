import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import StyledItem from './styled-item';

const getEnumColor = (color) => {
  if (
    ['primary', 'secondary', 'info', 'success', 'warning', 'error'].includes(
      color
    )
  )
    return `${color}.main`;
  return color;
};

export const Category = (props) => {
  const { label, color } = props;
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box
        sx={{
          bgcolor: color,
          width: 12,
          height: 12,
          borderRadius: '4px',
        }}
      />
      <Typography
        variant="inherit"
        sx={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          maxWidth: 150,
          textOverflow: 'ellipsis',
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
};

Category.bindProps = ({ label, color }) => ({
  label: label,
  color: getEnumColor(color),
});

/**
 * SCALE VALUE
 */
const ListItemCategory = (props, ref) => {
  const { value, label, index, max, ...other } = props;
  return (
    <StyledItem {...other} ref={ref}>
      <Category index={index} max={max} />
    </StyledItem>
  );
};

export default React.forwardRef(ListItemCategory);
