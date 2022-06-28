import React from 'react';
import { Typography } from '@mui/material';
import StyledItem from './styled-item';

export const SoftLabel = (props) => {
  const { label, color = 'neutral', sx } = props;

  return (
    <Typography
      variant="caption"
      sx={{
        px: 1.5,
        py: 0.5,
        m: 0,
        borderRadius: 1,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: 180,
        cursor: 'pointer',
        bgcolor: (theme) => `${theme.palette[color].background}`,
        color: (theme) => `${theme.palette[color].main}!important`,
        '&:hover': {
          bgcolor: (theme) => `${theme.palette[color].hover}`,
        },
        ...sx,
      }}
    >
      {label}
    </Typography>
  );
};

SoftLabel.bindProps = ({ label, color }) => ({
  label,
  color,
});

/**
 * LABEL
 */

const ListItemLabel = (props, ref) => {
  const { label, color, sx = {}, ...other } = props;
  return (
    <StyledItem {...other} ref={ref}>
      <SoftLabel label={label} color={color} sx={sx} />
    </StyledItem>
  );
};

export default React.forwardRef(ListItemLabel);
