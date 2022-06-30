import { ProgressIcon } from '@dots.cool/components';
import React from 'react';
import StyledItem from '../styled-item';
import Tag from '../tag';
import formatColor from '../../../utils/format-color';

export const ProgressValue = (props) => {
  const { value, label, color } = props;
  return (
    <Tag
      startIcon={<ProgressIcon stage={value} color={color} size="inherit" />}
    >
      {label}
    </Tag>
  );
};

ProgressValue.bindProps = ({ label, value, color }) => ({
  label,
  value,
  color: formatColor(color),
});

/**
 * PROGRESS
 */
const ListItemProgress = (props, ref) => {
  const { value, label, index, max, color = 'neutral', ...other } = props;
  return (
    <StyledItem {...other} ref={ref}>
      <ProgressValue value={value} label={label} color={color} />
    </StyledItem>
  );
};

export default React.forwardRef(ListItemProgress);
