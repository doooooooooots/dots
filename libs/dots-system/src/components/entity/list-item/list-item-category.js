import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import formatColor from '../../../utils/format-color';
import StyledItem from '../styled-item';
import Tag from '../tag';

export const Category = (props) => {
  const { label, color } = props;
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Tag
        startIcon={
          color && (
            <Box
              sx={{
                bgcolor: color,
                width: 12,
                height: 12,
                borderRadius: '4px',
              }}
            />
          )
        }
      >
        {label}
      </Tag>
    </Stack>
  );
};

Category.bindProps = ({ label, color }) => ({
  label: label,
  color: formatColor(color),
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
