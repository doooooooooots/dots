import React from 'react';
import { Box } from '@mui/system';
import StyledItem from '../styled-item';
import Tag from '../tag';

const ColorDot = ({ color }) => (
  <Box bgcolor={`${color}.main`} width={6} height={6} borderRadius="50%" />
);

export const ChipWithStatus = (props) => {
  const { label, color = 'primary', fullColor } = props;

  return (
    <Tag startIcon={<ColorDot color={color} fullColor={fullColor} />}>
      {label}
    </Tag>
  );
};

ChipWithStatus.bindProps = ({ label, color }) => ({
  label,
  color,
});

/**
 * CHIP STATUS
 */
const ListItemChipWithStatus = (props, ref) => {
  const {
    value,
    label,
    index,
    max,
    color = 'neutral',
    fullColor,
    ...other
  } = props;

  return (
    <StyledItem {...other} ref={ref}>
      <ChipWithStatus label={label} color={color} fullColor={fullColor} />
    </StyledItem>
  );
};

export default React.forwardRef(ListItemChipWithStatus);
