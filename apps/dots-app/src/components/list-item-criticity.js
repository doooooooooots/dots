import { Typography } from '@mui/material';
import EmergencyIcon from '../../design-system/icons/icons-emergency';
import StyledItem from './styled-item';
import { round } from 'lodash';
import React from 'react';

/**
 * Criticity VALUE
 */
const ListItemCriticity = (props, ref) => {
  const { value, label, index, max, ...other } = props;
  return (
    <StyledItem {...other} ref={ref}>
      <EmergencyIcon severity={round((4 * index) / max)} />
      <Typography variant="body2">{label}</Typography>
    </StyledItem>
  );
};

export default React.forwardRef(ListItemCriticity);
