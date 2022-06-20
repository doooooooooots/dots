import React from 'react';
import StyledItem from './styled-item';
import { Typography } from '@mui/material';
import ProgressIcon from '../../design-system/icons/icons-progress';

/**
 * PROGRESS
 */
const ListItemProgress = (props, ref) => {
  const { value, label, index, max, color = 'neutral', ...other } = props;
  return (
    <StyledItem {...other} ref={ref}>
      <ProgressIcon stage={value} color={`${color}.main`} />
      <Typography variant="body2">{label}</Typography>
    </StyledItem>
  );
};

export default React.forwardRef(ListItemProgress);
